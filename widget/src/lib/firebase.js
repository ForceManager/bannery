import { firebase } from '@firebase/app';

import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBKscLpzJHy-BmMCmdhE612k15Sg-0nTS4',
  authDomain: 'bannery-b8408.firebaseapp.com',
  databaseURL: 'https://bannery-b8408.firebaseio.com',
  projectId: 'bannery-b8408',
  storageBucket: 'bannery-b8408.appspot.com',
  messagingSenderId: '653708426012',
  appId: '1:653708426012:web:9223b168505311fb1718d9',
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
