import './App.css';
import { firebaseApp} from './firebaseData/database'
import { getDatabase,ref, onValue, set} from 'firebase/database'
import { useEffect, useState } from 'react';
import { FaTemperatureLow, FaHeartbeat, FaBalanceScaleLeft } from 'react-icons/fa';
import { AiOutlineLogout } from 'react-icons/ai';
import { WiHumidity } from 'react-icons/wi';
import { Link } from 'react-router-dom';
import { GiBabyFace } from 'react-icons/gi';


function Parent() {
    const [health, sethealth] = useState([])
    const [newRange, setNewRange] = useState({})
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
          sethealth(data.UsersData.WcTxhOkt0lYeRZz8fAltHneTQ4d2.currentData)
        }
      })
      
    }, [])
   
    return (
      <div className="App">
        <main>
        <section className="home_page">
          <header>
          <h1><GiBabyFace /></h1>
                {/* <div class="alarm-message">
                  {showAlHeart? (<p>{alarmHeart}</p>):''}
                  {showAlTemp? (<p>{alarmTemp}</p>):''}
                </div> */}
            <nav>
            <Link to='/'><AiOutlineLogout /></Link>
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
          <h2>My Datas</h2>
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
                  </div>
                </div>
              </div>
            </div>
            <div className="datas">
              <h3>Heart</h3>
              <div className="data_content">
                <div className="icon heart">
                  <FaHeartbeat />
                </div>
                <div>
                <p>{health.heartRate}</p>
                </div>
              </div>
            </div>
            <div className="datas">
              <h3>Oxygen</h3>
              <div className="data_content">
                <div className="icon humidity">
                  <WiHumidity />
                </div>
                <div>
                  <p>{health.oxygen}</p>
                <span>(%)</span>
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