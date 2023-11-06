import React, { useEffect, useRef, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar,
} from 'recharts';

const Chart = (props) => {

  const { data, field, fieldName } = props;
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(400);
  let newData = [];

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const { width } = container.getBoundingClientRect();
      setContainerWidth(width);
    }
  }, []);

   if(newData.length < data.length){

      data.forEach(el => {
       newData = [...newData, {
        time: el[0],
        val: Object.entries(el[1])[field][1]
        }];
      });
    }

  return (
    <div className="store-charts-container" ref={containerRef}>
      <h3 style={{color:'#044e3b'}}>{fieldName}</h3>
      <div style={{
        width: '94%',
        overflowX: 'auto',
        paddingRight: '10px',
        marginBottom: '20px',
        border: '1px solid grey',
        overflowY: 'hidden',
        color: 'green',
      }}>
      {
      newData.length >= data.length?(
        <LineChart width={data.length > 30? 1200: containerWidth* 0.9} height={250} data={newData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis/>
          <YAxis
          dataKey="val"
          angle={-45}
          textAnchor="end"
          interval={0}
          tick={{ fontSize: 12 }}
        />
        <Tooltip />
        {/* <Legend /> */}
        <Line type="monotone" dataKey="val" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
      ):
      <></>
     }
      </div>
     
    </div>
  )
}

export default Chart