var bHP, rHP, mHP;
bHP = rHP = mHP = 10;
var m1HP, m2HP;
m1HP = m2HP = 10;
var bsHP = 20;
var MP = 0;
var win, lose;
win = lose = false;

function playAudio(a){
    var sfx = document.getElementById("audio");
    switch(a){
        case 1:
            sfx.src="audio/win.mp3";
            sfx.play();
        break;
        case 2:
            sfx.src="audio/lose.mp3";
            sfx.play();
        break;
        case 3:
            sfx.src="audio/bNS.mp3";
            sfx.play();
        break;
        case 4:
            sfx.src="audio/mnoNS.mp3";
            sfx.play();
        break;
        case 5:
            sfx.src="audio/bSA.mp3";
            sfx.play();
        break;
        case 6:
            sfx.src="audio/rSA.mp3";
            sfx.play();
        break;
        case 7:
            sfx.src="audio/mnoSA.mp3";
            sfx.play();
        break;
    }
}
function checkWinLoss(){
    if(bsHP==0 && m1HP==0 && m2HP==0){
        win=true;
        document.getElementById('text').innerHTML="YOU WON.";
        playAudio(1);
    }
    else if(mHP==0 && bHP==0 && rHP==0){
        lose=true;
        document.getElementById('text').innerHTML="YOU LOST.";
        playAudio(2);
    }
    else{
        win, lose = false;
    }
    if(win==true || lose==true){
        backtomenu();
    }
}
async function backtomenu(){
    await new Promise(resolve => setTimeout(resolve, 5000));
    document.location.href="index.html";
}
function displayBella(){
    var elements=document.querySelectorAll(".hide");
    var elemCount = elements.length;
    for (var i=0; i<elemCount; i++){
        elements[i].className="btn btn-outline-warning";
    }
    document.getElementById('hiddenButton1').innerHTML="HEAL";
    document.getElementById('hiddenButton2').innerHTML="HP BURST";
    rehide();
}
function displayRok(){
    var elements=document.querySelectorAll(".hide");
    var elemCount = elements.length;
    for (var i=0; i<elemCount; i++){
        elements[i].className="btn btn-outline-warning";
    }
    document.getElementById('hiddenButton1').innerHTML="MERCY";
    document.getElementById('hiddenButton2').innerHTML="BLOCK";
    rehide();
}
function displayMno(){
    var elements=document.querySelectorAll(".hide");
    var elemCount = elements.length;
    for (var i=0; i<elemCount; i++){
        elements[i].className="btn btn-outline-warning";
    }
    document.getElementById('hiddenButton1').innerHTML="ATTACK";
    document.getElementById('hiddenButton2').innerHTML="MASS MURDER";
    rehide();
}
function setHP(){
    if(mHP>10){
        mHP=10;
        document.getElementById('msnoHP').innerHTML="MISS NO: " + mHP +" HP";
    }
    else if(mHP<=0){
        mHP=0;
        document.getElementById('msnoHP').innerHTML="MISS NO: " + mHP +" HP";
        document.getElementById('msnoSprite').src="images/msno/msno-dead.png";
    }
    else{
        mHP=mHP;
        document.getElementById('msnoHP').innerHTML="MISS NO: " + mHP +" HP";
    }
    if(bHP>10){
        bHP=10;
        document.getElementById('bellaHP').innerHTML="BELLA: " + bHP +" HP";
    }
    else if (bHP<=0){
        bHP=0;
        document.getElementById('bellaHP').innerHTML="BELLA: " + bHP +" HP";
        document.getElementById('bellaSprite').src="images/bella/bella-dead.png";
    }
    else{
        bHP=bHP;
        document.getElementById('bellaHP').innerHTML="BELLA: " + bHP +" HP";
    }
    if(rHP>10){
        rHP=10;
        document.getElementById('rokHP').innerHTML="ROK: " + rHP +" HP";
    }
    else if(rHP<=0){
        rHP=0;
        document.getElementById('rokHP').innerHTML="ROK: " + rHP +" HP";
        document.getElementById('rokSprite').src="images/rok/rok-dead.png";
    }
    else{
        rHP=rHP;
        document.getElementById('rokHP').innerHTML="ROK: " + rHP +" HP";
    }
    if(m1HP<=0){
        m1HP=0;
        document.getElementById('minion1HP').innerHTML="MINION 1: " + m1HP +" HP";
        document.getElementById('min1Sprite').src="images/minions/minion1-dead.png";
    }
    else{
        m1HP=m1HP;
        document.getElementById('minion1HP').innerHTML="MINION 1: " + m1HP +" HP";
    }
    if(m2HP<=0){
        m2HP=0;
        document.getElementById('minion2HP').innerHTML="MINION 2: " + m2HP +" HP";
        document.getElementById('min2Sprite').src="images/minions/minion2-dead.png";
    }
    else{
        m2HP=m2HP;
        document.getElementById('minion2HP').innerHTML="MINION 2: " + m2HP +" HP";
    }
    if(bsHP<=0){
        bsHP=0;
        document.getElementById('bossHP').innerHTML="BOSS: " + bsHP + " HP";
        document.getElementById('bossSprite').src="images/boss/boss-dead.png";
    }
    else{
        bsHP=bsHP;
        document.getElementById('bossHP').innerHTML="BOSS: " + bsHP + " HP";
    }
    if(MP<0){
        MP=0;
        document.getElementById('mana').innerHTML="MANA: " + MP;
    }
    else{
        MP=MP;
        document.getElementById('mana').innerHTML="MANA: " + MP;
    }
}
function changeSprite(j){
    switch(j){
        case 1:
            if(mHP<=0){
                document.getElementById('msnoSprite').src="images/msno/msno-dead.png";
            }
            else{
                document.getElementById('msnoSprite').src="images/msno/msno-hurt.gif";
                setTimeout(function(){
                    document.getElementById('msnoSprite').src="images/msno/msno-idle.gif";
                },350);
            }
            break;
        case 2:
            if(bHP<=0){
                document.getElementById('bellaSprite').src="images/bella/bella-dead.png";
            }
            else{
                document.getElementById('bellaSprite').src="images/bella/bella-hurt.gif";
                setTimeout(function(){
                    document.getElementById('bellaSprite').src="images/bella/bella-idle.gif";
                },400);
            }
            break;
        case 3:
            if(rHP<=0){
                document.getElementById('rokSprite').src="images/rok/rok-dead.png";
            }
            else{
                document.getElementById('rokSprite').src="images/rok/rok-hurt.gif";
                setTimeout(function(){
                    document.getElementById('rokSprite').src="images/rok/rok-idle.gif";
                },400);
            }
            break;
        case 4:
            if(m1HP<=0){
                document.getElementById('min1Sprite').src="images/minions/minion1-dead.png";
            }
            else{
                document.getElementById('min1Sprite').src="images/minions/minion-hurt.gif";
                setTimeout(function(){
                    document.getElementById('min1Sprite').src="images/minions/minion-idle.gif";
                },350);
            }
            break;
        case 5:
            if(m2HP<=0){
                document.getElementById('min2Sprite').src="images/minions/minion2-dead.png";
            }
            else{
                document.getElementById('min2Sprite').src="images/minions/minion-hurt.gif";
                setTimeout(function(){
                    document.getElementById('min2Sprite').src="images/minions/minion-idle.gif";
                },350);
            }
            break;
        case 6:
            if(bsHP<=0){
                document.getElementById('bossSprite').src="images/boss/boss-dead.png";
            }
            else{
                document.getElementById('bossSprite').src="images/boss/boss-hurt.gif";
                setTimeout(function(){
                    document.getElementById('bossSprite').src="images/boss/boss-idle.gif";
                },400);
            }
            break;
        case 7:
            document.getElementById('msnoSprite').src="images/msno/msno-heal.gif";
            setTimeout(function(){
                document.getElementById('msnoSprite').src="images/msno/msno-idle.gif";
            },350);
            break;
        case 8:
            document.getElementById('bellaSprite').src="images/bella/bella-heal.gif";
            setTimeout(function(){
                document.getElementById('bellaSprite').src="images/bella/bella-idle.gif";
            },500);
            break;
        case 9:
            document.getElementById('rokSprite').src="images/rok/rok-heal.gif";
            setTimeout(function(){
                document.getElementById('rokSprite').src="images/rok/rok-idle.gif";
            },500);
            break;
        default:
            break;
    }
}
function enemyTurn(){
    var num=rng();
    switch(num){
        case 1:
            if(bHP<=0){
                enemyTurn();
            }
            else{
                changeSprite(2);
                document.getElementById('text').innerHTML+=" The enemy has attacked. Bella lost 2 HP.";
                bHP-=2;
            }
            break;
        case 2:
            if(rHP<=0){
                enemyTurn();
            }
            else{
                changeSprite(3);
                document.getElementById('text').innerHTML+=" The enemy has attacked. Rok lost 2 HP.";
                rHP-=2;
            }
            break;
        case 3:
            if(mHP<=0){
                enemyTurn();
            }
            else{
                changeSprite(1);
                document.getElementById('text').innerHTML+=" The enemy has attacked. Miss No lost 2 HP.";
                mHP-=2;
            }
            break;                   
        default:
            for(i=1; i<4; i++){
                changeSprite(i);
            }
            document.getElementById('text').innerHTML+=" The enemy has attacked. All party members has lost 2 HP.";
            bHP-=2;
            rHP-=2;
            mHP-=2;
            break;
        }
    setHP();
    checkWinLoss();
}
function showCharacter(){
    var playerSelector=document.querySelectorAll(".hideplayers");
    var playerCount=playerSelector.length;
    for(var i=0; i<playerCount; i++){
        playerSelector[i].className="players";
    }
}
function showEnemy(){
    var enemyShow=document.querySelectorAll(".hideenemies");
    var enemyCount=enemyShow.length;
    for(var i=0; i<enemyCount;i++){
        enemyShow[i].className="enemies"
    }
}
function rehide(){
    var hidePlayer=document.querySelectorAll(".players");
    var hidePlayerCount=hidePlayer.length;
    for (var i=0; i<hidePlayerCount; i++){
        hidePlayer[i].className="players hideplayers";
    }
    var hideEnemies=document.querySelectorAll(".enemies");
    var hideEnemiesCount=hideEnemies.length;
    for (var i=0; i<hideEnemiesCount; i++){
        hideEnemies[i].className="enemies hideenemies";
    }
}
function rng(){
    var num = Math.floor(Math.random() * 4);
    return num;
}
function srng(){
    var num = Math.floor(Math.random() * 3);
    return num;
}
function selectCharacter(chr){
    var num;
    switch(chr){
        case 1:
            if(bHP==10){
                document.getElementById('text').innerHTML="Bella Already has 10HP";
                rehide();
            }
            else{
                num = rng();
                switch(num){
                    case 1:
                        document.getElementById('text').innerHTML="Healing Failed. Bella did not gain any HP.";
                        MP+=2;
                        enemyTurn();
                        rehide();
                        break;
                    case 2:
                        document.getElementById('text').innerHTML="Healing Success. Bella gained 3HP.";
                        bHP+=3;
                        MP+=2;
                        changeSprite(8);
                        playAudio(3);
                        enemyTurn();
                        rehide();
                        break;
                    case 3:
                        document.getElementById('text').innerHTML="Healing Success! Bella gained 7HP.";
                        bHP+=7;
                        MP+=2;
                        changeSprite(8);
                        playAudio(3);
                        enemyTurn();
                        rehide();
                        break;
                }
            }
            break;
        case 2:
            if(rHP==10){
                document.getElementById('text').innerHTML="Rok Already has 10HP";
                rehide();
            }
            else{
                num = rng();
                switch(num){
                    case 1:
                        document.getElementById('text').innerHTML="Healing Failed. Rok did not gain any HP.";
                        MP+=2;
                        enemyTurn();
                        rehide();
                        break;
                    case 2:
                        document.getElementById('text').innerHTML="Healing Success. Rok gained 3HP.";
                        MP+=2;
                        rHP+=3;
                        changeSprite(9);
                        playAudio(3);
                        enemyTurn();
                        rehide();
                        break;
                    case 3:
                        document.getElementById('text').innerHTML="Healing Success! Rok gained 7HP.";
                        MP+=2;
                        rHP+=7;
                        changeSprite(9);
                        playAudio(3);
                        enemyTurn();
                        rehide();
                        break;
                }
            }
            break;
        case 3:
            if(mHP==10){
                document.getElementById('text').innerHTML="Miss No Already has 10HP";
                rehide();
            }
            else{
                num = rng();
                switch(num){
                    case 1:
                        document.getElementById('text').innerHTML="Healing Failed. Miss No did not gain any HP.";
                        MP+=2;
                        enemyTurn();
                        rehide();
                        break;
                    case 2:
                        document.getElementById('text').innerHTML="Healing Success. Miss No gained 3HP.";
                        MP+=2;
                        mHP+=3;
                        changeSprite(7);
                        playAudio(3);
                        enemyTurn();
                        rehide();
                        break;
                    case 3:
                        document.getElementById('text').innerHTML="Healing Success! Miss No gained 7HP.";
                        MP+=2;
                        mHP+=7;
                        changeSprite(7);
                        playAudio(3);
                        enemyTurn();
                        rehide();
                        break;
                }
            }
            break;
        case 4:
            if(m1HP==0){
                document.getElementById('text').innerHTML="You've Already Defeated Minion 1.";
                rehide();
            }
            else{
                num = rng();
                switch(num){
                    case 1:
                        document.getElementById('text').innerHTML="Attack Failed. Minion 1 did not lose any HP.";
                        MP+=2;
                        enemyTurn();
                        rehide();
                        break;
                    case 2:
                        document.getElementById('text').innerHTML="Attack Success. Minion 1 lost 3HP.";
                        m1HP-=3;
                        MP+=2;
                        changeSprite(4);
                        playAudio(4);
                        enemyTurn();
                        rehide();
                        break;
                    case 3:
                        document.getElementById('text').innerHTML="Attack Success! Minion 1 lost 7HP.";
                        m1HP-=7;
                        MP+=2;
                        changeSprite(4);
                        playAudio(4);
                        enemyTurn();
                        rehide();
                        break;
                }
            }
            break;
        case 5:
            if(m2HP==0){
                document.getElementById('text').innerHTML="You've Already Defeated Minion 2.";
                rehide();
            }
            else{
                num = rng();
                switch(num){
                    case 1:
                        document.getElementById('text').innerHTML="Attack Failed. Minion 2 did not lose any HP.";
                        MP+=2;
                        enemyTurn();
                        rehide();
                        break;
                    case 2:
                        document.getElementById('text').innerHTML="Attack Success. Minion 2 lost 3HP.";
                        MP+=2;
                        m2HP-=3;
                        changeSprite(5);
                        playAudio(4);
                        enemyTurn();
                        rehide();
                        break;
                    case 3:
                        document.getElementById('text').innerHTML="Attack Success! Minion 2 lost 7HP.";
                        MP+=2;
                        m2HP-=7;
                        changeSprite(5);
                        playAudio(4);
                        enemyTurn();
                        rehide();
                        break;
                }
            }
            break;
        case 6:
            if(bsHP==0){
                document.getElementById('text').innerHTML="You've Already Defeated the Main Boss.";
                rehide();
            }
            else{
                num = rng();
                switch(num){
                    case 1:
                        document.getElementById('text').innerHTML="Attack Failed. Main Boss did not lose any HP.";
                        MP+=2;
                        enemyTurn();
                        rehide();
                        break;
                    case 2:
                        document.getElementById('text').innerHTML="Attack Success. Main Boss lost 3HP.";
                        MP+=2;
                        bsHP-=3;
                        changeSprite(6);
                        playAudio(4);
                        enemyTurn();
                        rehide();
                        break;
                    case 3:
                        document.getElementById('text').innerHTML="Attack Success! Main Boss lost 7HP.";
                        MP+=2;
                        bsHP-=7;
                        changeSprite(6);
                        playAudio(4);
                        enemyTurn();
                        rehide();
                        break;
                }
            }
            break;
    }
}
function choice(event){
    var x=event.target.innerHTML;
    switch(x){
        case "HEAL":
            if(bHP>0){
                document.getElementById('text').innerHTML="Select character to HEAL.";
                showCharacter();
            }
            else{
                document.getElementById('text').innerHTML="Bella has lost all her HP. Try someone else.";
            }
            break;
        case "HP BURST":
            if(bHP>0){
                var num = srng();
                if(MP>2){
                    switch(num){
                        case 1:
                            document.getElementById('text').innerHTML="Everyone gained 5HP."
                            bHP+=5;
                            rHP+=5;
                            mHP+=5;
                            MP-=3;
                            for(i=7; i<10; i++){
                                changeSprite(i);
                            }
                            playAudio(5);
                            enemyTurn();
                            break;
                        case 2:
                            document.getElementById('text').innerHTML="Everyone was fully healed."
                            bHP=rHP=mHP=10;
                            MP-=3;
                            for(i=7; i<10; i++){
                                changeSprite(i);
                            }
                            playAudio(5);
                            enemyTurn();
                            break;
                    }
                }
                else
                    document.getElementById('text').innerHTML="Not enough mana. Need at least 3."
                }
            else{
                document.getElementById('text').innerHTML="Bella has lost all her HP. Try someone else.";
            }                        
            break;
        case "MERCY":
            if(rHP>0){
                document.getElementById('text').innerHTML="This is a Boss Battle. You can not give mercy.";
                enemyTurn();
            }
            else{
                document.getElementById('text').innerHTML="Rok has lost all their HP. Try someone else.";
            }
            break;
        case "BLOCK":
            if(rHP>0){
                var num = srng();
            if(MP>1){
                switch(num){
                case 1:
                    document.getElementById('text').innerHTML="The enemies attacked. Everyone lost 1HP. Boss lost 1 HP";
                    bHP-=1;
                    rHP-=1;
                    mHP-=1;
                    bsHP-=1;
                    MP-=1;
                    for(i=1; i<4; i++){
                        changeSprite(i);
                    }
                    changeSprite(6);
                    playAudio(6);
                    rehide();
                    setHP();
                    break;
                case 2:
                    document.getElementById('text').innerHTML="The enemies attacked. No HP was lost. Boss lost 3 HP";
                    bsHP-=3;
                    bHP=bHP;
                    rHP=rHP;
                    mHP=mHP;
                    MP-=1;
                    changeSprite(6);
                    playAudio(6);
                    rehide();
                    setHP();
                    break;
                }
            }
            else
                document.getElementById('text').innerHTML="Not enough mana. Need at least 2."
            }
            else{
                document.getElementById('text').innerHTML="Rok has lost all their HP. Try someone else.";
            }                    
            break;
        case "ATTACK":
            if(mHP>0){
                document.getElementById('text').innerHTML="Select enemy to ATTACK.";
                showEnemy();
            }
            else{
                document.getElementById('text').innerHTML="Ms. No has lost all her HP. Try someone else.";
            }
            break;
        case "MASS MURDER":
            if(mHP>0){
                var num = srng();
                if(MP>4){
                    switch(num){
                    case 1:
                        document.getElementById('text').innerHTML="All enemies lost 5HP."
                        m1HP-=5;
                        m2HP-=5;
                        bsHP-=5;
                        MP-=5;
                        for(i=4; i<7; i++){
                            changeSprite(i);
                        }
                        playAudio(7);
                        enemyTurn();
                        break;
                    case 2:
                        document.getElementById('text').innerHTML="All enemies lost 7HP."
                        m1HP-=7;
                        m2HP-=7;
                        bsHP-=7;
                        MP-=5;
                        for(i=4; i<7; i++){
                            changeSprite(i);
                        }
                        playAudio(7);
                        enemyTurn();
                        break;
                    }
                }
                else
                    document.getElementById('text').innerHTML="Not enough mana. Need at least 5."
            }
            else{
                document.getElementById('text').innerHTML="Ms. No has lost all her HP. Try someone else.";
            }
            break;
    }
}