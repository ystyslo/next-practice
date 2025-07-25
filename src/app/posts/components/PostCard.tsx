import React from "react";
import { Heart, MessageCircle, Star } from "lucide-react";
import Image from "next/image";
import { Post } from "@/types/Post";

type PostCardProps = {
  post: Post;
};

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="w-full max-w-[518px] h-[138px] bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="flex h-full">
        <div className="w-[138px] h-[111px] mt-3 ml-3 flex-shrink-0 relative">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 leading-tight pr-2">
              {post.title}
            </h3>
            <span className="text-sm text-gray-500 whitespace-nowrap ml-2">
              {post.timeAgo}
            </span>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2 mb-3 leading-relaxed">
            {post.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-semibold text-white">
                    {post.author.charAt(0)}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900 flex items-center gap-1">
                  {post.author}
                  {post.isVerified && (
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  )}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 ml-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    {post.likes}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    {post.comments}
                  </span>
                </div>
              </div>

              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 whitespace-nowrap">
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
