const game = {
    nextTurn: 'X'
    ,
    player: {
        points: 0,
        marker: 'X',
    },
    cpu: {
        points: 0,
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
    cahceDOM: function () {
        this.tiles = document.getElementsByClassName('tile');
        this.body = document.body;
    },
    writeStartHTML: function () {
        this.body.innerHTML = `
        <h1>Choose your marker!</h1>
    <div class="marker-button-container">
        <button id="choose-marker-x">X</button>
        <button id="choose-marker-o">O</button>
    </div>`
    },
    writeGameboardHTML: function () {
        this.body.innerHTML = `
        <div class="container">
            <div class="gameboard">
                <div id="top-row" class="rows">
                    <div class="tile"></div>
                    <div class="tile"></div>
                    <div class="tile"></div>
                </div>
                <div id="middle-row" class="rows">
                    <div class="tile"></div>
                    <div class="tile"></div>
                    <div class="tile"></div>
                </div>
                <div id="bottom-row" class="rows">
                    <div class="tile"></div>
                    <div class="tile"></div>
                    <div class="tile"></div>
                </div>
            </div>
    </div>`
    }
    ,
    placeMarker: function () {
        for (let i = 0; i < this.tiles.length; i++) {
            let tile = this.tiles[i]
            tile.addEventListener('click', () => {
                let marker = '';
                if (this.nextTurn === 'player') { marker = this.player.marker; }
                if (this.nextTurn === 'cpu') { marker = this.cpu.marker; }
                tile.innerHTML = `${marker}`;
            });
        };
    },
    init: function (marker) {
        // this.chooseMarker(marker);
        this.cahceDOM();
        this.placeMarker();
        this.writeStartHTML();
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
            console.log(this.checkForRoundWinCondition('X'));
        }
        else {
            this.getPlayerPlay();
        }
        displayConsoleBoard()
    },
    getCpuPlay: function () {
        if (this.player.marker === 'X') { cpu.marker = 'O' }
        if (this.player.marker === 'O') { cpu.marker = 'X' }
        let row = Math.floor(Math.random() * 3)
        let tile = Math.floor(Math.random() * 3)
        if (this.gameboard[row][tile] === '') {
            this.gameboard[row].splice(tile, 1, cpu.marker)
            console.log(`CPU placed ${cpu.marker} at Row: ${row}, Tile: ${tile}`)
            this.displayConsoleBoard()
            this.checkForRoundWinCondition(cpu.marker)

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
            console.log(`PLAYER placed ${this.player.marker} at Row: ${row}, Tile: ${tile}`)
            this.displayConsoleBoard()
            this.checkForRoundWinCondition(this.player.marker)
        }
        else { this.getPlayerPlay() }
        this.getCpuPlay()
    },
    resetGameboard: function () {
        this.gameboard = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
    },
    checkForDrawCondition: function () {
        let fullGameboard = this.gameboard[0].concat(this.gameboard[1]).concat(this.gameboard[2]);
        let usedTiles = 0;
        for (let i = 0; i < fullGameboard.length; i++) {
            let tile = fullGameboard[i];
            if (tile !== '') {
                usedTiles++
            }
        }
        console.log(`Used tiles: ${usedTiles}`)
        if (usedTiles === 9) {
            console.log('ITS A DRAW')
            this.resetGameboard()
        }
    },
    checkForRoundWinCondition: function (marker) {
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

            this.resetGameboard()
            if (this.player.marker === currentMarker) { this.player.points++ }
            else { this.cpu.points++ }
            alert(`${currentMarker} win \n
            Player: ${this.player.points}   CPU:${this.cpu.points}`);

        }
        else {
            this.checkForDrawCondition();
        };
        this.checkForGameWinCondition();
    },
    checkForGameWinCondition: function () {
        if (this.player.points === 3 || this.cpu.points === 3) {
            let winner = '';
            this.player.points === 3 ? winner = 'PLAYER WON' : winner = 'CPU WON';
            alert(winner);
            this.reset();
        }
    },
    reset: function () {
        this.player.points = 0;
        this.cpu.points = 0;
        this.resetGameboard();
        this.init(prompt('X or O'));
    }
}
// game.init(prompt('X or O'))
game.init()