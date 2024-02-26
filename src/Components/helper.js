import { NO_PLAYER } from "../Constants";

export const isWinner = (gameBoard, currentMove, currentPlayer) => {
    let board = [...gameBoard]
    board[currentMove] = currentPlayer;
    const winLines = [
        [0,1,2,3],
        [4,5,6,7],
        [8,9,10,11],
        [12,13,14,15],
        [0,4,8,12],
        [1,5,9,13],
        [2,6,10,14],
        [3,7,11,15],
        [0,5,10,15],
        [3,6,9,12],
    ];

    console.log("Checking for winner...");
    for (let i = 0; i < winLines.length; i++) {
        const [c1, c2, c3, c4] = winLines[i];

        if (board[c1] > 0 &&
            board[c1] === board[c2] &&
            board[c2] === board[c3] &&
            board[c3] === board[c4]) {
            return true;
        }
    }
    return false;
}
export const isDraw = (gameBoard) => {
    // Count the number of empty circles on the board
    let count = gameBoard.reduce((n, circle) => (circle === NO_PLAYER ? n + 1 : n), 0);

    // Check if the count is 0 and there's no winner
    return count === 0 && !isWinner(gameBoard);
}

