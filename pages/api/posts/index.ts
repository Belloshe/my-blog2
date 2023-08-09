import type { NextApiRequest, NextApiResponse } from 'next'
import { getPosts, addPost, removePost, editPost } from "../../../api-routes/posts";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    console.log("post")
    const posts = await getPosts();
    return res.status(200).json(posts);
  }

  if (req.method === 'POST') {
    const postData = req.body;
    const newPost = await addPost(postData);
    return res.status(201).json(newPost);
  }

  if (req.method === 'PUT') {
    const { id, ...postData } = req.body;
    const updatedPost = await editPost(id, postData);
    return res.status(200).json(updatedPost);
  }

  if (req.method === 'DELETE') {
    const { id } = req.body;
    const deletedPost = await removePost(id);
    return res.status(200).json(deletedPost);
  }

  res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
