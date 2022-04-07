import React, { Component } from 'react';
import simon from '../images/team/SimonCHen.jpg';
import haku from '../images/team/HakudoUeno.png';
import ian from '../images/team/IanMadden.jpg';
import louie from '../images/team/LouieMendez.jpg';
import TeamMember from './TeamMember.jsx'

const TeamBox = () => {
  const members = [];
  const names = [
    'Simon Chen',
    'Hakudo Ueno',
    'Ian Madden',
    'Louie Mendez'
  ];
  const imageArr = [
    simon,
    haku,
    ian,
    louie
  ];
  const linkedinArr = [
    'https://www.linkedin.com/in/simonchen7/',
    'https://www.linkedin.com/in/hakudo-ueno/',
    'https://www.linkedin.com/in/ian-madden/',
    'https://www.linkedin.com/in/louie-mendez'
  ];
  const githubArr = [
    'https://github.com/simonchn160',
    'https://github.com/HakudoUeno',
    'https://github.com/ifmadden',
    'https://github.com/LouieMjr'
  ];
  for(let i = 0; i < 4 ; i++){
    members.push(<TeamMember
      key={names[i]}
      name={names[i]}
      image={imageArr[i]}
      linkedin={linkedinArr[i]}
      github={githubArr[i]}
    />)
  }
  return (
    <div id="team-box">
        {members}
    </div>
  );
};

export default TeamBox;