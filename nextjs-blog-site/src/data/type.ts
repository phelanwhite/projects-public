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
  rating: number;
  vote: number;
  author: UserType;
  createAt: any;
  updateAt: any;
};
type ReviewType = {
  id: string;
  description: string;
  images: string[];
  rating: number;
  vote: number;
  author: UserType;
  createAt: any;
  updateAt: any;
};
