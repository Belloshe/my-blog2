import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./blog.module.css";
import Heading from "@components/heading";

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/posts");
      const { data } = await res.json();
      if (res.ok) {
        console.log("data", data)
        setPosts(data);
      } else {
        console.error("Error:", res.status, res.statusText);
      }
    };

    fetchData();
  }, []);

  console.log(posts[0])
  return (
    <section>
      <Heading>Blog</Heading>
      {posts.map((post) => (
        <Link key={post.slug} href={`/blog/${post.slug}`}>
          <div className={styles.link}>
            <div className="w-full flex flex-col">
              <p>{post.title}</p>
              <time className={styles.date}>{post.createdAt}</time>
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
}
