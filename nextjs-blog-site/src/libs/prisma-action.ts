"use server";

import { currentUser } from "@clerk/nextjs/server";
import prisma from "./prisma-client";

// check auth
export async function checkAuthentication() {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }
  const userExists = await prisma.user.findFirst({
    where: {
      email: user?.emailAddresses?.[0]?.emailAddress,
    },
  });

  if (!userExists) {
    const newUser = await prisma.user.create({
      data: {
        username: user.fullName as string,
        email: user?.emailAddresses?.[0]?.emailAddress,
        avatar: user?.imageUrl,
        password:
          (user?.fullName as string) +
          user?.emailAddresses[0]?.emailAddress +
          user?.imageUrl,
      },
    });
    return newUser;
  }

  return userExists;
}

// post
export async function createPost(value: any) {
  try {
    const user = await checkAuthentication();
    const resp = await prisma.post.create({
      data: { ...value, authorId: user.id },
    });
    return resp;
  } catch (error) {
    console.log(error);
  }
}
export async function updatePostById(id: string, value: any) {
  try {
    const user = await checkAuthentication();
    const resp = await prisma.post.update({
      data: { ...value, updateAt: new Date() },
      where: { id: id, authorId: user.id },
    });
    return resp;
  } catch (error) {
    console.log(error);
  }
}
export async function deletePostById(id: string) {
  try {
    const user = await checkAuthentication();
    const resp = await prisma.post.delete({
      where: {
        id: id,
        authorId: user.id,
      },
    });
    return resp;
  } catch (error) {
    console.log(error);
  }
}
export async function getPostsByMe() {
  try {
    const user = await checkAuthentication();
    const resp = await prisma.post.findMany({
      include: {
        author: true,
      },
      where: {
        authorId: user.id,
      },
    });
    return resp;
  } catch (error) {
    console.log(error);
  }
}

//post public
export async function getPosts() {
  try {
    const resp = await prisma.post.findMany({
      include: {
        author: true,
      },
    });
    return resp;
  } catch (error) {
    console.log(error);
  }
}
export async function getPostById(id: string) {
  try {
    const resp = await prisma.post.findFirst({
      include: {
        author: true,
      },
      where: {
        id: id,
      },
    });
    return resp;
  } catch (error) {
    console.log(error);
  }
}
export async function getPostsByAuthor(authorId: string) {
  try {
    const resp = await prisma.post.findMany({
      include: {
        author: true,
      },
      where: {
        authorId: authorId,
      },
    });
    return resp;
  } catch (error) {
    console.log(error);
  }
}

// review
export async function createReview(value: any) {
  try {
    const user = await checkAuthentication();
    const resp = await prisma.review.create({
      data: { ...value, authorId: user.id },
    });
    return resp;
  } catch (error) {
    console.log(error);
  }
}

// review public
export async function getReviewsByPostId(id: string) {
  try {
    const resp = await prisma.review.findMany({
      include: {
        author: true,
        post: true,
      },
      where: {
        postId: id,
      },
    });
    return resp;
  } catch (error) {
    console.log(error);
  }
}
