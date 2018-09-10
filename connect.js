let columnPlacement = document.getElementById("background");
let currentPlayerPiece = "player1";
let nextPlayerPiece = "player2";
let totalMoves = 0 // set constant to determine if the game is a draw see line 53 //
let winner = 0;


let board = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
]


// dynamically create 7 columns, add class & unique id //
for (let i = 0; i < 7; i++) {
    let rectangle = document.createElement("div");
    rectangle.setAttribute("class", "column");
    let columnId = "column-" + i;
    rectangle.setAttribute("id", columnId);
    columnPlacement.appendChild(rectangle);



    // create an action whenever user clicks & identify the clicked column //
    rectangle.addEventListener("click", clickEvent);

}



function clickEvent(event) {
    const column = event.currentTarget;
    // separates the column id numeral //
    const columnIndex = column.id.split('-')[1];
    const squaresInColumn = document.querySelectorAll(`#${column.id} .square`); // '#' + column.id + ' .square'
    const squareCountInColumn = squaresInColumn.length;



    // create a new div whenever and wherever a click occurs //
    let square = document.createElement("div");
    square.classList.add("square")
    square.classList.add(currentPlayerPiece);
    let squareIndex = squareCountInColumn;
    square.id = "square-" + squareIndex;
    // prevents additional moves if a winner has been declared. //
    if (winner < 1) {
        // prevents more than 6 game pieces per column //
        if (squareIndex < 6) {
            column.appendChild(square);
        }
    }



    if (currentPlayerPiece === "player1") {
        board[squareIndex][columnIndex] = 1;
        columnPlacement.setAttribute("class", "board blackCursor");
    } else {
        board[squareIndex][columnIndex] = 2;
        columnPlacement.setAttribute("class", "board redCursor");
    }


    // Set edges for the playing board //
    // Edges will prevent player from going beyond the bounds" while determining the winner. //
    const edgeX = board[0].length - 3;
    const edgeY = board.length - 3;

    // search for 4 chips in a row horizontally //
    // iterate each row 
    for (let y = 0; y < board.length; y++) {

        // iterate each cell in the row
        for (let x = 0; x < edgeX; x++) {
            let cell = board[y][x];

            // Only check if cell is filled
            if (cell !== 0) {

                // Check the next two cells for the same value
                if (cell === board[y][x + 1] && cell === board[y][x + 2] && cell === board[y][x + 3]) {
                    winner = winner + 1; // see line 6, "let winner = 0" // 
                }
            }
        }
    }
    // search for 4 in a row vertically //
    // iterate each row   
    for (let y = 0; y < edgeY; y++) {

        // iterate each cell in the row
        for (let x = 0; x < board[0].length; x++) {
            cell = board[y][x];

            // Only check if cell is filled
            if (cell !== 0) {

                // Check the next two cells for the same value
                if (cell === board[y + 1][x] && cell === board[y + 2][x] && cell === board[y + 3][x]) {
                    winner = winner + 1; // see line 6, "let winner = 0" //
                }
            }
        }
    }

    // search for 4 in a row diagonally (down towards the right of the board) *up right in game* //
    // iterate each row   
    for (let y = 0; y < edgeY; y++) {

        // iterate each cell in the row
        for (let x = 0; x < edgeX; x++) {
            cell = board[y][x];

            // Only check if cell is filled
            if (cell !== 0) {

                // Check the next two cells for the same value
                if (cell === board[y + 1][x + 1] && cell === board[y + 2][x + 2] && cell === board[y + 3][x + 3]) {
                    winner = winner + 1; // see line 6, "let winner = 0" //
                }
            }
        }
    }

    // search for 4 in a row diagonally (going down towards the left of the board) *up left in game // 
    // iterate each row   
    for (let y = 3; y < board.length; y++) {

        // iterate each cell in the row
        for (let x = 0; x < edgeX; x++) {
            cell = board[y][x];

            // Only check if cell is filled
            if (cell !== 0) {

                // Check the next two cells for the same value
                if (cell === board[y - 1][x + 1] && cell === board[y - 2][x + 2] && cell === board[y - 3][x + 3]) {
                    winner = winner + 1; // see line 6, "let winner = 0" //
                }
            }
        }
    }


    let playerPieceTemporaryHolder = currentPlayerPiece;
    currentPlayerPiece = nextPlayerPiece;
    nextPlayerPiece = playerPieceTemporaryHolder;
    // Increase totalMoves count. If totalMoves reach 42 moves, then a draw is declared. //
    totalMoves = totalMoves + 1;
    if (totalMoves == 42) {
        document.getElementById("message").textContent = "We have a DRAW!";
    }

    // If winner==1, a winner is declared; otherwise, play continues. //
    if (winner == 1) {
        document.getElementById("message").textContent = "Winner!";
    }
}