

var util;
var pManager;
var mainGame;
var numMoves;

//timer variable
var t;

//original disabled btn text color
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
    this.playAudio = function(condition)
    {
        if(condition)
        {
            document.getElementById("winMove").play();
        }
        else
        {
            document.getElementById("wrongMove").play();
        }

        //plays audio based on an unfully understood condition
    };


    this.sampleEasyBoardTests = function(puzzleWidth)
    {
        if (puzzleWidth == 3)
        {
            return [[1,2,3], [4,0,6], [7,5,8]];
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

        util.showStats(theStatus);
    };


    //Starts the process of terminating the game
    this.cancelPuzzlePlay = function()
    {
        util.terminateGame("cancelled");
        document.getElementById("checkBoardId").innerHTML = '';
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
        document.getElementById('gameStats').innerHTML = '';
        //Not the actual functionality
        //Test purposes only
        var table = document.createElement('table');
        table.id = 'tableStats';
        caption = table.createCaption();
        caption.innerHTML = 'Player Stats';

        var hRow = table.insertRow(-1);
        hRow.classList.add('hRow');

        var index = document.createElement('th');
        index.innerText = '#';
        hRow.appendChild(index);

        var name = document.createElement('th');
        name.innerText = 'Name';
        hRow.appendChild(name);

        var dim = document.createElement('th');
        dim.innerText = 'Dim';
        hRow.appendChild(dim);

        var status = document.createElement('th');
        status.innerText = 'Status';
        hRow.appendChild(status);

        let moves = document.createElement('th');
        moves.innerText = 'Moves';
        hRow.appendChild(moves);

        var duration = document.createElement('th');
        duration.innerText = 'Dur(s)';
        hRow.appendChild(duration);
        document.getElementById('gameStats').append(table);

        for(var i = 0; i < pManager.listPlayers.length; i++)
        {
            var dRow = table.insertRow(-1);
            dRow.classList.add('dRow');

            var tIndex = document.createElement('td');
            tIndex.innerText = i;
            dRow.appendChild(tIndex);

            var tName = document.createElement('td');
            tName.innerText = pManager.listPlayers[i].name;
            dRow.appendChild(tName);

            var tDim = document.createElement('td');
            tDim.innerText = pManager.listPlayers[i].dimension;
            dRow.appendChild(tDim);

            var tStatus = document.createElement('td');
            tStatus.innerText = pManager.listPlayers[i].theStatus;
            dRow.appendChild(tStatus);

            var tMoves = document.createElement('td');
            tMoves.innerText = pManager.listPlayers[i].moves;
            dRow.appendChild(tMoves);

            var tDur = document.createElement('td');
            tDur.innerText = pManager.listPlayers[i].duration;
            dRow.appendChild(tDur);
        }

        /*
        for (i = 0; i < pManager.listPlayers.length; i++)
        {
            console.log(pManager.listPlayers[i].name);
            console.log(pManager.listPlayers[i].dimension);
            console.log(pManager.listPlayers[i].duration);
            console.log(pManager.listPlayers[i].moves);
        }
        */
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
        util.showStats();
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
                if(tileNumber == (this.puzzleWidth * this.puzzleWidth))
                {
                    tempArray.push(new Tile(this.puzzleWidth, this.puzzleWidth, 0, (this.puzzleWidth * this.puzzleWidth) - 1));
                }
                else
                {
                    tempArray.push(new Tile(i, j, tileNumber, (i * this.puzzleWidth) + j));
                    tileNumber++;
                }

            }
            this.goalState.push(tempArray);
        }
       
        
       
    };

    //This is for setting the board structure for the game using random numbers
    this.createBoardStructure = function()
    {
        //This is the functioning board Structure
        
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
        /*
       //For testing purposes only
       var testArray = util.sampleEasyBoardTests(3);
       var indexFlag = 0;
       for(var i = 0; i < this.puzzleWidth; i++)
       {
           var tempArray = [];
           for(var j = 0; j < this.puzzleWidth; j++)
           {
               tempArray.push(new Tile(i, j, testArray[i][j], indexFlag));
               indexFlag++;
           }
           this.puzzleBoard.push(tempArray);
       }
       */
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
                createdTile.style.width = (100 / this.puzzleWidth) + "%";
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
        this.puzzleBoard[row1][column1].indexNumber = indexTile1;
        this.puzzleBoard[row1][column1].row = row1;
        this.puzzleBoard[row1][column1].col = column1;

        this.puzzleBoard[row2][column2] = tempTile;
        this.puzzleBoard[row2][column2].row = row2;
        this.puzzleBoard[row2][column2].col = column2;
        this.puzzleBoard[row2][column2].indexNumber = indexTile2;
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

        //Top tile
        if((arrayIndex - this.puzzleWidth) > -1)
        {
            neighbouringTiles.push((arrayIndex - this.puzzleWidth));
        }
        else
        {
            neighbouringTiles.push(-1);
        }

        //Bottom Tile
        if((arrayIndex + this.puzzleWidth) < (this.puzzleWidth * this.puzzleWidth))
        {
            neighbouringTiles.push((arrayIndex + this.puzzleWidth));
        }
        else
        {
            neighbouringTiles.push(-1);
        }
        
        //Right Tile
        if(((arrayIndex + 1) % this.puzzleWidth) > 0)
        {
            neighbouringTiles.push(arrayIndex + 1);
        }
        else
        {
            neighbouringTiles.push(-1);
        }

        //Left Tile
        if(((arrayIndex - 1) % this.puzzleWidth) < (this.puzzleWidth - 1))
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

        //Basically you go through the neighbours array and then find the corresponding index in the 2D puzzleBoard array
        for(var i = 0; i < neighbouringTiles.length; i++)
        {
            for(var j = 0; j < mainGame.puzzleBoard.length; j++)
            {
                for(var k = 0; k < mainGame.puzzleBoard[j].length; k++)
                {
                    if((neighbouringTiles[i] == mainGame.puzzleBoard[j][k].indexNumber) && (mainGame.puzzleBoard[j][k].tileType == 0))
                    {
                        numMoves++;
                        document.getElementById('input1').value = numMoves;
                        mainGame.swap2Tiles(arrayIndex, neighbouringTiles[i]);
                        mainGame.drawPuzzleBoard();
                        switched = true;
                        //END GAME CONDITION
                        if(mainGame.match2States(mainGame.goalState, mainGame.puzzleBoard))
                        {
                            util.playAudio(true);
                            document.getElementById("checkBoardId").innerHTML = '';
                            util.terminateGame("Success");
                        }
                        return;
                    }
                }
            }
        }

        if(!switched)
        {
            util.playAudio(false);
        }
    }

}





function mainProgram()
{
    document.getElementById("pName").readOnly = true;
    document.getElementById("pDim").disabled = true;
    document.getElementById("input1").value = 0;

    document.getElementById("playBtn").disabled = true;

    util.enableButton(document.getElementById("cancelBtn"), false, "red");
    mainGame = new PuzzleGame(parseInt((document.getElementById('pDim').value)));
    mainGame.createGoalState();
    mainGame.createBoardStructure();
    mainGame.drawPuzzleBoard();

    util.showChrono();
    numMoves = 0;
}


function init()
{
    util = new Utility();
    pManager = new PlayerManager(-1, 0, 0);

    document.getElementById("pName").addEventListener('blur', util.checkFormFilled);
    document.getElementById("pDim").addEventListener('mouseup', util.checkFormFilled);
    document.getElementById("playBtn").addEventListener('click', mainProgram);
    document.getElementById("cancelBtn").addEventListener('click', util.cancelPuzzlePlay);
    //document.getElementById('middleSection').addEventListener('click', util.showStats);
}


document.addEventListener('DOMContentLoaded', init);