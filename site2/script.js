let player = 1;
let enabled = true;
let AI_enable = false;
const area_name = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"];
let area_state = [0, 0, 0, 0, 0, 0, 0, 0, 0];
base_style = "border: 2px solid black; position: absolute;";

function load()
{
    for (let i = 0; i < area_name.length; i++) 
    {
        document.getElementById(area_name[i]).addEventListener(
            "click", 
            function() { onclick(i); }
            );
    }
}
function count()
{
    let full = 0;
    for (let i = 0; i < 9; i++)
    {
        if (area_state[i] != 0) full++;
    }
    return full;
}
function check_win()
{
    let winner = 0;
    let state = 0;
    let styles = "";

    for (let i = 0; i < 3; i++)
    {
        // Poziome
        state = area_state[i*3];
        if (state == area_state[i*3+1] && state == area_state[i*3+2] && state != 0)
        {
            winner = state;
            styles = "display: block; width: 40%; margin-top: "+(7+14*i)+"%; margin-left: 10%; margin-right: 10%;";
            break;
        }
        // Pionowe
        state = area_state[i];
        if (state == area_state[i+3] && state == area_state[i+6] && state != 0)
        {
            winner = state;
            styles = "display: block; width: 40%; transform: rotate(90deg); margin-top: 21%; margin-left: "+(-4+14*i)+"%;";
            break;
        }
    }
    for (let i = 2; i < 5; i+=2)
    {
        // Ukośne
        state = area_state[4];
        if (state == area_state[4-i] && state == area_state[4+i] && state != 0)
        {
            winner = state;
            if (i == 2) styles = "display: block; width: 55%; transform: rotate(-45deg); margin-top: 21.25%; margin-left: 2%;";
            else styles = "display: block; width: 55%; transform: rotate(45deg); margin-top: 20.5%; margin-left: 2%;";
            break;
        }
    }

    const full = count();
    if (full == 9 && winner == 0) winner = -1;

    if (winner != 0)
    {
        document.getElementsByClassName("line").item(0).style = base_style + styles;
    }

    return winner;
}
function onclick(id)
{
    if (!enabled || area_state[id] != 0) return;
    
    turn(id);
    if (enabled && AI_enable) AI();
}
function turn(id)
{
    let src = "none";
    area_state[id] = player;

    if(player == 1)
    {
        src = "<img src=\"circle.png\" alt=\"\"/>";
        document.getElementById("turaLabel").innerHTML = "Second player turn";
        player = 2;
    }
    else 
    {
        src="<img src=\"cross.png\" alt=\"\"/>";
        document.getElementById("turaLabel").innerHTML = "First player turn";
        player = 1;
    }
    document.getElementById(area_name[id]).innerHTML = src;

    const result = check_win();
    if (result != 0)
    {
        enabled = false;
    }
    if (result == 1)
    {
        document.getElementById("turaLabel").innerHTML="Player 1 won!";
    }
    if (result == 2)
    {
        document.getElementById("turaLabel").innerHTML="Player 2 won!";
    }
    if (result == -1)
    {
        document.getElementById("turaLabel").innerHTML="Draw!";
    }
}
function randomInt(max) 
{
    return Math.floor(Math.random() * max);
}
function findCorrect()
{
    correct = -1;
    for (let i = 0; i < 6; i++)
    {
        // Poziome
        k = i + Math.floor(i/2);
        if (area_state[k] == 1 && area_state[k+1] == 1 && area_state[k+2 - i%2*3] != 2)
        {
            if (i % 2 == 0) correct = k+2;
            else correct = k-1;
            break;
        }
        // Pionowe
        if (area_state[i] == 1 && area_state[i+3] == 1 && area_state[i+6 - Math.floor(i/3)*9] != 2)
        {
            if (i < 3) correct = i+6;
            else correct = i-3;
            break;
        }
    }

    return correct;
}
function AI()
{
    let i = findCorrect();

    if (i == -1)
    {
        rand = randomInt(9-count());
        
        let area = area_state[i];
        while (area != 0 || rand != 0)
        {
            if (area == 0) rand--;

            i++;
            area = area_state[i];
        }
    }

    turn(i);
}
function selectOne()
{
    AI_enable = true;
    document.getElementById("mode1").className = "selected";
    document.getElementById("mode2").className = "notselected";
}
function selectTwo()
{
    AI_enable = false;
    document.getElementById("mode1").className = "notselected";
    document.getElementById("mode2").className = "selected";
}
function restart()
{
    player = 1;
    document.head.childNodes
    area_state = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i<9; i++)
    {
        document.getElementById(area_name[i]).innerHTML = "";
    }
    document.getElementById("turaLabel").innerHTML = "First player turn";
    document.getElementsByClassName("line").item(0).style = base_style + "display: none;";
    enabled = true;
}