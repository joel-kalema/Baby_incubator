import './App.css';
import { firebaseApp } from './firebaseData/database'
import { getDatabase,ref, onValue} from 'firebase/database'
import { useEffect, useState } from 'react';
import Login from './login';


function App() {
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

  return (
    <div className="App">
      <main>
        <Login />
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
                type="range" className="custom-range" min="15" max="37" 
                onChange={(event) => setRangeval(event.target.value)}
              />
              <p>The range value is {rangeval}</p> 
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
