//This is the JavaScript for the teletubby game
//Objects for combatants
var dipsy = {
    power: 8,
    health: 120,
    pageCode: '<div id="dipsy" class="character">'
    +   '<p>Dipsy</p>'
    +   '<img src="assets/images/dipsy.png"/>'
    +   '<p id="dHealth"></p>'
    +'</div>',
    idTag: '#dipsy',
};

var ll = {
    power: 10,
    health: 100,
    pageCode: '<div id="ll" class="character">'
    +   '<p>Laa Laa</p>'
    +   '<img src="assets/images/laa_laa.png"/>'
    +   '<p id="llHealth"></p>' 
    +'</div>',
    idTag: '#ll',
};

var po = {
    power: 20,
    health: 90,
    pageCode: '<div id="po" class="character">'
    +   '<p>Po</p>'
    +   '<img src="assets/images/po.png"/>'
    +   '<p id="poHealth"></p>'
    +'</div>',
    idTag: '#po',
};

var tw = {
    power: 13,
    health: 100,
    pageCode: '<div id="tw" class="character">'
    +   '<p>Tinky Winky</p>'
    +   '<img src="assets/images/tinky_winky.jpg"/>'
    +   '<p id="twHealth"></p>'   
    +'</div>',
    idTag: '#tw',
};

var enemyCount = 3;
/*library of functions*/
//Selects a charater
var heroSelector = function(hero){
    moveHero(hero);
    upHealth();
    $('#dipsy').on('click', function(){
        if(hero === dipsy){
            console.log('Already selected')
        } else {
        moveVillain(dipsy);
        
            $('#attack').on('click', attack(dipsy, hero));
        
        };
    });
    $('#po').on('click', function(){
        if(hero === po){
            console.log('Already selected')
        } else {
        moveVillain(po);
        
            $('#attack').click(attack(po, hero));
        
        };
    });

    $('#ll').on('click', function(){
        if(hero === ll){
            console.log('Already selected')
        } else {
        moveVillain(ll);
        
            $('#attack').on('click', attack(ll, hero));
        
        };
    });

    $('#tw').on('click', function(){
        if(hero === tw){
            console.log('Already selected')
        } else {
        moveVillain(tw);
        
        };
            $('#attack').on('click', attack(tw, hero));
        
    });
};

//erases content and sets board to new game
var setup = function(){
    $('#start').append(tw.pageCode);
    $('#start').append(po.pageCode);
    $('#start').append(ll.pageCode);
    $('#start').append(dipsy.pageCode);
    console.log('board set...')
};

//move hero selected and changes bacground to white
var  moveHero = function(champ){
    $('#you').append(champ.pageCode);
    $(champ.idTag).attr('style', 'background-color: white');
};

//moves enemies into action ready position
var moveEnemies = function(vil1, vil2, vil3){
    $('#enemies').append(vil1.pageCode);
    $(vil1.idTag).attr('style', 'background-color: red');
    $('#enemies').append(vil2.pageCode);
    $(vil2.idTag).attr('style', 'background-color: red');
    $('#enemies').append(vil3.pageCode);
    $(vil3.idTag).attr('style', 'background-color: red');
    console.log('Villains Ready');
};

//moves next villain into position
var moveVillain = function(villain){
    $(villain.idTag).remove();
    $('#defender').append(villain.pageCode);
    $(villain.idTag).attr('style', 'background-color: black; color: white');
};

//Checks game condition for win
var checkWin = function(){
    if(enemyCount === 0){
        let winMessage = '<h1 class="win">YOU WIN!!!<h1>';
        $('#enemies').append(winMessage);
        $('#defender').append(winMessage);
    }
}

//attacks two current combatants 
var attack = function(anti, pro){
    console.log(pro + ' is attacking ' + anti);
    if((anti.health > 0) && (pro.health > 0)){
        anti.health = anti.health - pro.power;
        pro.health = pro.health - anti.power;
        console.log('A hit for ' + pro.power + ' P hit for ' + anti.power);
        upHealth();
        if(anti.health = 0){
            $(anti.idTag).remove();
            enemyCount--;
            checkWin();
            heroSelector(pro);
        } else if(pro.health = 0){
            $('#you').html('<h1>YOU LOSE!!!</h1>');
        }
        $('#attack').on('click', attack(anti, pro));
    } else {
        checkWin();
    }
};

//Updates the health status of all players
var upHealth = function(){
    $('#dHealth').html(dipsy.health);
    $('#poHealth').html(po.health);
    $('#llHealth').html(ll.health);
    $('#twHealth').html(tw.health);
}

/*Game Play*/
$('document').ready(function() {
    console.log('Page is loaded and Ready!');

    setup();
    upHealth();
    $('#dipsy').on('click', function () {
        console.log('Dipsy selected');
        $('#start').html('');
        moveEnemies(tw, po, ll);
        heroSelector(dipsy);
    });

    $('#ll').on('click', function () {
        console.log('ll selected');
        $('#start').html('');
        moveEnemies(tw, po, dipsy);
        heroSelector(ll);
    });

    $('#po').on('click', function () {
        console.log('po selected');
        $('#start').html('');
        moveEnemies(tw, ll, dipsy);
        heroSelector(po);
    });

    $('#tw').on('click', function () {
        console.log('tw selected');
        $('#start').html('');
        moveEnemies(po, ll, dipsy);
        heroSelector(tw);
    });
});