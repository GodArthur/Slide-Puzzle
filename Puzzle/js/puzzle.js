
//Utilities
var listPlayerArr = [];


startTimer()
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
    else
    {
        sec++;
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
    this.generateRandomNumber = function (minValue, maxValue)
    {
        var randNum = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
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


    this.checkFormFilled = function()
    {
        var usr = document.getElementById("pName");
        var list = document.getElementById("pDim");
        var playButton = document.getElementById("playBtn")
    
        if (usr.value.Length == 0 || list.selectedIndex == 0)
        {
            //disable and turn button grey
            enableButton(playButton, true, "d3d3d3");
        }
        else
        {
            enableButton(playButton, false, "green");
        }
    };


    this.enableButton = function enableButton(btnId, theStatus, btnClass)
    {
        btnId.style.backgroundColor = btnClass;
        btnId.disabled = theStatus;
    };


    this.showChrono = function()
    {
        var myVar = setInterval(setTimer, 1000);
    };


    this.showStats = showStats;

    this.initTime = initTime()
    {
        document.getElementById("input2").value = 0;
        document.getElementById("input3").value = 0;
        document.getElementById("input4").value = 0;
    };
}



//Player object
function Player(name, dimension, nberMoves, gameduration)
{
    this
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


var utility;

function init()
{
    utility = new Utility();
    var pManager = new PlayerManager(0, 0, 0);
    document.getElementById("pName").addEventListener('onBlur', checkFormFilled);
    document.getElementById("pDim").addEventListener('onBlur', checkFormFilled);
    document.getElementById("playBtn").addEventListener('onClick', mainProgram);
}


document.addEventListener('DOMContentLoaded', init);



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
        if(neighbouring )
    }
}


