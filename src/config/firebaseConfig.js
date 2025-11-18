// src/config/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC8TtqoDeKnNp8mKrdKRsVRUhDGLWl233w',
  authDomain: 'proyectoreact-5c75d.firebaseapp.com',
  projectId: 'proyectoreact-5c75d',
  storageBucket: 'proyectoreact-5c75d.firebasestorage.app',
  messagingSenderId: '24560778616',
  appId: '1:24560778616:web:49f193497aef45ab259c8d',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
