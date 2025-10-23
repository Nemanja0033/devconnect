"use client"
import { useState } from "react";
import ImageSliderButton from "./ImageSliderButton";
import { motion } from "framer-motion";
import ImagePreview from "../ImagePreveiw";
import { useImagePreviewStore } from "@/store/useImagePreviewStore";
import { useLikes } from "../../hooks/useLikes";
import LikeButton from "./buttons/LikeButton";
import CommentButton from "./buttons/CommentButton";
import FavouriteButton from "./buttons/FavouriteButton";
import CommentSection from "./CommentSection";

const SinglePostPreview = ({ post }: { post: any }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const { setImageToPreview, setIsPreviewOpen } = useImagePreviewStore()
  const { handleLikePost, isLiked, likes } = useLikes(post);

  const showNextImage = () => {
    if (imageIndex < post.images.length - 1) {
      setDirection("right");
      setImageIndex((prev) => prev + 1);
    }
  };

  const showPervImage = () => {
    if (imageIndex > 0) {
      setDirection("left");
      setImageIndex((prev) => prev - 1);
    }
  };

  const previewImage = () => {
    if(post.images.length  === 0) return;
    setImageToPreview(post?.images[imageIndex].url);
    setIsPreviewOpen(true);
  }

  return (
    <div className="w-5xl grid gap-3">
      <div className="w-full flex justify-start">
        <h1 className="text-2xl font-semibold">{post?.title}</h1>
      </div>

      <div>
        <p className="text-gray-400 text-lg">{post?.content}</p>
      </div>

      <div className="w-full h-auto relative flex justify-center overflow-hidden">
        {post.images.length > 1 && imageIndex > 0 && (
          <ImageSliderButton side="left" onClick={showPervImage} />
        )}

        {post?.images.length !== 0 && (
            <motion.img
                onClick={previewImage}
                key={post.images[imageIndex].id}
                src={post.images[imageIndex].url}
                srcSet={`${post.images[imageIndex].url} 800w`}
                className="w-full"
                alt="..."
                loading="lazy"
                decoding="async"
                initial={{ x: direction === "right" ? 300 : -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction === "right" ? -300 : 300, opacity: 0 }}
                transition={{ duration: 0.4 }}
                />
        )}

        {post.images.length > 1 && imageIndex < post.images.length - 1 && (
          <ImageSliderButton side="right" onClick={showNextImage} />
        )}
      </div>

      <div className="w-full flex p-2 bg-accent/50 rounded-md justify-start gap-3"> 
        <LikeButton handleLikePost={() => handleLikePost(post.id)} isLiked={isLiked} likes={likes} />
        <CommentButton />
        <FavouriteButton />
      </div>

      <CommentSection post={post} />

      <ImagePreview />
    </div>
  );
};

export default SinglePostPreview;
