
function generateRandomNumber(minValue, maxValue)
{
    var randNum = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    return randNum;
}

function playAudio()
{
    //plays audio based on an unfully understood condition
}

/*not sure about this code 100%*/
function sampleEasyBoardTests()
{
    if (puzzleWidth == 3)
    {
        return new Array[[1,2,3], [4,0,6], [7,5,8]];
    }
}


function terminateGame(theStatus)
{
    clearInterval(chrono);

    //setGameInfoStats? <= not sure what this is

    //empty name, g level/ resets moves, duration
    //secs, min, hrs, to 0;

    document.getElementsByTagName("form")[0].reset();
}


function cancelPuzzlePlay()
{
    terminateGame("cancelled");

    document.getElementById("cancelBtn").disabled = true;
}


function checkFormFilled()
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
}


function showChrono()
{

}

function enableButton(btnId, theStatus, btnClass)
{
    btnId.style.backgroundColor = btnClass;
    btnId.disabled = theStatus;
    
}

function Utility()
{
    this.generateRandomNumber = generateRandomNumber;
    this.playAudio = playAudio;
    this.sampleEasyBoardTests = sampleEasyBoardTests;
    this.terminateGame = terminateGame;
    this.cancelPuzzlePlay = cancelPuzzlePlay;
    this.checkFormFilled = checkFormFilled;
    this.enableButton = enableButton;
    this.showChrono = showChrono;
    this.showStats = showStats;
}



function storeGameStats(theStatus)
{

}

function PlayerManager(listPlayers, gameCounter, gameDuration, nberMoves)
{
    this.listPlayers = listPlayers;
    this.gameCounter = gameCounter;
    this.gameDuration = gameDuration;
    this.nberMoves = nberMoves;
}


