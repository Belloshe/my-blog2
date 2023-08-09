// comments.js

// A simple array to store comments as placeholders
const comments = [];

export const getComments = () => {
  // Return all comments
  return comments;
};

export const addComment = (newComment) => {
  // Add a new comment to the array
  comments.push(newComment);
};

export const removeComment = (commentIndex) => {
  // Remove the comment at the specified index from the array
  if (commentIndex >= 0 && commentIndex < comments.length) {
    comments.splice(commentIndex, 1);
  }
};
