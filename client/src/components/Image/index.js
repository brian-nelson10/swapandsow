import React from "react";


const Image = ({ src, fallback, type = "image/webp", alt, className, style }) => {
  return (
    <picture>
      <source srcSet={src} type={type} className={className} style={style}/>
      <img src={fallback} alt={alt} className={className} style={style}/>
    </picture>
  );
};

export default Image;