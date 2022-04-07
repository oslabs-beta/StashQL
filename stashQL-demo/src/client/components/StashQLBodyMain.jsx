import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import graphqlSVG from '../assets/graphql.svg';
import redisSVG from '../assets/redis.svg';
import databaseEditSVG from '../assets/database-edit.svg';

const graphQLMVP = <img src={graphqlSVG} alt="GraphQL" className="imgMVP" />;
const redisMVP = <img src={redisSVG} alt="Redis" className="imgMVP" />;
const databaseEditMVP = <img src={databaseEditSVG} alt="Database Mutations" className="imgMVP" />;

const graphQLHeaderText = <div className="bodyHeaderTitle">The power of GraphQL queries</div>;
const redisHeaderText = <div className="bodyHeaderTitle">Real-time data store</div>;
const databaseEditHeaderText = <div className="bodyHeaderTitle">Dynamically updated caches</div>;
const graphQLHeaderPara = <div>GraphQL provides a complete and understandable description of the data in your API, giving clients the power to ask for exactly what they need and nothing more.</div>;
const redisHeaderPara = <div>Redis' versatile in-memory data structures let you build data infrastructure for real-time applications requiring low latency and high-throughput.</div>;
const databaseEditHeaderPara = <div>StashQL will continuously monitor the database for mutations. When a mutation occurs, StashQL will update the cached data.</div>;

const fetchData = async () => {
  await fetch('http://localhost:3000/')
    .then((res) => res.json())
    .then((res) => {
      const fetchResults = res;
      console.log('fetchReq', fetchResults.rows);
    })
    .catch((err) => console.log(err));
};

function StashQLBodyMain() {
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="MainBodyContainer">
      <section className="bodyColumnContainer1">
        {graphQLMVP}
        {graphQLHeaderText}
        {graphQLHeaderPara}
      </section>
      <section className="bodyColumnContainer2">
        {redisMVP}
        {redisHeaderText}
        {redisHeaderPara}
      </section>
      <section className="bodyColumnContainer3">
        {databaseEditMVP}
        {databaseEditHeaderText}
        {databaseEditHeaderPara}
      </section>
    </section>
  );
}

export default StashQLBodyMain;
