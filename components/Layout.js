export default function Layout({ children }) {
  return (
    <>
      <div className="w-full min-h-screen flex flex-col relative">
        <div className='w-full px-4 py-3 rounded-b-xl bg-white-700 text-sm text-[#133C55] shadow-md font-bold'>
          Compress Image
        </div>

        <div className='flex-1 w-full relative'>
            <div className='absolute top-0 flex h-full w-full justify-center'>
              { children }
            </div>
        </div>
      </div>
    </>
  )
}
