# multiple-image-crop-react


## Table of Contents

1. [Features](#features)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Example](#example)
6. [Props](#props)


## Features

- Responsive (you can use pixels or percentages).
- Free-form or fixed aspect crops.
- No dependencies/small footprint .
- Min/max crop size.
- Crop multiple images.

## Installation

```
npm i multiple-image-crop-react
yarn add multiple-image-crop-react
pnpm add multiple-image-crop-react
```

This library works with all modern browsers. It does not work with IE.

## Usage

Include the main js module:

```js
import MultipleImageCropping from 'multiple-image-crop-react';

```

Once installed, you can use the `MultipleImageCropping` component in your React application. Import the component and include it in your JSX. You need to provide callback functions to handle the cropped images and any cancellation events.

Here’s a basic example of how to use the component:


## Example


```jsx
import React from 'react';
import MultipleImageCropping from 'multiple-image-crop-react';

const App = () => {
  // This function is called when the user completes cropping the images.
  // It receives an array of cropped image objects as its parameter.
  const handleImageCrop = (croppedImages) => {
    // Process the array of cropped images here
    console.log(croppedImages);
  };

  // This function is called if the user cancels the cropping process.
  // It can be used to handle or clear images as needed.
  const handleCancle = (clearImage) => {
    console.log('Image cropping cancelled:', clearImage);
  };

  return (
    <div>
      <h1>Image Cropping Example</h1>
      <MultipleImageCropping onUpload={handleImageCrop} onCancel={handleCancle} />
    </div>
  );
};

export default App;

```

## Props


**`onUpload: (image:[]) => void`**

This callback function is triggered when the user completes the cropping process for the images. It receives an array of cropped image objects as its parameter. You can use this function to process, upload, or handle the cropped images as needed.

```jsx
      <MultipleImageCropping onUpload={handleImageCrop}  />
```

**`onCancel: (image:[]) => void`**

This callback function is triggered when the user cancels the image cropping process. You can use this function to handle clearing images, resetting UI, or any other action when the user chooses to cancel.

```jsx
      <MultipleImageCropping onCancel={handleCancle} />
```

  