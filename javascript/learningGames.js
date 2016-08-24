/**
 * @author John2013
 */
var spellingList = [];
var spellingListArrays = [];
var usedSpellingListObject = [];
var yourName = null;
var spellListId = null;
var score = 0;

/*
    various functions to clear lists
*/

/*
    this function will clear the spelling list
*/

function clearSpellList() {
    // gets the id specified in the spellListID variable
    var spellClear = document.getElementById(spellListId);
    // if statment to check if the spelling list has li and remove them if it does.
    while (spellClear.hasChildNodes()) {
        spellClear.removeChild(spellClear.childNodes[0]);
    }
}

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
            // creates temp array that can then be cleaned up
            var tempSpellingList = entry.split(",");
            // this is the clean up and the push to spellingList
            for (var i = 0; i < tempSpellingList.length; i++) {
                var tempWord = tempSpellingList[i].trim();
                var tempWord2 = tempWord.toLowerCase();
                spellingList.push(tempWord2);
            }
        }
        // let them know nothing entered and call the function again.
        else {
            alert("you didn't enter anything!");
            createList();
        }
    } else {
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
 * This will take spelling list array and populate the spelling     list on screen.
 *
 */
function populateSpellList() {
    clearSpellList();
    // for loop should run through spelling list array and create list items in "listSpelling"
    for (var i = 0; i < spellingList.length; i++) {
        // create a new li
        var newLI = document.createElement("li");
        var indSpellingWord = spellingList[i];
        // grab the spelling list item
        var newContent = document.createTextNode(indSpellingWord);
        // add the spelling list item to the li
        newLI.appendChild(newContent);
        // get the unordered list and add the new li
        var displaySpellList = document.getElementById(spellListId);
        displaySpellList.appendChild(newLI);
    }
}

/**
 * This will add a value to the yourName variable
 *
 */
function createName() {
    if (yourName === null) {
        // get there name and return it.
        yourName = prompt("Please enter your name: ");
    } else if (!(confirm("Is your name " + yourName + "?"))) {
        yourName = prompt("Please enter your name: ");
    }
}


function setSpellListID(target) {
    if (target === 'MissingLetters') {
        spellListId = "listSpelling1";
    } else {
        spellListId = "listSpelling2";
    }

}

/**
 * Constructor function to create a word object
 * that I can call to set up various properties and arrays.
 * Will pull in word from spellingList array
 */
var SpellWord = function(wordFromArray) {
    this.totalLength = wordFromArray.length;
    this.array1 = wordFromArray.split("");
    this.array2 = wordFromArray.split("");
}

/**
 * create object that gets word from array and makes it an object
 * with properties like length of the word, an array of the word, a second array
 * that we can check against the first
 * also pushes the object to spellingListArrays
 */
function wordLetterArray() {
    for (var i = 0; i < spellingList.length; i++) {
        // create new object based on word retrieved from spelling list
        var tempWord3 = new SpellWord(spellingList[i]);
        // add object to spellingListArrays
        spellingListArrays.push(tempWord3);
    }
}

/*
Clear the childnodes from missLetterWord unordered list
*/
function removeInputFields() {
    // while statement to remove any childnodes for missLetterWord
    var missLetterWords = document.getElementById("missLetterWord");

    while (missLetterWords.hasChildNodes()) {
        missLetterWords.removeChild(missLetterWords.childNodes[0]);
    }
}


/*
This function will take the array from the word object and add
it to the missLetterWord id. Hopefully one letter per list item.
*/
function populateMLWID() {
    // this removes and fields that may be there already
    removeInputFields();
    // show the id missLetterDiv
    $('#missLetterDiv').show();
    // this creates a randum number based on the length of the spelling list
    // then it grabs an array of one of the words and stores in variable
    var randNum = Math.floor(Math.random() * spellingListArrays.length);
    var tempArray = spellingListArrays[randNum].array1;
    // need to pop that word from the spellingListArrays so that it is not used again
    // and move it to another list at the end and then check against the end array
    usedSpellingListObject.push(spellingListArrays[randNum]);
    spellingListArrays.splice(randNum, 1);
    // take temp array get length divide and round down for the number of letters to replace in array
    // with blanks
    var totNum2Remove = parseInt((tempArray.length)/2);
    // this will take the total number of letters to remove and remove them at random locations.
    while(totNum2Remove > 0) {
        // get the index location for the removal of the letter
        var tempNun = Math.floor(Math.random() * tempArray.length);
        // console.log(tempNun);
        // this will take tempNun and replace that location in array with blank
        if (tempArray[tempNun] !== "") {
            tempArray.splice(tempNun, 1, "");
            // console.log(tempArray);
            totNum2Remove -= 1;
        };
    }
    // need to get the length of the array of the word
    // create form elements and populate with a letter from array
    for (var i = 0; i < tempArray.length; i++) {
        // console.log(tempArray);
        // create a new textbox
        var textBox = document.createElement("input");
        textBox.type = 'text';
        // set max attribute
        textBox.setAttribute('maxLength', '1');
        // set name attribute
        textBox.setAttribute('id', 'spellbox' + i);
        // set event
        textBox.setAttribute('onchange', 'checkCorrect(this.value, this.id)');
        // get letter from tempArray
        // console.log(tempArray[i]);
        textBox.setAttribute('value', tempArray[i]);

        // get the form and add the new textBox
        var displayLetter = document.getElementById("missLetterWord");
        displayLetter.appendChild(textBox);
    }
}

/**
this will quit the game, which means, hide the div, clear the spelling list and the name
*/
// - function to add quit button or way to get out
$('.quit').click(function() {
    clearSpellList();
    removeInputFields();
    $(this).parent().hide();
})

/**
this will check if the word is correct after user inputs something in the field
*/
function checkCorrect(letter, the_id) {
  // change the_id to integer I can use for array location.
  var the_spot = parseInt(the_id.slice(-1));
  // regex to check to make sure letter is an alpha
  var re = /^[A-Za-z]+$/;
  if(!re.test(letter)){
    alert('Please enter a letter.');
    // reset to blank if not a letter
    document.getElementById(the_id).value = '';
    // set focus to the the current id
    document.getElementById(the_id).focus();
  }
  // check to see if letter is correct and in the correct location
  else if (letter != usedSpellingListObject[0].array2[the_spot]) {
    // color the letter red
    var color_letter = document.getElementById(the_id);
    var the_letter = document.getElementById(the_id).value;
    color_letter.style.color = '#F50707'
    document.getElementById(the_id).value = the_letter;
  }
  else {
    // color the letter green
    var color_letter = document.getElementById(the_id);
    var the_letter = document.getElementById(the_id).value;
    color_letter.style.color = '#193B0D'
    document.getElementById(the_id).value = the_letter;
    // add letter to array1
    usedSpellingListObject[0].array1.splice(the_spot, 1, the_letter);


  }
  alert(usedSpellingListObject[0].array1);
}


/** missingLetters function containg the code to play the missing letters game
 */
function missingLetters() {
    //  - function to get word from missing letters array
    //  - maybe even an array of objects??
    //	- create 2 new arrays based on the word retrieved
    //	- variable populated with the length of the new array
    wordLetterArray();
    populateMLWID();



    // - function to take new array and populate boxes in web page
    //	- needs to create box or element
    //	- add letter or add but hide based on some random ( NEED TO FIGURE THIS OUT )
    //	- FIGURE OUT HOW TO LET SOME BOXES BE EDITED AND OTHERS NOT.
    // - Need an event to determine if something has been entered in the box and then check it.
    //	- function to check if it matches the hidden value
    //		- if match change letter to green and add to score
    //		- if does not match change letter to red and move cursor back to it.
    //	- function to then check if word is complete
    //		- if complete
    //			- check if list complete
    //				- if complete congratulate screen with score ask to do it again
    //				- list not complete generate next word
    //		- not complete
    //			- move cursor to next non complete letter
}

/**
 *  This will run the mixed up letters game.
 *
 */
function mixedUpLetters() {
      // need code
}

/**
 * This will call the game function based on target.
 *
 */

function playGame(target) {
    setSpellListID(target);
    createName();
    createList();
    "use strict";
    // if statement to pick the game to run.
    if (target === 'MissingLetters') {
        document.getElementById("missingLetters2").style.display = "block";
        document.getElementById("mixupLetters").style.display = "none";
        missingLetters();
    } else {
        document.getElementById("mixupLetters").style.display = "block";
        document.getElementById("missingLetters2").style.display = "none";
        mixedUpLetters();
    }
}
