import './App.css';
import { uid } from 'uid';
import { getDatabase,ref, onValue} from 'firebase/database'
import {
  getFirestore,
  collection,
  getDocs,
  snapshot
} from "firebase/firestore";
import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import userEvent from '@testing-library/user-event';

function App() {
  const [health, sethealth] = useState([])

  useEffect(() => {
    onValue(ref(db), snapshot => {
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((hth) => {
          sethealth(health => [...health, hth])
        })
      }
    })
  }, [])
  const firebaseApp = initializeApp({
    apiKey: "AIzaSyD-s6tdjiEsAY8_9vsSR5b0C8SCp8sP-Dg",
    authDomain: "incubator-792ad.firebaseapp.com",
    databaseURL: "https://incubator-792ad-default-rtdb.firebaseio.com",
    projectId: "incubator-792ad",
    storageBucket: "incubator-792ad.appspot.com",
    messagingSenderId: "544622898492",
    appId: "1:544622898492:web:cb3ab1c97360065f6d8239"
  });

  const App = firebaseApp
  const db = getDatabase(App)

  // const db = getFirestore(firebaseApp)
  // const colRef = collection(db, 'health')
  
  // const data = onSnapshot(colRef, (onSnapshot) => {
  //   const health = []
  //   onSnapshot.docs.forEach((doc) => {
  //   health.push({...doc.data(), id: doc.id })
  //   })
  //   console.log(health)
  // })

  return (
    <div className="App">
      <main>
      <section className="home_page">
        <header>
          <h3>Logo</h3>
          <nav>
            <i className="fa fa-align-right" aria-hidden="true"></i>
          </nav>
        </header>
        <div className="descriptions">
          <h1 className="title">Baby incubator</h1>
          <div className="page_description">
            <p>An incubator is designed to provide a safe</p>
          </div>
        </div>
      </section>
      <section className="datas_container">
        <h2>My baby</h2>
        <div>
          <div className="datas">
            <div>
              <h3>Temperature</h3>
              <div className="data_content">
                <div className="icon temperature">
                  <i className="fa fa-thermometer-empty" aria-hidden="true"></i>
                </div>
                <div>
                {health.slice(-1).map(ht => <p>{ht}°C/</p>)}<h6>max:28 °C</h6>
                </div>
              </div>
              <input
                type="range"
                id="vol"
                name="vol"
                min="0"
                max="50"
                className="slider"
              />
            </div>
          </div>
          <div className="datas">
            <h3>Heart</h3>
            <div className="data_content">
              <div className="icon heart">
                <i className="fa fa-heartbeat" aria-hidden="true"></i>
              </div>
              <div>
              {health.slice(0, 1).map(ht => <p>{ht}</p>)}
              </div>
            </div>
          </div>
          <div className="datas">
            <h3>Height</h3>
            <div className="data_content">
              <div className="icon weight">
                <i className="fa fa-tachometer" aria-hidden="true"></i>
              </div>
              <div>
              {health.slice(1, 2).map(ht => <p>{ht}kg</p>)}
              </div>
            </div>
          </div>
          <div className="datas">
            <h3>Humidity</h3>
            <div className="data_content">
              <div className="icon humidity">
                <i className="fa fa-tint" aria-hidden="true"></i>
              </div>
              <div>
              {health.slice(-2, -1).map(ht => <p>{ht}%</p>)}
              <span>/50%</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    </div>
  );
}

export default App;
