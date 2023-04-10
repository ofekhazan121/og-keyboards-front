import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyBVOD6Mr6Tsa3rPNBEPK0c79nMk8jo_s20",
  authDomain: "ogkeys-5f388.firebaseapp.com",
  projectId: "ogkeys-5f388",
  storageBucket: "ogkeys-5f388.appspot.com",
  messagingSenderId: "114784248124",
  appId: "1:114784248124:web:11407b995c1056a6167e39",
  measurementId: "G-R202ZH4FXP"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app)