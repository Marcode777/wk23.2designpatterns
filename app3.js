
var Player = function( maxStrength, maxLaser ){

  // give the enemy a random strength
  this.strength = Math.floor( Math.random() * maxStrength );
  this.laserStrength = Math.floor( Math.random() * maxLaser );

  this.laserAttack = function ( ){

    var attackStrength = Math.ceil( Math.random() * this.laserStrength );

    if( this.laserStrength % 2 === 0 && Math.random() < 0.5 ){
      attackStrength = Math.floor( attackStrength * 1.5 );
    }

    if( this.laserStrength === 1 ){

      attackStrength = 2;
    }

    this.laserStrength = this.laserStrength - attackStrength;

    return attackStrength;
  }
};

var currentEnemy  = null;

var enemyCarrier = [];

function initializeGame(){

  var user = new Player( 100, 100 );

  var numberOfShips = Math.ceil( Math.random() * 10 );

  for( var i=0; i<numberOfShips; i++ ){
    var ship = new Player( 10, 10 );

    enemyCarrier.push( ship );
  }

  //an enemy exits the carrier
  currentEnemy = enemyCarrier.pop();

  // get the button that starts the game
  var button = document.querySelector('#start');

  // listen on that button for the user click
  button.addEventListener('click', startGame);
}

function startGame ( event ){

    var button = document.querySelector('#start');

    // hide the start button ( we don't want the user to try to start the game after it's started )
    button.style = 'display:none;';

    // get the message div
    var message = document.querySelector('#message');

    // change the content of the message from the welcome to the game state
    message.textContent = "Use your lasers. Do you want to attack? You have "+user.laserStrength+" lasers. The enemy has "+currentEnemy.strength+" strength. The carrier is holding "+enemyCarrier.length+" enemies.";

    // make a button to click when the user wants to attack
    var attackButton = document.createElement('button');

    attackButton.id = 'attack-button';

    attackButton.textContent = 'attack';

    document.body.appendChild( attackButton );

   // listen for when the user submits an answer
    attackButton.addEventListener( 'click', submitAnswer );
}

function submitAnswer( event ){

  var message = document.querySelector('#message');

  var attackStrength = user.laserAttack( );

  // adjust the state of the game
  currentEnemy.strength = currentEnemy.strength - attackStrength;

  var enemyLaserAttack = currentEnemy.laserAttack( );

  user.strength = user.strength - enemyLaserAttack;

  if( currentEnemy.strength < 1  && enemyCarrier.length > 0 ){
    currentEnemy = enemyCarrier.pop();
    currentEnemy.strength = Math.floor( Math.random() * 10 );
    currentEnemy.laserStrength = Math.floor( Math.random() * 10 );
  }

  // is there a state that would end the game?
  if( user.strength < 1 || ( enemyCarrier.length < 1 && currentEnemy.strength < 1 ) ){

    // which state is it?
    if( user.strength < 1 && ( enemyCarrier.length < 1 && currentEnemy.strength < 1 ) ){
      message.textContent = "Draw.";
    }else if( user.strength < 1 ){
      message.textContent = "You Lose.";
    }else if( enemyCarrier.length < 1 && currentEnemy.strength < 1 ){
      message.textContent = "You Win.";
    }

    var attackButton = document.querySelector('#attack-button');

    // the game is over, make sure the user can't do anything else
    document.body.removeChild( attackButton )

  }else{

    // game is still going on
    message.textContent = "You attacked with "+attackStrength+". The enemy hit you with: "+enemyLaserAttack+". You now have "+user.strength+" strength. Use your lasers. How much do you want to use? You have "+user.laserStrength+" lasers. The enemy has "+currentEnemy.strength+" strength and  "+currentEnemy.laserStrength+" lasers. The carrier is holding "+enemyCarrier.length+" enemies.";
  }
}