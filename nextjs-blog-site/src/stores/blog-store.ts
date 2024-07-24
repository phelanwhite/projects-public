import { blogAll, blogCreate, blogId, blogUpdateId } from "@/lib/actions";
import { create } from "zustand";

interface IblogStore {
  blogs: any;
  addBlog: (data: any) => void;
  deleteBlogById: (id: any) => void;
  updateBlogById: (id: any, data: any) => void;
  getBlogById: (id: any) => any;
  getBlogs: () => void;
}

const useBlogStore = create<IblogStore>((set, get) => ({
  blogs: [],
  getBlogs: async () => {
    const resp = await blogAll();

    return set((state) => ({ ...state, blogs: [...resp] }));
  },
  getBlogById: async (id) => {
    const resp = await blogId(id);
    return get().blogs.find((item: any) => item.id === id);
  },
  addBlog: async (data) => {
    const resp = await blogCreate({ data: data });
    return set((state) => ({ ...state, blogs: [...state.blogs, resp] }));
  },
  deleteBlogById: (id) =>
    set((state) => ({
      ...state,
      blogs: state.blogs.filter((blog: any) => blog.id !== id),
    })),
  updateBlogById: async (id, data) => {
    const resp = await blogUpdateId({ id: id, data: data });

    return set((state) => ({
      ...state,
      blogs: state.blogs.map((blog: any) =>
        blog.id === id ? { ...blog, ...data } : blog
      ),
    }));
  },
}));

export default useBlogStore;
