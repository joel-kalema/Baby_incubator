import './App.css';
import { firebaseApp } from './firebaseData/database'
import { getDatabase,ref, onValue} from 'firebase/database'
import { useEffect, useState } from 'react';
import { FaTemperatureLow, FaHeartbeat, FaBalanceScaleLeft } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { WiHumidity } from 'react-icons/wi';


function Docteur() {
  const [health, sethealth] = useState([])
  const [rangeval, setRangeval] = useState('00');

  const App = firebaseApp
  const db = getDatabase(App)

  useEffect(() => {
    onValue(ref(db), snapshot => {
      const data = snapshot.val();
      if (data !== null) {
        sethealth(Object.values(data)[0])
        // Object.values(data).map((hth) => {
        //   sethealth(health => [...health, hth])
        // })
      }
    })
  }, [])

  console.log(health)


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
          <GiHamburgerMenu />
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
                  <FaTemperatureLow />
                </div>
                <div>
                  <p>{health.temperature}°C</p>
                  <h6>max:{health.level} °C</h6>
                </div>
              </div>
              <input
                type="range" className="custom-range" min="15" max="37" 
                onChange={(event) => setRangeval(event.target.value)}
              />
            </div>
          </div>
          <div className="datas">
            <h3>Heart</h3>
            <div className="data_content">
              <div className="icon heart">
                <FaHeartbeat />
              </div>
              <div>
              <p>{health.heartPulse}</p>
              </div>
            </div>
          </div>
          <div className="datas">
            <h3>Height</h3>
            <div className="data_content">
              <div className="icon weight">
                <FaBalanceScaleLeft />
              </div>
              <div>
              <p>{health.height}/kg</p>
              </div>
            </div>
          </div>
          <div className="datas">
            <h3>Humidity</h3>
            <div className="data_content">
              <div className="icon humidity">
                <WiHumidity />
              </div>
              <div>
                <p>{health.humidity}</p>
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

export default Docteur;
