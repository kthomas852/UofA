//This is the JavaScript for the teletubby game
//Objects for combatants
var dipsy = {
    power: 8,
    health: 120,
    special: 0,
};

var ll = {
    power: 10,
    health: 100,
    special: 0,
};

var po = {
    power: 20,
    health: 90,
    special: 0,
};

var tw = {
    power: 13,
    health: 100,
    special: 0,
};

var pro = null;
var anti = null;
/*library of functions*/
//Selects a charater
var heroSelector = function(hero){
    moveHero(hero);
    moveEnemies();
    setTimeout(console.log('3 secs'), 3000);
    $('#dipsy').on('click', function(){
        if(hero === '#dipsy'){
            console.log('Already selected')
        } else {
        let target = '#po';
        moveVillain(target);
        $('#attack').on('click', attack(target, hero));
        };
    });
    $('#po').on('click', function(){
        if(hero === '#po'){
            console.log('Already selected')
        } else {
        let target = '#po';
        moveVillain(target);
        $('#attack').on('click', attack(target, hero));
        };
    });

    $('#ll').on('click', function(){
        if(hero === '#ll'){
            console.log('Already selected')
        } else {
        let target = '#ll';
        moveVillain(target);
        $('#attack').on('click', attack(target, hero));
        };
    });

    $('#tw').on('click', function(){
        if(hero === '#tw'){
            console.log('Already selected')
        } else {
        let target = '#tw';
        moveVillain(target);
        $('#attack').on('click', attack(target, hero));
        };
    });
};

var  moveHero = function(champ){
    console.log(champ);
    $(champ).prop('background-color', 'white');
};

var moveEnemies = function(){
    console.log('stuff');
};

var moveVillain = function(){
    //same but Villain
};

var attack = function(anti, pro){
    console.log(pro + ' is attacking ' + anti);
};

/*Game Play*/
$('document').ready(function() {
    console.log('Page is loaded and Ready!');

    $('#dipsy').on('click', function () {
        console.log('Dipsy selected');
        let target = '#dipsy';
        heroSelector(target);
    });

    $('#ll').on('click', function () {
        console.log('ll selected');
        let target = '#ll';
        heroSelector(target);
    });

    $('#po').on('click', function () {
        console.log('po selected');
        let target = '#po';
        heroSelector(target);
    });

    $('#tw').on('click', function () {
        console.log('tw selected');
        let target = '#tw';
        heroSelector(target);
    });
});