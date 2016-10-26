import React from 'react';
import { Glyphicon, Label } from 'react-bootstrap';
import { getColorFromIndex } from '../tools/util.js';


/**
 * Keyword component
 * 
 * @class Keyword
 * @extends {React.Component}
 */
class Keyword extends React.Component {
  render () {

    // create a unique background color for each keyword
    // based on their index in the keyword list
    let applyBackground = {
      backgroundColor: getColorFromIndex(this.props.index)
    };

    return (
      <Label className="keyword" style={applyBackground}>
        <span className="keywordText">
          {this.props.text}
        </span>
        <a>
          <Glyphicon
            className="remove glyphicon-white" 
            glyph="remove-sign" 
            onClick={() => this.props.onKeyWordRemoval(this.props.text)}
          />
        </a>
      </Label>
    );
  }
}


export default Keyword;