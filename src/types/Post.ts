export interface Post {
  id: number;
  title: string;
  description: string;
  author: string;
  timeAgo: string;
  likes: number;
  comments: number;
  imageUrl: string;
  isVerified: boolean;
}
