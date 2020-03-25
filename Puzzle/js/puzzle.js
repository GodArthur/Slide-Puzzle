
var util;
var pManager;

function startTimer()
{

    document.querySelector('h1').innerHTML = "Bro";
    let sec = document.getElementById("input2").value;
    let min = document.getElementById("input3").value;
    let hr = document.getElementById("input4").value;

    sec++;

    if (sec > 59)
    {
        min ++;
        sec = 0;
    }
    
    if (min > 59)
    {
        hr++;
        min = 0;
    }

    document.getElementById("input2").value = sec;
    document.getElementById("input3").value = min;
    document.getElementById("input4").value = hr; 
}




//utility object
function Utility()
{
    this.generateRandomNumber = function(minValue, maxValue)
    {
        var randNum = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
        console.log(randNum);
        return randNum;
    };


    this.playAudio = function()
    {
        //plays audio based on an unfully understood condition
    };


    this.sampleEasyBoardTests = function()
    {
        if (puzzleWidth == 3)
        {
            return new Array[[1,2,3], [4,0,6], [7,5,8]];
        }
    };


    this.terminateGame = function(theStatus)
    {
        clearInterval(showChrono);
        storeGameStats(theStatus)
    
        
    
        //empty name, g level/ resets moves, duration
        //secs, min, hrs, to 0;
    
        document.getElementsByTagName("form")[0].reset();
    };


    this.cancelPuzzlePlay = function()
    {
        terminateGame("cancelled");
    
        document.getElementById("cancelBtn").disabled = true;
    };

    this.enableButton = function (btnId, theStatus, btnClass)
    {
        
        btnId.disabled = theStatus;
        btnId.style.backgroundColor = btnClass;
        btnId.style.color = "white";
    };


    this.checkFormFilled = function()
    {
        
        

        var usr = document.getElementById("pName");
        var list = document.getElementById("pDim");
        var playButton = document.getElementById("playBtn");

    
        if (usr.value == "" || list.selectedIndex == 0)
        {
            document.querySelector('h1').innerHTML = "reached"; 
            //disable and turn button grey
           util.enableButton(playButton, true, "gray");
           
        }
        else
        {
            util.enableButton(playButton, false, "#49E20E");
        }
    };


   

    this.showChrono = function()
    {
        util.initTime();
        var myVar = setInterval(startTimer, 1000);
    };

    this.test = function ()
    {
        document.querySelector('h1').innerHTML = "IT WORKS";
    }


    this.showStats = 0;

    this.initTime = function()
    {
        document.getElementById("input2").value = 0;
        document.getElementById("input3").value = 0;
        document.getElementById("input4").value = 0;
    };
}


//Player object
function Player(name, dimension, nberMoves, gameduration)
{
    //this
}




//Player manager stuff
function storeGameStats(theStatus)
{

}


function PlayerManager(gameCounter, gameDuration, nberMoves)
{
    this.listPlayers = [];
    this.gameCounter = gameCounter;
    this.gameDuration = gameDuration;
    this.nberMoves = nberMoves;
}


function mainProgram()
{
    util.enableButton(document.getElementById("cancelBtn"), false, "red");
    util.showChrono();
}


function init()
{
    util = new Utility();
    //document.querySelector('h1').innerHTML = "BYE";
    //pManager = new PlayerManager(0, 0, 0);
    document.getElementById("pName").addEventListener('blur', util.checkFormFilled);
    document.getElementById("pDim").addEventListener('mouseup', util.checkFormFilled);
    document.getElementById("playBtn").addEventListener('click', mainProgram);
    //document.getElementById("cancelBtn").addEventListener("click", utility.cancelPuzzlePlay);
}


document.addEventListener('DOMContentLoaded', init);


