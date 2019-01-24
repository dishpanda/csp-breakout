/* Constants for bricks */
var NUM_ROWS = 15;
var BRICK_TOP_OFFSET = 10;
var BRICK_SPACING = 2;
var NUM_BRICKS_PER_ROW = 10;
var BRICK_HEIGHT = 10;
var SPACE_FOR_BRICKS = getWidth() - (NUM_BRICKS_PER_ROW + 1) * BRICK_SPACING;
var BRICK_WIDTH = SPACE_FOR_BRICKS / NUM_BRICKS_PER_ROW;

/* Global variables for bricks*/
var brick;
var rowCounter = 0;
var yCounter = rowCounter;
/* Constants for ball and paddle */
var PADDLE_WIDTH = 80;
var PADDLE_HEIGHT = 15;
var PADDLE_OFFSET = 10;

var BALL_RADIUS = 15;

function start(){
	multRows();
}

function multRows(){
    for(var i = 0; i <= NUM_ROWS - 1; i++){
        rowBuilder();
        rowCounter++;
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
