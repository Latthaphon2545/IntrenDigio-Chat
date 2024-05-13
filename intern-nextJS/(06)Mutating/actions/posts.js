"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const { storePost, updatePostLikeStatus } = require("@/lib/posts");

function checkValid(topic) {
  return !topic || topic.trim().length === 0;
}

export async function createPost(previousState, formData) {
  const title = formData.get("title");
  const image = formData.get("image");
  const content = formData.get("content");

  let errors = [];

  if (checkValid(title)) {
    errors.push("Title is required.");
  }

  if (checkValid(content)) {
    errors.push("Content is required.");
  }

  if (!image || image.size === 0) {
    errors.push("Image is required.");
  }

  if (errors.length > 0) {
    return { errors };
  }

  await storePost({
    imageUrl: "",
    title,
    content,
    userId: 1,
  });

  redirect("/feed");
}

export async function togglePostLikeStatus(postId) {
  await updatePostLikeStatus(postId, 2);
  revalidatePath("/feed");
}
