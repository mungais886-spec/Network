import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const app= initializeApp({
  apiKey: "AIzaSyBuTXMa3bPCZO8ddHcM9dznObrHk2DoqOY",
  authDomain: "project-d6076ba5-5d22-4461-8a1.firebaseapp.com",
  projectId: "project-d6076ba5-5d22-4461-8a1",
  storageBucket: "project-d6076ba5-5d22-4461-8a1.firebasestorage.app",
  messagingSenderId: "111607921511",
  appId: "1:111607921511:web:854d4ccfacb930815e4dc2",
  measurementId: "G-X7SQ9ERW9M"
});

// const app = initializeApp({
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
// });

export const db = getFirestore(app);
export const auth = getAuth(app);

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBuTXMa3bPCZO8ddHcM9dznObrHk2DoqOY",
//   authDomain: "project-d6076ba5-5d22-4461-8a1.firebaseapp.com",
//   projectId: "project-d6076ba5-5d22-4461-8a1",
//   storageBucket: "project-d6076ba5-5d22-4461-8a1.firebasestorage.app",
//   messagingSenderId: "111607921511",
//   appId: "1:111607921511:web:854d4ccfacb930815e4dc2",
//   measurementId: "G-X7SQ9ERW9M"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);