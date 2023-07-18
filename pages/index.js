import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Image Compressor</title>
        <meta name="description" content="Compress your image beautifully!" />
      </Head>

      <main className='w-full h-full flex items-center justify-center'>
        <div>
          Hello World!
        </div>
      </main>
    </>
  )
}
