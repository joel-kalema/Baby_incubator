import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  getDocs
} from "firebase/firestore";
import { initializeApp } from 'firebase/app';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyD-s6tdjiEsAY8_9vsSR5b0C8SCp8sP-Dg",
  authDomain: "incubator-792ad.firebaseapp.com",
  databaseURL: "https://incubator-792ad-default-rtdb.firebaseio.com",
  projectId: "incubator-792ad",
  storageBucket: "incubator-792ad.appspot.com",
  messagingSenderId: "544622898492",
  appId: "1:544622898492:web:cb3ab1c97360065f6d8239"
});

const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)

console.log(db)


// initializeApp(firebaseConfig)
// const db = getFirestore()
// const colRef = collection(db, 'books')
// getDocs(colRef)
//   then((snapshot) => {
//     console.log(snapshot.docs)
//   })

