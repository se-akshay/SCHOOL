import React, { useState } from "react";

const ImageUpload = ({ onImageUpload }) => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      if (onImageUpload) onImageUpload(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      if (onImageUpload) onImageUpload(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="w-full border-2 border-dashed border-gray-300 rounded-lg px-4 py-6 flex flex-col items-center justify-center cursor-pointer bg-gray-50 hover:border-[#2980d9] transition mb-2"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={() => document.getElementById("school-image-input").click()}
      style={{ minHeight: "120px" }}
    >
      {imagePreview ? (
        <img
          src={imagePreview}
          alt="Preview"
          className="max-h-32 mb-2 rounded"
        />
      ) : (
        <span className="text-gray-400">
          Drag & drop or click to select an image
        </span>
      )}
      <input
        id="school-image-input"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
      {imageFile && (
        <div className="text-sm text-gray-500">Selected: {imageFile.name}</div>
      )}
    </div>
  );
};

export default ImageUpload;
