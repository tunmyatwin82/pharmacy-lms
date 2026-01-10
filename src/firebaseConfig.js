import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Firestore ကို ထည့်သွင်းပါ
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBHBkS3DJZUmBhRR-1Y_N_OA9AvEBXamtA",
  authDomain: "drtunpharmacyschool.firebaseapp.com",
  projectId: "drtunpharmacyschool",
  storageBucket: "drtunpharmacyschool.firebasestorage.app",
  messagingSenderId: "674348386788",
  appId: "1:674348386788:web:691cf4d10f226bef455ff1",
  measurementId: "G-0SM0J0QJTK"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // ဒီတစ်ကြောင်းက Database နဲ့ ချိတ်ဆက်ပေးမှာပါ
export const auth = getAuth(app);