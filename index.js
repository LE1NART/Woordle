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
    //adds the Char
    current.textContent = char;
    
    //if the current is not the last in the row
    if(!current.classList.contains("last")){
        //detoggle the current active
        current.classList.toggle("active");

        //toggle the sibling to get the next active
        current.nextElementSibling.classList.toggle("active");
    }
}

function deleteLetter(){
    //getting the cell that is currently active
    const current = document.getElementsByClassName("active")[0];

    if(!current.classList.contains("first")){
        //detoggle the current active
        current.classList.toggle("active");

        //toggle the sibling to get the next active
        current.previousElementSibling.classList.toggle("active");
    }

    //if current is blank and not the first one
    if((current.textContent == '\u00A0' || current.textContent == '&nbsp' )&& !current.classList.contains("first")){
        //delete Char before
        current.previousElementSibling.textContent = '\u00A0'
    }
    else{ //delete current Char
        current.textContent = '\u00A0';
    }
}

function submit(){

    //TODO: Check for complete row & Gamelogic

    //getting current active
    let current = document.getElementsByClassName("active")[0];

    //find the first Element from the next Row
    var newRowStart  = newRow(current);



    //toggle the current and the next active
    current.classList.toggle("active");
    newRowStart.classList.toggle("active");
}

//recursive function to find the last Element of a row to return the next Sibling (first Element of the next Row)
function newRow(current){
    console.log(current);
    //if current Element contains last
    let el;
    if(current.classList.contains("last")){
        //returns next sibling
        el = current.nextElementSibling
    }
    //if current not contains last
    else{
        //call same function with next Element as current
        el = newRow(current.nextElementSibling);
    }
    //returns next sibling
    return el;
}