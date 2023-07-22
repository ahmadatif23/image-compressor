import Image from 'next/image'

import { useState } from 'react';
import Dropzone from 'react-dropzone'

import imageComponent from '../utils/image';
import uploadIcon from '../public/upload.svg'
import LevelDragger from './LevelDragger';

export default function ImageInput({
  newImages,
  originNewImages,
  onNewImage
}) {
  const [image, setImage] = useState(null)
  const [rotates, setRotates] = useState([])
  const [loading, setLoading] = useState(false)
  const [rotateLoadings, setRotateLoadings] = useState([])

  const handleNewImg = async (theBlob) => {
    setLoading(true)

    const compressImage = await imageComponent.compressImg(theBlob);
    // const watermarkImage = await imageComponent.watermark(theBlob, 0);

    if (compressImage) {
			onNewImage(theBlob, compressImage)
			setLoading(false)
		}
  };

  const readImageFile = (file) => {
    const reader = new FileReader()

    reader.onload = () => {
      setImage(reader.result)
      setRotates(rotates => [...rotates, 0])
      setRotateLoadings(rotateLoadings => [...rotateLoadings, false])

      if (onNewImage) {
        const blob = new Blob([reader.result], { type: file.type });
        handleNewImg(blob)
      }
    }

    reader.readAsArrayBuffer(file);
  };

  const handleDrop = (files) => {
		setLoading(true)
		files.forEach((file) => {
			readImageFile(file);
		});
  };

  const handleDownloadImage = (image, idx) => {
    const link = document.createElement('a');
    link.href = image;
    link.download = 'image_' + idx;
    link.target = '_blank';

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  };

  const NewThumb = ({ images }) => {
    return (
      <div className='flex-1 flex flex-col w-full mt-2.5'>
        <p className='text-sm text-gray-400'>Click on each image to download it.</p>

        <div className='flex-1 w-full relative'>
          <div className='absolute top-0 left-0 w-full h-full overflow-auto hide-scrollbar'>
            <div className='grid grid-cols-2 gap-2.5 mt-0.5'>
              {
                images.length > 0 &&
                images.map((image, idx) => {
                  return (
                    <div onClick={ () => handleDownloadImage(image, idx+1) } className="relative w-full pt-[100%] rounded-lg overflow-hidden border border-slate-100 bg-white shadow" key={ idx }>
                      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center cursor-pointer">
                        <Image src={ image } fill alt={ 'Uploaded image_' + idx } className='max-w-full max-h-full object-contain' />
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className='w-full pt-[55%] bg-white rounded-xl shadow-md border border-dashed relative overflow-hidden'>
        <div className='absolute top-0 left-0 w-full h-full'>
          <Dropzone
            multiple
            onDrop={ handleDrop }
          >
            {({getRootProps, getInputProps}) => (
              <section className='dropzone w-full h-full'>
                <div {...getRootProps()} className='input-text w-full h-full flex items-center justify-center'>
                  <input {...getInputProps()} />
                  <div className='flex flex-col items-center'>
                    <Image src={ uploadIcon } alt='Upload image icon' className='w-20 h-20' />
                    <p className='text-sm font-medium text-slate-500 mt-2'><span className='text-[#386FA4]'>Click to upload</span> or drag and drop</p>
                    <p className='text-xs font-medium text-slate-400 mt-1'>PNG or JPG</p>
                  </div>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
      </div>

      <LevelDragger />

      { newImages?.length > 0 &&
				<NewThumb images={ newImages } />
			}
    </>
  )
}
