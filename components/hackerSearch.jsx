import React from 'react';
import ReactDOM from 'react-dom';
import { Col, Fade, Grid } from 'react-bootstrap';
import Spinner from 'react-spinkit';
import $ from 'jquery';
import WhosHiringSelect from './whosHiringSelect.jsx'
import CommentList from './commentList.jsx'
import KeywordFilter from './keywordFilter.jsx'


/**
 * Hacker Search Component
 * 
 * Allows the user to search for multiple keywords in threads
 * posted by whoshiring
 * 
 * @class HackerSearch
 * @extends {React.Component}
 */
class HackerSearch extends React.Component {
  /**
   * Creates an instance of HackerSearch.
   * 
   * @param {any} props
   * 
   * @memberOf HackerSearch
   */
  constructor(props) {
    super(props);
    this.state = {
        comments: [],
        searchWords: [],
        id: "",
        loading: false 
    };
  };


  /**
   * Retrieves comments from the given thread id and sets state
   * 
   * @param {string} id thread id to load
   * 
   * @memberOf HackerSearch
   */
  loadThreadById(id) {
    this.setState({id: id, loading: true, comments: []})
    this.serverRequest = $.get(`http://hn.algolia.com/api/v1/items/${id}`, (result) => {
        /**
         * 
         * 
         * @param {any} x
         */
        let comments = result.children.filter(x => x.text);
        this.setState({comments: comments, loading: false});
      });
  }


  /**
   * a callback used by KeywordFilter to return the keywords selected
   * 
   * @param {string []} keywords strings of keywords to filter by
   * 
   * @memberOf HackerSearch
   */
  keywordsChanged(keywords) {
    this.setState({searchWords: keywords})
  }


  /**
   * a callback used by WhosHiringSelect to communicate when a thread has been selected
   * 
   * @param {object} e jQuery event object
   * 
   * @memberOf HackerSearch
   */
  threadSelected(e) {
    let id = e.target.value;
    this.loadThreadById(id)
  }


  render() {
     return (
        <Grid className="hackerSearch">
          <Col md={8} mdOffset={2}>
            <h1>Hacker Hiring Hunt</h1>
            <WhosHiringSelect handleSelect={this.threadSelected.bind(this)}/>
            <Fade in={this.state.comments.length > 0}>
              <div>
                <KeywordFilter keywordsChanged={this.keywordsChanged.bind(this)}/>
                <CommentList comments={this.state.comments} searchWords={this.state.searchWords}/>
              </div>
            </Fade>
            <Spinner hidden={!this.state.loading} spinnerName='double-bounce' noFadeIn={true} />
          </Col>
        </Grid>
    );
  }
}


ReactDOM.render(
  <HackerSearch />,
  document.getElementById('content')
);
