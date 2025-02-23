import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [blogs, setBlogs] = useState({});
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4001/api/blogs/single-blog/${id}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setBlogs(data);
        setLikes(data.likes);
        setComments(data.comments);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBlogs();
  }, [id]);

  // Handle Like Button Click
  const handleLike = async () => {
    try {
      await axios.post(
        `http://localhost:4001/api/blogs/${id}/like`,
        {},
        { withCredentials: true }
      );
      setLikes(likes + 1);
      toast.success("You liked this blog!");
    } catch (error) {
      console.error("Error liking post", error);
    }
  };

  // Handle Comment Submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const { data } = await axios.post(
        `http://localhost:4001/api/blogs/${id}/comment`,
        { text: newComment, user: "Anonymous" },
        { withCredentials: true }
      );
      setComments([...comments, data.comment]);
      setNewComment("");
      toast.success("Comment added!");
    } catch (error) {
      console.error("Error adding comment", error);
    }
  };

  return (
    <div>
      {blogs && (
        <section className="container mx-auto p-4">
          <div className="text-blue-500 uppercase text-xs font-bold mb-4">
            {blogs?.category}
          </div>
          <h1 className="text-4xl font-bold mb-6">{blogs?.title}</h1>
          <div className="flex items-center mb-6">
            <img
              src={blogs?.adminPhoto}
              alt="author_avatar"
              className="w-12 h-12 rounded-full mr-4"
            />
            <p className="text-lg font-semibold">{blogs?.adminName}</p>
          </div>

          <div className="flex flex-col md:flex-row">
            {blogs?.blogImage && (
              <img
                src={blogs?.blogImage?.url}
                alt="mainblogsImg"
                className="md:w-1/2 w-full h-[500px] mb-6 rounded-lg shadow-lg cursor-pointer border"
              />
            )}
            <div className="md:w-1/2 w-full md:pl-6">
              <p className="text-lg mb-6">{blogs?.about}</p>
            </div>
          </div>

          {/* Like Button */}
          <button
            onClick={handleLike}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            👍 {likes} Likes
          </button>

          {/* Comments Section */}
          <div className="mt-6">
            <h3 className="text-xl font-bold">Comments</h3>
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <p key={index} className="bg-gray-100 p-2 rounded mt-2">
                  <strong>{comment.user?.name || "Anonymous"}:</strong> {comment.text}
                </p>

              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>

          {/* Add Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mt-4">
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="border p-2 w-full rounded"
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded mt-2"
            >
              Comment
            </button>
          </form>
        </section>
      )}
    </div>
  );
}

export default Detail;
