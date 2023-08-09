import { useRef, useState, useEffect } from "react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Button from "@components/button";
import Input from "@components/input";
import Label from "@components/label";
import TextArea from "@components/text-area";
import styles from "./add-comment.module.css";

export default function AddComment({ postId }) {
  const formRef = useRef(); // create a reference
  const [user, setUser] = useState(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: authUser, error } = await supabase.auth.getUser();
      if (error) console.log("Error fetching user: ", error);
      if (authUser) setUser(authUser.user);
    };
    fetchUser();
  });

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    if (!user) {
      console.error("You need to be logged in to comment.");
      return;
    }
    const formData = new FormData(event.target);
    const { author, comment } = Object.fromEntries(formData);

    const commentData = {
      author,
      comment,
      post_id: postId,
    };

    const response = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(commentData)
    });

    if (response.ok) {
      console.log("Comment created successfully");
    } else {
      console.error("Error creating comment:", response.statusText);
    }

    formRef.current.reset();
    
  };

  return (
    <div className={styles.container}>
      <h2>Add a comment</h2>
      <form ref={formRef} className={styles.form} onSubmit={handleOnSubmit}>
        <div className={styles.inputContainer}>
          <Label htmlFor="author">Author</Label>
          <Input id="author" name="author" />
        </div>

        <div className={styles.inputContainer}>
          <Label htmlFor="comment">Comment</Label>
          <TextArea id="comment" name="comment" />
        </div>

        <Button className={styles.addCommentButton} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
