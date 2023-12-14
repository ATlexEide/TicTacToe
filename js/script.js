const game = {
    nextTurn: 'X'
    ,
    player: {
        points: 0,
        marker: '',
    },
    cpu: {
        points: 0,
        marker: '',

    },
    gameboard: [
        '', '', '',
        '', '', '',
        '', '', ''
    ],
    init: function (marker) {
        this.writeStartHTML();
        this.getClickedMarkerBtn();
    },
    cahceDOM: function () {
        this.tiles = document.getElementsByClassName('tile');
        this.body = document.body;
        this.playAsXBtn = document.getElementById('choose-marker-x');
        this.playAsOBtn = document.getElementById('choose-marker-o');
    },
    displayConsoleBoard: function () {
        console.log(this.gameboard[0]);
        console.log(this.gameboard[1]);
        console.log(this.gameboard[2]);
    },
    writeStartHTML: function () {
        document.body.innerHTML = `
        <h1>Choose your marker!</h1>
    <div class="marker-button-container">
        <button id="choose-marker-x">X</button>
        <button id="choose-marker-o">O</button>
    </div>`;
        this.cahceDOM();
    },
    writeGameboardHTML: function () {
        this.body.innerHTML = `
        <div class="container">
        <div id="gameboard">
        </div>
        </div>`;
        for (let i = 0; i < this.gameboard.length; i++) {
            let gameboardContainer = document.getElementById('gameboard');
            let tile = this.gameboard[i];
            let newDiv = document.createElement('div');
            newDiv.setAttribute('class', 'tile');
            newDiv.innerHTML = `${tile}`;
            gameboardContainer.appendChild(newDiv)
        };
        this.cahceDOM();
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
    getClickedMarkerBtn: function () {
        this.playAsXBtn.addEventListener('click', () => {
            this.chooseMarker('X');
        });
        this.playAsOBtn.addEventListener('click', () => {
            this.chooseMarker('O');
        })
    },
    chooseMarker: function (marker) {
        let chosenMarker = `${marker}`;


        chosenMarker === 'X' ? this.player.marker = 'X' :
            chosenMarker === 'O' ? this.player.marker = 'O' :
                console.log('Please choose X or O');
        if (chosenMarker === 'X' || chosenMarker === 'O') {
            console.log(`You chose ${this.player.marker}!`)
        }
        this.writeGameboardHTML();
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
        if (this.player.marker === 'X') { this.cpu.marker = 'O' }
        if (this.player.marker === 'O') { this.cpu.marker = 'X' }
        let tile = Math.floor(Math.random() * 9)
        if (this.gameboard[tile] === '') {
            this.gameboard[tile].value = this.cpu.marker;
            console.log(`CPU placed ${this.cpu.marker} at Tile: ${tile}`)
            this.displayConsoleBoard()
            this.checkForRoundWinCondition(this.cpu.marker)

        }
        else { this.getCpuPlay() }
        this.getPlayerPlay()
    },
    getPlayerPlay: function () {
        if (this.gameboard[tile] === '') {
            this.gameboard[tile].value = this.player.marker;
            console.clear()
            console.log(`PLAYER placed ${this.player.marker} at Tile: ${tile}`)
            this.displayConsoleBoard()
            this.checkForRoundWinCondition(this.player.marker)
        }
        else { this.getPlayerPlay() }
        this.getCpuPlay()
    },
    resetGameboard: function () {
        this.gameboard = [
            '', '', '',
            '', '', '',
            '', '', ''
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
            this.gameboard[0] === currentMarker && this.gameboard[1] === currentMarker && this.gameboard[2] === currentMarker ||
            this.gameboard[3] === currentMarker && this.gameboard[4] === currentMarker && this.gameboard[5] === currentMarker ||
            this.gameboard[6] === currentMarker && this.gameboard[7] === currentMarker && this.gameboard[8] === currentMarker ||
            // Check for vertical win
            this.gameboard[0] === currentMarker && this.gameboard[3] === currentMarker && this.gameboard[6] === currentMarker ||
            this.gameboard[1] === currentMarker && this.gameboard[4] === currentMarker && this.gameboard[7] === currentMarker ||
            this.gameboard[2] === currentMarker && this.gameboard[5] === currentMarker && this.gameboard[8] === currentMarker ||
            // Check for diagonal win
            this.gameboard[0] === currentMarker && this.gameboard[4] === currentMarker && this.gameboard[8] === currentMarker ||
            this.gameboard[2] === currentMarker && this.gameboard[4] === currentMarker && this.gameboard[6] === currentMarker) {

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