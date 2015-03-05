/**
 * @author John2013
 */

var spellingList = [];
var yourName = null;




/**
* This checks to see if there is already a spelling list
* if not it creates one, if there is ask to keep or to create a new one. 
*/
function createList() {
	
	if (spellingList.length === 0) {
        //prompts for the list and then adds to the var entry
        var entry = prompt("Please enter your spelling words, seperated by a comma. example(word,word,word): ");
        // takes entry checks to see if it has something and creates array.
        if (entry != null && entry != "") {
            //creates the array
            spellingList = entry.split(",");
			
        }
        // let them know nothing entered and call the function again.
        else {
            alert("you didn't enter anything!");
            createList();
        }
	
	}
	else {
		// keep the same list
		if (confirm("Is this your spelling list? " + spellingList)) {
			alert("Okay, Let's Play!!");
			}
		// create a new list
		else {
			spellingList = [];
			createList();
		}
			
	}
	populateSpellList();
}

/**
* This will take spelling list array and populate the spelling list on screen.
*
*/

function populateSpellList() {
	
	
	
	// for loop should run through spelling list array and create list items in "listSpelling"
	
	for (var i = 0; i < spellingList.length; i++ ) {
		
		alert(spellingList);
		
		// create a new li
		var newLI = document.createElement("li");
		var indSpellingWord = spellingList[i];
		
		// grab the spelling list item 
		var newContent = document.createTextNode(indSpellingWord);
		
		
		// add the spelling list item to the li
		newLI.appendChild(newContent);
		
		// get the unordered list and add the new li
		var displaySpellList = document.getElementById("listSpelling1");		
		
		displaySpellList.appendChild(newLI);
		
		
		
		
		
	}
	
}

/**
* This will add a value to the yourName variable
*
*/

function createName() {
	
	if(yourName === null){
		// get there name and return it. 
		yourName = prompt("Please enter your name: ");			
	}
	else if(!(confirm("Is your name "+ yourName+"?"))){
		
			yourName = prompt("Please enter your name: ");
			
		}
	}





/**
*  This will run the missing letters game.
*
*/
function missingLetters() {
	// game code to create and play
	

}

/**
*  This will run the mixed up letters game.
*
*/
function mixedUpLetters() {
	// need code
	
}

/**
*  This will run the spell it out game.
*
*/
function spellItOut() {
	// need code
	
}




/**
* This will call the game function based on target.
*
*/

function playGame(target) {
	
	createName();
	createList();
	
	
	"use strict";
	// if statement to pick the game to run.
	if(target === 'MissingLetters'){
		
		document.getElementById("missingLetters2").style.display = block;
		
		missingLetters();
		
		
	}
	else{
		
		mixedUpLetters();
		
	}
	
}


















