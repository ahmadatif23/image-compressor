import imageCompression from 'browser-image-compression'

const createImage = base64 =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', error => reject(error));
    image.src = base64;
});

const compressImg = (theBlob) =>{
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 2400,
    useWebWorker: true
  }

  return new Promise((resolve, reject) => {
    try {
      imageCompression(theBlob, options).then((output) => {
        var reader = new FileReader();
        reader.readAsDataURL(output); 
        reader.onloadend = () => {
          resolve(reader.result);
        }
      })
    }
    catch (err) {
      reject(err);
    }
  });
};

const watermark = async (theBlob, currentRotation) => {
  const compImg = await compressImg(theBlob);
  const img = await createImage(compImg);

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  const image = {
    height: 0,
    width: 0
  }

  const maxSize = 2000
  const fontSize = 0.018 * maxSize

  if (img.width >= img.height) {
    image.width = maxSize
    image.height = (img.height / img.width) * maxSize

    if ((currentRotation / 90) % 2 === 0) {
      canvas.width = maxSize
      canvas.height = (img.height / img.width) * maxSize
    } else {
      canvas.width = (img.height / img.width) * maxSize
      canvas.height = maxSize
    }
  } else {
    image.height = maxSize
    image.width = maxSize / (img.height / img.width)

    if ((currentRotation / 90) % 2 === 0) {
      canvas.height = maxSize
      canvas.width = maxSize / (img.height / img.width)
    } else {
      canvas.height = maxSize / (img.height / img.width)
      canvas.width = maxSize
    }
  }

  ctx.translate(canvas.width/2, canvas.height/2)
  ctx.rotate(currentRotation * (Math.PI / 180))
  ctx.drawImage(img, -image.width / 2, -image.height / 2, image.width, image.height)

  ctx.rotate(-currentRotation * (Math.PI / 180))

  let watermarkOffset = 0
  let wLogoRect = 0.14 * maxSize
  let wLogoRectChanging = 0.14 * maxSize

  // if (isWtrmrk) {
  //     if (textArray && textArray.length > 0) {
  //         ctx.font = `500 ${fontSize}px Arial`
  //         ctx.textAlign = 'center'

  //         let yText = (((lgNsx.height / lgNsx.width) * wLogoRect) + 10) + fontSize
  //         let yRect = (((lgNsx.height / lgNsx.width) * wLogoRect) + 10) - 0.1

  //         for (let i = 0; i < textArray.length; i++) {
  //             let textWidth = ctx.measureText(textArray[i]).width;
  //             if(textWidth > wLogoRectChanging) wLogoRectChanging = textWidth;
  //         }

  //         for (let j = 0; j < textArray.length; j++) {
  //             ctx.fillStyle = 'rgba(100, 100, 100, 0.4)'

  //             if (j === textArray.length - 1) {
  //                 ctx.fillRect((-(wLogoRectChanging/2) - 10), yRect, wLogoRectChanging + 20, fontSize + 15);
  //             } else {
  //                 ctx.fillRect((-(wLogoRectChanging/2) - 10), yRect, wLogoRectChanging + 20, fontSize + 10);
  //             }
              
  //             ctx.fillStyle = 'rgba(255, 255, 255, 1)'
  //             ctx.fillText(textArray[j], 0, yText);
  //             yText += 36 + 10;
  //             yRect += 36 + 10 - 0.1;
  //         }
  //     }

  //     ctx.fillStyle = 'rgba(100, 100, 100, 0.4)'
  //     ctx.fillRect((-(wLogoRectChanging/2) - 10), 0 + watermarkOffset, wLogoRectChanging + 20, (((lgNsx.height / lgNsx.width) * wLogoRect) + 10));
  //     ctx.drawImage(lgNsx, -(wLogoRect / 2), 10 + watermarkOffset, wLogoRect, ((lgNsx.height / lgNsx.width) * wLogoRect))
  // }

  return canvas.toDataURL('image/jpeg');
}

const dropzoneController = {
  accept: {
    'image/jpeg': [],
    'image/png': []
  },
  maxSize: 4194304,
};



export default {
  compressImg: compressImg,
  watermark: watermark,
  dropzoneController: dropzoneController
};