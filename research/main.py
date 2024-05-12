# Import kivy dependencies first
from kivy.app import App
from kivy.uix.boxlayout import BoxLayout

# Import kivy UX components
from kivy.uix.image import Image
from kivy.uix.button import Button
from kivy.uix.label import Label

# Import other kivy stuff
from kivy.clock import Clock
from kivy.graphics.texture import Texture
from kivy.logger import Logger
from kivy.core.window import Window

# Import other dependencies
import cv2
import pandas as pd 
import mediapipe as mp
import tensorflow as tf
import numpy as np
from matplotlib import pyplot as plt
import pickle

initial = float()
final = float()

class handTracker():
    def __init__(self, mode=False, maxHands=2, detectionCon=0.5,modelComplexity=1,trackCon=0.5):
        self.mode = mode
        self.maxHands = maxHands
        self.detectionCon = detectionCon
        self.modelComplex = modelComplexity
        self.trackCon = trackCon
        self.mpHands = mp.solutions.hands
        self.hands = self.mpHands.Hands(self.mode, self.maxHands,self.modelComplex, self.detectionCon, self.trackCon)
        self.mpDraw = mp.solutions.drawing_utils

    def handsFinder(self,image,draw=True):
        imageRGB = cv2.cvtColor(image,cv2.COLOR_BGR2RGB)
        self.results = self.hands.process(imageRGB)

        if self.results.multi_hand_landmarks:
            for handLms in self.results.multi_hand_landmarks:
                if draw:
                    self.mpDraw.draw_landmarks(image, handLms, self.mpHands.HAND_CONNECTIONS)
        return image
    
    def positionFinder(self,image, handNo=0, draw=True):
        lmlist = []
        if self.results.multi_hand_landmarks:
            Hand = self.results.multi_hand_landmarks[handNo]
            for id, lm in enumerate(Hand.landmark):
                h,w,c = image.shape
                cx,cy = int(lm.x*w), int(lm.y*h)
                lmlist.append([id,cx,cy])
        return lmlist

# Build app and layout 
class CamApp(App):
    def build(self):
        self.isLeft = False
        self.translateNow = False

        # Main layout components 
        self.web_cam = Image(size_hint=(1,3))

        #horizontal bar
        hori = BoxLayout(orientation='horizontal')
        self.left = Button (text="L", size_hint = (.2, 1), on_press = self.fn_left)
        self.right = Button(text="R", size_hint = (.2, 1), on_press = self.fn_right)
        self.button = Button(text="Start Translation", size_hint = (.6, 1), on_press = self.translate)
        
        hori.add_widget(self.left)
        hori.add_widget(self.button)
        hori.add_widget(self.right)

        self.label = Label(text = "Translations will appear here", color = (1,1,1,1), size_hint = (1, 1))

        # Add items to layout
        layout = BoxLayout(orientation='vertical')
        layout.add_widget(self.web_cam)
        layout.add_widget(hori)
        layout.add_widget(self.label)

        model_dict = pickle.load(open('./ltrs_model.p', 'rb'))
        self.model = model_dict['model']
        self.mp_hands = mp.solutions.hands
        self.hands = self.mp_hands.Hands(static_image_mode=True, max_num_hands=2, min_detection_confidence=0.3)

        self.labels_dict = {0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F', 6: 'G', 7: 'H', 8: 'I', 9: 'J', 10: 'K', 11: 'L', 12: 'M', 13: 'N', 14: 'O', 15: 'P', 16: 'Q', 17: 'R', 18: 'S', 19: 'T', 20: 'U', 21: 'V', 22: 'W', 23: 'X', 24: 'Y', 25: 'Z'}
        self.predicted_character='None'
        self.capture = cv2.VideoCapture(0)
        self.tracker = handTracker()
        Clock.schedule_interval(self.update, 1.0/64.0)
        
        return layout

    def fn_left(self, *args):
        self.isLeft = True
    
    def fn_right(self, *args):
        self.isLeft = False

    def translate(self, *args):
        if self.translateNow == False:
            self.translateNow = True
            self.button.text = "Stop Translating"
            #is translating
        else:
            self.translateNow = False
            self.button.text = "Start Translating"
            #not translating

    def update(self, *args):
        # Read frame from opencv
        ret, frame = self.capture.read()
        cv2.imwrite('capture.jpg', frame)
        self.frame = self.tracker.handsFinder(frame)

        # Flip horizontal and convert image to texture
        if self.isLeft == False:
            buf = cv2.flip(self.frame, 0).tobytes()
            #right hand (default)
        else:
            buf = cv2.flip(cv2.flip(self.frame,1), 0).tobytes()
            #left hand (inverted)

        img_texture = Texture.create(size=(frame.shape[1], frame.shape[0]), colorfmt='bgr')
        img_texture.blit_buffer(buf, colorfmt='bgr', bufferfmt='ubyte')
        self.web_cam.texture = img_texture

        if self.translateNow == False:
            #not translating
            self.label.text = "Translated Words will appear here"
            
        else:
            data_aux = []
            x_ = []
            y_ = []

            H, W, _ = frame.shape

            frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

            results = self.hands.process(frame_rgb)
            if results.multi_hand_landmarks:
                for hand_landmarks in results.multi_hand_landmarks:
                    mp.solutions.drawing_utils.draw_landmarks(
                        frame,  # image to draw
                        hand_landmarks,  # model output
                        self.mp_hands.HAND_CONNECTIONS)

                for hand_landmarks in results.multi_hand_landmarks:
                    for i in range(len(hand_landmarks.landmark)):
                        x = hand_landmarks.landmark[i].x
                        y = hand_landmarks.landmark[i].y

                        x_.append(x)
                        y_.append(y)

                    for i in range(len(hand_landmarks.landmark)):
                        x = hand_landmarks.landmark[i].x
                        y = hand_landmarks.landmark[i].y
                        data_aux.append(x - min(x_))
                        data_aux.append(y - min(y_))

                x1 = int(min(x_) * W) - 10
                y1 = int(min(y_) * H) - 10

                x2 = int(max(x_) * W) - 10
                y2 = int(max(y_) * H) - 10
                
                p = np.asarray(data_aux)
                prediction = self.model.predict([p[:42]])
                self.predicted_character = self.labels_dict[int(prediction[0])]

                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 0, 0), 4)
            self.label.text = self.predicted_character
if __name__ == '__main__':
    Window.fullscreen = 'auto'
    CamApp().run()