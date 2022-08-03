
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const positionsGame = [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
];

const songEffectWin = new Audio('song/song-winner.mp3');
const songEffectLose = new Audio('song/song-loser.mp3');
const songEffectPress = new Audio('song/song-press.mp3');
const songEffectAcessDenied = new Audio('song/song-acessDenied.mp3');


const activeDivWin = document.getElementById('jogo-velha-win'); 
const disableButton = document.getElementById('jogo-velha-fixed'); 

const bgPlayerHuman = document.getElementById('human'); 
const bgPlayerIA = document.getElementById('ia'); 

// Btn
const r1c1 = document.getElementById('r1c1');
const r1c2 = document.getElementById('r1c2');
const r1c3 = document.getElementById('r1c3');

const r2c1 = document.getElementById('r2c1');
const r2c2 = document.getElementById('r2c2');
const r2c3 = document.getElementById('r2c3');

const r3c1 = document.getElementById('r3c1');
const r3c2 = document.getElementById('r3c2');
const r3c3 = document.getElementById('r3c3');

function set_jogadaUser(posiJogada){
    if(getBTN_disponivel(posiJogada) != true){
        songEffectAcessDenied.play();
    }else{
         // Parametro 1 = name button | Parametro 2 = which
         songEffectPress.play();
         setCampo_Jogado(posiJogada, 'x'); 
         if(verifyWinner('x') == true){ } else { disableButtons(true); jogadaIA(); }
    }
}

function getBTN_disponivel(name_btn){
    switch(name_btn){
        case '0': if(positionsGame[0] == 0){return true; }else{return false;} break;
        case '1': if(positionsGame[1] == 0){return true; }else{return false;} break;
        case '2': if(positionsGame[2] == 0){return true; }else{return false;} break;
        case '3': if(positionsGame[3] == 0){return true; }else{return false;} break;
        case '4': if(positionsGame[4] == 0){return true; }else{return false;} break;
        case '5': if(positionsGame[5] == 0){return true; }else{return false;} break;
        case '6': if(positionsGame[6] == 0){return true; }else{return false;} break;
        case '7': if(positionsGame[7] == 0){return true; }else{return false;} break;
        case '8': if(positionsGame[8] == 0){return true; }else{return false;} break;
    }
}

function setCampo_Jogado(name_btn, which){
    var text = document.createTextNode(which);
    switch(name_btn){
        case '0': positionsGame[0] = which; r1c1.appendChild(text); break;
        case '1': positionsGame[1] = which; r1c2.appendChild(text); break;
        case '2': positionsGame[2] = which; r1c3.appendChild(text); break;
        case '3': positionsGame[3] = which; r2c1.appendChild(text); break;
        case '4': positionsGame[4] = which; r2c2.appendChild(text); break;
        case '5': positionsGame[5] = which; r2c3.appendChild(text); break;
        case '6': positionsGame[6] = which; r3c1.appendChild(text); break;
        case '7': positionsGame[7] = which; r3c2.appendChild(text); break;
        case '8': positionsGame[8] = which; r3c3.appendChild(text); break;
    } console.log(positionsGame);
}
 
function jogadaIA(){
    /* var a = 0, b = 9;    
    var randomPosi = Math.floor(Math.random() * (b - a + 1)) + a; */
    var randomPosi;
    for(;;){
        if(verifyDis() == 0){
            verifyDraw();
            break;
        }else{
            randomPosi = Math.floor(Math.random() * (8 - 0 + 1)) + 0;
            randomPosi = randomPosi.toString();
            if(getBTN_disponivel(randomPosi) != true){ 
                continue; 
            }else{ 
                //Delay Play IA
                setTimeout(function(){
                    setCampo_Jogado(randomPosi, 'o'); 
                    if(verifyWinner('o') == true){ } else { disableButtons(false);}
                }, 2000);//1.5 second
                break;
            }
        }
    }
} 

function verifyWinner(player){
    for(var x = 0; x < 8; x++){ 
        if(positionsGame[winningCombinations[x][0]] == player && positionsGame[winningCombinations[x][1]] == player && positionsGame[winningCombinations[x][2]] == player)
        {
            if(player == 'x'){
                activeDivWin.style.display = 'flex';
                songEffectWin.play();
                return true;
            }else{
                activeDivWin.style.display = 'flex';
                songEffectLose.play();
                return true;
            }
            break;
        }else{
            verifyDraw();
        }
    }
}

function verifyDraw(){
    var cont = 0;
    for(var x = 0; x < positionsGame.length; x++){
        if(positionsGame[x] == 'x' || positionsGame[x] == 'o'){
            cont++;
        }
    }
    if(cont == 9){
        activeDivWin.style.display = 'flex';
        console.log('cheguei')
        /* songEffectLose.play(); */
    }
}

function disableButtons(value){
    if(value == true){
        disableButton.style.display = 'block';
        bgPlayerHuman.classList.remove("playingNow");
        bgPlayerIA.classList.add("playingNow");
    }else{
        disableButton.style.display = 'none';
        bgPlayerHuman.classList.add("playingNow");
        bgPlayerIA.classList.remove("playingNow");
    }
}

function verifyDis(){
    var cont = 0;
        for(var x = 0; x < positionsGame.length; x++){
            if(positionsGame[x] == 0){
                cont++;
            }
        }
        return cont; 
}


