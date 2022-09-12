
// variables
var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

//start when keyboard clicked
$("body").keydown(function (){
    if(!started){
        $("#level-title").text("Level"+level);
    nextSequence();
    started = true;
    }
});

// when clicked
$(".btn").click(function (){

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor); 

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});

//  to check answer
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Success");

        if(userClickedPattern.length === gamePattern.length){

            setTimeout(function (){
                nextSequence();
            }, 1000);
        }

    }else{
        console.log("Wrong");
        wrong();
        startOver();
    }
}

// when answer is wrong
function wrong (){
    $("#level-title").text("Game Over, Press Any Key To Restart");
    $("body").addClass("game-over");
    setTimeout(function (){
        $("body").removeClass("game-over");
    },200);
    playSound("wrong");
}

// to restart game
function startOver (){
    level = 0;
    gamePattern = [];
    started = false;
}

// random game sequence
function nextSequence(){

    userClickedPattern = [];

    level++;
    $("#level-title").text("level "+level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}


// sound
function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

// button animation
function animatePress(currentColor){
   
    $("#"+currentColor).addClass("pressed");

    setTimeout(function (){
        $("#"+currentColor).removeClass("pressed");
    },100);
}



