

var util;
var pManager;
var mainGame;

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
        document.getElementById("winMove").play();

        document.getElementById("wrongMove").play();
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
        document.querySelector("#pName").readOnly = false;
        document.querySelector("#pDim").disabled = false;
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
            //enable and turn green
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

function PuzzleGame(puzzleWidth)
{
    this.puzzleWidth = puzzleWidth;
    this.puzzleBoard = [];
    this.goalState = [];

    //Creates the state that you want to get to at the end of the game
    this.createGoalState = function()
    {
        //Tile number is used to track which tile is being added
        var tileNumber = 1;
        for(var i = 0; i < this.puzzleWidth; i++)
        {
            var tempArray = [];
            for(var j = 0; j < this.puzzleWidth; j++)
            {
                tempArray.push(new Tile(i, j, tileNumber, (i * this.puzzleWidth) + j));
            }
            this.goalState.push(tempArray);
        }
        this.goalState[this.puzzleWidth - 1].push(new Tile(this.puzzleWidth, this.puzzleWidth, 0, (this.puzzleWidth * this.puzzleWidth) - 1));
    };

    //This is for setting the board structure for the game using random numbers
    this.createBoardStructure = function()
    {
        //Current tile tracks the tile the loop is on, usedNumbers tracks which numbers are used
        var currentTile = 0;
        var usedNumbers = [];
        for(var i = 0; i < this.puzzleWidth; i++)
        {
            var tempArray = [];
            for(var j = 0; j < this.puzzleWidth; j++)
            {
                var tempNum = util.generateRandomNumber(0 , (this.puzzleWidth * this.puzzleWidth) - 1);
                if(!usedNumbers.includes(tempNum))
                {
                    usedNumbers.push(tempNum);
                    tempArray.push(new Tile(i, j, tempNum, currentTile));
                    currentTile++;
                }
                else
                {
                    j--;
                }
            }
            this.puzzleBoard.push(tempArray);
            
        }
    };

    //This is for drawing the game on the div
    this.drawPuzzleBoard = function()
    {
        //Pretty much you have a div that you add all the created divs to
        var mainDiv = document.createElement('div');
        mainDiv.id = 'puzzleBoard';
        for(var i = 0; i < this.puzzleBoard.length; i++)
        {
            var rowDiv = document.createElement('div');
            rowDiv.classList.add("rowDiv");
            for(var j = 0; j < this.puzzleBoard[i].length; j++)
            {
                var createdTile = document.createElement('div');
                if(this.puzzleBoard[i][j].tileType != 0)
                {
                    createdTile.innerHTML = this.puzzleBoard[i][j].tileType;
                    createdTile.classList.add("filledTile");
                    createdTile.addEventListener("click", mainGame.processClickTile);
                }
                else
                {
                    createdTile.classList.add("emptyTile");
                }
                rowDiv.appendChild(createdTile);
            }
            mainDiv.appendChild(rowDiv);
        }

        document.getElementById('checkBoardId').innerHTML = '';
        document.getElementById('checkBoardId').appendChild(mainDiv);
    };

    //This is for swapping two tiles during the game
    this.swap2Tiles = function(indexTile1, indexTile2)
    {
        var column1;
        var row1;

        var column2;
        var row2;
        
        for(var i = 0; i < this.puzzleBoard.length; i++)
        {
            for(var j = 0; j < this.puzzleBoard[i].length; j++)
            {
                if(this.puzzleBoard[i][j].indexNumber == indexTile1)
                {
                    column1 = this.puzzleBoard[i][j].col;
                    row1 = this.puzzleBoard[i][j].row;
                }
                else if(this.puzzleBoard[i][j].indexNumber == indexTile2)
                {
                    column2 = this.puzzleBoard[i][j].col;
                    row2 = this.puzzleBoard[i][j].row;
                }
            }
        }
        

        var tempTile = this.puzzleBoard[row1][column1];
        this.puzzleBoard[row1][column1] = this.puzzleBoard[row2][column2];
        this.puzzleBoard[row1][column1].indexNumber = tempTile.indexNumber;

        tempTile.indexNumber = this.puzzleBoard[row2][column2].indexNumber;
        this.puzzleBoard[row2][column2] = tempTile;
    };

    //This is for seeing if two tile states match
    this.match2States = function(state1, state2)
    {
        var isSame = true;
        for(var i = 0; i < state1.length; i++)
        {
            for(var j = 0; j < state2.length; j++)
            {
                if(!(state1[i][j].tileType == state2[i][j].tileType))
                {
                    isSame = false;
                }
            }
        }
        return isSame;
    };

    //This is for getting the neighbouring indices array
    this.getNeighboursIndicesArr = function(arrayIndex)
    {
        var neighbouringTiles = [];
        if((arrayIndex - this.puzzleWidth) > -1)
        {
            neighbouringTiles.push((arrayIndex - this.puzzleWidth));
        }
        else
        {
            neighbouringTiles.push(-1);
        }

        if((arrayIndex + this.puzzleWidth) < (this.puzzleWidth * this.puzzleWidth))
        {
            neighbouringTiles.push((arrayIndex + this.puzzleWidth));
        }
        else
        {
            neighbouringTiles.push(-1);
        }
        
        if(((arrayIndex + 1) % this.puzzleWidth) < (this.puzzleWidth - 1))
        {
            neighbouringTiles.push(arrayIndex + 1);
        }
        else
        {
            neighbouringTiles.push(-1);
        }

        if(((arrayIndex - 1) % this.puzzleWidth) > -1)
        {
            neighbouringTiles.push(arrayIndex - 1);
        }
        else
        {
            neighbouringTiles.push(-1);
        }

        return neighbouringTiles;
    }

    this.processClickTile = function()
    {
        //This is for getting the arrayIndex of the clicked tile
        var value = event.currentTarget.innerHTML;
        var arrayIndex;
        for(var i = 0; i < mainGame.puzzleBoard.length; i++)
        {
            for(var j = 0; j < mainGame.puzzleBoard[i].length; j++)
            {
                if(mainGame.puzzleBoard[i][j].tileType == value)
                {
                    arrayIndex = mainGame.puzzleBoard[i][j].indexNumber;
                }
            }
        }


        var neighbouringTiles = mainGame.getNeighboursIndicesArr(arrayIndex);
        var switched = false;

        for(var i = 0; i < neighbouringTiles.length; i++)
        {
           if(neighbouringTiles[i].tileType == 0)
           {
               mainGame.swap2Tiles(arrayIndex, neighbouringTiles[i]);
               mainGame.drawPuzzleBoard();
               switched = true;
               break;
           }
        }

        if(!switched)
        {
            var beep = new Audio('./sounds/beep-07.mp3');
            beep.play();
        }
    }
}





function mainProgram()
{
    document.getElementById("pName").readOnly = true;
    document.getElementById("pDim").disabled = true;

    util.enableButton(document.getElementById("cancelBtn"), false, "red");
    mainGame = new PuzzleGame(parseInt((document.getElementById('pDim').value)));
    mainGame.createGoalState();
    mainGame.createBoardStructure();
    mainGame.drawPuzzleBoard();

    util.showChrono();
}


function init()
{
    util = new Utility();
    pManager = new PlayerManager(0, 0, 0);

    document.getElementById("pName").addEventListener('blur', util.checkFormFilled);
    document.getElementById("pDim").addEventListener('mouseup', util.checkFormFilled);
    document.getElementById("playBtn").addEventListener('click', mainProgram);
    document.getElementById("cancelBtn").addEventListener('click', util.cancelPuzzlePlay);
    document.getElementById('middleSection').addEventListener('click', util.showStats);
}


document.addEventListener('DOMContentLoaded', init);