//This is the third itiration of TTDM
var dipsy = {
    power: 8,
    health: 120,
    pageCode: '<div id="dipsy" class="character dipsy">'
        + '<p>Dipsy</p>'
        + '<img src="assets/images/dipsy.png"/>'
        + '<p id="dHealth"></p>'
        + '</div>',
    idTag: '#dipsy',
};

var ll = {
    power: 8,
    health: 100,
    pageCode: '<div id="ll" class="character ll">'
        + '<p>Laa Laa</p>'
        + '<img src="assets/images/laa_laa.png"/>'
        + '<p id="llHealth"></p>'
        + '</div>',
    idTag: '#ll',
};

var po = {
    power: 30,
    health: 90,
    pageCode: '<div id="po" class="character po">'
        + '<p>Po</p>'
        + '<img src="assets/images/po.png"/>'
        + '<p id="poHealth"></p>'
        + '</div>',
    idTag: '#po',
};

var tw = {
    power: 13,
    health: 100,
    pageCode: '<div id="tw" class="character tw">'
        + '<p>Tinky Winky</p>'
        + '<img src="assets/images/tinky_winky.jpg"/>'
        + '<p id="twHealth"></p>'
        + '</div>',
    idTag: '#tw',
};

var enemyCount = 4;
var turn = 0;
var hero = {};
var punished = {};
var opponent = false;

/*function Library*/
var setup = function () {
    $('#start').append(tw.pageCode);
    $('#start').append(po.pageCode);
    $('#start').append(ll.pageCode);
    $('#start').append(dipsy.pageCode);
    console.log('board set...')
};
//Moves Hero into place
var moveHero = function () {
    $('#you').append(hero.pageCode);
    $(hero.idTag).attr('style', 'background-color: white');
};
//Moves enemies into place
var moveEnemies = function (vil1, vil2, vil3) {
    $('#start').html('');
    $('#enemies').append(vil1.pageCode);
    $(vil1.idTag).attr('style', 'background-color: red');
    $('#enemies').append(vil2.pageCode);
    $(vil2.idTag).attr('style', 'background-color: red');
    $('#enemies').append(vil3.pageCode);
    $(vil3.idTag).attr('style', 'background-color: red');
    $('body').addClass('hell');
    $('h1').addClass('hellText');
    $('h2').addClass('hellText');
};
//moves next villain into position
var moveVillain = function (villain) {
    $(villain.idTag).remove();
    $('#defender').append(villain.pageCode);
    $(villain.idTag).attr('style', 'background-color: black; color: white');
    console.log("Villain is Ready");
    opponent = true;
    return villain;
};
//Updates the health status of all players
var upHealth = function () {
    $('#dHealth').html(dipsy.health);
    $('#poHealth').html(po.health);
    $('#llHealth').html(ll.health);
    $('#twHealth').html(tw.health);
    console.log('Power  dipsy:' + dipsy.power + ' po:' + po.power + ' LL:' + ll.power + ' tw:' + tw.power);
    console.log('Health  dipsy:' + dipsy.health + ' po:' + po.health + ' LL:' + ll.health + ' tw:' + tw.health);
};
//attacks two current combatants 
var heroAttack = function () {
    punished.health = punished.health - hero.power;
    hero.health = hero.health - punished.power;
};

//Checks if anyone is dead
var checkHealth = function () {
    if (hero.health < 1) {
        console.log('You Lose!!!');
        console.log('You Lose!!!');
        console.log('You Lose!!!');
        $('#you').html("<h1 class='win'>'YOU LOSE!!!'</h1>");
    } else if (punished.health < 1) {
        console.error('Round to you...');
        $(punished.idTag).remove();
        if (hero === tw) {
            tw.power = tw.power * 2;
        } else if (hero === ll) {
            ll.power = ll.power * 2;
        } else if (hero === po) {
            po.power = po.power * 2;
        } else if (hero === dipsy) {
            dipsy.power = dipsy.power * 2;
        };
        console.error('power: '+ hero.power +'  count&turn: ' + enemyCount +' '+ turn)
        enemyCount--;
        opponent = false;
    } else { console.log('no powerUp')};
};
//Checks game condition for win
var checkWin = function () {
    if (enemyCount === 0) {
        let winMessage = '<h1 class="win">YOU WIN!!!<h1>';
        $('#enemies').append(winMessage);
        $('#defender').append(winMessage);
    };
    console.log('Win checked but not yet');

};

/*Game Play*/
//$('document').ready(function(){
$('document').ready(function () {
    console.log('Page is loaded and Ready!');
    setup();
    advance();
    function advance() {
        $('#tw').unbind().on('click', function () {
            if (enemyCount === 4) {
                hero = tw;
                moveEnemies(po, ll, dipsy);
                moveHero();
                enemyCount--;
            } else if ((enemyCount === 3) && (turn === 0)) {
                punished = moveVillain(tw);
                turn++;
            } else if ((enemyCount === 2) && (turn === 1)) {
                punished = moveVillain(tw);
                turn++;
            } else if ((enemyCount === 1) && (turn === 2)) {
                punished = moveVillain(tw);
                turn++;
            } else {
                console.log('Skipped');
            };
            advance();
        });

        $('#ll').unbind().on('click', function () {
            if (enemyCount === 4) {
                hero = ll;
                moveEnemies(po, tw, dipsy);
                moveHero();
                enemyCount--;
            } else if ((enemyCount === 3) && (turn === 0)) {
                punished = moveVillain(ll);
                turn++;
            } else if ((enemyCount === 2) && (turn === 1)) {
                punished = moveVillain(ll);
                turn++;
            } else if ((enemyCount === 1) && (turn === 2)) {
                punished = moveVillain(ll);
                turn++;
            } else {
                console.log('Skipped');
            };
            advance();
        });

        $('#po').unbind().on('click', function () {
            if (enemyCount === 4) {
                hero = po;
                moveEnemies(tw, ll, dipsy);
                moveHero();
                enemyCount--;
            } else if ((enemyCount === 3) && (turn === 0)) {
                punished = moveVillain(po);
                turn++;
            } else if ((enemyCount === 2) && (turn === 1)) {
                punished = moveVillain(po);
                turn++;
            } else if ((enemyCount === 1) && (turn === 2)) {
                punished = moveVillain(po);
                turn++;
            } else {
                console.log('Skipped');
            };
            advance();
        });

        $('#dipsy').unbind().on('click', function () {
            if (enemyCount === 4) {
                hero = dipsy;
                moveEnemies(po, ll, tw);
                moveHero();
                enemyCount--;
                console.log('Enemies: ' + enemyCount);
                console.log('Turn: ' + turn);
                console.log(hero);
            } else if ((enemyCount === 3) && (turn === 0)) {
                punished = moveVillain(dipsy);
                turn++;
            } else if ((enemyCount === 2) && (turn === 1)) {
                punished = moveVillain(dipsy);
                turn++;
            } else if ((enemyCount === 1) && (turn === 2)) {
                punished = moveVillain(dipsy);
                turn++;
            } else {
                console.log('Skipped');
            };
            advance();
        });

        $('#attack').unbind().click(function () {
            if(opponent){
            heroAttack();
            checkHealth();
            advance();
            }else{
                alert("NO OPPONENT SELECTED")
            }
        });
        upHealth();
        checkWin();
    };
});