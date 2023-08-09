import type { NextApiRequest, NextApiResponse } from 'next'
import { getComments, addComment, removeComment } from "../../../api-routes/comments";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req)
  if (req.method === 'GET') {
    const comments = await getComments();
    return res.status(200).json(comments);
  }

  if (req.method === 'POST') {
    const commentData = req.body;
    const newComment = await addComment(commentData);
    return res.status(201).json(newComment);
  }

  if (req.method === 'DELETE') {
    const { id } = req.body;
    const deletedComment = await removeComment(id);
    return res.status(200).json(deletedComment);
  }

  res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
