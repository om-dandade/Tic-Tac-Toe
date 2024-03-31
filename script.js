console.log("JavaScript is Running!!");

//GAME BORAD AND PLAYER CONSTRUCTOR
const gameBorad = function(){
    const grid = [['X', 'X', 'X'],[0, 0, 0],[0, 0, 0]];
    let totalTurns = 0;
    const printBoard = ()=>{
        grid.forEach(row=>{
            console.log(row);
        })
    };
    const isWin = (i, j)=>{
        const cur = grid[i][j];
        let flag = true;
        
        //cheking rows
        for(let ele of grid[i]){
            if(ele != cur){
                flag = false;
                break;
            }
        };
        if(flag)return true;
        
        //checking for coloums
        flag = true;
        for(let row = 0; row < 3; row++){
            if(grid[row][j] != cur){
                flag = false;
                break;
            }
        };
        if(flag)return true;

        //checking diagonal 1
        flag = true;
        for(let row = 0, col = 0; row < 3;){
            if(grid[row][col] != cur){
                flag = false;
                break;
            }
            row++;col++;
        }
        if(flag)return true;
        
        //cheking diagonal 2
        flag = true;
        for(let row = 0, col = 2; row < 3;){
            if(grid[row][col] != cur){
                flag = false;
                break;
            }
            row++;col--;
        }
        if(flag)return true;
        return false;
    };
    const reset = ()=>{
        grid.forEach(row =>{
            for(let i = 0; i < 3; i++){
                row[i] = 0;
            }
        })
    };
    return{grid, totalTurns, printBoard, isWin, reset};
}();
function createPlayer(name){
    return {name};
};

//START BUTTON BEHAVIOR
const startButton = document.getElementById("startButton");
startButton.addEventListener("click", ()=>{
    startGame();
})

//ADDING EVENT LISTER TO GAME BUTTONS
const gameButtons = document.querySelectorAll(".gameButton");
gameButtons.forEach(button =>{
    button.addEventListener('click', ()=>{
        gameButtonPressed(button);
    });
});

//Page Elements
const game = document.querySelector(".game");

//GAME CONTROLLER
const players = [createPlayer("player1"), createPlayer("player2")];
const sing = ['X', 'O'];
let turn = 0;
var gameOver = false;

//Game Button pressed
function gameButtonPressed(button){
    const [i, j] = button.value.split(" ");
    if(gameOver || gameBorad.grid[i][j] != 0)return;

    button.textContent = sing[turn];
    gameBorad.grid[i][j] = sing[turn];
    if(gameBorad.isWin(i, j)){
        winMsg(players[turn].name);
        gameOver = true;
    }

    turn = (turn + 1) % 2;
}

function resetGame(){
    gameButtons.forEach(button =>{
        button.textContent = "";
    });
}

function startGame(){
    gameBorad.reset();
    resetGame();
    game.style.display = "block";
    startButton.textContent = "Restart";
    gameOver = false;
    turn = 0;
}

const winDialog = document.getElementById("winDialog");
function winMsg(name){
    winDialog.querySelector("h2").textContent = name + " Wins!";
    winDialog.showModal();
}