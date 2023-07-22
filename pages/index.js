import ImageInput from '@/components/ImageInput'
import Head from 'next/head'

import { useState } from 'react'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [newImages, setNewImages] = useState([])
  const [originNewImages, setOriginNewImages] = useState([])

  // PROPERTY IMAGE UPLOAD FUNCTION
  const handleNewImage = (codebase64, watermarkImage) => {
    setOriginNewImages((originNewImages) => [...originNewImages, codebase64])
    setNewImages((newImages) => [...newImages, watermarkImage])
  }
  const handleRotateNewImage = (newImagesList, originNewImageList) => {
    setNewImages(newImagesList)
    setOriginNewImages(originNewImageList)
  }
  const handleRemoveNewImage = (newImageList, originNewImageList) => {
    setNewImages(newImageList)
    setOriginNewImages(originNewImageList)
  }

  return (
    <>
      <Head>
        <title>Image Compressor</title>
        <meta name="description" content="Compress your image beautifully!" />
      </Head>

      <main className='w-full h-full flex md:flex-row flex-col items-center justify-start px-4 py-6'>
        <ImageInput
          newImages={ newImages }
          originNewImages={ originNewImages }
          onNewImage={ handleNewImage }
        />
      </main>
    </>
  )
}
