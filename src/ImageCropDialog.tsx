import React, { useState } from "react";
import getCroppedImg from "./cropImage";
import Slider from "react-slick";
import Cropper from "./Cropper"
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { AspectRatio,Image,ImageCropDialogProps,Area} from "./types";


// Aspect Ratio Options for Cropping
const aspectRatios: AspectRatio[] = [
  { value: 4 / 3, text: "4/3" },
  { value: 16 / 9, text: "16/9" },
  { value: 1 / 2, text: "1/2" },
];



const ImageCropDialog: React.FC<ImageCropDialogProps> = ({
  cropInit = { x: 0, y: 0 },
  zoomInit = 1,
  aspectInit = aspectRatios[0],
  onDoneAll,
  setCroppedImageFor,
  images,
  currentImage,
  setCurrentImage,
  cropImageId,
  setCroppedImageId,
  imageName,
  setImageName,
}) => {
  const [zoom, setZoom] = useState(zoomInit);
  const [crop, setCrop] = useState(cropInit);
  const [aspect, setAspect] = useState(aspectInit);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const onCropChange = (crop: { x: number; y: number }) => setCrop(crop);

  const onZoomChange = (zoom: number) => setZoom(zoom);


  const onCropComplete = (croppedArea: Area, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onCrop = async () => {
    const { fileUrl, createdFile } = await getCroppedImg(currentImage, croppedAreaPixels);
    setCroppedImageFor(+cropImageId, crop, zoom, aspect, fileUrl, createdFile);
  };

  const onResetImage = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    const initialAspect = aspectRatios[0];
    setAspect(initialAspect);
  };

  const handleThumbnailClick = (image: Image, index: number) => {
    setCurrentImage(image?.imageUrl);
    setImageName(image?.file?.name || "");
    setCroppedImageId(index);
    onResetImage();
  };

  const SampleNextArrow: React.FC<{ onClick?: () => void }> = React.memo(({ onClick }) => (
    <div className="nextArrow" onClick={onClick}>
      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9 18.88L15 12.88L9 6.88"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  ));

  const SamplePrevArrow: React.FC<{ onClick?: () => void }> = React.memo(({ onClick }) => (
    <div className="prevArrow" onClick={onClick}>
      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M15 18.88L9 12.88L15 6.88"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  ));

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerPadding: "20px",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <>
      <div>
        <div className="crop-container">
          <Cropper
            image={currentImage || ""}
            zoom={zoom}
            crop={crop}
            aspect={aspect.value}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={onCropComplete}
            rotation={0}             
            minZoom={1}              
            maxZoom={3}              
            cropShape="rect"         
            objectFit="contain"      
            zoomSpeed={1}            
            classes={{}} 
            style={{}}               
            restrictPosition={true}  
            mediaProps={{}}  
          />
        </div>
      </div>
      <div className="controls">
        <div className="controls-upper-area">
          <div className="slider-container">
            <Slider {...settings}>
              {images?.map((image) => (
                <div key={image.id} className={image?.file?.name === imageName ? "sliderWrapper active" : "sliderWrapper"}>
                  <span className="slideInnerDiv">
                    <img src={image?.imageUrl || ""} alt="" onClick={() => handleThumbnailClick(image, image.id)} />
                  </span>
                </div>
              ))}
            </Slider>
          </div>
          <span className="imageName">{imageName}</span>
        </div>
        <div className="button-area">
          <div className="leftBtns">
            <button className="btn cropBtn" onClick={onCrop}>
              Crop
            </button>
            <button className="btn resetBtn" onClick={onResetImage}>
              Reset
            </button>
          </div>
          <button className="btn purpleBtn" onClick={onDoneAll}>
            Done All
          </button>
        </div>
      </div>
    </>
  );
};

export default ImageCropDialog;
