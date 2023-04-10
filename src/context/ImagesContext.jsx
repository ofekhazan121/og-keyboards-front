import { createContext, useContext, useState } from "react";

const initialState = {
  images: [],
};

const ImagesContext = createContext(initialState);

const ImagesContextProvider = ({ children }) => {
  const [images, setImages] = useState([]);

  const updateImages = (images) => setImages(images);

  return (
    <ImagesContext.Provider value={{ images, setImages, updateImages }}>
      {children}
    </ImagesContext.Provider>
  );
};

export const useImagesContext = () => useContext(ImagesContext)
export default ImagesContextProvider