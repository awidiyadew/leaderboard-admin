import { firebase } from '@firebase/app';
import '@firebase/firestore';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Represent a service to connect with database
 */
export default class DatabaseService {
  constructor() {
    const config = {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      databaseURL: process.env.DATABASE_URL,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID
    };
    firebase.initializeApp(config);

    this._firestore = firebase.firestore();
    this._COLLECTION_NAME = 'players';
  }

  readPlayers() {
    return this._firestore
      .collection(this._COLLECTION_NAME)
      .orderBy('score', 'desc')
      .get();
  }

  createPlayer(player) {
    return this._firestore
      .collection(this._COLLECTION_NAME)
      .doc(player.getNik())
      .set(player.toObject());
  }

  updatePlayer(playerNik, data) {
    return this._firestore
      .collection(this._COLLECTION_NAME)
      .doc(playerNik.toString())
      .update(data);
  }

  updatePlayerScore(playerNik, score) {
    return this.updatePlayer(playerNik, { score });
  }

  deletePlayer(playerNik) {
    return this._firestore
      .collection(this._COLLECTION_NAME)
      .doc(playerNik.toString())
      .delete();
  }
}
