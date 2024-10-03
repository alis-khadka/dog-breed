import React from 'react';
import { Empty } from 'antd';
import DogSpecificImages from './DogSpecificImages';

const ImageGallery = ({ images }) => {
  return (
    <div>
      {images.length === 0 ? (
        <Empty description="No images to display. Please select a breed." />
      ) : (
        <DogSpecificImages imagesMap={images} />
      )}
    </div>
  );
};

export default ImageGallery;
