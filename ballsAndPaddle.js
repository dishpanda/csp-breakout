/* Constants for bricks */
var NUM_ROWS = 8;
var BRICK_TOP_OFFSET = 10;
var BRICK_SPACING = 2;
var NUM_BRICKS_PER_ROW = 10;
var BRICK_HEIGHT = 10;
var SPACE_FOR_BRICKS = getWidth() - (NUM_BRICKS_PER_ROW + 1) * BRICK_SPACING;
var BRICK_WIDTH = SPACE_FOR_BRICKS / NUM_BRICKS_PER_ROW;

/* Constants for positioning*/
var CENTER_X = getWidth()/2;
var CENTER_Y = getHeight()/2;

/* Constants for ball and paddle */
var paddle;
var PADDLE_WIDTH = 80;
var PADDLE_HEIGHT = 15;
var PADDLE_OFFSET = 10;
var ball;
var BALL_RADIUS = 15;

/* Constants for moving*/
var DELAY = 20;
var dx = 4;
var dy = 4;

function start(){
    drawPaddle();
    mouseMoveMethod(movePaddle);
    drawBall();
    setTimer(moveBall, DELAY);
}

function drawBall(){
    ball = new Circle(BALL_RADIUS);
	ball.setPosition(CENTER_X, CENTER_Y);
	add(ball);
}

function drawPaddle(){
    paddle = new Rectangle(PADDLE_WIDTH, PADDLE_HEIGHT);
	paddle.setPosition(CENTER_X - PADDLE_WIDTH/2, getHeight() - (2 * PADDLE_OFFSET));
	add(paddle);
}

function moveBall(){
    checkWalls();
    ball.move(dx, dy);
}

function movePaddle(e){
    var x = e.getX();
    if(x <= PADDLE_WIDTH/2){
        paddle.setPosition(0, getHeight() - (2 * PADDLE_OFFSET));
    } else if(x >= getWidth() - (PADDLE_WIDTH/2)){
        paddle.setPosition(getWidth() - PADDLE_WIDTH, getHeight() - (2 * PADDLE_OFFSET));
    } else {
        paddle.setPosition(x - PADDLE_WIDTH/2, getHeight() - (2 * PADDLE_OFFSET));
    }
    add(paddle);
}

function checkWalls(){
    if(ball.getX() + BALL_RADIUS > getWidth()){
        dx = -dx;
    }
    
    if(ball.getX() - BALL_RADIUS < 0){
        dx = -dx;
    }
    
    if(ball.getY() + BALL_RADIUS > getHeight()){
        dy = -dy;
    }
    
    if(ball.getY() - BALL_RADIUS < 0){
        dy = -dy;
    }
}
