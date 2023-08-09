import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./blog-post.module.css";
import Comments from "./partials/comments";
import AddComment from "./partials/add-comment";
import Button from "@components/button";
import Heading from "@components/heading";
import BlogImageBanner from "@components/blog-image-banner";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [postUser, setPostUser] = useState(null);

  const supabase = createClientComponentClient();

  useEffect(() => {
    // Fetch post data
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug);
      if (error) console.log("Error fetching post: ", error);
      if (data && data.length > 0) {
        const post = data[0];
        console.log(post)
        setPost(post);
      }
    };

    // Fetch authenticated user data
    const fetchUser = async () => {
      const { data: authUser, error } = await supabase.auth.getUser();

      if (error) console.log("Error fetching user: ", error);
      if (authUser) setUser(authUser.user);
    };

    fetchPost();
    fetchUser();
  }, [slug, supabase.auth]);

  if (!post) return <p>Loading...</p>;

  const handleDeletePost = async () => {
    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", post.id);
      
    if (error) {
      console.error('Error:', error.message);
    } else {
      router.push("/blog");
    }
  };

  const handleEditPost = () => {
    router.push(`/blog/${slug}/edit`);
  };

  const userIsAuthor = user && user.id === post.user_id;

  return (
    <>
      <section className={styles.container}>
        <Heading>{post.title}</Heading>
        {post?.image && <BlogImageBanner src={post.image} alt={post.title} />}
        <div className={styles.dateContainer}>
          <time className={styles.date}>{post.createdAt}</time>
          <div className={styles.border} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.body }} />

        {userIsAuthor && (
          <div className={styles.buttonContainer}>
            <Button onClick={handleDeletePost}>Delete</Button>
            <Button onClick={handleEditPost}>Edit</Button>
          </div>
        )}
      </section>

      <Comments postId={post.id} />

      {user && <AddComment postId={post.id} />}
    </>
  );
}
