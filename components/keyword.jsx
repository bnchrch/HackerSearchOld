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
  render() {
    // create a unique background color for each keyword
    // based on their index in the keyword list
    const applyBackground = {
      backgroundColor: getColorFromIndex(this.props.index),
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

Keyword.propTypes = {
  index: React.PropTypes.number.isRequired,
  text: React.PropTypes.string.isRequired,
  onKeyWordRemoval: React.PropTypes.func.isRequired,
};

export default Keyword;
