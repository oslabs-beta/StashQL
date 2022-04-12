import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFeather } from '@fortawesome/free-solid-svg-icons';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { faTerminal } from '@fortawesome/free-solid-svg-icons';
import { feather } from '../../images/feather.png';

// import { feather } from '../../../public/images/feather.png';

const SectionTwo = () => {
    return (
      <div id='features'>
        <div id='feature1'>
          <div id='icon-box1'>
            <FontAwesomeIcon icon={faFeather} />
          </div>
          <h4>Improve Performance</h4>
          <h6>StashQL caches the data returned from your GraphQL queries to improve the performacne of your application</h6>
        </div>

        <div id='feature2'>
          <div id='icon-box2'>
            <FontAwesomeIcon icon={faBolt} />              
          </div>
          <h4>Improve Performance</h4>
          <h6>StashQL caches the data returned from your GraphQL queries to improve the performacne of your application</h6>
        </div>

        <div id='feature3'>
          <div id='icon-box3'>
            <FontAwesomeIcon icon={faTerminal} />
          </div>
          <h4>Improve Performance</h4>
          <h6>StashQL caches the data returned from your GraphQL queries to improve the performacne of your application</h6>
        </div>
      </div>
    );
};

export default SectionTwo;