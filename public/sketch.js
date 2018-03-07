// Open and connect input socket
let socket = io();

let keychar;
let fullText = [];

let word = null;
let current_orgKey = null;
let current_mappedkey = null;
let current_pos = 0;
let current_user = null;
let succes = false;
let restart = null;
let newword =null;

let isFinished = false;



function setup() {
    createCanvas(800, 800);
    socket.on('init', function(message){
        word = message.word;
        current_user = message.current_user;
        current_pos = message.current_pos;
        current_mappedkey = message.current_mappedkey;
        current_orgKey = message.current_orgKey;
    });

    socket.on('sync', function(message){
        current_user = message.current_user;
        current_pos = message.current_pos;
        current_mappedkey = message.current_mappedkey;
        current_orgKey = message.current_orgKey;
    });

     socket.on('succes', function(message){
        console.log("CLIENT THIS IS SUCCES");
        succes = message.succes 
        if(succes === true){
        reset();
        
        
        
    }
    });

     socket.on('update', function(message){
        newword = message.word;

     });
}




function keyPressed() {
    let data = {
        "keyCode":keyCode
    };

    socket.emit('keyPressed', data);
}



let index = 0
let combinedtext = "";


function draw() {
    background(100);

    if(word === null){
        return;
    }

    if (newword === null) {
    text("Spell the word one letter at a time. Type one letter and wait for opponent: " + word, 200,100);
 } else {
    text("Spell the word one letter at a time. Type one letter and wait for opponent: " + newword, 200,100);
 }   
    

    if(current_user === socket.id){
        text("your turn", 20, 10);
    } else {
        text("wait for others", 20, 10);
    }

    let updatedText = "";

     for (let i = 0; i < current_pos; i++) {
         if (newword === null) { 
         updatedText += word.charAt(i)
     } else {
          updatedText += newword.charAt(i)
     }
     }

    text(updatedText, 250, 150);
    console.log(updatedText);
    text("you pressed " + current_mappedkey, 300, 200);

    if (isFinished) {
        text("Congratulations",400,400);
    }
}


function reset(){
    isFinished = true;
    let data = {
        "restart": restart,
    };

    socket.emit('restart', data);

}



