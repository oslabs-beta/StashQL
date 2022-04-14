import React, { Component } from 'react';

const Subscribe = (props) => {
  return (
    <div id='subscribeModal'>
      <h2 id="sub-h4">Stay updated</h2>
      <h4 id="sub-h6">Subscribe for the latest StashQL news and updates!</h4>
      <div id='inputBtn'>
        <input
          onChange={(e) => {props.updateEmail(e.target.value); props.updateDisplayText()}}
          id='subscribeInput'
          placeholder='Enter your email'
          value={props.email}
          type='text'
        />
        <button id='subscribeBtn' onClick={() => {props.subscribe()}}>
          Subscribe
        </button>
      </div>
      <div>
        {props.displayText && <h6 id='signedUpText'>You're signed up for our newsletter!</h6>}
      </div>
    </div>
  )
};

export default Subscribe;