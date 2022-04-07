import React, { Component } from 'react';
import linkedin from '../images/logos/Navy_LinkedIn.png'
import github from '../images/logos/Navy_GitHub.png'

const TeamMember = (props) => {
    return (
      <div id="team-member">
          {/* =========================Image========================== */}
          <div id="team-member-image-box">
              <img id="team-member-image" src={props.image}/>
          </div>

          {/* ==========================Name========================== */}
          <h3 id="team-member-name" >{props.name}</h3>

          {/* ================LinkedIn and GitHub Info================ */}
          <div id="team-member-social">
              <div id="team-member-linkedin-box">
                  <a href={props.linkedin} target="_blank">
                      <img id="team-member-linkedin-img" src={linkedin}/>
                  </a>
              </div>
              <div id="team-member-github-box">
                  <a href={props.github} target="_blank">
                      <img id="team-member-github-img" src={github}/>
                  </a>
              </div>
          </div>
          
      </div>
    );
};

export default TeamMember;

{/* <div id="team-member">
<div id="team-member-image-box">
    <img id="team-member-image" src={simon}/>
</div>
<p id="team-member-name" >Simon Chen</p>
<div id="team-member-social">
    <div id="team-member-linkedin-box">
        <a href={"https://www.linkedin.com/in/simonchen7/" } target="_blank">
            <img id="team-member-linkedin-img" src={linkedin}/>
        </a>
    </div>
    <div id="team-member-github-box">
        <a href={"https://github.com/simonchn160"} target="_blank">
            <img id="team-member-github-img" src={github}/>
        </a>
    </div>
</div>
</div>
<div id="team-member">
<div id="team-member-image-box">
    <img id="team-member-image" src={haku}/>
</div>
<p id="team-member-name" >Hakudo Ueno</p>
<div id="team-member-social">
    <div id="team-member-linkedin-box">
        <a href={"https://www.linkedin.com/in/hakudo-ueno/"} target="_blank">
            <img id="team-member-linkedin-img" src={linkedin}/>
        </a>
    </div>
    <div id="team-member-github-box">
        <a href={"https://github.com/HakudoUeno"} target="_blank">
            <img id="team-member-github-img" src={github}/>
        </a>
    </div>
</div>
</div>
<div id="team-member">
<div id="team-member-image-box">
    <img id="team-member-image" src={ian}/>
</div>
<p id="team-member-name" >Ian Madden</p>
<div id="team-member-social">
    <div id="team-member-linkedin-box">
        <a href={"https://www.linkedin.com/in/ian-madden/"} target="_blank">
            <img id="team-member-linkedin-img" src={linkedin}/>
        </a>
    </div>
    <div id="team-member-github-box">
        <a href={"https://github.com/ifmadden"} target="_blank">
            <img id="team-member-linkedin-img" src={github}/>
        </a>
    </div>
    
</div>
</div>
<div id="team-member">
<div id="team-member-image-box">
    <img id="team-member-image" src={louie}/>
</div>
<p id="team-member-name" >Louie Mendez</p>
<div id="team-member-social">
    <div id="team-member-linkedin-box">
        <a href={"https://www.linkedin.com/in/louie-mendez-1047b3209"} target="_blank">
            <img id="team-member-linkedin-img" src={linkedin}/>
        </a>
    </div>
    <div id="team-member-github-box">
        <a href={"https://github.com/LouieMjr"} target="_blank">
            <img id="team-member-github-img" src={github}/>
        </a>
    </div>
</div>
</div> */}