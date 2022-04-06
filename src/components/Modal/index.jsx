import React, {useRef} from "react";
import ReactDOM from "react-dom";
import s from './styles.module.scss';
import useRootBlur from "../../hooks/useRootBlur";
import useOutsideClick from "../../hooks/useOutsideClick";
import CloseButton from "../Buttons/CloseButton";

const Modal = (props) => {
  const {
    children,
    element = document.body,
    onClose
  } = props;
  const modalContent = useRef(null);
  useRootBlur();
  useOutsideClick(modalContent, onClose);

  const handleClose = (e) => {
    e.stopPropagation();
    onClose?.(e)
  }

  return ReactDOM.createPortal(<div
      className={s.wrapper}
  >
    <div
        ref={modalContent}
        className={s.content}
    >
      <CloseButton onClick={handleClose} className={s.close}/>
      {children}
    </div>
  </div>, element)
}

export default Modal