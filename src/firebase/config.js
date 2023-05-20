import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
    # Add your firebase configuration here
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const projectFirestore = firebase.firestore();

  export { projectFirestore };