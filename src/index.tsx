import React, { useState } from 'react';
import "./index.css";
import ImageCropDialog from "./ImageCropDialog";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {Image,CroppedImage,AspectRatio} from "./types"
interface CropingImageMultipleProps {
  onUpload: (images: string | any[]) => void;
  onCancel: (action: string | any[]) => void;
}

const CropingImageMultiple: React.FC<CropingImageMultipleProps> = ({ onUpload, onCancel }) => {
  const [images, setImages] = useState<Image[]>([]);
  const [croppedImages, setCroppedImages] = useState<CroppedImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [currentImage, setCurrentImage] = useState<string>("");
  const [cropImageId, setCroppedImageId] = useState<number | string>("");
  const [imageName, setImageName] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const onDoneAll = () => {
    const newImages = images.map((file) => ({
      ...file,
      croppedImageUrl: file.croppedImageUrl === null ? file.imageUrl : file.croppedImageUrl,
      cropped: true,
    }));
    setCroppedImages(newImages.map(image => ({
      croppedImageUrl: image.croppedImageUrl!,
      imageCropName: image.file?.name
    })));
    setImages(newImages);
    handleClose();
  };

  const setCroppedImageFor = (
    id: number,
    crop: { x: number; y: number },
    zoom: number,
    aspect: { value: number; text: string },
    croppedImageUrl: string,
    file: File
  ) => {
    const newImageList = images.map((image) =>
      image.id === id
        ? { ...image, crop, zoom, aspect, croppedImageUrl, file, cropped: true }
        : image
    );
    const imageCropName = images.find((image) => image.id === id)?.file?.name;
    setImages(newImageList);
    setCroppedImages((prevCropped) => [
      ...prevCropped,
      { croppedImageUrl, imageCropName }
    ]);

    const nextUncroppedImage = newImageList.find((image) => !image.croppedImageUrl);
    if (nextUncroppedImage) {
      setCurrentImage(nextUncroppedImage?.imageUrl);
      setSelectedImage(nextUncroppedImage);
      setCroppedImageId(nextUncroppedImage?.id);
      setImageName(nextUncroppedImage?.file?.name || "");
    } else {
      setSelectedImage(null);
      handleClose();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = files.map((file, index) => ({
      id: index,
      imageUrl: URL.createObjectURL(file),
      croppedImageUrl: null,
      file,
      cropped: false,
    }));
    setImages((prevImages) => [...prevImages, ...newImages]);
    setCurrentImage(newImages[0]?.imageUrl || "");
    setSelectedImage(newImages[0]);
    setCroppedImageId(newImages[0]?.id || "");
    setImageName(newImages[0]?.file?.name || "");
    handleShow();
  };

  const deleteImage = (imageToDelete: string) => {
    const updatedImages = images.filter((image) => image.croppedImageUrl !== imageToDelete);
    const updatedCroppedImages = croppedImages.filter(
      (croppedUrl) => croppedUrl.croppedImageUrl !== imageToDelete
    );
    setImages(updatedImages);
    setCroppedImages(updatedCroppedImages);
  };

  const handleUpload = () => {
    if (onUpload) {
      const uploadedImageDetails :Image[] = images.filter((image) => image.croppedImageUrl);
      onUpload(uploadedImageDetails);
    }
  };

  const handleClearImage = () => {
    setImages([]);
    setCroppedImages([]);
    setSelectedImage(null);
    setCroppedImageId("");
    if (onCancel) {
      onCancel([]);
    }
  };

  
  const aspectInit: AspectRatio | undefined = selectedImage?.aspect;
  return (
    <div className='fileuploadComponent'>
      <div className='fileuploadWrapper'>
        <div className='fileUpload'>
          <div className='leftPart'>
            <input type="file" onChange={handleFileChange} multiple />
            <span>Choose Files</span>
          </div>
          <div className='rightPart'>
            Add files here by clicking on the choose files button
          </div>
        </div>
      </div>
      <div className='fileUploadList'>
        <span className='fileCount'> {croppedImages.length} files uploaded</span>
        {croppedImages.map((image, index) => (
          <div className="imageCard" key={index}>
            <div className='imageLeftPart'>
              <img src={image.croppedImageUrl} alt="" />
              <div className='imageDetails'>
                <span className='imgname'>{image.imageCropName}</span>
                <span className='imgSize'>200 KB</span>
              </div>
            </div>
            <button className='deleteBtn' onClick={() => deleteImage(image.croppedImageUrl)}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.3333 5.00002V4.33335C13.3333 3.39993 13.3333 2.93322 13.1517 2.5767C12.9919 2.2631 12.7369 2.00813 12.4233 1.84834C12.0668 1.66669 11.6001 1.66669 10.6667 1.66669H9.33333C8.39991 1.66669 7.9332 1.66669 7.57668 1.84834C7.26308 2.00813 7.00811 2.2631 6.84832 2.5767C6.66667 2.93322 6.66667 3.39993 6.66667 4.33335V5.00002M8.33333 9.58335V13.75M11.6667 9.58335V13.75M2.5 5.00002H17.5M15.8333 5.00002V14.3334C15.8333 15.7335 15.8333 16.4336 15.5608 16.9683C15.3212 17.4387 14.9387 17.8212 14.4683 18.0609C13.9335 18.3334 13.2335 18.3334 11.8333 18.3334H8.16667C6.76654 18.3334 6.06647 18.3334 5.53169 18.0609C5.06129 17.8212 4.67883 17.4387 4.43915 16.9683C4.16667 16.4336 4.16667 15.7335 4.16667 14.3334V5.00002" stroke="#344054" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        ))}
      </div>
      {croppedImages.length > 0 && (
        <div className='submitBtns'>
          <button className='purpleBtn btn' onClick={handleUpload}>Submit</button>
          <button className='btn' onClick={handleClearImage}>Cancel</button>
        </div>
      )}

      <Modal className={"custom-modal"} show={show} onHide={handleClose} centered>
        <Modal.Body>
          <Modal.Header closeButton>
            <Modal.Title>Crop Images</Modal.Title>
          </Modal.Header>
          {selectedImage ? (
            <ImageCropDialog
              cropInit={selectedImage?.crop}
              zoomInit={selectedImage?.zoom}
              aspectInit={aspectInit}
              onDoneAll={onDoneAll}
              setCroppedImageFor={setCroppedImageFor}
              images={images}
              setCurrentImage={setCurrentImage}
              currentImage={currentImage}
              cropImageId={cropImageId}
              setCroppedImageId={setCroppedImageId}
              imageName={imageName}
              setImageName={setImageName}
            />
          ) : null}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CropingImageMultiple;
