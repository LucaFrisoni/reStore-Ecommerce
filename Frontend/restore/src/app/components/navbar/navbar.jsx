'use client';
import Link from 'next/link';
import Searchbar from '../searchbar/searchbar';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import axios from 'axios';
import { fetchData } from 'next-auth/client/_utils';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [flag, setFlag] = useState(false);
  const [user, setUser] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [cookieValue, setCookieValue] = useState(null);
  useEffect(() => {
    setCookieValue(
      document.cookie
        .split('; ')
        .find((row) => row.startsWith('User_id'))
        ?.split('=')[1]
    );
  }, []);
  const [cookieAdmin, setCookieAdmin] = useState(null);
  useEffect(() => {
    setCookieAdmin(
      document.cookie
        .split('; ')
        .find((row) => row.startsWith('Admin'))
        ?.split('=')[1]
    );
  }, []);

  function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  useEffect(() => {
    const fetchData = async () => {
      // Verifica si hay sesión y si existe la cookie 'User_id'
      if (session || cookieValue) {
        setFlag(true);
      }
      if (cookieValue) {
        try {
          const response = await axios.get(
            `https://re-store.onrender.com/users/${cookieValue}`
          );
          const { data } = response;
          setUser(data);
        } catch (error) {
          // Manejar el error de la petición
        }
      }
    };

    fetchData();
  }, [session, flag, fetchData, cookieValue]);

  const handleLogOut = () => {
    if (cookieValue) {
      deleteCookie('User_id'); // Utiliza la función deleteCookie para borrar la cookie
      setFlag(false);
      setCookieValue(null);
    }
    if (cookieAdmin) {
      deleteCookie('Admin'); // Utiliza la función deleteCookie para borrar la cookie
      setFlag(false);
      setCookieAdmin(null);
    } else {
      signOut();
      setFlag(false);
    }
    router.push('/home');
  };

  return (
    <nav className='py-4 z-20 sticky top-0 bg-slate-900 text-slate-50'>
      <div className='container px-4 mx-auto flex gap-4 justify-between '>
        <Link className='self-center link' href={'/home'}>
          <Image
            alt='home'
            src={'/icons8-casa-50.png'}
            width={30}
            height={30}
          ></Image>
        </Link>
        <div className='block md:hidden'>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400'
          >
            <svg
              className={`fill-current h-6 w-6 ${isOpen ? 'hidden' : 'block'}`}
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
            </svg>
            <svg
              className={`fill-current h-6 w-6 ${isOpen ? 'block' : 'hidden'}`}
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z' />
            </svg>
          </button>
        </div>
        <div
          className={`flex gap-8 justify-between absolute left-0 right-0 top-16 ${
            isOpen ? 'block' : 'hidden'
          } p-4 md:p-0 md:bg-inherit bg-slate-900  items-center flex-col md:flex-row md:flex md:static`}
        >
          {session ? (
            <Link
              className='link'
              href={{
                pathname: '/user',
                query: {
                  User: session.user.email,
                },
              }}
            >
              <Image
                src={session.user.image}
                width='35'
                height='35'
                alt={session.user.name}
                className='rounded-full'
              />
            </Link>
          ) : null}

          {cookieValue ? (
            <Link
              className='link h-[35px]'
              href={{
                pathname: '/user',
                query: {
                  User: user.email,
                },
              }}
            >
              <Image
                src={user.imagenDePerfil}
                width='35'
                height='35'
                alt={user.nombre}
                className='rounded-full h-full'
              />
            </Link>
          ) : null}

          {!flag ? (
            <Link className='link' href={'/login'}>
              Iniciar sesion
            </Link>
          ) : (
            <button onClick={handleLogOut}>Cerrar sesion</button>
          )}
          {cookieAdmin ? (
            <Link className='link' href={'/dashboardadmin'}>
              Dashboard Admin
            </Link>
          ) : null}
          <Searchbar />
          <Link href={'/cart'}>
            <Image
              width={36}
              height={36}
              alt='carrito'
              src={'/icons8-carrito-de-compras-64.png'}
            ></Image>
          </Link>
        </div>
      </div>
    </nav>
  );
};
