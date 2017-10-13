

class Model {
    constructor() {
        this.isXTurn = true; 
        this._boardState = Array(9).fill(null); 
    }
     
    triggerChange() {
        reloadViews(); 
    }
    
    modifyBoardState(index, value) {
        this._boardState[index] = value; 
        this.triggerChange(); 
    }

    getCurrentBoardState() {
        return this._boardState; 
    }


}

class Game {
     render() {
        let gameDiv = document.createElement('div');
        gameDiv.className = 'game';
        
        let board = new Board(); 
        gameDiv.appendChild(board.render()); 
        
        
        let historyDiv = document.createElement('div');
        historyDiv.className = 'game-info'; 
        gameDiv.appendChild(historyDiv); 
        
        return gameDiv; 
    }

}

class Board {
    
  render() {
        var containerDiv = document.createElement('div'); 
        containerDiv.className = 'game-board';
        
        var gameStatusDiv = document.createElement('div');
        gameStatusDiv.className = 'status';
        gameStatusDiv.innerHTML = getGameStatus(); 
        containerDiv.appendChild(gameStatusDiv); 
        
        // add 3 rows with 3 buttons each to make the board
        
        for (let i = 0; i < 3; i++) {
            let boardRowDiv = document.createElement('div');
            boardRowDiv.className = 'board-row';
            containerDiv.appendChild(boardRowDiv);
            
            for (let j = 0; j < 3; j++) {
                let squareButton = new Square(i*3 + j); 
                boardRowDiv.appendChild(squareButton.render());
            }
        }
        
        return containerDiv; 
    }
}


class Square {
    constructor(position) {
        this.position = position; 
    }
    
    handleClick(e) {
        let boardState = model.getCurrentBoardState(); 
        
        if (boardState[e.target.dataset.position] || calculateWinner()) 
            return; 
        
        model.modifyBoardState(this.position, model.isXTurn ? "X" : "O");  
        model.isXTurn = !model.isXTurn; 
    }


    assignClickHandler(squareButton) {
         squareButton.addEventListener("click", this.handleClick.bind(this) )
    }
    
    render() {
        let boardState = model.getCurrentBoardState(); 
        
        var squareButton = document.createElement('button');
        squareButton.className = 'square';
        squareButton.dataset.position = this.position;
        squareButton.innerHTML = boardState[this.position];
        this.assignClickHandler(squareButton); 
        return squareButton; 
    }
}






function getGameStatus() {
    
    let winner = calculateWinner(); 
    
    if (winner) {
        return "Player " + winner + " won!"; 
    } else if (!hasAvailableMove()) {
        return "Cats Game"; 
    } else {
        return  "Next player to move: " + (model.isXTurn ? "X" : "O"); 
    }

}


function hasAvailableMove() {
  let boardState = model.getCurrentBoardState(); 
  
  for (let i = 0; i < boardState.length; i++) {
      if (!boardState[i]) 
        return true; 
  }
  
  return false; 
  
}



function calculateWinner() {
        
     const lines = [
        [0, 1, 2], 
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ]; 
     
     let boardState = model.getCurrentBoardState(); 
     
     for (var i = 0; i < lines.length; i++) {
        var a = lines[i][0]; 
        var b = lines[i][1];
        var c = lines[i][2]; 
        
        
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
          return boardState[a]; 
        }
     }

     
     return null; 
          
}
    

function reloadViews() {
    removeViewsFromDOM(); 
    addViewsToDOM();
} 


function removeViewsFromDOM() {
    var rootDiv = document.getElementById("root");
    
    while (rootDiv.childElementCount > 0) {
        rootDiv.removeChild(rootDiv.firstChild);
    }
     
}

function addViewsToDOM() {
    var rootDiv = document.getElementById("root");
    rootDiv.appendChild(game.render()); 
}



let model = new Model(); 
let game = new Game(); 

document.addEventListener("DOMContentLoaded", function(event) {
    addViewsToDOM(game);  
}); 


