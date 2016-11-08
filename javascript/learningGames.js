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
  add to the score
*/
function update_score(num){
  the_num = num.toString();
  var theScore = "Score = " + the_num;
  document.getElementById("the_score").innerHTML = theScore;
}

/*
    show winner div and then fadeout
*/

function show_winner(num){
  var final_score = num;
  var p = document.createElement('p');
  p.setAttribute('id', 'show_score');
  p.style.textShadow = 'none';
  var w_game = document.getElementById('win_game');
  p.innerHTML = "Your score was " + final_score;
  w_game.appendChild(p);
  $('#win_game').fadeIn(2000);
  $('#win_game').fadeOut(3000, function(){
      $('#show_score').remove();
  });

}

/*
    this function will clear the spelling list
*/
function clearSpellList() {
  // gets the id specified in the spellListID variable
  var spellClear = document.getElementById(spellListId);
  // while loop to check if the spelling list has li and remove them if it does.
    while (spellClear.hasChildNodes()) {
        spellClear.removeChild(spellClear.childNodes[0]);
    }
}

/*
This will shuffle an array for mixed up letters game
*/

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
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

/*
 This will take spelling list array and populate the spelling list on screen.
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
    // take temp array get length divide and round down for the number of letters to ?? replace in array
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
        if(textBox.value === ''){
          textBox.setAttribute('tabindex', '10');
        }
        else {
            textBox.setAttribute('disabled', 'disabled');
        }
        var displayLetter = document.getElementById("missLetterWord");
        displayLetter.appendChild(textBox);
    }
}



/**
this will quit the game, which means, hide the div, clear the spelling list and the name
*/
$('.quit').click(function() {
    clearSpellList();
    removeInputFields();
    $(this).parent().hide();
    score = 0;
    update_score(score);
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
    // add point to score
    score += 1;
    update_score(score);
  }
  var is_same = (usedSpellingListObject[0].array1.length == usedSpellingListObject[0].array2.length) && usedSpellingListObject[0].array1.every(function(element, index) {
    return element === usedSpellingListObject[0].array2[index];
    });
  // array1 and array2 match then
  if(is_same){
    // clear word from spelling list and rewrite spelling list
    var word_2_clear = usedSpellingListObject[0].array1.join([separator ='']);
    // remove the spelling word from the used so checks will work
    usedSpellingListObject.shift();
    var index_pos = spellingList.indexOf(word_2_clear);
    spellingList.splice(index_pos, 1);
    populateSpellList();
    // check to see if spelling list empty and end game
    if(spellingList.length === 0){
        clearSpellList();
        removeInputFields();
        document.getElementById('missingLetters2').style.display = 'none';
        show_winner(score);
        score = 0;
        update_score(score);

    }
    // clear boxes and add new word
    populateMLWID();
  }
}


/** missingLetters function containg the code to play the missing letters game
 */
function missingLetters() {
    // function to get word from missing letters array
    wordLetterArray();
    populateMLWID();
}

/*check to see if newely created array is the same as the array2 of object.*/
function mixedLtrCheck(the_number) {
  // take the_number argument and grab the array from usedSpellingListObject
  var checkArray = spellingListArrays[the_number].array2;
  // get text from the list items in order create array
  var tempArray2 = $('#letters2move').children().text();
  tempArray2 = tempArray2.split('');
  // check to see if arrays match.
  var isCorrect = checkArray.every(function(element, index){
    return element === tempArray2[index];
  });
  return isCorrect;

}


/**
 *  This will run the mixed up letters game.
 *
 */
function mixedUpLetters() {
      // function to add word objects to arrays
      wordLetterArray();
      // need to shuffle a speling word array objects
      var randNum2 = Math.floor(Math.random() * spellingListArrays.length);
      var myArray = spellingListArrays[randNum2].array1;
      shuffle(myArray);
      // need to add to li and write to screen
      for (var i = 0; i < myArray.length; i++) {
          // create a new textbox
          var textBox = document.createElement("li");
          // set max attribute
          textBox.setAttribute('maxLength', '1');
          // set name attribute
          textBox.setAttribute('id', 'spellbox' + i);
          // get letter from myArray
          textBox.innerHTML = myArray[i];
          textBox.setAttribute('class', 'boxToMove');
          var displayLetter = document.getElementById("letters2move");
          displayLetter.appendChild(textBox);
      }
      // need to make ul sortable
      $("#letters2move").sortable({
        containment: 'document',
        tolerance: 'pointer',
        cursor: 'pointer',
        revert: true
      });
      // need to check to see if correct once moved
      $("#letters2move").on( "sortstop", function() {
        mixedLtrCheck(randNum2);
      });
      // need to keep score
      // remove spelling word object when sorted correctly
      // show winner and score when done
      // need quit function
      // need to make sure can't change li's
      // alert(myArray);
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
