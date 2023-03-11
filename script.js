const gameborad = document.querySelector(".gameboard");
const scoreCount = document.querySelector(".score");
const highScoreCount = document.querySelector(".highscore");
const controls = document.querySelectorAll(".control i");


let gameOver = false;
let foodX, foodY;
let snakeX = 15, snakeY = 15;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;
let highScore = localStorage.getItem("highscore") || 0;
highScoreCount.innerHTML = `High Score: ${highScore}`;



function changeFood(){
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

function displayGameOver(){
    clearInterval(setIntervalId);
    alert(`Game Over
Click OK to Replay....`);
location.reload()
}

function changeDirection(e){
    if(e.key === "ArrowUp" && velocityY != 1 ){
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.key === "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.key === "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
    else if(e.key === "ArrowRight" && velocityX != 1){
        velocityX = 1;
        velocityY = 0;
    }
    
}

controls.forEach(key => {
    key.addEventListener('click',function(){
        changeDirection({key : key.dataset.key});
    })
})


function playGame(){

    if(gameOver) return displayGameOver();
    let html = `<div class= "food" style= "grid-area: ${foodY} / ${foodX}"></div>`;
    
    if(snakeX === foodX && snakeY === foodY){
        changeFood();
        snakeBody.push([foodX , foodY]);
        score++;
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("highscore", highScore);
        scoreCount.innerHTML = `Score: ${score}`;
        highScoreCount.innerHTML = `High Score: ${highScore}`;
    }


    for( let i = snakeBody.length-1 ; i > 0 ; i--){
        snakeBody[i] = snakeBody[i - 1];
        
    }
 
    snakeBody[0] = [snakeX,snakeY];

    snakeX += velocityX;
    snakeY += velocityY;

    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30 ){
        gameOver = true;
    }

    for(let i = 0; i < snakeBody.length ; i++){
        html += `<div class= "head" style= "grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameOver = true; 
        }
    }
    gameborad.innerHTML = html;
}
changeFood();
setIntervalId= setInterval(playGame,150) ;

document.addEventListener('keydown',changeDirection)
