import DatabaseService from './DatabaseService';
import Player from './Player';

const databaseService = new DatabaseService();
const examplePlayer = new Player(90909, 'Huhuh', 'Indonesia', 'no-photo', 99);

function executeReadPlayers() {
  databaseService
    .readPlayers()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(`doc id: ${doc.id}, name: ${doc.data().name}`);
      });
    });
}

function executeCreatePlayer(player) {
  databaseService
    .createPlayer(player)
    .then(() => console.log(`create success`))
    .catch((error => console.log(`create error: ${error.message}`)));
}

function executeUpdatePlayer(playerNik, data) {
  databaseService
    .updatePlayer(playerNik, data)
    .then(() => console.log('update success'))
    .catch((error) => console.log(`update error: ${error.message}`));
}

function executeDeletePlayer(playerNik) {
  databaseService
    .deletePlayer(playerNik)
    .then(() => console.log('delete success'))
    .catch((error) => console.log(`delete error: ${error.message}`));
}
