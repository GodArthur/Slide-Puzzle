
document.getElementById("info").addEventListener('click', switchTabs);
document.getElementById("stats").addEventListener('click', switchTabs);

function switchTabs()
{
    

    if (this.id == 'stats')
    {
        this.style.backgroundColor = 'gainsboro';
        document.querySelector('#info').style.backgroundColor = 'white';

        document.querySelector('#playerInfo').style.display = 'none';
        document.querySelector('#gameStats').style.display = 'block';
    }
    else
    {
        this.style.backgroundColor = 'gainsboro';
        document.querySelector('#stats').style.backgroundColor = 'white';

        document.querySelector('#gameStats').style.display = 'none';
        document.querySelector('#playerInfo').style.display = 'block';
    }
}
