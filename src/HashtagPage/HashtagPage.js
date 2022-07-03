import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon, Divider } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { postActions } from "../actions/postActions";
import Messages from "../components/Messages";
import InfiniteScroll from "react-infinite-scroll-component";

class HashtagPage extends Component {
  componentDidMount = () => {
    const {
      dispatch,
      match,
      data: { hashtag }
    } = this.props;
    if (hashtag !== match.params.hashtag) {
      dispatch(
        postActions.getPostsByHashtag(match.params.hashtag, {
          initialFetch: true,
          hashtag: match.params.hashtag
        })
      );
    }

    document.title = "Marcadores | TravelGo";
  };

  fetchData = () => {
    const {
      dispatch,
      data: { postsByHashtag },
      match
    } = this.props;
    const lastId = postsByHashtag[postsByHashtag.length - 1]._id;
    dispatch(
      postActions.getPostsByHashtag(match.params.hashtag, {
        initialFetch: false,
        lastId
      })
    );
  };

  render() {
    console.log(this.props)
    const {
      data: { postsByHashtag, totalPostsByHashtag },
      alert,
      match
    } = this.props;
    const hasMore =
      postsByHashtag.length === totalPostsByHashtag ? false : true;
    const hashtagPosts = postsByHashtag.map(post => {
      return (
        <Link to={"/p/" + post._id} key={post._id}>
          <div className="gallery-item">


          {post.photo === "person.png" ? (
                                     <img
                                     src='https://cdn-icons-png.flaticon.com/512/711/711769.png'
                                     className="gallery-image"
                                     alt=""
                                   />
                                  
                                  ) : (
                                    <img
                                   src={post.photo}
                                   className="gallery-image"
                                  alt=""
                                 />
                                  )}

            <div className="gallery-item-info">
              <ul>
                <li className="gallery-item-likes">
                  <span className="visually-hidden">Me gustas:</span>
                  <Icon name="thumbs up outline" /> {post.likes}
                </li>
                <li className="gallery-item-comments">
                  <span className="visually-hidden">Commentarios:</span>
                  <Icon name="comment" /> {post.comments}
                </li>
              </ul>
            </div>
          </div>
        </Link>
      );
    });
    if (alert.message !== "Error ") {
      return (
        <div className="container">
          <Messages alert={alert} />
        </div>
      );
    }
    return (
      <div className="container">
        <div className="hashtag">#{match.params.hashtag}</div>
        <div>
          <p style={{ fontSize: "2rem", paddingBottom: "1%" }}>
            {" "}
            {totalPostsByHashtag} publicaciones
          </p>
          <Divider></Divider>
          <InfiniteScroll
            className="gallery"
            dataLength={hashtagPosts.length} //This is important field to render the next data
            next={this.fetchData}
            hasMore={hasMore}
            loader={<h4>Cargando...</h4>}
          >
            {hashtagPosts}
          </InfiniteScroll>
        </div>
        <Divider hidden></Divider>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  data: state.post,
  alert: state.alert
});

const connectedHashtagPage = connect(mapStateToProps)(HashtagPage);
export { connectedHashtagPage as default };
