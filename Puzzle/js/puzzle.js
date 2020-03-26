

var util;
var pManager;

//timer variable
var t;

//original disalbed btn text color
var btnTxtClr = document.getElementById("playBtn").style.color;

//Method increments timer
function startTimer()
{

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
    //generates a random number within a specified range
    this.generateRandomNumber = function(minValue, maxValue)
    {
        var randNum = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
        return randNum;
    };

    //plays the audio based on a win or a wrong move
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


    //terminates the game
    this.terminateGame = function(theStatus)
    {
        clearInterval(t);
        pManager.storeGameStats(theStatus);
    
        document.getElementsByTagName("form")[0].reset();

        util.enableButton(document.querySelector("#playBtn"), true, "#F0F0F0");
        util.enableButton(document.querySelector("#cancelBtn"), true, "#F0F0F0");
    };


    //Starts the process of terminating the game
    this.cancelPuzzlePlay = function()
    {
        util.terminateGame("cancelled");
    };


    //Enables or disables a button, and changes
    //its colour based off of it
    this.enableButton = function (btnId, theStatus, btnClass)
    {
        
        btnId.disabled = theStatus;
        btnId.style.backgroundColor = btnClass;

        if (theStatus == false)
        {
        btnId.style.color = "white";
        }
        else
        {
            btnId.style.color = btnTxtClr;
        }
    };


    //checks authentication if both aspects
    //of the form have been completed
    this.checkFormFilled = function()
    {
        var usr = document.getElementById("pName");
        var list = document.getElementById("pDim");
        var playButton = document.getElementById("playBtn");

    
        if (usr.value == "" || list.selectedIndex == 0)
        { 
            //disable and turn button grey
           util.enableButton(playButton, true, "#F0F0F0");
           
        }
        else
        {
            util.enableButton(playButton, false, "#49E20E");
        }
    };


    //Reveils the timer
    this.showChrono = function()
    {
        util.initTime();
        t = setInterval(startTimer, 1000);
    };


    this.showStats = function()
    {
        //Not the actual functionality
        //Test purposes only
        for (i = 0; i < pManager.listPlayers.length; i++)
        {
            console.log(pManager.listPlayers[i].name);
            console.log(pManager.listPlayers[i].dimension);
            console.log(pManager.listPlayers[i].duration);
            console.log(pManager.listPlayers[i].moves);
        }
    };


    //initializes timer to zero
    this.initTime = function()
    {
        document.getElementById("input2").value = 0;
        document.getElementById("input3").value = 0;
        document.getElementById("input4").value = 0;
    };
}



//Player object
function Player(name, dimension, moves, duration, theStatus)
{
    this.name = name;
    this.dimension = dimension;
    this.moves = moves;
    this.duration = duration;
    this.theStatus = theStatus;
}




//Player Manager object
function PlayerManager(gameCounter, gameDuration, nberMoves)
{
    this.listPlayers = [];
    this.gameCounter = gameCounter;
    this.gameDuration = gameDuration;
    this.nberMoves = nberMoves;

    this.storeGameStats = function(theStatus)
    {
        let name = document.querySelector("#pName").value;
        let dimension = document.querySelector("#pDim").value;
        let duration = (parseInt(document.querySelector("#input2").value) + (parseInt(document.querySelector("#input3").value) * 60));
        let moves = document.querySelector("#input1").value;

        let p = new Player(name, dimension, moves, duration, theStatus);

        this.gameCounter++;
        this.gameDuration = duration;
        this.nberMoves = moves;
        this.listPlayers.push(p);
    }
}



//Tile Object Constructor
function Tile(row, col, tileType, indexNumber)
{
    this.row = row;
    this.col = col;
    this.tileType = tileType;
    this.indexNumber = indexNumber;
}
//PuzzleGame Object Constructor

function PuzzleGame()
{
    this.puzzleWidth;
    this.puzzleBoard = [];
    this.goalState = [];
    this.createGoalState = function()
    {
        for(var i = 1; i < (this.puzzleWidth * this.puzzleWidth) - 1; i++)
        {
            this.goalState.push(i);
        }
        this.goalState.push(0);
    };

    //This is for setting the board structure for the game using random numbers
    this.createBoardStructure = function()
    {
        for(var i = 0; i < (this.puzzleWidth * this.puzzleWidth); i++)
        {
            var tempNum = utility.generateRandomNumber(0 , (this.puzzleWidth * this.puzzleWidth) - 1);
            if(!puzzleBoard.contains(tempNum))
            {
                this.puzzleBoard.push(tempNum);
            }
            else
            {
                i--;
            }
        }
    };

    //This is for drawing the game on the div


    //This is for swapping two tiles during the game
    this.swap2Tiles = function(indexTile1, indexTile2)
    {
        var tempTile = this.puzzleBoard(indexTile1);
        this.puzzleBoard(indexTile1) = this.puzzleBoard(indexTile2);
        this.puzzleBoard(indexTile2) = tempTile;
    };

    //This is for seeing if two tile states match
    this.match2States = function(state1, state2)
    {
        var isSame = true;
        for(var i = 0; i < state1.length; i++)
        {
            if(!(state1[i].indexNumber == state2[i].indexNumber))
            {
                isSame = false;
            }
        }
        return isSame;
    };

    //This is for getting the neighbouring indices array
    this.getNeighboursIndicesArr = function(arrayIndices)
    {
        var neighbouringTiles = [];
        //if(neighbouring )
    }
}






function test()
{
    document.querySelector('h1').innerHTML = "test reached";
}



function mainProgram()
{
    util.enableButton(document.getElementById("cancelBtn"), false, "red");
    util.showChrono();
}


function init()
{
    util = new Utility();
    pManager = new PlayerManager(0, 0, 0);
    //pManager = new PlayerManager(0, 0, 0);
    document.getElementById("pName").addEventListener('blur', util.checkFormFilled);
    document.getElementById("pDim").addEventListener('mouseup', util.checkFormFilled);
    document.getElementById("playBtn").addEventListener('click', mainProgram);
    document.getElementById("cancelBtn").addEventListener('click', util.cancelPuzzlePlay);
    document.getElementById('middleSection').addEventListener('click', util.showStats)
}


document.addEventListener('DOMContentLoaded', init);