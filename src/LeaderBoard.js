import DatabaseService from './DatabaseService';

/**
 * Represent possible action in leaderboard aplication
 */
export default class LeaderBoard {
  constructor() {
    this._databaseService = new DatabaseService();
  }

  executeReadPlayers() {
    databaseService
      .readPlayers()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(`doc id: ${doc.id}, name: ${doc.data().name}`);
        });
      });
  }

  executeCreatePlayer(player) {
    databaseService
      .createPlayer(player)
      .then(() => console.log(`create success`))
      .catch((error => console.log(`create error: ${error.message}`)));
  }

  executeUpdatePlayer(playerNik, data) {
    databaseService
      .updatePlayer(playerNik, data)
      .then(() => console.log('update success'))
      .catch((error) => console.log(`update error: ${error.message}`));
  }

  executeDeletePlayer(playerNik) {
    databaseService
      .deletePlayer(playerNik)
      .then(() => console.log('delete success'))
      .catch((error) => console.log(`delete error: ${error.message}`));
  }
}
