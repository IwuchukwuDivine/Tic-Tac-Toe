const boxes = Array.from(document.querySelectorAll('.boxes'));
let winStatus = document.querySelector('.status');
let restartBtn = document.querySelector('button');

let currentPlayer = 'X';
let spaces = Array(9).fill(null);


const winningOptions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

boxes.forEach((box) => {
  box.addEventListener('click', boxClicked);
})

restartBtn.addEventListener('click', restartGame);

function boxClicked(e) {
 const id = e.target.id;
 if (!spaces[id]) {
  spaces[id] = currentPlayer;
  e.target.innerHTML = currentPlayer;
  
  if (CheckWin() !== false) {
    winStatus.innerHTML = `${currentPlayer} has won!`;
    let winningBlocks = CheckWin();
    console.log(winningBlocks);
    winningBlocks.forEach((box) => {
      boxes[box].style.backgroundColor = '#F72798';
    });

    // disable click event for all boxes
    boxes.forEach(box => {
      box.removeEventListener('click', boxClicked);
    });
  } else if (spaces.every(space => space !== null)) {
    // Check for draw condition
    winStatus.innerHTML = `It's a draw!`;
  }
 }
 currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';
 console.log(id);
}

function restartGame() {
   spaces.fill(null);
   boxes.forEach(box => {
    box.innerHTML = "";
    box.style.backgroundColor = 'transparent';
   })
    currentPlayer = "X";
    winStatus.innerHTML = `Tic Tac Toe`;

    // re-enable click event for the boxes
    boxes.forEach(box => {
      box.addEventListener('click', boxClicked);
    });
}

function CheckWin() {
  for (const condition of winningOptions) {
    let [a, b, c] = condition;
    if(spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
      return [a, b, c];
    } 
  } 
  
  return false;
}