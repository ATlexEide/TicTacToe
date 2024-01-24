const game = {
    gameActive: true,
    player: {
        name: 'Player',
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
        this.aliasInput = document.getElementById('alias-input');
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
        </div>
    <div class="alias-input-container">
        <input type="text" id="alias-input" placeholder="Alias">
    </div>`;
        this.cahceDOM();
    },
    writeGameboardHTML: function () {
        this.body.innerHTML = `
        <div class="container">
        <div id="gameboard">
        </div>
        <div id="score-container">${this.player.name}  ${this.player.points} - ${this.cpu.points}  CPU</div>
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
        this.addEventListenersToTiles();
    }
    ,
    writeWinnerHTML: function (winner, finalScore) {
        this.body.innerHTML = `
        <h1>${winner} won!</h1>
        <h2>Final score:</h2>
        <p>${finalScore}</p>
        <div id="button-container"><button id="play-again-btn">Play again</button></div>
        `;
        document.getElementById('play-again-btn').addEventListener('click', () => { game.reset() })
    },
    getPlayerName: function () {
        if (this.aliasInput.value) { this.player.name = this.aliasInput.value }
    }
    ,
    getClickedMarkerBtn: function () {
        this.playAsXBtn.addEventListener('click', () => {
            this.getPlayerName();
            this.chooseMarker('X');
            this.writeGameboardHTML();
        });
        this.playAsOBtn.addEventListener('click', () => {
            this.getPlayerName();
            this.chooseMarker('O');
            this.getCpuPlay();
            this.writeGameboardHTML();
        })
    },
    addEventListenersToTiles: function () {
        for (let i = 0; i < this.tiles.length; i++) {
            tile = this.tiles[i];
            if (!tile.innerHTML) {
                tile.addEventListener('click', () => {
                    this.getPlayerPlay(i);
                })
            }
        }
    }
    ,
    chooseMarker: function (marker) {
        this.player.marker = marker;
        if (this.player.marker === 'X' || this.player.marker === 'O') {
            console.log(`You chose ${this.player.marker}!`)
        }
    },
    getCpuPlay: function () {
        if (!this.gameActive) { return }
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
    },
    getPlayerPlay: function (tile) {
        if (!this.gameActive) { return };
        if (this.gameboard[tile] === '') {
            this.gameboard[tile] = this.player.marker;
            console.log('PLAYER PLACED HERE')
            this.displayConsoleBoard()
            this.checkForRoundWinCondition(this.player.marker)
        };
        this.getCpuPlay()
    }
    ,
    clearGameboard: function () {
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
            this.clearGameboard()
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

            this.clearGameboard()
            if (this.player.marker === currentMarker) { this.player.points++ }
            else { this.cpu.points++ }
        }
        else {
            this.checkForDrawCondition();
        };
        this.checkForGameWinCondition();
    },
    checkForGameWinCondition: function () {
        if (this.player.points === 3 || this.cpu.points === 3) {
            this.gameActive = false;
            let winner = ``;
            this.player.points === 3 ? winner = `${this.player.name}` : winner = 'CPU';
            let finalScore = `${this.player.name} ${this.player.points} : ${this.cpu.points} CPU`;
            this.writeWinnerHTML(winner, finalScore);
        }
    },
    reset: function () {
        this.player.points = 0;
        this.cpu.points = 0;
        this.init();
        this.gameActive = true;
    }
}
// game.init(prompt('X or O'))
game.init()