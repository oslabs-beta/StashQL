import React from 'react';
import Installation from './Installation.jsx';
import HowToUse from './HowToUse.jsx';
import Cli from './Cli.js';

class DocsBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false
    };

    this.setCopiedTrue = this.setCopiedTrue.bind(this);
  }

  async setCopiedTrue() {
    await this.setState({
      copied: true 
    });
  };

  render() {
    return (
      <div id="doc-box">
        <Installation setCopiedTrue={this.setCopiedTrue} />
        {this.state.copied && <h4 id='copiedText'>Copied to clipboard!</h4>}
        <HowToUse/>
        <Cli/>
      </div>
    )
  }
};

export default DocsBox;