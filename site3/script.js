function openimg(img_info)
{
    let window = document.getElementById("window");

    window.style = "display: block;";

    window = window.children[0];

    let imgtitle = window.children[0].children[0];
    imgtitle.innerHTML = img_info.title;

    let image = window.children[1];
    image.src = img_info.src;
    image.alt = img_info.alt;
}
function closeimg()
{
    document.getElementById("window").style = "display: none;";
}