import DatabaseService from './DatabaseService';

/**
 * Represent possible action in leaderboard aplication
 */
export default class LeaderBoard {
  constructor() {
    this._databaseService = new DatabaseService();
  }

  executeReadPlayers() {
    this._databaseService
      .readPlayers()
      .then((querySnapshot) => {
        let position = 1;
        querySnapshot.forEach((snapshot) => {
          const player = snapshot.data();
          console.log(`[${position}] ${snapshot.id} - ${player.name}`);
          position++;
        });
      });
  }

  executeCreatePlayer(player) {
    this._databaseService
      .createPlayer(player)
      .then(() => console.log(`create success`))
      .catch((error => console.log(`create error: ${error.message}`)));
  }

  executeUpdatePlayer(playerNik, data) {
    this._databaseService
      .updatePlayer(playerNik, data)
      .then(() => console.log('update success'))
      .catch((error) => console.log(`update error: ${error.message}`));
  }

  executeUpdatePlayerScore(playerNik, score) {
    this.executeUpdatePlayer(playerNik, {score});
  }

  executeDeletePlayer(playerNik) {
    this._databaseService
      .deletePlayer(playerNik)
      .then(() => console.log('delete success'))
      .catch((error) => console.log(`delete error: ${error.message}`));
  }
}
