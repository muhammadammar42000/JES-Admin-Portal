import React, { useState, useEffect, useRef } from "react";
import ImageGallery from "react-image-gallery";
// import back from "../../assets/images/icons/Web-Assets-40.png";
import Clickoutside from "../Clickoutside";


const ImageEventActivity = ({ setViewGallery, eventDetail }) => {
  const [images, setImages] = useState([]);
  const componentRef = useRef();
  const componentRef2 = useRef();
  useEffect(() => {
    setTimeout(() => {
      const array = [];
      eventDetail?.eventGalleries.forEach((item) => {
        array.push({ ...item, thumbnail: item?.image, original: item?.image });
      });
      setImages(array);
    }, 500);
  }, [eventDetail]);
  useEffect(() => {
    function handleEscapeKey(event) {
      if (event.keyCode === 27 || event.which === 27) {
        // escape key was pressed
        setViewGallery(false);
      }
    }
    document.addEventListener("keydown", handleEscapeKey);
    // cleanup function to remove the event listener when component unmounts
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);
  useEffect(() => {
    Clickoutside(componentRef, componentRef2, setViewGallery);
    // eslint-disable-next-line
  }, []);
  return (
    <div className="imgGallery" ref={componentRef}>
      <div className="imgGallery_inner" ref={componentRef2}>
        <img
          className="imgGallery_cross"
          //   src={back}
          onClick={() => setViewGallery(false)}
          alt=""
        />
        {images && (
          <ImageGallery
            items={images}
            showPlayButton={false}
            showFullscreenButton={false}
          />
        )}
      </div>
    </div>
  );
};
export default ImageEventActivity;
