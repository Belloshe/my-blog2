import { useEffect, useState } from "react";
import Button from "@components/button";
import styles from "./comment.module.css";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function Comment({ comment, createdAt, author, id }) {
  const [userId, setUserId] = useState(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: authUser, error } = await supabase.auth.getUser();

      if (error) console.log("Error fetching user: ", error);
      if (authUser) setUserId(authUser.id);
    };

    fetchUser();
  });

  const handleDelete = async () => {
    const response = await fetch('/api/comment', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });

    if (response.ok) {
      console.log('Comment deleted successfully');
    } else {
      console.error('Error deleting comment:', response.status, response.statusText);
    }
  };

  return (
    <div className={styles.container}>
      <p>{comment}</p>
      <p className={styles.author}>{author}</p>
      <time className={styles.date}>{createdAt}</time>

      {userId === author && (
        <div className={styles.buttonContainer}>
          <Button onClick={handleDelete}>Delete</Button>
        </div>
      )}
    </div>
  );
}
