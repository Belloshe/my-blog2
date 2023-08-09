import BlogEditor from "@/components/blog-editor";
import { createSlug } from "@/utils/createSlug";
import { useRouter } from 'next/router'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { uploadImage } from "../../utils/uploadImages";
import { useEffect } from "react";


export default function CreatePost() {
  const supabase = createClientComponentClient()
  const router = useRouter()
  const handleOnSubmit = async ({
    editorContent,
    titleInput,
    image: fileImage,
  }) => {
    const { data } = await supabase.auth.getUser();
    const { user } = data;

    if (!user) {
      router.push("/login");
      return;
    }

    const slug = createSlug(titleInput);

    let image = "";

    if (fileImage) {
      const { publicUrl, error } = await uploadImage(fileImage);

      if (!error) {
        image = publicUrl;
      }
    }

    const post = {
      user_id: user.id,
      title: titleInput,
      image,
      body: editorContent.replace("<p>", "").replace("</p>", ""),
      slug: slug,
    };

    const response = await fetch("/api/posts/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result);
    } else {
      console.error("Error:", response.status, response.statusText);
    }

    router.push("/blog");
  };
  return (
    <BlogEditor
      heading="Create post"
      onSubmit={handleOnSubmit}
      buttonText="Upload post"
    />
  );
}
