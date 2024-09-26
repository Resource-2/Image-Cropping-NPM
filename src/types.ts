export type Size = {
  width: number;
  height: number;
};

export type MediaSize = Size & {
  naturalWidth: number;
  naturalHeight: number;
};

export type Point = {
  x: number;
  y: number;
};

export type Area = Size & Point;

export type VideoSrc = {
  src: string;
  type?: string;
};

// Define the correct AspectRatio type
export type AspectRatio = {
  value: number; 
  text: string;
};

export interface Image {
  id: number;
  imageUrl: string;
  croppedImageUrl: string | null; // It can be null initially
  file: File;
  cropped: boolean;
  crop?: Point;
  zoom?: number;
  aspect?: AspectRatio;
}

export interface ImageCropDialogProps {
  id?: number;
  imageUrl?: string;
  cropInit?: Point; // Use Point type for consistency
  zoomInit?: number;
  aspectInit?: AspectRatio;
  onDoneAll: () => void;
  setCroppedImageFor: (
    id: number,
    crop: Point, // Use Point type for consistency
    zoom: number,
    aspect: AspectRatio, // Use AspectRatio type directly
    fileUrl: string,
    createdFile: File
  ) => void;
  images: Image[];
  currentImage: string;
  setCurrentImage: (url: string) => void;
  cropImageId: number | string;
  setCroppedImageId: (id: number) => void;
  imageName: string | null;
  setImageName: (name: string) => void;
}

export interface CroppedImage {
  croppedImageUrl: string;
  imageCropName?: string; 
}
