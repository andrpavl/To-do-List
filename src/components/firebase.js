// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCeYeV6DFwJ---DT9fLBKMrFIzdzEi4ipc',
  authDomain: 'todo-app-c78d2.firebaseapp.com',
  projectId: 'todo-app-c78d2',
  storageBucket: 'todo-app-c78d2.appspot.com',
  messagingSenderId: '252897898133',
  appId: '1:252897898133:web:66665eec74e1ea0f95f59c',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export  const db = getFirestore(app);
