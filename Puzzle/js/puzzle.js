
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

    //setGameInfoStats?

    //empty name, g level/ resets moves, duration
    //secs, min, hrs, to 0;

    document.getElementsByTagName("form")[0].reset();
}

cancelPuzzlePlay()
{
    terminateGame("cancelled");

    document.getElementById("cancelBtn").disabled = true;
}

checkFormFilled()
{
    
}