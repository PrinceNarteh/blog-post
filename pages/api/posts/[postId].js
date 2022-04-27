import dbConnect from "../../../libs/dbConnect";
import Post from "../../../models/post.model";

async function findPostById(postId) {
  let post = await Post.findById(query.postId);
  if (!post) {
    res.status(404).json({ error: "Post Not Found" });
  }
  return post;
}

export default async function handler(req, res) {
  await dbConnect();
  const { method, body, query } = req;

  if (method === "GET") {
    const post = await findPostById(query.postId);
    res.status(200).json({ post });
  } else if (method === "PATCH") {
    // checking if the post to be edited exists
    let post = await findPostById(query.postId);

    // finding and updating the post
    post = await Post.findByIdAndUpdate(query.postId, body, { new: true });
    res.status(200).json({ post });
  } else if (method === "DELETE") {
    // checking if the post to be edited exists
    let post = findPostById(query.postId);

    // finding and deleting the post
    await Post.findByIdAndDelete(query.postId);
    res.status(200).json({ msg: "Post deleted successfully." });
  }
}
