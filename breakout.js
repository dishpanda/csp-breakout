/* Constants for bricks */
var NUM_ROWS = 8;
var BRICK_TOP_OFFSET = 10;
var BRICK_SPACING = 2;
var NUM_BRICKS_PER_ROW = 10;
var BRICK_HEIGHT = 10;
var SPACE_FOR_BRICKS = getWidth() - (NUM_BRICKS_PER_ROW + 1) * BRICK_SPACING;
var BRICK_WIDTH = SPACE_FOR_BRICKS / NUM_BRICKS_PER_ROW;

/* Constants for positioning */
var WIDTH = getWidth();
var HEIGHT = getHeight();
var CENTER_X = WIDTH/2;
var CENTER_Y = HEIGHT/2;

/* Global variables for bricks */
var brick;
var rowCounter = 0;
var yCounter = rowCounter;

/* Constants for ball and paddle */
var paddle;
var PADDLE_WIDTH = 80;
var PADDLE_HEIGHT = 15;
var PADDLE_OFFSET = 10;
var ball;
var BALL_RADIUS = 15;

/* Constants for movement */
var DELAY = 20;
var dx = 4;
var dy = 4;

/* Constants for win/loss check */
var lives = 3;
var brickCounter = 0;
/*******************************************************************************
 * BEGIN CODE
 *******************************************************************************/
 
function start(){
	multRows();
	drawPaddle();
	mouseMoveMethod(movePaddle);
	drawBall();
	mouseClickMethod(startBall);
}

/*******************************************************************************
 * CODE THAT MAKES BALL
 *******************************************************************************/

function drawBall(){
    ball = new Circle(BALL_RADIUS);
    ball.setPosition(CENTER_X, CENTER_Y);
    add(ball);
}

/*******************************************************************************
 * CODE THAT MAKES BALL MOVE AND BOUNCE
 *******************************************************************************/

function startBall(){
	setTimer(moveBall, DELAY);
}

function moveBall(){
    bounce();
    ball.move(dx, dy);
}

function bounce(){
    var x = ball.getX();
    var y = ball.getY();
    var rad = ball.getRadius();
    
    var brickElem = getElementAt(x, y - rad);
    var pad = getElementAt(x, y + rad);
    
    if(x + rad > WIDTH){
        dx = -dx;
    }
    if(x - rad < 0){
        dx = -dx;
    }
    if(y + rad > HEIGHT){
        checkLives();
    }
    if(y - rad < 0){
        dy = -dy;
    }
    checkBrick(brickElem);
    checkPaddle(pad);
}

/*******************************************************************************
 * CODE THAT HANDLES BRICK REMOVAL AND PADDLE BOUNCING BEHAVIOUR
 *******************************************************************************/

function checkBrick(brickElem){
    if(brickElem != null){
        remove(brickElem);
        dy = -dy;
        brickCounter --;
        checkNumBricks();
    }
}

function checkPaddle(pad){
    if(pad != null){
        dy = -dy;
    }
}

/*******************************************************************************
 * CODE THAT CHECKS WIN OR LOSS
 *******************************************************************************/
 
function checkLives(){
    lives--;
    if(lives <= 0){
        stopTimer(moveBall);
        remove(ball);
        var txt = new Text("You lost.", "30pt Arial");
        txt.setPosition(CENTER_X - txt.getWidth()/2, CENTER_Y);
        txt.setColor(Color.red);
        add(txt);
    } else {
        stopTimer(moveBall);
        remove(ball);
        drawBall();
    }
}
function checkNumBricks(){
    if(brickCounter == 0){
        stopTimer(moveBall);
        remove(ball);
        var txt = new Text("You won!", "30pt Arial");
        txt.setPosition(CENTER_X - txt.getWidth()/2, CENTER_Y);
        txt.setColor(Color.green);
        add(txt);        
    }
}

/*******************************************************************************
 * CODE THAT MAKES PADDLE
 *******************************************************************************/

function drawPaddle(){
    paddle = new Rectangle(PADDLE_WIDTH, PADDLE_HEIGHT);
    paddle.setPosition(CENTER_X - PADDLE_WIDTH/2, HEIGHT - (2 * PADDLE_OFFSET));
    add(paddle);
}

/*******************************************************************************
 * CODE THAT MAKES PADDLE MOVE
 *******************************************************************************/

function movePaddle(e){
    var x = e.getX();
    if(x <= PADDLE_WIDTH/2){
        paddle.setPosition(0, HEIGHT - (2 * PADDLE_OFFSET));
    } else if (x >= WIDTH - (PADDLE_WIDTH/2)){
        paddle.setPosition(WIDTH - PADDLE_WIDTH, HEIGHT - (2 * PADDLE_OFFSET));
    } else {
        paddle.setPosition(x - PADDLE_WIDTH/2, HEIGHT - (2 * PADDLE_OFFSET));
    }
    add(paddle);
}

/*******************************************************************************
 * CODE THAT MAKES BRICKS
 *******************************************************************************/
 
function multRows(){
    for(var i = 0; i <= NUM_ROWS - 1; i++){
        rowBuilder();
        rowCounter ++;
        yCounter ++;
    }
}

function rowBuilder(){
    for(var i = 0; i < NUM_BRICKS_PER_ROW; i++){
        var x = BRICK_SPACING + (BRICK_SPACING * i) + (BRICK_WIDTH * i);
        var y = BRICK_TOP_OFFSET + (BRICK_HEIGHT * yCounter) + (BRICK_SPACING * yCounter);
        brick = new Rectangle(BRICK_WIDTH, BRICK_HEIGHT);
        brick.setPosition(x, y);
        brick.setColor(colorSwitch());
        add(brick);
        brickCounter ++;
    }
}

function colorSwitch(){
    if(rowCounter == 0 || rowCounter == 1){
        return Color.red;
    } else if(rowCounter == 2 || rowCounter == 3){
        return Color.orange;
    } else if(rowCounter == 4 || rowCounter == 5){
        return Color.green;
    } else if(rowCounter == 6 || rowCounter == 7){
        return Color.blue;
    } else{
        rowCounter = 0;
        return Color.red;
    }
}
