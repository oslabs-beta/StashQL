import React, { Component } from 'react';
import Nav from '../components/Nav.jsx'
import TeamBox from '../components/TeamBox.jsx'


const Team = () => {
    return (
        <div>
            <Nav />
            <TeamBox/>
        </div>
    );
};

export default Team;


// const Team = () => {
//     return (
//         <div>
//             <Nav />
//             <div id="team-box">
//                 <div id="team-member">
//                     <div id="team-member-image-box">
//                         <img id="team-member-image" src={simon}/>
//                     </div>
//                     <p id="team-member-name" >Simon Chen</p>
//                     <div id="team-member-social">
//                         <div id="team-member-linkedin-box">
//                             <a href={"https://www.linkedin.com/in/simonchen7/" } target="_blank">
//                                 <img id="team-member-linkedin-img" src={linkedin}/>
//                             </a>
//                         </div>
//                         <div id="team-member-github-box">
//                             <a href={"https://github.com/simonchn160"} target="_blank">
//                                 <img id="team-member-github-img" src={github}/>
//                             </a>
//                         </div>
//                     </div>
//                 </div>
//                 <div id="team-member">
//                     <div id="team-member-image-box">
//                         <img id="team-member-image" src={haku}/>
//                     </div>
//                     <p id="team-member-name" >Hakudo Ueno</p>
//                     <div id="team-member-social">
//                         <div id="team-member-linkedin-box">
//                             <a href={"https://www.linkedin.com/in/hakudo-ueno/"} target="_blank">
//                                 <img id="team-member-linkedin-img" src={linkedin}/>
//                             </a>
//                         </div>
//                         <div id="team-member-github-box">
//                             <a href={"https://github.com/HakudoUeno"} target="_blank">
//                                 <img id="team-member-github-img" src={github}/>
//                             </a>
//                         </div>
//                     </div>
//                 </div>
//                 <div id="team-member">
//                     <div id="team-member-image-box">
//                         <img id="team-member-image" src={ian}/>
//                     </div>
//                     <p id="team-member-name" >Ian Madden</p>
//                     <div id="team-member-social">
//                         <div id="team-member-linkedin-box">
//                             <a href={"https://www.linkedin.com/in/ian-madden/"} target="_blank">
//                                 <img id="team-member-linkedin-img" src={linkedin}/>
//                             </a>
//                         </div>
//                         <div id="team-member-github-box">
//                             <a href={"https://github.com/ifmadden"} target="_blank">
//                                 <img id="team-member-linkedin-img" src={github}/>
//                             </a>
//                         </div>
                        
//                     </div>
//                 </div>
//                 <div id="team-member">
//                     <div id="team-member-image-box">
//                         <img id="team-member-image" src={louie}/>
//                     </div>
//                     <p id="team-member-name" >Louie Mendez</p>
//                     <div id="team-member-social">
//                         <div id="team-member-linkedin-box">
//                             <a href={"https://www.linkedin.com/in/louie-mendez-1047b3209"} target="_blank">
//                                 <img id="team-member-linkedin-img" src={linkedin}/>
//                             </a>
//                         </div>
//                         <div id="team-member-github-box">
//                             <a href={"https://github.com/LouieMjr"} target="_blank">
//                                 <img id="team-member-github-img" src={github}/>
//                             </a>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Team;