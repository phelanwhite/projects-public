type UserType = {
  id: string;
  username: string;
  avatar: string;
  email: string;
};
type PostType = {
  id: string;
  title: string;
  thumbnail: string;
  categories: string[];
  description: string;
  author: UserType;
  createAt: any;
  updateAt: any;
};
