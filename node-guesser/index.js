//import { Word } from './letter.js';
//Main promgram for game
var Word = require('./word');
//Word Bank
var wordsAvail = ["cat", "dog", "mother", "doors", `blank slate`];
//Selects word at random
var playWord = new Word();
playWord.ltrize(wordsAvail[Math.floor(Math.random() * wordsAvail.length)]);

playWord.action();

