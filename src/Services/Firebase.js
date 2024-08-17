import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';



const firebaseConfig = {
  apiKey: "AIzaSyDa37S3-oWQhC_iYmvz0qtj2zdRnSX8vrQ",
  authDomain: "tourbook2.firebaseapp.com",
  projectId: "tourbook2",
  storageBucket: "tourbook2.appspot.com",
  messagingSenderId: "355162731956",
  appId: "1:355162731956:web:443d76f1bd85b98cc46ee1"
  };
  const firebaseApp = initializeApp(firebaseConfig);
   const storage = getStorage(firebaseApp);

   export default storage;