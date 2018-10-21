import React from 'react';
import { highlightWordsInHtml, getColorFromIndex } from '../tools/util.js';


/**
 * Comment Component
 *
 * @class Comment
 * @extends {React.Component}
 */
class Comment extends React.Component {
  /**
   * Highlight each search word found in the commentHtml with a unique color
   *
   * @param {string} commentHtml
   * @memberOf Comment
   */
  highlightSearchWords(commentHtml) {
    this.props.searchWords.forEach((searchWord, i) => {
      commentHtml = highlightWordsInHtml(commentHtml, searchWord, getColorFromIndex(i));
    });
    return commentHtml;
  }


  /**
   * render raw html so that we can hightlight words dynamically
   *
   * @memberOf Comment
   */
  rawHtml() {
    return { __html: this.highlightSearchWords(this.props.children) };
  }

  render() {
    return (
      <div className="comment">
        <h4 className="commentAuthor">
          {this.props.author} <span className="createdAt">{this.props.createdAt}</span>
        </h4>
        <span dangerouslySetInnerHTML={this.rawHtml()} />
      </div>
    );
  }
}

Comment.propTypes = {
  createdAt: React.PropTypes.string,
  author: React.PropTypes.string,
  children: React.PropTypes.array.string,
  searchWords: React.PropTypes.array.string,
};

export default Comment;
