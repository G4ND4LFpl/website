function OnLoadResponse()
{
    add_toggle();
}
function changeLang()
{
    var val = document.getElementById("lang_selection_form").value;
    var data;

    switch(val)
    {
        case "1":
            {
                data = fetch("lang/pl.json").then(response => response.json())
                break;
            }
        case "2":
            {
                data = fetch("lang/en.json").then(response => response.json())
                break;
            }
        /*case "3":
            {
                let data = fetch("es.json")
                break;
            } */
        default:
            {
                data = fetch("lang/pl.json").then(response => response.json())
            }
    }

    console.log(data);
}

function add_toggle()
{
    if (window.innerWidth <= 576)
    {
        document.getElementById("fractions").setAttribute("data-bs-toggle", "dropdown");
        document.getElementById("characters").setAttribute("data-bs-toggle", "dropdown");
        document.getElementById("vehicles").setAttribute("data-bs-toggle", "dropdown");
        document.getElementById("worlds").setAttribute("data-bs-toggle", "dropdown");
    }
}
