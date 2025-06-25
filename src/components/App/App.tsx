import css from './App.module.css'
import { useEffect, useState } from 'react'
import { SearchBar } from '../SearchBar/SearchBar';
import { fetchImages } from '../../images-api';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { Loader } from '../Loader/Loader';
import { LoadMoreBtn } from '../LoadMoreBtn/LoadMoreBtn'
import { Toaster } from 'react-hot-toast';
import { ImageModal } from "../ImageModal/ImageModal";



export const App = () => {
  const [images, setImages] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState({});
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }
    
    const getData = async () => {
      try {
        setLoader(true);
        const { imageData, totalPages } = await fetchImages(query, page);

        setImages((prevImages) => {
          return [...prevImages, ...imageData]
        });
        setShowBtn(totalPages !== page && imageData.length > 0);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    }
      getData();
    }, [query, page]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery)
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  }
  const handleOpen = (value) => {
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
        
          <ImageModal isOpen={isOpen} onClose={handleClose} content={content} />

        <Toaster position="down-right" />
        </div>
    </div>
  )
}