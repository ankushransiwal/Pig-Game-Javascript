/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/



var scores, prevRoundScore, roundScore, activePlayer, gamePlaying, finalScore;
init();

// Query Selector only selects the first thing it matches
// This is a setter, because we set a value
//document.querySelector('#current-'+activePlayer).textContent = dice;

// Inner HTML lets you change the html content
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'

// This is a getter, since we get a value
//var x = document.querySelector('#score-1').textContent;


// Creating a Anonymous function instead of creating an externam function
// Anonymous function are function without a name so it's only used once where defined

document.querySelector('.btn-roll').addEventListener('click', function(){
    
    if(gamePlaying){
        
        // 1. Random number
        var dice = Math.floor(Math.random() * 6) +1;

        // 2. Display the result
        var diceDOM =  document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-'+dice +'.png';

        // 3. Update the round score IF the rolled number was not a 1
        
        if(dice === 6 && prevRoundScore === 6)
            nextPlayer();
        else if(dice !== 1) {
            // Add score
            roundScore += dice;
            prevRoundScore = dice;
            document.querySelector('#current-'+activePlayer).textContent = roundScore;
        }
        else {
            // Next player
            nextPlayer();

        }
    }
    
    
});

// Another Anonymous function
document.querySelector('.btn-hold').addEventListener('click', function(){
    
    if(gamePlaying){
        
        // Add current score to the global score
    
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];
        
        finalScore = document.getElementById('final').value;
        // Check if the player won the game
        if(scores[activePlayer] >= finalScore){
            // Update the Ui
            document.querySelector('#name-'+ activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            gamePlaying = false;
        }
        else{
            // Next Player
            nextPlayer();
        }
    }
});


// Creating a next player function to toggle the users
function nextPlayer(){
    // Using ternary operators instead of if else
        activePlayer === 1 ? activePlayer = 0 : activePlayer = 1;
        roundScore = 0;
        prevRoundScore = 0;
        
        document.getElementById('current-0').textContent = '0'
        document.getElementById('current-1').textContent = '0'
        
        
        // Toggle lets you add and remove the class
        
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        
        // document.querySelector('.player-0-panel').classList.remove('active');
        //document.querySelector('.player-1-panel').classList.add('active');
        
        document.querySelector('.dice').style.display = 'none';
}

// Not calling an anonymous function this time
document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    prevRoundScore = 0;
    finalScore = 100;
    // Setting the css of the dice class to none
    document.querySelector('.dice').style.display = 'none';

    // Setting all the Initial score values to zero by using getElementByID

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

    
}











