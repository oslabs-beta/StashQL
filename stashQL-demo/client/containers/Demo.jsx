import React, { Component, useState, useEffect } from 'react';
import Navbar from '../components/Nav.jsx';
// import LineChart from '../components/LineChart.js';
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto'
// import {UserData} from '../components/Data.js';

const Demo = (props) => {

  const query1 = ` query {
    authors {
      id
      name
    }
  }`

  const query2 = ` query {
    books {
      name
    }
  }`

  const query3 = ` query {
    books {
      id
    }
  }`

  const [query, setQuery] = useState(query1);
  const [returnedData, setReturnedData] = useState('');
  const [runTimes, setRunTime] = useState([]);
  const [queries, addQueries] = useState([]);
  const [speeds, addSpeeds] = useState([]);

  const [userData, setUserData] = useState({
    labels: [],
    datasets: [{
      label: 'Run time of current query',
      data: []
    }]
  });

  useEffect(() => {
    setUserData({
      labels: queries,
      datasets: [{
        label: 'Run time of current query',
        data: speeds
      }]
    })
  }, [queries, speeds]);

  const submitQuery = async () => {
    let method = 'POST';
    await fetch('/api/graphql', {
      method,
      body: JSON.stringify({query}),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then(({ data, runTime }) => {
        setReturnedData(JSON.stringify(data, null, 2));
        setRunTime(oldRunTimes => [...oldRunTimes, runTime]);
        addQueries(oldQueries => [...oldQueries, `Query ${oldQueries.length + 1}`]);
        addSpeeds(oldSpeeds => [...oldSpeeds, runTime]);
      })
      .catch((err) => console.log('Error: ', err));
  };

  return (
    <div>
      <Navbar />

      <div id='queryData'>
        <h3 onClick={() => {setQuery(query1); addQueries([]); addSpeeds([])}}>Query 1</h3>
        <h3 onClick={() => {setQuery(query2); addQueries([]); addSpeeds([])}}>Query 2</h3>
        <h3 onClick={() => {setQuery(query3); addQueries([]); addSpeeds([])}}>Query 3</h3>
      </div>

      <textarea value={query} readOnly={true} id='queryContainer'>
      </textarea>
      
      <button onClick={() => {submitQuery()}}>Submit Query</button>

      <br/>

      <textarea value={returnedData} readOnly={true} id='returnedData'>
      </textarea>

      <div style={{width: 700}}>
        <Line data={userData} options={{
          scales: {
            yAxis: {
              min: 0,
              max: 30,
            },
          },
        }}/>
      </div>

    </div>
  );
}

export default Demo;