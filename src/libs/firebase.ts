import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyCY1GFpI2T5NwU2LbFogWZzt_YjUZvqWI8",
  authDomain: "react-gallery-bf24d.firebaseapp.com",
  projectId: "react-gallery-bf24d",
  storageBucket: "react-gallery-bf24d.appspot.com",
  messagingSenderId: "186350715917",
  appId: "1:186350715917:web:09dbe5ce94dccfa4a50144"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);