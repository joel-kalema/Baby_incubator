import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { firebaseApp } from './firebaseData/database'
import { getDatabase, ref, onValue, set } from 'firebase/database'
import { FaTemperatureLow, FaHeartbeat, FaBalanceScaleLeft } from 'react-icons/fa';
import { AiOutlineLogout } from 'react-icons/ai';
import { WiHumidity } from 'react-icons/wi';
import { Link } from 'react-router-dom';
import { GiBabyFace } from 'react-icons/gi';
import Chart from './chart/chart';


function Parent() {
  const [health, sethealth] = useState([]);
  const [data, setData] = useState({});
  const [newRange, setNewRange] = useState({})
  const [showAlHeart, setShowAlarmHeart] = useState(false);
  const [showAlTemp, setShowAlarmTemp] = useState(false);
  const [alarmTemp, setAlarmTemp] = useState('')
  const [alarmHeart, setAlarmHeart] = useState('')
  const steps = ['Current Data', 'Charts'];
  const [step, setStep] = useState(1);
  const containerMainRef = useRef(null);
  const [scrollTo, setScrollTo] = useState(1);
  const [containerWidth, setContainerWidth] = useState(null);

  const App = firebaseApp
  const db = getDatabase(App)

  useEffect(() => {
    onValue(ref(db), snapshot => {
      const dat = snapshot.val();
      if (dat !== null) {
        sethealth(dat.UsersData.WcTxhOkt0lYeRZz8fAltHneTQ4d2.currentData);
        setData(dat.UsersData.WcTxhOkt0lYeRZz8fAltHneTQ4d2);
      }
    })

  }, []);

  useEffect(() => {
    setContainerWidth(containerMainRef.current.offsetWidth);
  }, []);

  if (scrollTo !== step) {
    if (containerMainRef.current) {
      containerMainRef.current.scrollTo(
        {
          top: 0,
          left: ((step - 1) * containerWidth),
          behavior: 'smooth',
        },
      );
      setScrollTo(step);
    }
  }

  // console.log(Object.entries(data.chartData));

  return (
    <div className="App" >
      <main>
        <section className="home_page">
          <header>
            <h2><GiBabyFace />{" "}Health data</h2>
            <nav>
              <Link to='/'><AiOutlineLogout /></Link>
            </nav>
          </header>
          {/* <div className="page_description"> */}
            <div className="item-progress-bar-container">
              {
                steps.map((stepUp, key) => (
                  <div
                    key={stepUp}
                    className={step === key + 1 ? 'item-step active-step' : 'item-step'}
                    style={key + 1 === steps.length
                      ? {
                        width: `${(100 - ((steps.length - 1) / 2)) / steps.length}%`,
                      }
                      : {
                        width: `${97 / steps.length}%`,
                        marginRight: '0.5%',
                      }}
                    onClick={() => setStep(key + 1)}
                  >
                    {stepUp}
                  </div>
                ))
              }
            </div>
          {/* </div> */}
        </section>
        <div className='main_contrainer-page' ref={containerMainRef}>
          <section className="datas_container entity-list-wrapper">
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
          <div className="entity-list-wrapper" style={{ width: '80%', paddingBottom: '40px', marginTop: '44px' }}>
            {
              data.chartData && step === 2 ? <>
                <Chart
                  data={Object.entries(data.chartData)}
                  field={2}
                  fieldName={<div><FaTemperatureLow /> Temperature</div>}
                />
                <Chart
                  data={Object.entries(data.chartData)}
                  field={0}
                  fieldName={<div><FaHeartbeat /> Heart Rate</div>}
                />
                <Chart
                  data={Object.entries(data.chartData)}
                  field={1}
                  fieldName={<div><WiHumidity /> Blood Oxygen</div>}
                />
              </>
                :
                <></>
            }

          </div>
        </div>


      </main>
    </div>
  );
}
export default Parent;