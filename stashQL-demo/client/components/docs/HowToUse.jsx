import React, { useCallback } from 'react';
import TextArea1 from './examples/TextArea1.jsx';
import TextArea2 from './examples/TextArea2.jsx';
import TextArea3 from './examples/TextArea3.jsx';
import TextArea4 from './examples/TextArea4.jsx';
import TextArea6 from './examples/TextArea6.jsx';
import TextArea7 from './examples/TextArea7.jsx';
import Installation from './Installation.jsx';
import Highlighter from "react-highlight-words";

const HowToUse = () => {
  return (
    // <div id="doc-how-to-use">
    //   <div id="header-bold">
    //     <h1>How to use</h1>
    //   </div>
    //   <div className="text-box">
    //     <p>
    //       The <b>stashql( )</b> method is used to create a StashQL class that will require the user to pass their GraphQL schema and Redis Cache, and an optional third parameter for cache time to live.
    //     </p>
    //     <p><b>Syntax:</b></p>
    //   </div>
    //   <TextArea1/>
    //   <div className="text-box">
    //     <h4>Parameters:</h4>
    //     <ul>
    //         <li>
    //             <p><b>schema:</b> your GraphQL schema</p>
    //         </li>
    //         <li>
    //             <p><b>cache:</b>  your Redis cache</p>
    //         </li>
    //         <li>
    //             <p><b>ttl:</b> an integer value that specifies the number of seconds until the key expires in the Redis cache</p>
    //         </li>
    //     </ul>
    //     <b>Example:</b>
    //   </div>
    //   <TextArea2/>
    //   <div className="text-box">
    //       <p>
    //           When sending any query to ‘/graphql’ use queryHander method is used to create a StashQL class that will require the user to pass their GraphQL schema and Redis Cache, and an optional third parameter for cache time to live.
    //       </p>
    //   </div>
    //   <TextArea3/>
    //   <div className="text-box">
    //     <p>When using StashQL, you must also add additional argumnet to your GraphQL <b>mutations</b> with either <b>refillCache</b> or <b>clearRelatedFields</b></p>
    //     <h4>When to use refillCache and clearRelatedFields</h4>
    //     <ul>
    //       <li>
    //         <p>
    //           <b>refillCache:</b> 
    //             if you are running a mutation and you only have a few 
    //             queries in your cache that deal with the field passed in,
    //             then you can run this refillCacheHandler function. 
    //             Since this refillCacheHandler function will re-run all 
    //             queries in  your cache that deals with the field passed in, 
    //             it will make multiple network requests at once 
    //             (in order to re-run your queries and get the most up-to-date data)
    //             so, you want to avoid using this function if you know you 
    //             are going to have a ton of stuff in your cache that matches the 
    //             passed-in field in order to avoid making a ton of network 
    //             requests and possibly causing your database to fail
    //         </p>
    //       </li>
    //       <li>
    //           <p>
    //               <b>clearRelatedFields:</b>  
    //               if you know that your cache will have a ton of queries that matches the field, 
    //               you can run this function. It will clear your cache so that the next time
    //               you run a query, it will simply re-run ONLY that query, NOT ALL queries that matches the field. 
    //           </p>
    //       </li>
    //     </ul>
    //     <b>Example:</b>
    //   </div>
    //   <TextArea4/>
    // </div>

    <div id="doc-how-to-use">
      <h1>How to use</h1>
      <div className='how-text'>
        <p>
          The <b>stashql( )</b> keyword is used to create a new instance of the StashQL class that will require the user to pass their GraphQL schema and Redis Cache, and an optional third parameter for cache time to live.
        </p>
        <h4>Parameters:</h4>
        <ul>
          <li>
            <p><b><Highlighter highlightClassName="YourHighlightClass" searchWords={["schema:"]} autoEscape={true} textToHighlight="schema:"/></b> your GraphQL schema (required)</p>
          </li>
          <li>
            <p><b><Highlighter highlightClassName="YourHighlightClass" searchWords={["cache:"]} autoEscape={true} textToHighlight="cache:"/></b> your Redis cache (required)</p>
          </li>
          <li>
            <p><b><Highlighter highlightClassName="YourHighlightClass" searchWords={["ttl:"]} autoEscape={true} textToHighlight="ttl:"/></b> the Time to Live of your cached data(optional)</p>
          </li>
        </ul>
        <TextArea2/>

        <h2>Sending Queries and Caching Data</h2>
        <div id='caching-text'>
          <p>
            When sending any GraphQL queries, you can use StashQL's queryHandler method as a middleware function to query your database and cache the returned data.
          </p>
          <TextArea3/>
        </div>

        <h2>Handling mutations</h2>
        <div id='mutation-text'>
          <p>StashQL also provides two methods to update your cached data when a mutation occurs in your database:</p>
          <p>
            <b><Highlighter highlightClassName="YourHighlightClass" searchWords={["refillCache"]} autoEscape={true} textToHighlight="refillCache"/></b>
            <br/>
            <br/>
            Since the refillCache method will re-run all the cached queries that
            contain data corresponding with the passed-in field, it is recommended 
            that the refillCache method is used in cases where your cache contains
            only a few queries that correspond with the passed-in field in order to
            avoid overloading your database with requests.
          </p>
          <TextArea4/>
          <p>In the example above, we are querying for the name of the authors and the name of their books. The data returned from this query will be cached by StashQL</p>
          <TextArea6/>
          <p>Now, we are adding an author to our database. However, we want to ensure that any cached data dealing with authors will be updated. By passing in the refillCache method as an argument to the mutation and its value as 'authors', StashQL will go into our cache and update any data that deal with authors</p>

          <p>
            <b><Highlighter highlightClassName="YourHighlightClass" searchWords={["clearRelatedFields"]} autoEscape={true} textToHighlight="clearRelatedFields"/></b>  
            <br/>
            <br/>
            If you have many cached queries that correspond with the same passed-in field, 
            it is recommended that the clearRelatedFields method is used, since this method will clear any cached queries and relevant data so that the next time
            you run a query, it will re-run ONLY that query, rather than ALL the queries that matches the passed-in field. 
          </p>
          <TextArea7/>
          <p>If our cache contains many queries and data that deal with authors, we can use the clearRelatedFields method instead of the refillCache method in order to avoid making too many requests. The clearRelatedFields method is also passed in as an argument and its value will also be 'authors'. StashQL will clear any cached data that deals with authors so that the next time we query for authors again, we avoid making multiple requests and fresh data is returned.</p>
        </div>
      </div>
    </div>

  );
};

export default HowToUse;

// Installation
// How to use
//   describe stashql class
//   parameters:
//     Schema
//     cache
//     title
//   full new example

//   Sending queries and caching data
//     describe queryHandler method
//     example
//   Handling mutations
//     describe refillCache
//       example
//     describe clearRelatedFields
//       example

// CLI
//   how to use
//     example
//   commands
//     example