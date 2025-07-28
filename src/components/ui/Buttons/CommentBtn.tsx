import { Button } from "../button";

type CommentBtnProps = {
  onClick?: () => void;
  className?: string;
};

export const CommentBtn = ({ onClick, className }: CommentBtnProps) => {
  return (
    <Button
      onClick={onClick}
      className={`${className} bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200`}
    >
      Comment
    </Button>
  );
};
