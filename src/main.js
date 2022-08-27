import './App.css';

import { firebaseApp} from './firebaseData/database'
import { getDatabase,ref, onValue, set} from 'firebase/database'
import { useEffect, useState } from 'react';
import { FaTemperatureLow, FaHeartbeat, FaBalanceScaleLeft } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { WiHumidity } from 'react-icons/wi';


function Docteur() {
  const [health, sethealth] = useState([])
  const [newRange, setNewRange] = useState({})
  const [rangeval, setRangeval] = useState('00');
  const [showAlHeart, setShowAlarmHeart] = useState(false);
  const [showAlTemp, setShowAlarmTemp] = useState(false);
  const [alarmTemp, setAlarmTemp] = useState('')
  const [alarmHeart, setAlarmHeart] = useState('')

  const App = firebaseApp
  const db = getDatabase(App)

  useEffect(() => {
    onValue(ref(db), snapshot => {
      const data = snapshot.val();
      if (data !== null) {
        sethealth(Object.values(data)[1])
        setNewRange(Object.values(data)[0])
      }
    })
    
  }, [])

  useEffect(() => {
   if(health){
    showAlarmHeart(health)
   showAlarmTemp(health)
   }
    
  }, [health])

  const setRange = () => {
    set(ref(db, 'doctorSet', 'level'), {
      level: rangeval,
    });
  }

  const showAlarmTemp = (health) => {
     if(parseInt(health.temperature) >= 30){
       setAlarmTemp("Temperature Overload")
       setShowAlarmHeart(true);
     }else if(parseInt(health.temperature) <= 20){
      setAlarmTemp("Temperature UnderLimit")
      setShowAlarmHeart(true);
    }else{
      setShowAlarmHeart(false);
    }

  }

  const showAlarmHeart = (health) => {
    if(parseInt(health.heartPulse) <= 40){
      setAlarmHeart("HeartPulse UnderLimit")
      setShowAlarmTemp(true);
    }else if(parseInt(health.heartPulse) >= 100){
      setAlarmHeart("HeartPulse is too fast")
      setShowAlarmTemp(true);
    }else{
      setShowAlarmTemp(false);
    }
  }


  return (
    <div className="App">
      <main>
      <section className="home_page">
        <header>
          <h3>Logo</h3>
              <div class="alarm-message">
                {showAlHeart? (<p>{alarmHeart}</p>):''}
                {showAlTemp? (<p>{alarmTemp}</p>):''}
              </div>
          <nav>
          <GiHamburgerMenu />
          </nav>
        </header>
        <div className="descriptions">
          <h1 className="title">Baby incubator</h1>
          <div className="page_description">
            <p>An incubator is designed to provide a safe environment</p>
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
                  <h6>max:{diplayLevel.level} °C</h6>
                </div>
              </div>
              <input className="custom-range" type="range" id="temperature"
               onChange={(event) => { setRangeval(event.target.value); setRange()}}
               name="cowbell" min="15" max="37" value={diplayLevel.level}/>
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