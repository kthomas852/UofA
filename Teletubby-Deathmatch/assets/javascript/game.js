//This is the JavaScript for the teletubby game
//Objects for combatants
var dipsy = {
    power: 8,
    health: 120,
    pageCode: '<div id="dipsy" class="character dipsy">'
    +   '<p>Dipsy</p>'
    +   '<img src="assets/images/dipsy.png"/>'
    +   '<p id="dHealth"></p>'
    +'</div>',
    idTag: '#dipsy',
    classTag: '.dipsy',
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
    classTag: '.ll',
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
    classTag: '.po',
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
    classTag: '.tw',
};

var enemyCount = 3;
var aHealth = 0;
var pHealth = 0;

/*library of functions*/
//Selects a charater
var heroSelector = function(hero){
    moveHero(hero);
    upHealth();
    $('#dipsy').on('click', function(){
        if(hero === dipsy){
            console.log('Already selected')
        } else {
        moveVillain(dipsy, hero);
            $('#attack').on('click', function(){
                hero.health = heroAttack(dipsy, hero);
                dipsy.health = vilAttack(dipsy, hero);
                checkHealth(dipsy, hero);
            });
        };
    });
    $('#po').on('click', function(){
        if(hero === po){
            console.log('Already selected')
        } else {
        moveVillain(po, hero);
            $('#attack').click(function(){
                hero.health = heroAttack(po, hero);
                po.health = vilAttack(po, hero);
                checkHealth(po, hero);
            });
        };
    });

    $('#ll').on('click', function(){
        if(hero === ll){
            console.log('Already selected')
        } else {
        moveVillain(ll, hero);
            $('#attack').click(function(){
                hero.health = heroAttack(ll, hero);
                ll.health = vilAttack(ll, hero);
                checkHealth(ll, hero);
            });
        };
    });

    $('#tw').on('click', function(){
        if(hero === tw){
            console.log('Already selected')
        } else {
        moveVillain(tw, hero);
        };
            $('#attack').click(function(){
                
                hero.health = heroAttack(tw, hero);
                tw.health = vilAttack(tw, hero);
                checkHealth(tw, hero);
            });
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
    pHealth = champ.health;
    if(enemyCount === 3){
    $('#you').append(champ.pageCode);
    $(champ.idTag).attr('style', 'background-color: white');
    }
};

//Checks if anyone is dead
var checkHealth = function(anti, pro){
 if(pro.health < 1){
    console.log('You Lose!!!');
    console.log('You Lose!!!');
    console.log('You Lose!!!');
    unclickable();
    } else if (anti.health < 1) {
        console.log('Round to you...');
        checkWin();
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
        //clickable();
        heroSelector(pro);
    };
    upHealth();
};

//varies between clickable and not
var unclickable = function(){
    $('.po').removeAttr('id');
    $('.tw').removeAttr('id');
    $('.ll').removeAttr('id');
    $('.dipsy').removeAttr('id');
};

var clickable = function(){
    $('.po').attr('id', '#po');
    $('.tw').attr('id', '#tw');
    $('.ll').attr('id', '#ll');
    $('.dipsy').attr('id', '#dipsy');
}

//moves enemies into action ready position
var moveEnemies = function(vil1, vil2, vil3){
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
    aHealth = villain.health;
    enemyCount--;
    $(villain.idTag).remove();
    $('#defender').append(villain.pageCode);
    $(villain.idTag).attr('style', 'background-color: black; color: white');
    upHealth();
    //unclickable();
};

//Checks game condition for win
var checkWin = function(vil, cap){
    if(enemyCount === 0){
        let winMessage = '<h1 class="win">YOU WIN!!!<h1>';
        $('#enemies').append(winMessage);
        $('#defender').append(winMessage);
    };
        console.log('Got to this step');
    
};

//attacks two current combatants 
var heroAttack = function(anti, pro){
    anti.health = anti.health - pro.power;
    pro.health = pro.health - anti.power;
    return pro.health;
};

var vilAttack = function(vil, hero){
    vil.health = vil.health - hero.power;
    hero.health = hero.health - vil.power;
    return anti.health;
};


//Updates the health status of all players
var upHealth = function(){
    $('#dHealth').html(dipsy.health);
    $('#poHealth').html(po.health);
    $('#llHealth').html(ll.health);
    $('#twHealth').html(tw.health);
    console.log('Power  dipsy:' + dipsy.power + ' po:' + po.power + ' LL:' + ll.power + ' tw:' + tw.power);
    console.log('Health  dipsy:' + dipsy.health + ' po:' + po.health + ' LL:' + ll.health + ' tw:' + tw.health);
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