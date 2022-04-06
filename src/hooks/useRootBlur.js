import {useEffect} from "react";

export default function () {
  const root = document.getElementById('root');

  useEffect(() => {
    root.style.overflow = "hidden";
    root.style.filter = "blur(10px)";

    return () => {
      root.style.overflow = "";
      root.style.filter = "";
    }
  },[])
}