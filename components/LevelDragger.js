import { useState } from 'react';

export default function LevelDragger () {
  const [volume, setVolume] = useState(0.8)
  const finalVolume = (volume) * 100;

  return (
    <>
      <div className='w-full mt-2.5'>
        <div className='border border-slate-100 rounded-xl shadow-md p-3'>
          <div className='flex justify-between items-center'>
            <p className='text-sm font-medium text-slate-500'>Compression</p>
            <p className='text-lg font-bold text-[#386FA4]'>{finalVolume.toFixed(0)}%</p>
          </div>

          <div className='mt-1'>
            <input
                type="range"
                min={0}
                max={1}
                step={0.02}
                value={volume}
                onChange={event => {
                    setVolume(event.target.valueAsNumber)
                }}
                className='w-full h-1 appearance-none bg-[#59A5D8] rounded-full focus:outline-none'
                style={{
                  background: `linear-gradient(to right, #59A5D8 0%, #59A5D8 ${(volume * 100).toFixed(1)}%, #CBD5E1 ${(volume * 100).toFixed(1)}%, #CBD5E1 100%)`
                }}
            />
          </div>
        </div>
      </div>
    </>
  )
};