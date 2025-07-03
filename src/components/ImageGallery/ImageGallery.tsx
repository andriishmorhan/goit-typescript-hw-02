import { ImageCard } from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

interface Data {
  id: string;
  description: string;
  likes: number;
  urls: {
    small: string;
    regular: string;
  };

  user: {
    last_name: string;
  };
  links: {
    download: string;
  };
}

interface Props {
  gallery: Data[];
  onOpen: (image: Data) => void;
}

export const ImageGallery = ({ gallery, onOpen }: Props) => {
  return (
    <ul className={css.gallery}>
      {gallery.map((item) => (
        <li key={item.id} className={css.galleryItem}>
          <ImageCard imageCard={item} onOpen={onOpen} />
        </li>
      ))}
    </ul>
  );
};
