import { useEffect, useState } from "react";
import styles from "./comments.module.css";
import Comment from "../comment";

export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(`/api/comments?postId=${postId}`);
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      } else {
        console.error('Error:', response.status, response.statusText);
      }
    };

    fetchComments();
  }, [postId]);

  return (
    <div className={styles.container}>
      <h2>Comments</h2>
      {comments.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}
    </div>
  );
}
