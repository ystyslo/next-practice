import { Button } from "../button";

type DeleteBtnProps = {
  onClick?: () => void;
  className?: string;
};

export const DeleteBtn = ({ onClick, className }: DeleteBtnProps) => {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      className={`${className} px-8`}
    >
      Delete
    </Button>
  );
};
