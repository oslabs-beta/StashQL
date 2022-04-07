import React, { Component } from 'react';
import { render } from 'react-dom';
import Subscribe from '../components/Subscribe.jsx';
import Navbar from '../components/Nav.jsx';
import Footer from '../components/footer/Footer.jsx';
import FooterTest from '../components/footer/FooterTest.jsx';
import TeamBox from '../components/TeamBox.jsx';
import SectionOne from '../components/home/SectionOne.jsx';
import SectionTwo from '../components/home/SectionTwo.jsx';
import SectionThree from '../components/home/SectionThree.jsx';
import SectionFour from '../components/home/SectionFour.jsx';
import filler from '../images/shepherd.png';
import tree from '../images/tree.jpg';
import SectionFive from '../components/home/SectionFive.jsx';
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      displayText: false
    }
    
    this.subscribe = this.subscribe.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updateDisplayText = this.updateDisplayText.bind(this);
  }

  async updateEmail(input) {
    await this.setState({
      email: input
    });
  }

  async updateDisplayText() {
    await this.setState({
      displayText: false
    });
  }

  subscribe() {
    const email = this.state.email;
    console.log('LOOK HERE ', this.state.email);
    let method = 'POST';
    fetch('/api/subscribe', {
      method,
      body: JSON.stringify({ email: this.state.email }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(data => data.json())
      .then(data => {
        if (data === true) this.setState({email: '', displayText: true})
        else {
          console.log('nah boi')
        }
      }
      )
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div id="main-container">
        <Navbar />
        <div id='blocks'>
          <SectionOne/>
          <br></br><br></br>
          <SectionTwo/>
          <SectionThree/>
          <br></br><br></br>
          <SectionFour/>
          <br></br><br></br>
          <SectionFive/>
          <br></br><br></br>
          <div id="meet-the-team-div">
            <h1 id="team-header">Meet the <span id="team-header-word">team</span></h1>
          </div>
          <TeamBox/>
          <br></br><br></br>
          <br></br><br></br>
          <div id='subscribeBox'>
            <Subscribe subscribe={this.subscribe} updateEmail={this.updateEmail} email={this.state.email} displayText={this.state.displayText} updateDisplayText={this.updateDisplayText}/>
          </div>
          <br></br><br></br>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default Home;