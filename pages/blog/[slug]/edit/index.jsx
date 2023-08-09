import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import BlogEditor from '../../../../components/blog-editor';
import { createSlug } from "@/utils/createSlug";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function EditBlogPost() {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug);
      if (error) console.log('Error fetching post:', error);
      if (data && data.length > 0) {
        setPost(data[0]);
      }
    };
    fetchPost();
  }, [slug, supabase]);

  const handleOnSubmit = async ({ editorContent, titleInput, image }) => {
    const slug = createSlug(titleInput);
    const updatedPost = {
      id: post.id,
      title: titleInput,
      body: editorContent,
      slug: slug,
      user_id: post.user_id,
    };
  
    const response = await fetch('/api/post', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPost),
    });
  
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      router.push(`/blog/${slug}`); // Redirect to the updated post page
    } else {
      console.error('Error:', response.status, response.statusText);
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <BlogEditor
      heading='Edit blog post'
      title={post.title}
      src={post?.image}
      alt={post.title}
      content={post.body}
      onSubmit={handleOnSubmit}
    />
  );
}
