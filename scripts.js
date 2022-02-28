//naming the used elements to make the code more simpler later on
var lista = document.getElementById("lista");
var input = document.getElementById("input");
var addbutton = document.getElementById("nappi");
var deletebutton = document.getElementById("clearlist");
var counter = document.getElementById("counter");

//load list items from local storage
load(); 

//eventlistener for the add button
addbutton.addEventListener("click",addToList);

//eventlistener so you can press enter on the input field to add a list item 
input.addEventListener("keyup", function(e){
    if(e.keyCode === 13){
        addbutton.click();
    }
});


function addToList(){
    if ((input.value == "") || input.value.length < 3){     //checking the validity of the input
    input.value = "Input must be at least 3 characters!";
    input.style ="border: 3px solid red";
    }
    else{  //if valid input, taking the value and creating a list element with a button included with it
         lista.innerHTML += '<li>' + input.value +'<button class="poistonappi">&#10006</button> </li>';
         input.style ="border: 1px, solid, black";
         input.value ="";         
         save(); //saving the value to local storage
         howmanydone(); // calculating the percent of completed items, everytime changes happen 
    }
    var poistonapit = document.querySelectorAll(".poistonappi"); //the delete list item buttons 
    for(var i=0; i<poistonapit.length; i++){ // looping through them and deleting the list item when you click it
        poistonapit[i].onclick = function(){
            this.parentNode.remove();
            howmanydone(); //  saving the list items and calculating the current percent of completed items
            save();
        }
    }
    
}

lista.addEventListener('click', function(e) { //adding eventlistener to the list which changes list-item style when clicked
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");      
      save();
      howmanydone();
    }
  }, false);

deletebutton.addEventListener('click', clearList); //eventlistener for the clear list button which deletes all the list items

function clearList(){
    if (confirm("Are you sure you want to delete the list?")){ //confirmation
    var listassa = document.getElementsByTagName("li");// if yes collecting all the li tags
    while (listassa[0]) listassa[0].parentNode.removeChild(listassa[0]) // and removing them all
    save();
    howmanydone();
    }
}

function save(){ //save all list items + html to local storage
    window.localStorage.myitems = lista.innerHTML;
}
function load(){ //load all the things that are in local storage to the list
    var tallennetut = window.localStorage.myitems;
    lista.innerHTML = tallennetut;    
}
function howmanydone(){ // counting how many list items are completed(clicked)
    var completeditems = parseInt(document.getElementsByClassName("checked").length);
    var totalitems = parseInt(document.getElementsByTagName("li").length);
    var prosentti = Math.round(completeditems / totalitems * 100); //changing to a percent and rounding the number

    if (totalitems === 0)prosentti = 0; // if no items percentage shows 0 not NaN

    if(prosentti === 100){ //alert when all items are completed
        alert("Well done!");
        counter.style.background ="green";
    }
    else if(prosentti > 50){ //visual changes
        counter.style.background ="lightgreen";
    }
    else  counter.style.background ="red";

    counter.innerHTML ='<p id ="prosenttilaskuri">'+ prosentti +'%</p>'; // adding the number to the div

}

addToList();    /*had to call this function to be able to remove list items after loading from the localstorage, 
                probably a better solution for this problem exists but this works also */ 
input.value = "";
input.style ="border: 1px, solid, black"; // changing the input value and style since calling the empty addToList function gives error borders and message

howmanydone(); //calculating the percent when loading the items from local storageS














