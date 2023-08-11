import { useEffect, useState } from "react";
import AddComment from "../add-comment"
import styles from "./comments.module.css";
import Comment from "../comment";

export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {

    const fetchComments = async () => {

      try {

 

        const response = await fetch(`/api/comments?postId=${postId}`, {

          method: "GET",

          headers: { "Content-Type": "application/json" },

        });

        const commentsData = await response.json(); // Here you get the actual response data

 

        setComments(commentsData);

      } catch (error) {

        console.error("Error fetching comments:", error);

      }

    };
    fetchComments();

  }, [postId]);

  const handleAddNewComment = (newComment) => {
    console.log(newComment);
  };

  return (
    <div className={styles.container}>
      <AddComment postId={postId} addComment={handleAddNewComment} />
      <h2>Comments</h2>
      {comments.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}
    </div>
  );
}

