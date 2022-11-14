window.onload = (event) =>{sizeFonts();}
onresize = (event) => {sizeFonts();};


let solution = getWordFromList();
let sol = [] ;
solution.then(result => result.split('').forEach(el => sol.push(el)));
    

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

async function submit(){
    
    
    if(await completeRowCheck()){
        checkWord();

        //getting current active
        let current = document.getElementsByClassName("active")[0];

        //find the first Element from the next Row
        var newRowStart  = newRow(current);



        //toggle the current and the next active
        current.classList.toggle("active");
        newRowStart.classList.toggle("active");
    }
    else{
       console.log("not Fullfilled")
    }
    
    
    
}

//recursive function to find the last Element of a row to return the next Sibling (first Element of the next Row)
function newRow(current){
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

function getWordFromList(){
    //returns a random word (String) from the JSON File
    return fetch('./words.json').then((response) => response.json()).then((json) => json.words[Math.floor(Math.random() * 6403)]);
}

async function checkWordInList(word){
    //checks if the given word is included in the list
    return fetch('./words.json').then((response) => response.json()).then((json) => json.words.includes(word));
}

async function completeRowCheck(){
    //checks if all the cells of the current row are filled and if the word exist
    //returns true or false
    //creates a word out of the letters of every cell
    let word = [];
    //checks for non empty cells
    let first = findFirst(document.getElementsByClassName("active")[0]);
    for(let a = 0;a<5;a++){
        //check if empty
        if(first.textContent == '\u00A0'){
            return false;
        }
        //adds character to the word array
        word.push(first.textContent)
        //takes next cell
        first = first.nextElementSibling;
    }
    
    //waits if word is in the list
    if(await checkWordInList(word.toString().replaceAll(",",""))){
        return true
    }
    else{
        return false
    }
}

function getRowWordAndElements(){
    //returns the characters of the input and the cells as an array
    let first = findFirst(document.getElementsByClassName("active")[0]);
    let divs = [];
    let chars = [];
    for(let a=0;a<5;a++){
        divs.push(first);
        chars.push(first.textContent);
        first = first.nextElementSibling;
    }
    return [chars,divs];
}

function findFirst(current){
    //if current Element contains first
    let el;
    if(current.classList.contains("first")){
        //returns next sibling
        return current;
    }
    //if current not contains last
    else{
        //call same function with next Element as current
        el = findFirst(current.previousElementSibling);
    }
    //returns next sibling
    return el;
}

function checkWord(){
    //fills the cells with the color for the letters

    let wordEl = getRowWordAndElements();
    let word = wordEl[0];
    let el = wordEl[1];
    let workSol = sol.map(x => x);
    

    //check for correct
    for(let a = 0;a<5;a++){
        if(word[a] == workSol[a]){
            word[a] = '\.';
            workSol[a] = '\,'; 
            el[a].classList.toggle("correct");
        }
    }
    //check for partial
    for(let a = 0;a<5;a++){
        for(let b=0;b<5;b++){
            if(word[a] == workSol[b]){
            word[a] = '\.';
            workSol[b] = '\,'; 
            el[a].classList.toggle("partial");
            }
        }
    }
    //all leftover characters get the wrong
    for(let a = 0;a<5;a++){
        if(!(el[a].classList.contains("partial")|el[a].classList.contains("correct"))){
            el[a].classList.toggle("wrong");
        }
    }
}