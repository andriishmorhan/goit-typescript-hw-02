import css from "./ImageCard.module.css";
import { Data } from "../../types";

interface Props {
  imageCard: Data;
  onOpen: (image: Data) => void;
}

export const ImageCard = ({
  onOpen,
  imageCard,
  imageCard: {
    likes,
    description,
    urls: { small },
    user: { last_name },
    links: { download },
  },
}: Props) => {
  const handleDownloadClick = () => {
    window.open(download, "_blank");
  };

  return (
    <div>
      <img
        className={css.image}
        src={small}
        alt={description}
        onClick={() => onOpen(imageCard)}
      />
      <div className={css.content}>
        <div className={css.title}>
          <p className={css.titleItem}>
            Likes: <span className={css.titleText}>{likes}</span>
          </p>
          <p className={css.titleItem}>
            Author: <span className={css.titleText}>{last_name}</span>
          </p>
        </div>
        <button onClick={handleDownloadClick}>Download</button>
      </div>
    </div>
  );
};
