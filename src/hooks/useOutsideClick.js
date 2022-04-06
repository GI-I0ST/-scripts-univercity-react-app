import {useEffect} from "react";

export default function useOutsideClick (ref, callback) {
  useEffect(() => {
    document.body.addEventListener('click', handleClick)
    return () => document.body.removeEventListener('click', handleClick)
  }, [ref.current]);

  const handleClick = e => {
    e.stopPropagation();
    if (!ref.current || ref.current.contains(e.target)) return;
    callback(e)
  }
}