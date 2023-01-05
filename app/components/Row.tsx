import Image from 'next/image';
import React from 'react';

type Props = {
  name: string;
  logo: string;
  score: string;
  win: boolean;
  date: string;
};

const Row = ({ name, logo, score, win, date }: Props) => {
  const month = new Date(date).toLocaleString('en-eu', { month: 'short' });
  const day = new Date(date).toLocaleString('en-eu', { day: 'numeric' });
  const time = new Date(date).toLocaleTimeString('en-eu', {
    hour: 'numeric',
    minute: 'numeric',
  });

  const formattedDate = `${month} ${day} ${time}`;

  return (
    <div className='flex border-b border-gray-200 justify-between px-4 py-2'>
      <div className='flex'>
        <Image className='h-6 w-6' src={logo} width={24} height={24} alt='logo' />
        <p className='font-semibold ml-4'>{name}</p>
      </div>
      <div className='flex text-right'>
        {!score ? (
          <p className='text-gray-700'>{formattedDate}</p>
        ) : (
          <>
            <p className='text-gray-700'>{score}</p>
            {win ? (
              <p className='font-bold text-green-700 ml-2'>W</p>
            ) : (
              <p className='font-bold text-red-700 ml-2'>L</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Row;
