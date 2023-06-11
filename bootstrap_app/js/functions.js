function OnLoadResponse()
{
    add_toggle();
}

function add_toggle()
{
    if (window.innerWidth <= 576)
    {
        document.getElementById("fractions").setAttribute("data-bs-toggle", "dropdown");
        document.getElementById("characters").setAttribute("data-bs-toggle", "dropdown");
    }
}
