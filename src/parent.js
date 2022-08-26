import './App.css';
import { firebaseApp } from './firebaseData/database'
import { getDatabase,ref, onValue} from 'firebase/database'
import { useEffect, useState } from 'react';


function Parent() {
  const [health, sethealth] = useState([])
  const [rangeval, setRangeval] = useState('00');

  const App = firebaseApp
  const db = getDatabase(App)

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


    // const [key, setKey] = useState();
    
  // const db = getFirestore(firebaseApp)
  // const colRef = collection(db, 'health')

  // getDocs(colRef)
  // .then((snapshot) => {
  //   console.log(snapshot.docs)
  //   let login = []
  //   snapshot.docs.map((log) => {
  //      setKey(login.push(log.data()))
  //   })
  //   console.log(login)
  // }).catch(error => {
  //   console.log(error)
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
                {health.slice(-1).map(ht => <p>{ht}°C/</p>)}
                </div>
              </div>
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

export default Parent;