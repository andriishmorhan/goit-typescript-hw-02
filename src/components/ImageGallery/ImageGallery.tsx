import { ImageCard } from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { Data } from "../../types";

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
