window.onload = (event) =>{sizeFonts();};
onresize = (event) => {sizeFonts();};

//setting the Fonts of the Cells and the Buttons depending on the sizes
function sizeFonts(){
    //getting all Cells
    const cells = document.getElementsByClassName("cell");
    //getting all letter Buttons
    const letters = document.getElementsByClassName("letter");

    //setting font-Size for each cell
    Array.from(cells).forEach(cell => {
        cell.setAttribute("style","font-Size:"+String(cell.offsetWidth*2/3)+"px;");
    });

    //setting font-Size for each letter Button
    Array.from(letters).forEach(letter => {
        letter.setAttribute("style","font-Size:"+String(letter.offsetWidth*1/3)+"px;");
    });
}

function addLetter(char){
    //getting the cell that is currently active
    const current = document.getElementsByClassName("active")[0];

    current.textContent = char;
    current.classList.toggle("active");

    current.nextElementSibling.classList.toggle("active");

}