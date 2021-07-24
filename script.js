score = 0;
cross = true;
audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');
setTimeout(() => {
    audio.play()
}, 1000);
document.onkeydown = function(e)
{
    console.log("key code is: ", e.keyCode)//Here when we press and hold a key that keycode is taken
    if(e.keyCode == 38)//The key code for up arrow key
    {
        Warrior = document.querySelector('.Warrior');
        Warrior.classList.add('animateWarrior');
        setTimeout(()=>{
            Warrior.classList.remove('animateWarrior')
        },700);
        /*Here we animate the dino to jump using css
        we do it only for 700 miliseconds and then it will stop 
        again we have to press key to jump.*/
    }
    if(e.keyCode == 39)// left key
    {
        Warrior = document.querySelector('.Warrior');
        WarriorX = parseInt(window.getComputedStyle(Warrior, null).getPropertyValue('left'));
        Warrior.style.left = WarriorX + 112 + "px";
    }
    if(e.keyCode == 37)// right key
    {
        Warrior = document.querySelector('.Warrior');
        WarriorX = parseInt(window.getComputedStyle(Warrior, null).getPropertyValue('left'));
        Warrior.style.left = (WarriorX - 112) + "px";
    }
}
setInterval(() => {
    Warrior = document.querySelector('.Warrior');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');
    //Here we calculate the upper and side space of both the Warrior and obstacle to find when they collide
    dx = parseInt(window.getComputedStyle(Warrior, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(Warrior, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx-ox);
    offsetY = Math.abs(dy-oy);
    //Here when they collide the gameOver is made visible and obstacleAni is stoped
    if(offsetX < 73 && offsetY < 52)
    {
        gameOver.innerHTML = "Game Over - Reload to Play Again"
        obstacle.classList.remove('obstacleAni')
        audiogo.play();
        setTimeout(() =>{
            audiogo.pause();
            audio.pause();
        }, 1000);
    }
    else if(offsetX< 145 && cross){
        score+=1;
        updateScore(score);
        cross = false;
        setTimeout(() => 
        {
            cross = true;
        },1000)
        setTimeout(() => {
        aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
        newDur = aniDur - 0.1;
        obstacle.style.animationDuration = newDur + 's';
        },500);
    }
}, 10);

function updateScore(score)
{
    scoreCount.innerHTML = "Your Score: " + score
}