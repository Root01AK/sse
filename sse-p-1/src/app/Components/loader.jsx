"use client"
import { useEffect, useState } from 'react';

export default function Loader({ onLoaded }) {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    // Hide the loader after 3 seconds
    const timer = setTimeout(() => {
      setHide(true);
      if(onLoaded) onLoaded();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onLoaded]);

  if (hide) return null;

  return (
    <div className="loader-wrapper">
      <div className="banter-loader">
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
      </div>
    </div>
  );
}