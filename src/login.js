import React from 'react';
import { useState } from 'react';
import { firebaseApp } from './firebaseData/database'
import {
    getFirestore,
    collection,
    getDocs,
    snapshot
  } from "firebase/firestore";

const Login = () => {

    const [key, setKey] = useState();

    
  const db = getFirestore(firebaseApp)
  const colRef = collection(db, 'health')

  getDocs(colRef)
  .then((snapshot) => {
    console.log(snapshot.docs)
    let login = []
    snapshot.docs.map((log) => {
       setKey(login.push({...log.data(), id: log.id}))
    })
    console.log(login)
  }).catch(error => {
    console.log(error)
  })
  
    return(
        <>
            <h1>{console.log(key)}</h1>
        </>
    );
}

export default Login;

