//This is the JavaScript for the teletubby game

/*library of functions*/
//Selects a charater
var heroSelector = function(hero){
    moveHero(hero);
    moveEnemies();
    $('#po').on('click', function(){
        let target = '#po';
        moveVillain(target);
        $('#attack').on('click', attack());
    });

    $('#ll').on('click', function(){
        let target = '#ll';
        moveVillain(target);
        $('#attack').on('click', attack());
    });

    $('#tw').on('click', function(){
        let target = '#tw';
        moveVillain(target);
        $('#attack').on('click', attack());
    });
};

var  moveHero = function(champ){
    $(champ).attr('background-color', 'white');
};

var moveEnemies = function(){
    //same but eneimes
};

var moveVillain = function(){
    //same but Villain
};

/*Game Play*/
$('document').ready(function () {
    console.log('Page is loaded and Ready!');
    $('#dipsy').on('clcik', function () {
        console.log('Dipsy selected');
        let target = '#dipsy';
        heroSelector(target);
    });

    $('#ll').on('clcik', function () {
        console.log('ll selected');
        let target = '#ll';
        heroSelector(target);
    });

    $('#po').on('clcik', function () {
        console.log('po selected');
        let target = '#po';
        heroSelector(target);
    });

    $('#tw').on('clcik', function () {
        console.log('tw selected');
        let target = '#tw';
        heroSelector(target);
    });
});