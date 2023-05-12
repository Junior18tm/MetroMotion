import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import getUserInfo from '../../utilities/decodeJwt';


const CommentList = () => {
  const [comments, setComments] = useState([]);
  const [selectedComment, setSelectedComment] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    fetchComments();
  }, []);


  const fetchComments = async () => {
    const response = await axios.get('http://localhost:8081/comment/getAll');
    setComments(response.data);
  };


  const handleEditComment = async () => {
    try {
      const response = await axios.post('http://localhost:8081/comment/editComment', {
        _id: selectedComment._id,
        comment: editedComment
      });
      setSelectedComment(null);
      setEditedComment("");
      fetchComments();
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };


 const handleCommentClick = (comment) => {
  setSelectedComment(comment);
  setEditedComment(comment.comment);
  setShowModal(true);
};



const renderComments = () => {
  // Get the currently logged in user from the JWT
  const currentUser = getUserInfo().username;

  return comments.map((comment) => {
    return (
      <Card className="mb-4" key={comment._id}>
        <Card.Body>
          <Card.Title>
            {comment.username}
            {comment.username === currentUser && (
              <Button 
                variant="primary" 
                size="sm" 
                style={{ position: 'absolute', top: '10px', right: '10px' }}
                onClick={() => handleCommentClick(comment)}
              >
                Edit
              </Button>
            )}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            <strong>Subway Line:</strong> {comment.line}<br />
            <strong>Stop:</strong> {comment.stationName}
          </Card.Subtitle>
          <Card.Text className="mt-4"> <strong>Comment: </strong>
            {comment.comment}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  });
};


  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedComment(null);
    setEditedComment("");
  };


  const renderEditModal = () => {
    if (!selectedComment) return null;


    return (
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="commentForm.ControlTextarea1">
              <Form.Label>Edit your comment:</Form.Label>
              <Form.Control as="textarea" rows={3} value={editedComment} onChange={(e) => setEditedComment(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
          <Button variant="primary" onClick={handleEditComment}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  };


  return (
    <div className="container mt-5">
      <h2 className="mb-4">Comment List</h2>
      {renderComments()}
      {renderEditModal()}
    </div>
  );
};


export default CommentList;