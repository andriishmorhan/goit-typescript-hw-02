import css from "./ImageModal.module.css";
import Modal from "react-modal";
import { Data } from "../../types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  content: Data;
}
Modal.setAppElement("#root");

export const ImageModal = ({
  isOpen,
  onClose,
  content: { description, urls, user, links },
}: Props) => {
  const handleDownloadClick = () => {
    window.open(links.download, "_blank");
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={css.modal}
      overlayClassName={css.overlay}
    >
      {isOpen && (
        <>
          <img className={css.image} src={urls.regular} alt={description} />
          <div className={css.title}>
            <p>Author: {user.last_name}</p>
            <button type="button" onClick={handleDownloadClick}>
              download
            </button>
          </div>
        </>
      )}
    </Modal>
  );
};
