import { Button } from "../button";
import Loader from "../Loader";

type DeleteBtnProps = {
  onClick?: () => void;
  onDelete?: boolean;
  className?: string;
};

export const DeleteBtn = ({ onClick, onDelete, className }: DeleteBtnProps) => {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      className={`${className} px-8`}
      disabled={onDelete}
    >
      {onDelete ? <Loader /> : "Delete"}
    </Button>
  );
};
