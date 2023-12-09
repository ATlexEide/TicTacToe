
const game = {
    player: {
        points: null,
        marker: '',
    },
    gameboard: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ],
    displayConsoleBoard: function () {
        console.log(this.gameboard[0]);
        console.log(this.gameboard[1]);
        console.log(this.gameboard[2]);
    },
    //For later
    cahcedDOM: null
    ,
    init: function (marker) {
        this.chooseMarker(marker)

    },
    chooseMarker: function (choice) {
        let chosenMarker = choice.toUpperCase();
        console.log(chosenMarker)
        chosenMarker === 'X' ? this.player.marker = 'X' :
            chosenMarker === 'O' ? this.player.marker = 'O' :
                console.log('Please choose X or O');
        if (chosenMarker === 'X' || chosenMarker === 'O') {
            console.log(`You chose ${this.player.marker}!`)
        }
        this.playTurn();
    },
    playTurn: function () {
        if (this.player.marker === 'O') {
            this.getCpuPlay();
            console.log(this.checkForWinCondition('X'));
        }
        else {
            this.getPlayerPlay();
        }
        displayConsoleBoard()
    },
    getCpuPlay: function () {
        let cpuMarker = '';
        if (this.player.marker === 'X') { cpuMarker = 'O' }
        if (this.player.marker === 'O') { cpuMarker = 'X' }
        let row = Math.floor(Math.random() * 3)
        let tile = Math.floor(Math.random() * 3)
        if (this.gameboard[row][tile] === '') {
            this.gameboard[row].splice(tile, 1, cpuMarker)
            console.clear()
            console.log(`CPU placed ${cpuMarker} at ${row}, ${tile}`)
            this.displayConsoleBoard()
            this.checkForWinCondition(cpuMarker)

        }
        else { this.getCpuPlay() }
        this.getPlayerPlay()
    },
    getPlayerPlay: function () {
        let row = prompt('Choose row number')
        let tile = prompt('Choose tile number')
        if (this.gameboard[row][tile] === '') {
            this.gameboard[row].splice(tile, 1, this.player.marker);
            console.clear()
            console.log(`PLAYER placed ${this.player.marker} at ${row}, ${tile}`)
            this.displayConsoleBoard()
            this.checkForWinCondition(this.player.marker)
        }
        else { this.getPlayerPlay() }
        this.getCpuPlay()
    },
    checkForWinCondition: function (marker) {
        let currentMarker = marker;
        if (//Check for horizontal win
            this.gameboard[0][0] === currentMarker && this.gameboard[0][1] === currentMarker && this.gameboard[0][2] === currentMarker ||
            this.gameboard[1][0] === currentMarker && this.gameboard[1][1] === currentMarker && this.gameboard[1][2] === currentMarker ||
            this.gameboard[2][0] === currentMarker && this.gameboard[2][1] === currentMarker && this.gameboard[2][2] === currentMarker ||
            // Check for vertical win
            this.gameboard[0][0] === currentMarker && this.gameboard[1][0] === currentMarker && this.gameboard[2][0] === currentMarker ||
            this.gameboard[0][1] === currentMarker && this.gameboard[1][1] === currentMarker && this.gameboard[2][1] === currentMarker ||
            this.gameboard[0][2] === currentMarker && this.gameboard[1][2] === currentMarker && this.gameboard[2][2] === currentMarker ||
            // Check for diagonal win
            this.gameboard[0][0] === currentMarker && this.gameboard[1][1] === currentMarker && this.gameboard[2][2] === currentMarker ||
            this.gameboard[0][2] === currentMarker && this.gameboard[1][1] === currentMarker && this.gameboard[2][0] === currentMarker) {
            alert(`${currentMarker} win`)
        }
        else { return `Undecided, keep playing` }
    }
}
game.init(prompt())