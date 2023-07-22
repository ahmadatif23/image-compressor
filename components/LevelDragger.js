import { useState } from 'react';

export default function LevelDragger ({
  compressLevel,
  onChange
}) {
  const finalCompressLevel = (compressLevel) * 100;

  return (
    <>
      <div className='w-full md:mt-0 mt-2.5'>
        <div className='border border-slate-100 rounded-xl shadow-md p-3'>
          <div className='flex justify-between items-center'>
            <p className='text-sm font-medium text-slate-500'>Compression Level</p>
          </div>

          <div className='mt-2'>
            <div className='w-full'>
              <div className='flex items-center justify-between'>
                <p className='text-xs font-medium text-slate-400 leading-none'>Maximum size</p>
                <p className='text-sm font-bold text-[#386FA4] leading-none'>{finalCompressLevel.toFixed(0)}%</p>
              </div>

              <input
                type="range"
                min={0}
                max={1}
                step={0.02}
                value={compressLevel}
                onChange={event => {
                  onChange(event.target.valueAsNumber)
                }}
                className='w-full h-1 appearance-none bg-[#59A5D8] rounded-full focus:outline-none'
                style={{
                  background: `linear-gradient(to right, #59A5D8 0%, #59A5D8 ${(compressLevel * 100).toFixed(1)}%, #CBD5E1 ${(compressLevel * 100).toFixed(1)}%, #CBD5E1 100%)`
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
};