var myGunSound = new Audio("assets/bang.wav");

var enemyGunSound = new Audio("assets/bang.wav");
enemyGunSound.volume = 0.4;

var music = new Audio("assets/music.m4a");
music.loop = true;

//health
var healthPoints = 100;

function updateHealthPoints(points) {

	healthPoints = points;
	var healthBar = document.querySelector("#healthBar");
	healthBar.style.width = points + "%";

	if(healthPoints < 1) {
		alert("GAME OVER!");
		window.location.reload();
	}

}


function enemyShootsMe(enemy) {
    //won't shoot if it's dead
    if (!enemy.classList.contains("dead")) {
        enemy.classList.add("shooting");
        enemyGunSound.play();
        updateHealthPoints(healthPoints - 20);

        setTimeout( ()=> {
            enemy.classList.remove("shooting");
        }, 200);
    }
}


// returns how many enemies are left
function livingEnemies() {
    return document.querySelectorAll(".enemy:not(.dead)");
}


function iShoot(enemy){
    // make sure the enemy is being clicked
    //alert("WABAM!");

    //add a class to the enemy when clicked
    enemy.classList.add("dead");

    //shoot to win
    if(!livingEnemies().length) {
		alert("YOU WIN!");
		window.location.reload();
	}
}


function enemyAttacksMe(enemy) {
    // enemy will hide after 3 secs due to .showing class
    enemy.classList.add("showing");
    setTimeout( ()=> {
        enemyShootsMe(enemy);
    }, 1000);
    setTimeout( ()=> {
        enemy.classList.remove("showing");
    }, 3000);
}
// test it out
//var enemy1 = document.querySelector("#enemy1");
//enemyAttacksMe(enemy1);


// selects random enemy and picks random delay
function randomEnemyAttacks() {
    var randomEnemyNo = Math.random() * livingEnemies().length;
    randomEnemyNo = Math.floor(randomEnemyNo);
    var enemy = livingEnemies()[randomEnemyNo];

    var randomDelay = Math.random() * 2000+1000;

    setTimeout( ()=> {
        enemyAttacksMe(enemy);
        randomEnemyAttacks();
    }, randomDelay);
}


function newGame() {
    randomEnemyAttacks();
    document.querySelector("button").style.display = "none";
    music.play();
}

