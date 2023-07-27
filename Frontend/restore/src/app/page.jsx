import Image from 'next/image';
import Link from 'next/link';
import Boton from './components/Button/Button';


export default function Landing() {
  return (
    <main className='relative h-screen '>
      <Image
        className='object-cover  max-w-full '
        src='https://images.pexels.com/photos/4144179/pexels-photo-4144179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        alt='celulares'
        loading='lazy'
        fill={true}
      ></Image>
      <div className='h-full w-full relative z-10 opacity-50 bg-gradient-to-b from-cyan-400 to-blue-400'></div>
      <div
        className='absolute z-10 top-1/2 left-1/2 text-center'
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <h1 className='text-5xl font-semibold text-slate-100 drop-shadow-2xl mb-8'>
          Bienvenido a ReStore
        </h1>
        <Link href={'/home'}>
          <Boton text='Llevame al shop'></Boton>
        </Link>
      </div>
    </main>
  );
}
