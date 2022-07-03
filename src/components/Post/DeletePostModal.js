import React, { Component } from "react";
import { Modal, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { postActions } from "../../actions/postActions";

class DeletePostModal extends Component {
  state = { open: false };

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  deletePost = () => {
    const { dispatch, postId } = this.props;
    dispatch(postActions.deletePost(postId));
  };

  render() {
    const { open } = this.state;

    return (
      <Modal
        open={open}
        onOpen={this.open}
        onClose={this.close}
        size="tiny"
        trigger={
          <Button size="big" fluid color="red">
            Borrar
          </Button>
        }
      >
        <Modal.Header>Borrar tu post</Modal.Header>
        <Modal.Content>
          <p>Seguro que deseas borra esta publicación</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={this.close}>
            No
          </Button>
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="Si"
            onClick={this.deletePost}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  post: state.post.posts
});

const connectedDeletePostModal = connect(mapStateToProps)(DeletePostModal);
export { connectedDeletePostModal as DeletePostModal };
