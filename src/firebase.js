import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBJ5YeF78pV7A6nKdlDyVRvn2IARkrzozY",
  authDomain: "nicroelectronics.firebaseapp.com",
  projectId: "nicroelectronics",
  storageBucket: "nicroelectronics.appspot.com",
  messagingSenderId: "587175585988",
  appId: "1:587175585988:web:d1e2d7cff02cb611024191",
  measurementId: "G-W30BJTWDM0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
//
