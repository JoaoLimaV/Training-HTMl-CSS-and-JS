function array(array){
    for(var x = 0; x < array.length; x++){
        var cont;
        if(array[x] == 0){
            cont++;
        }

        if(x == 8){
            return cont; 
        }
    }
}

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

var positionsGame = [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
];

const songEffectWin = new Audio('song/song-winner.mp3');
const songEffectLose = new Audio('song/song-loser.mp3');
const songEffectPress = new Audio('song/song-press.mp3');

// disableButton.style.display=none;
const disableButton = document.getElementById('jogo-velha-fixed'); 

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
    if(getBTN_disponivel(posiJogada) == true){
        // Parametro 1 = name button | Parametro 2 = X(0) or O(1)
        setCampo_Jogado(posiJogada, 0); 
        songEffectPress.play();

       /*  jogadaIA(); */
        verifyWinner('x')
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
    var textX = document.createTextNode('x');
    var textO = document.createTextNode('o');

    if(which == 0){
        switch(name_btn){
            case '0': positionsGame[0] = 'x'; r1c1.appendChild(textX); break;
            case '1': positionsGame[1] = 'x'; r1c2.appendChild(textX); break;
            case '2': positionsGame[2] = 'x'; r1c3.appendChild(textX); break;
            case '3': positionsGame[3] = 'x'; r2c1.appendChild(textX); break;
            case '4': positionsGame[4] = 'x'; r2c2.appendChild(textX); break;
            case '5': positionsGame[5] = 'x'; r2c3.appendChild(textX); break;
            case '6': positionsGame[6] = 'x'; r3c1.appendChild(textX); break;
            case '7': positionsGame[7] = 'x'; r3c2.appendChild(textX); break;
            case '8': positionsGame[8] = 'x'; r3c3.appendChild(textX); break;
        }
    }else{
        switch(name_btn){
            case '0': positionsGame[0] = 'o'; r1c1.appendChild(textO); break;
            case '1': positionsGame[1] = 'o'; r1c2.appendChild(textO); break; 
            case '2': positionsGame[2] = 'o'; r1c3.appendChild(textO); break;
            case '3': positionsGame[3] = 'o'; r2c1.appendChild(textO); break;
            case '4': positionsGame[4] = 'o'; r2c2.appendChild(textO); break;
            case '5': positionsGame[5] = 'o'; r2c3.appendChild(textO); break;
            case '6': positionsGame[6] = 'o'; r3c1.appendChild(textO); break;
            case '7': positionsGame[7] = 'o'; r3c2.appendChild(textO); break;
            case '8': positionsGame[8] = 'o'; r3c3.appendChild(textO); break;
        }
    }
    /* console.log(positionsGame); */
}
 
function jogadaIA(){
    /* var a = 0, b = 9;    
    var randomNumber = Math.floor(Math.random() * (b - a + 1)) + a; */

    setCampo_Jogado(randomNumber, 1); 
    setValue_frontEnd(randomNumber, 1);
} 

function verifyWinner(player){
    for(var x = 0; x < 8; x++){ 
        if(positionsGame[winningCombinations[x][0]] == player && positionsGame[winningCombinations[x][1]] == player && positionsGame[winningCombinations[x][2]] == player)
        {
            if(player == 'x'){
                disableButton.style.display = 'flex';
                songEffectWin.play();
                break;
            }else{
                songEffectLose.play();
                break;
            }
        }
    }
}



