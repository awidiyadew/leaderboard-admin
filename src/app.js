import { firebase } from '@firebase/app';
import '@firebase/firestore';
import dotenv from 'dotenv';
dotenv.config();

function init() {
  const config = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId
  };
  firebase.initializeApp(config);
  const firestore = firebase.firestore();
  firestore
    .collection('players')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().name}`);
      });
    });

}

init();