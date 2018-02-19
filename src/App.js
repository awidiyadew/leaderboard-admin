import readline from 'readline';
import LeaderBoard from './LeaderBoard';
import Player from "./Player";

/**
 * Interaction layer for LeaderBoard Application User
 */
class App {
  constructor() {
    this._rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this._leaderBoard = new LeaderBoard();
  }

  _prinIntroMenu() {
    console.log('\n\n');
    console.log('-----------------------------------------------');
    console.log('*----------- L E A D E R - B O A R D ---------*');
    console.log('-----------------------------------------------');
    console.log('1. CREATE PLAYER');
    console.log('2. READ PLAYERS LEADER BOARD');
    console.log('3. UPDATE PLAYER SCORE');
    console.log('4. DELETE PLAYER');
    console.log('5. EXIT');
    console.log('----------------------------------------------- \n\n');
  }

  startMenu() {
    this._prinIntroMenu();
    this._rl.on('line', (input) => {
      switch (input.trim()) {
        case '1':
          this.askPlayerData(this._rl)
            .then((player) => {
              this._leaderBoard.executeCreatePlayer(player);
            });
          break;
        case '2':
          this._leaderBoard.executeReadPlayers();
          break;
        case '3':
          this.updatePlayerScore(this._rl);
          break;
        case '4':
          this.ask(this._rl, 'nik')
            .then((answerNik) => {
              this._leaderBoard.executeDeletePlayer(answerNik);
            });
          break;
        case '5':
          this._rl.close();
          break;
        default:
          console.log('Invalid menu');
          break
      }
    });
  }

  askPlayerData(readline) {
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
      .catch((error) => console.log('error while ask player data ', error.message));
  }

  updatePlayerScore(readline) {
    let nik;
    return this.ask(readline, 'nik')
      .then((answerNik) => {
        nik = answerNik;
        return this.ask(readline, 'score');
      })
      .then((answerScore) => {
        this._leaderBoard.executeUpdatePlayerScore(Number(nik), Number(answerScore));
      });
  }

  ask(readline, question) {
    return new Promise((resolve) => {
      readline.question(`${question}: `, resolve);
    });
  }
}

const app = new App();
app.startMenu();

/*
const prom = () => new Promise(resolve => resolve('kambing kau'));
const otherProm = () => new Promise(resolve => resolve('ayam kau'));

async function getAll() {
  const res = await prom();
  const otherRes = await otherProm();
  console.log(res, otherRes);
}

getAll();*/
