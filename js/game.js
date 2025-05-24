const firstName = prompt('Please enter your first name:');
let score = 0;
let timeLeft = 30;
let imgID = 0; //counter variable to assign image ID's

window.addEventListener('load', (event) =>{
    const welcome = document.getElementById("welcome");
    welcome.textContent = `Welcome to the game, ${firstName}!`;	
});

//generates random value from gamespace width
function getRandomX() {
    width = $("#gamespace").width() - 60;
    random = Math.floor(Math.random() * width);
    return random;
}

//generates random value from gamespace height
function getRandomY() {
    height = $("#gamespace").height() - 68.5;
    random = Math.floor(Math.random() * height);
    return random;
}

function incrementScore() {
    score = ++score;
    $("#score").html(`${score} pts`);
}

//resets game functions
function gameReset() {
    timeLeft = 30;
    score = 0;
    count = 0;
    $("#score").html(`${score} pts`);
    $(".timer").html(`${timeLeft} seconds left`);
}

function decrementTimer() {
    const gameTimer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            $(".timer").html(`${timeLeft} seconds left`);
        } else {
            clearInterval(gameTimer);
            $(".timer").html("Time's up!");
            $("#gamespace").empty(); //clears gamespace
            alert(`You scored ${score} points!`);
            $("#start_button").prop('disabled', false); //re-enables start button

        }
    }, 1000);
}

//adds mole images at random locations and random intervals
function addImage() {
    if (timeLeft > 0) {
        let xPos = getRandomX();
        let yPos = getRandomY();
        let randomInterval = Math.floor(Math.random() * 2001);
        
        imgInterval = setTimeout(() => {
            $("#gamespace").append(`<img id="img${imgID}" class="mole" src="img/mole.png" style="left: ${xPos}px; top: ${yPos}px;">`);
            imgID++;
            addImage();
        }, randomInterval);	
    } else {
        clearTimeout(imgInterval);
    }
}

//removes mole images at random intervals
function removeImage() {
    if (timeLeft > 0) {
        let randomMole = Math.floor(Math.random() * imgID);
        let randomInterval = Math.random() * 2001;
        let moleId = `#img${randomMole}`;

        setTimeout(() => {
            $(moleId).remove();
            removeImage();
        }, randomInterval);
    } else {
        clearTimeout(imgInterval);
    }
}

function gameStart() {
    gameReset();
    decrementTimer();
    addImage();
    removeImage();
}

$(document).ready(function(){
    $(".timer").css("display", "block"); 
    $("#start_button").click(function(){
        gameStart();
        $(this).prop('disabled', true);
    });
    $("#start_button").css({"padding": "10px 20px", "font-size": "1.2em", "background-color": "#4caf50"});
    $("#gamespace").on("click", ".mole", function() {
        incrementScore();
        $(this).remove();
    });
    $("footer").load("load.html")
});
