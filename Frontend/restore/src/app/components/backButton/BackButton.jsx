'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
export default function BackButton() {
  const router = useRouter();
  return (
    <button
      className='ml-8 font-medium text-blue-900 text-center align-middle relative'
      type='button'
      onClick={() => router.back()}
    >
      <span className='text-4xl absolute -left-10 -top-3 font-extrabold'>
        ←{' '}
      </span>
      Volver atrás
    </button>
  );
}
