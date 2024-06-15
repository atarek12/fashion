# Image Masking

This is a project require by AI.Fashion, it use canvas capabilities to enable user upload an image, mask it and then download it in black and white.

## Live version

You can access a live version of the app deployed to vercel: [https://image-masking.vercel.app/](https://image-masking.vercel.app/)

## To run the project locally

### Prerequisites

- NodeJS: install the latest version of [NodeJS](https://nodejs.org/en)
- Yarn: run `npm i -g yarn`

### Getting started

```bash
yarn install
yarn dev
```

## Libraries Used

- React: UI Library for client-side-rendering
- Chakra: react components library
- Fabric: provide a wrapper for canvas manipulation

## Features

- Select a PNG/JPEG images from local device
- Masking it by using a brush pencil
- Controlling brush color and size
- Eraser to erase brush lines
- Controlling eraser size
- Select and remove path element by pressing DELETE or BACKSPACE
- Zoom in and out by buttons and scroll wheel
- Pan and drag-n-drop image
- Undo/Redo by buttons and CTRL+Z and CTRL+Y respectively
- Reset the canvas and start from the scratch
- Save the canvas continue working later by save button or CTRL+S
- Download the image in black and white format
