import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCeNrhRa6laBC-CcpEN11mTuCUjqpuTxgM",
  authDomain: "styles-bazar.firebaseapp.com",
  projectId: "styles-bazar",
  storageBucket: "styles-bazar.firebasestorage.app",
  messagingSenderId: "638556724690",
  appId: "1:638556724690:web:e6514e596b95a2805f3c0b",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export default app;