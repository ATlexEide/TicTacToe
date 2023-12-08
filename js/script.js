let game = (function () {
    let gameboard = [
        ['X', '', ''],
        ['X', '', ''],
        ['X', '', '']
    ];

    checkForWinCondition = function (marker) {
        let currentMarker = marker;
        if (//Check for horizontal win
            gameboard[0][0] === currentMarker && gameboard[0][1] === currentMarker && gameboard[0][2] === currentMarker ||
            gameboard[1][0] === currentMarker && gameboard[1][1] === currentMarker && gameboard[1][2] === currentMarker ||
            gameboard[2][0] === currentMarker && gameboard[2][1] === currentMarker && gameboard[2][2] === currentMarker ||
            // Check for vertical win
            gameboard[0][0] === currentMarker && gameboard[1][0] === currentMarker && gameboard[2][0] === currentMarker ||
            gameboard[0][1] === currentMarker && gameboard[1][1] === currentMarker && gameboard[2][1] === currentMarker ||
            gameboard[0][2] === currentMarker && gameboard[1][2] === currentMarker && gameboard[2][2] === currentMarker ||
            // Check for diagonal win
            gameboard[0][0] === currentMarker && gameboard[1][1] === currentMarker && gameboard[2][2] === currentMarker ||
            gameboard[0][2] === currentMarker && gameboard[1][1] === currentMarker && gameboard[2][0] === currentMarker) { return `${currentMarker} win` }
    };

    let currentRound = 0;
    getCurrentRound = function () {
        return currentRound;
    }
    playTurn = function (player, tile) {
        currentRound += 1;

        return;
    };
    return {
        gameboard: gameboard,
        currentRound: getCurrentRound,
        checkForWinCondition: checkForWinCondition,
    };
})();

const markerOptions = ['X', 'O'];
const x = markerOptions[0];
const o = markerOptions[1];




function createPlayer(chosenMarker) {
    const getChosenMarker = function () {
        marker = chosenMarker;
        return marker;
    };
    let points = 0;
    const addRoundWin = function () {
        points += 1;
        return points;
    };
    return {
        points: points,
        marker: getChosenMarker,
        addRoundWin: addRoundWin
    };
};
const player = createPlayer(x);
const cpu = createPlayer(o);


console.log(player.marker());
console.log(game.gameboard[0]);
console.log(game.gameboard[1]);
console.log(game.gameboard[2]);
console.log(game.checkForWinCondition(cpu.marker()));