"use server";

import { currentUser } from "@clerk/nextjs/server";
import prisma from "./client";

export const getAuth = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("You must be signed in to use this feature");
  }

  const resp = await prisma.user.findFirst({
    where: {
      email: user?.emailAddresses?.[0]?.emailAddress,
    },
  });

  if (!resp) {
    const newUser = {
      email: user?.emailAddresses?.[0]?.emailAddress,
      name: user?.fullName as string,
      avatar: user?.imageUrl,
    };
    const getUser = await prisma.user.create({
      data: newUser,
    });
    return getUser;
  }
  return resp;
};
export const updateAuth = async ({ data }: { data: any }) => {
  const auth = await getAuth();
  const user = await prisma.user.update({
    where: { id: auth.id },
    data: { ...data },
  });
  return user;
};

export async function blogCreate({ data }: { data: any }) {
  const auth = await getAuth();
  const blog = await prisma.blog.create({
    data: { ...data, authorId: auth.id },
  });
  return blog;
}
export async function blogUpdateId({ id, data }: { id: any; data: any }) {
  const auth = await getAuth();

  const { id: blogId, author: authorBlog, ...other } = data;

  const blog = await prisma.blog.update({
    where: {
      id: id,
      authorId: auth.id,
    },
    data: {
      ...other,
    },
  });
  return blog;
}
export async function blogDeleteId({ id }: { id: string }) {
  const auth = await getAuth();
  const blog = await prisma.blog.delete({
    where: {
      id: id,
      authorId: auth.id,
    },
  });
  return blog;
}
export async function blogAll() {
  const blogs = await prisma.blog.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      category: true,
      thumbnail: true,
      tags: true,
      author: true,
    },
  });
  return blogs;
}
export async function blogId(id: string) {
  const blogs = await prisma.blog.findFirst({
    select: {
      id: true,
      title: true,
      content: true,
      category: true,
      thumbnail: true,
      tags: true,
      description: true,
      author: true,
    },
    where: {
      id: id,
    },
  });
  return blogs;
}
