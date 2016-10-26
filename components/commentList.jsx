import React from 'react';
import { Badge, Glyphicon } from 'react-bootstrap';
import moment from 'moment';

import Comment from './comment';


/**
 * Component to display valid comments
 *
 * @class CommentList
 * @extends {React.Component}
 */
class CommentList extends React.Component {
  /**
   * Returns true if a search word is found in the comment string
   *
   * @param {string} comment string to check if it contains 1 or more searchWords
   * @returns
   *
   * @memberOf CommentList
   */
  _filterComments(comment) {
    return this.props.searchWords.reduce((prev, searchWord) => {
      return prev && comment.text.toLowerCase().indexOf(searchWord.toLowerCase()) >= 0;
    }, true);
  }


  render() {
    // render comments that contain search words
    const commentNodes = this.props.comments
      .filter(this._filterComments, this)
      .map((comment) => {
        return (
          <Comment
            key={comment.id}
            author={comment.author}
            createdAt={moment(comment.created_at).format('h:mm:ss a on MMMM Do YYYY')}
            searchWords={this.props.searchWords}
          >
            {comment.text}
          </Comment>
        );
      });

    return (
      <div className="comments">
        <Badge className="commentCount refreshButton">
          <Glyphicon
            className="glyphicon-white"
            glyph="refresh"
            onClick={() => this.props.refresh()}
          />
        </Badge>
        <Badge className="commentCount">
          {commentNodes.length}
        </Badge>
        <div className="commentList">
          {
            this.props.comments.length > 0 && commentNodes.length === 0
            ? <div className="comment notFound"><h2>:(</h2><h3>{'Sorry! We couldn\'t find the kind of post your looking for'}</h3></div>
            : commentNodes
          }
        </div>
      </div>
    );
  }
}

CommentList.propTypes = {
  comments: React.PropTypes.array.string,
  searchWords: React.PropTypes.array.string,
  refresh: React.PropTypes.func.isRequired,
};

export default CommentList;
