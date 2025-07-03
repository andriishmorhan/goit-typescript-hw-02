import css from "./LoadMoreBtn.module.css";

interface Props {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const LoadMoreBtn = ({ onClick }: Props) => {
  return (
    <button className={css.button} onClick={onClick}>
      Load more
    </button>
  );
};
