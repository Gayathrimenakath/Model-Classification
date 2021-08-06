import React, { useRef } from "react";

const Image = ({ image}) => {
  const ref = useRef(null);

  return (
    <div ref={ref} className="file-item">
      <img alt={`img - ${image.id}`} src={image.src} className="file-img" />
    </div>
  );
};

const ImageList = ({ images }) => {
  const renderImage = (image, index) => {
    return (
      <Image
        image={image}
        index={index}
        key={`${image.id}-image`}
       
      />
    );
  };

  return <section className="file-list">{images.map(renderImage)}</section>;
};

export default ImageList;