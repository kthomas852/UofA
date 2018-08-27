$('document').ready(function(){
var dipsy = {
    power: 8,
    health: 120,
    pageCode: '<div id="dipsy" class="character dipsy">'
    +   '<p>Dipsy</p>'
    +   '<img src="assets/images/dipsy.png"/>'
    +   '<p id="dHealth"></p>'
    +'</div>',
    idTag: '#dipsy',
};

var ll = {
    power: 10,
    health: 100,
    pageCode: '<div id="ll" class="character ll">'
    +   '<p>Laa Laa</p>'
    +   '<img src="assets/images/laa_laa.png"/>'
    +   '<p id="llHealth"></p>' 
    +'</div>',
    idTag: '#ll',
};

var po = {
    power: 20,
    health: 90,
    pageCode: '<div id="po" class="character po">'
    +   '<p>Po</p>'
    +   '<img src="assets/images/po.png"/>'
    +   '<p id="poHealth"></p>'
    +'</div>',
    idTag: '#po',
};

var tw = {
    power: 13,
    health: 100,
    pageCode: '<div id="tw" class="character tw">'
    +   '<p>Tinky Winky</p>'
    +   '<img src="assets/images/tinky_winky.jpg"/>'
    +   '<p id="twHealth"></p>'   
    +'</div>',
    idTag: '#tw',
};

var enemyCount = 4;
var turn = 0;
var hero = null;
var punished = null;

/*function Library*/
var setup = function(){
    $('#start').append(tw.pageCode);
    $('#start').append(po.pageCode);
    $('#start').append(ll.pageCode);
    $('#start').append(dipsy.pageCode);
    console.log('board set...')
};
//Moves Hero into place
var  moveHero = function(champ){
    $('#you').append(champ.pageCode);
    $(champ.idTag).attr('style', 'background-color: white');
    return champ;
};
//Moves enemies into place
var moveEnemies = function(vil1, vil2, vil3){
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
    console.log('Villains Ready');
};
//moves next villain into position
var moveVillain = function(villain){
    $(villain.idTag).remove();
    $('#defender').append(villain.pageCode);
    $(villain.idTag).attr('style', 'background-color: black; color: white');
    return villain;
};
//Updates the health status of all players
var upHealth = function(){
    $('#dHealth').html(dipsy.health);
    $('#poHealth').html(po.health);
    $('#llHealth').html(ll.health);
    $('#twHealth').html(tw.health);
    console.log('Power  dipsy:' + dipsy.power + ' po:' + po.power + ' LL:' + ll.power + ' tw:' + tw.power);
    console.log('Health  dipsy:' + dipsy.health + ' po:' + po.health + ' LL:' + ll.health + ' tw:' + tw.health);
};
//attacks two current combatants 
var heroAttack = function(anti, pro){
    let vil = anti;
    let champ = pro;
    vil.health = vil.health - champ.power;
    champ.health = champ.health - vil.power;
    return champ.health;
};

var villainAttack = function(anti, pro){
    console.log(anti.power);
    let vil = anti;
    let champ = pro;
    vil.health = vil.health - champ.power;
    champ.health = champ.health - vil.power;
    console.log(vil.power);
    return vil.health;
};
//Checks if anyone is dead
var checkHealth = function(anti, pro){
    if(pro.health < 1){
       console.log('You Lose!!!');
       console.log('You Lose!!!');
       console.log('You Lose!!!');
       } else if (anti.health < 1) {
           console.log('Round to you...');
           $(anti.classTag).remove();
           if (pro === tw) {
               tw.power = tw.power * 2;
           } else if (pro === ll) {
               ll.power = ll.power * 2;
           } else if (pro === po) {
               po.power = po.power * 2;
           } else if (pro === dipsy) {
               dipsy.power = dipsy.power * 2;
           };
       }else{};
   };
//Checks game condition for win
var checkWin = function(){
    if(enemyCount === 0){
        let winMessage = '<h1 class="win">YOU WIN!!!<h1>';
        $('#enemies').append(winMessage);
        $('#defender').append(winMessage);
    };
        console.log('Win checked but not yet');
    
};

/*Game Play*/
//$('document').ready(function(){
console.log('Page is loaded and Ready!');
setup();
advance();
function advance(){
$('#tw').on('click', function () {
    if(enemyCount === 4){
        hero = moveHero(tw);
        moveEnemies(po, ll, dipsy);
        enemyCount--;
    }else if((enemyCount === 3) && (turn === 0)){
        punished = moveVillain(tw);
        turn++;
    }else if((enemyCount === 2) && (turn === 1)){
        punished = moveVillain(tw);
        turn++;
    }else if((enemyCount === 1) && (turn === 2)){
        punished = moveVillain(tw);
        turn++;
    }else{   
        console.log('Skipped');
    };
    advance();
});

$('#ll').on('click', function () {
    if(enemyCount === 4){
        hero = moveHero(ll);
        moveEnemies(po, tw, dipsy);
        enemyCount--;
    }else if((enemyCount === 3) && (turn === 0)){
        punished = moveVillain(ll);
        turn++;
    }else if((enemyCount === 2) && (turn === 1)){
        punished = moveVillain(ll);
        turn++;
    }else if((enemyCount === 1) && (turn === 2)){
        punished = moveVillain(ll);
        turn++;
    }else{
        console.log('Skipped');
    };
    advance();
});

$('#po').on('click', function () {
    if(enemyCount === 4){
        hero = moveHero(po);
        moveEnemies(tw, ll, dipsy);
        enemyCount--;
    }else if((enemyCount === 3) && (turn === 0)){
        punished = moveVillain(po);
        turn++;
    }else if((enemyCount === 2) && (turn === 1)){
        punished = moveVillain(po);
        turn++;
    }else if((enemyCount === 1) && (turn === 2)){
        punished = moveVillain(po);
        turn++;
    }else{
        console.log('Skipped');
    };
    advance();
});

$('#dipsy').on('click', function () {
    if(enemyCount === 4){
        hero = moveHero(dipsy);
        moveEnemies(po, ll, tw);
        enemyCount--;
        console.log('Enemies: ' + enemyCount);
        console.log('Turn: ' + turn);
        console.log(hero);
    }else if((enemyCount === 3) && (turn === 0)){
        punished = moveVillain(dipsy);
        turn++;
    }else if((enemyCount === 2) && (turn === 1)){
        punished = moveVillain(dipsy);
        turn++;
    }else if((enemyCount === 1) && (turn === 2)){
        punished = moveVillain(dipsy);
        turn++;
    }else{
        console.log('Skipped');
    };
    advance();
});

$('#attack').on('click', function () {
    hero.health = heroAttack(punished, hero);
    punished.health = villainAttack(punished, hero);
    checkHealth(punished, hero);
    advance();
});
upHealth();
checkWin();
};
});