import React, { useState, useEffect } from "react";
import axios from "axios";

const LikeComment = ({ postId }) => {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetchPostData();
  }, []);

  // Fetch Likes & Comments
  const fetchPostData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4001/api/blogs/${postId}`
      );
      setLikes(response.data.likes);
      setComments(response.data.comments);
    } catch (error) {
      console.error("Error fetching post data", error);
    }
  };

  // Handle Like Click
  const handleLike = async () => {
    try {
      await axios.post(`http://localhost:4001/api/blogs/${postId}/like`);
      setLikes(likes + 1);
    } catch (error) {
      console.error("Error liking post", error);
    }
  };

  // Handle Comment Submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await axios.post(
        `http://localhost:4001/api/blogs/${postId}/comment`,
        { text: newComment, user: "Anonymous" }
      );
      setComments([...comments, response.data.comment]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment", error);
    }
  };

  return (
    <div className="like-comment-container">
      {/* Like Button */}
      <button onClick={handleLike} className="like-btn">
        👍 {likes} Likes
      </button>

      {/* Comments Section */}
      <div className="comments">
        <h4>Comments</h4>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <p key={index}>
              <strong>{comment.user}:</strong> {comment.text}
            </p>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>

      {/* Add Comment Form */}
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit">Comment</button>
      </form>
    </div>
  );
};

export default LikeComment;
