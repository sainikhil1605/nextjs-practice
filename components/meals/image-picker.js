"use client";
import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
const ImagePicker = ({ label, name }) => {
  const [pickedImage, setPickedImage] = useState();
  const ref = useRef();
  const handlePickClick = () => {
    ref.current.click();
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) setPickedImage(null);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPickedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {pickedImage && (
            <img src={pickedImage} alt="Picked" fill width={150} />
          )}
          {!pickedImage && <p>No image picked yet.</p>}
        </div>
        <input
          className={classes.input}
          type="file"
          id="image"
          accept=".jpg,.png,.jpeg"
          name={name}
          ref={ref}
          required
          onChange={handleImageChange}
        />
        <button
          className={classes.button}
          type="button"
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
};

export default ImagePicker;
