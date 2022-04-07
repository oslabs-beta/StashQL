import React from 'react';
import TextArea1 from './examples/TextArea1.jsx';
import TextArea2 from './examples/TextArea2.jsx';
import TextArea3 from './examples/TextArea3.jsx';
import TextArea4 from './examples/TextArea4.jsx';

const HowToUse = () => {
  return (
    <div id="doc-how-to-use">
      <div id="header-bold">
        <h1>How to use</h1>
      </div>
      <div className="text-box">
        <p>
          The <b>stashql()</b> method is used to create a StashQL class that will require the user to pass their GraphQL schema and Redis Cache, and an optional third parameter for cache time to live.
        </p>
        <p><b>Syntax:</b></p>
      </div>
      <TextArea1/>
      <div className="text-box">
        <h4>Parameters:</h4>
        <ul>
            <li>
                <p><b>schema:</b> your GraphQL schema</p>
            </li>
            <li>
                <p><b>cache:</b>  your Redis cache</p>
            </li>
            <li>
                <p><b>ttl:</b> an integer value that specifies the number of seconds until the key expires in the Redis cache</p>
            </li>
        </ul>
        <b>Example:</b>
      </div>
      <TextArea2/>
      <div className="text-box">
          <p>
              When sending any query to ‘/graphql’ use queryHander method is used to create a StashQL class that will require the user to pass their GraphQL schema and Redis Cache, and an optional third parameter for cache time to live.
          </p>
      </div>
      <TextArea3/>
      <div className="text-box">
        <p>When using StashQL, you must also add additional argumnet to your GraphQL <b>mutations</b> with either <b>refillCache</b> or <b>clearRelatedFields</b></p>
        <h4>When to use refillCache and clearRelatedFields</h4>
        <ul>
          <li>
            <p>
              <b>refillCache:</b> 
                if you are running a mutation and you only have a few 
                queries in your cache that deal with the field passed in,
                then you can run this refillCacheHandler function. 
                Since this refillCacheHandler function will re-run all 
                queries in  your cache that deals with the field passed in, 
                it will make multiple network requests at once 
                (in order to re-run your queries and get the most up-to-date data)
                so, you want to avoid using this function if you know you 
                are going to have a ton of stuff in your cache that matches the 
                passed-in field in order to avoid making a ton of network 
                requests and possibly causing your database to fail
            </p>
          </li>
          <li>
              <p>
                  <b>clearRelatedFields:</b>  
                  if you know that your cache will have a ton of queries that matches the field, 
                  you can run this function. It will clear your cache so that the next time
                  you run a query, it will simply re-run ONLY that query, NOT ALL queries that matches the field. 
              </p>
          </li>
        </ul>
        <b>Example:</b>
      </div>
      <TextArea4/>
    </div>
    
  );
};

export default HowToUse;