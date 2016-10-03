import React from 'react';
import { Fade, FormControl, FormGroup } from 'react-bootstrap';
import Spinner from 'react-spinkit';
import $ from 'jquery';


/**
 * Provides a drop down select of threads posted by whoshiring
 * 
 * @class WhosHiringSelect
 * @extends {React.Component}
 */
class WhosHiringSelect extends React.Component {
  /**
   * Creates an instance of WhosHiringSelect.
   * 
   * @param {any} props
   * 
   * @memberOf WhosHiringSelect
   */
  constructor(props) {
    super(props);
    this.state = {
        requestUrl: "http://hn.algolia.com/api/v1/search_by_date?tags=story,author_whoishiring",
        threads: [],
        loading: false
    };
  };


  componentDidMount() {
    this.setState({loading: true});
    this.serverRequest = $.get(this.state.requestUrl, (result) => {
      this.setState({ threads: result.hits, loading: false})
    })
  };


  render () {
    let threadOptions = this.state.threads.map(thread => {
        return (
          <option key={thread.objectID} value={thread.objectID}>
            {thread.title.replace("Ask HN: ", "")}
          </option>
        );
      });

    return (
      <div>
        <Fade in={this.state.threads.length> 0}>
          <FormGroup className="whosHiringSelect" controlId="formControlsSelect">
            <FormControl componentClass="select" placeholder="select" ref="userInput" defaultValue="" onChange={this.props.handleSelect}>
              <option value="" disabled>Select a Who's Hiring thread (e.g. Who is hiring, Who wants to be hired...)</option>
              { threadOptions }
            </FormControl>
          </FormGroup>
        </Fade>
        <Spinner hidden={!this.state.loading} spinnerName='double-bounce' noFadeIn={true} />
      </div>

    );
  }
}


export default WhosHiringSelect