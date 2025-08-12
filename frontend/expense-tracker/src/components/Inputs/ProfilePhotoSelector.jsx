import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Update the image state
      setImage(file);

      // Generate preview URL
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveItem = () => {
    // Remove the image from the state
    setImage(null);
    setPreviewUrl(null);
  };
  const onChangeFile = () => {
    inputRef.current.click();
    
  }
  return <div></div>;
};

export default ProfilePhotoSelector;
