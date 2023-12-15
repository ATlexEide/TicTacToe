const game = {
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
        this.body = document.body;
        this.tiles = document.getElementsByClassName('tile');
        this.playAsXBtn = document.getElementById('choose-marker-x');
        this.playAsOBtn = document.getElementById('choose-marker-o');
    },
    displayConsoleBoard: function () {
        console.log(this.gameboard)
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
            newDiv.setAttribute('id', `${i}`);
            newDiv.innerHTML = `${tile}`;
            gameboardContainer.appendChild(newDiv)
        };
        this.cahceDOM();
        this.getClickedTile();

    }
    ,
    getClickedMarkerBtn: function () {
        this.playAsXBtn.addEventListener('click', () => {
            this.chooseMarker('X');
        });
        this.playAsOBtn.addEventListener('click', () => {
            this.chooseMarker('O');
        })
    },
    getClickedTile: function () {
        for (let i = 0; i < this.tiles.length; i++) {
            tile = this.tiles[i];
            tile.addEventListener('click', () => {
                this.getPlayerPlay(i);
            })
        }
    }
    ,
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
        }
        this.displayConsoleBoard()
    },
    getCpuPlay: function () {
        if (this.player.marker === 'X') { this.cpu.marker = 'O' }
        if (this.player.marker === 'O') { this.cpu.marker = 'X' }
        let tile = Math.floor(Math.random() * 9);
        if (this.gameboard[tile] === '') {
            this.gameboard[tile] = this.cpu.marker;
            console.log(`CPU placed ${this.cpu.marker} at Tile: ${tile}`);
            this.displayConsoleBoard();
            this.checkForRoundWinCondition(this.cpu.marker);
            this.writeGameboardHTML();

        }
        else { this.getCpuPlay() }
        this.getClickedTile()
    },
    getPlayerPlay: function (tile) {
        if (this.gameboard[tile] === '') {
            this.gameboard[tile] = this.player.marker;
            console.clear()
            console.log(`PLAYER placed ${this.player.marker} at Tile: ${tile}`)
            this.displayConsoleBoard()
            this.checkForRoundWinCondition(this.player.marker)
            this.writeGameboardHTML();
        }
        else { this.getClickedTile() }
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
        let usedTiles = 0;
        for (let i = 0; i < this.gameboard.length; i++) {
            let tile = this.gameboard[i];
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