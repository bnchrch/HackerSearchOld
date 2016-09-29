import React from 'react';
import Keyword from './keyword.jsx'
import { FormControl } from 'react-bootstrap';


/**
 * Component that allows you to input multiple strings
 * for use in a keyword filter
 * 
 * @class KeywordFilter
 * @extends {React.Component}
 */
class KeywordFilter extends React.Component {
  /**
   * Creates an instance of KeywordFilter.
   * 
   * @param {any} props
   * 
   * @memberOf KeywordFilter
   */
  constructor(props) {
    super(props);
    this.state = {
        searchWords: []  
    };
  };


  /**
   * When the enter key is pressed in the text input
   * add the string to the keywords and clear the textbox
   * 
   * @param {object} e jQuery input event
   * 
   * @memberOf KeywordFilter
   */
  onKeyPress (e) {
    if (e.key === 'Enter') {
      let newSearchWords = this.state.searchWords.concat(e.target.value);
      this.setState({ searchWords: newSearchWords});
      this.props.keywordsChanged(newSearchWords);
      e.target.value = '';
    }
  }


  /**
   * Removes the given keyword from the list
   * 
   * @param {string} keyword the keyword to be removed from the list
   * 
   * @memberOf KeywordFilter
   */
  onKeyWordRemoval(keyword) {
    let newSearchWords = this.state.searchWords.filter(kw => kw != keyword );
    this.setState({ searchWords: newSearchWords});
    this.props.keywordsChanged(newSearchWords);
  }


  render () {
    let keywordNodes = this.state.searchWords.map((keyword, i) => {
      return (
        <Keyword text={keyword} key={keyword} index={i} onKeyWordRemoval={this.onKeyWordRemoval.bind(this)} />
      );
    })

    return (
      <div>
        <FormControl
          type="text"
          placeholder="Enter a Keyword to search for and press Enter (e.g. Python, Remote, Seattle...)"
          value={this.state.searchText}
          onKeyPress={this.onKeyPress.bind(this)}
        />
        <div className="keywords">
          {keywordNodes}
        </div>
      </div>
    );
  }
}


export default KeywordFilter
