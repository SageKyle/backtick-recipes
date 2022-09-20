import firebase from 'firebase/app';
import 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAP0HMBg5Bc-pPFCpE_vxDiJ854Dhkmrw8',
  authDomain: 'backtick-recipes.firebaseapp.com',
  projectId: 'backtick-recipes',
  storageBucket: 'backtick-recipes.appspot.com',
  messagingSenderId: '973882683971',
  appId: '1:973882683971:web:0fe1bb051eebda6de71af6',
  measurementId: 'G-YEWQCG36J5',
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();

export { projectFirestore };
