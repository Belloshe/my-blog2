import { supabase } from "@/lib/supabaseClient";

//postId = "id på posten";
export const getComments = async (postId) => {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", postId);

  return data;
};

export const addComment = async (newComment) => {

  const { data, error } = await supabase

    .from("comments")

    .insert(newComment)

    .select()

    .single();

 

  return data;

};

//id = "id på kommentaren";
export const removeComment = async (id) => {
  const { data, error } = await supabase.from("comments").delete().eq("id", id);

  return data;
};