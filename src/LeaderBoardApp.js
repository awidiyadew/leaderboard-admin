import readline from 'readline';
import LeaderBoard from './LeaderBoard';
import Player from "./Player";

/**
 * Interaction layer for LeaderBoard Application User
 */
export default class LeaderBoardApp {
  constructor() {
    this._rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this._leaderBoard = new LeaderBoard();
  }

  _prinIntroMenu() {
    console.log('-----------------------------------------------');
    console.log('*----------- L E A D E R - B O A R D ---------*');
    console.log('-----------------------------------------------');
    console.log('1. TO CREATE PLAYER');
    console.log('----------------------------------------------- \n');
  }

  startMenu() {
    this._prinIntroMenu();
    this._rl.on('line', (input) => {
      switch (input.trim()) {
        case '1':
          this.askPlayerInput(this._rl)
            .then((player) => {
              this._leaderBoard.executeCreatePlayer(player);
            })
            .catch((error) => console.log('error while ask player data ', error.message));
          break;
        case 'q':
          this._rl.close();
          break;
        default:
          console.log('Invalid menu');
          break
      }
    });
  }

  askPlayerInput(readline) {
    let _nik, _name, _score, _nationality, _photo;
    return this.ask(readline, 'nik')
      .then((nik) => {
        _nik = nik;
        return this.ask(readline, 'name');
      })
      .then((name) => {
        _name = name;
        return this.ask(readline, 'nationality');
      })
      .then((nationality) => {
        _nationality = nationality;
        return this.ask(readline, 'photo');
      })
      .then((photo) => {
        _photo = photo;
        return this.ask(readline, 'score');
      })
      .then((score) => {
        _score = score;
        return new Player(Number(_nik), _name, _nationality, _photo, Number(_score));
      })
  }

  ask(readline, question) {
    return new Promise((resolve) => {
      readline.question(`${question}: `, resolve);
    });
  }
}

const app = new LeaderBoardApp();
app.startMenu();