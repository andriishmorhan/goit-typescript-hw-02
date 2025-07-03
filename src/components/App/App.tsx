import css from "./App.module.css";
import { useEffect, useState } from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import { fetchImages } from "../../images-api";
import { ImageGallery } from "../ImageGallery/ImageGallery";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { Loader } from "../Loader/Loader";
import { LoadMoreBtn } from "../LoadMoreBtn/LoadMoreBtn";
import { Toaster } from "react-hot-toast";
import { ImageModal } from "../ImageModal/ImageModal";

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

export const App = () => {
  const [images, setImages] = useState<Data[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [content, setContent] = useState<Data | null>(null);
  const [showBtn, setShowBtn] = useState<boolean>(false);

  useEffect(() => {
    if (!query) {
      return;
    }

    const getData = async () => {
      try {
        setLoader(true);
        const {
          imageData,
          totalPages,
        }: { imageData: Data[]; totalPages: number } = await fetchImages(
          query,
          page
        );

        setImages((prevImages) => {
          return [...prevImages, ...imageData];
        });
        setShowBtn(totalPages !== page && imageData.length > 0);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    };
    getData();
  }, [query, page]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };
  const handleOpen = (value: Data) => {
    setIsOpen(true);
    setContent(value);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      <div className={css.main}>
        {images.length > 0 && (
          <ImageGallery gallery={images} onOpen={handleOpen} />
        )}
        {loader && <Loader />}
        {error && <ErrorMessage />}
        {showBtn && <LoadMoreBtn onClick={handleLoadMore} />}

        {isOpen && content && (
          <ImageModal isOpen={isOpen} onClose={handleClose} content={content} />
        )}

        <Toaster position="bottom-right" />
      </div>
    </div>
  );
};
