import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Menu } from '@headlessui/react';
import 'react-toastify/dist/ReactToastify.css';
import DropdownLink from './DropdownLink';
import { useRouter } from 'next/router';
import { SearchIcon } from '@heroicons/react/outline';

export default function Layout({ title, children }) {
  const { status, data: session } = useSession();

  const logoutClickHandler = () => {
    Cookies.remove('cart');
    signOut({ callbackUrl: '/login' });
  };

  const [query, setQuery] = useState('');

  const router = useRouter();
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };
  return (
    <>
      <Head>
        <title>{title ? title + ' - web-test' : 'web-test'}</title>
        <meta name="description" content="Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />

      <div className="flex min-h-screen flex-col justify-between ">
        <header>
          <nav className="flex h-12 items-center px-4 justify-between shadow-md">
            <Link href="/">
              <a className="text-lg font-bold"></a>
            </Link>
            <div>
              <form
                onSubmit={submitHandler}
                className="mx-auto  hidden w-full justify-center md:flex"
              >
                <input
                  onChange={(e) => setQuery(e.target.value)}
                  type="text"
                  className="rounded-tr-none rounded-br-none p-1 text-sm   focus:ring-0"
                  placeholder="Search products"
                />
                <button
                  className="rounded rounded-tl-none rounded-bl-none bg-amber-300 p-1 text-sm dark:text-black"
                  type="submit"
                  id="button-addon2"
                >
                  <SearchIcon className="h-5 w-5"></SearchIcon>
                </button>
              </form>
            </div>

            <div className="">
              <Link href="/">
                <a className="p-2">หน้าแรก</a>
              </Link>
              <Link href="/login">
                {status === 'loading' ? (
                  'Loading'
                ) : session?.user ? (
                  <Menu as="div" className="relative inline-block">
                    <Menu.Button className="text-blue-600">
                      {session.user.name}
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white  shadow-lg ">
                      {session.user && !session.user.isAdmin && (
                        <Menu.Item>
                          <DropdownLink
                            className="dropdown-link"
                            href="/user/dashboard"
                          >
                            Profile
                          </DropdownLink>
                        </Menu.Item>
                      )}

                      {session.user.isAdmin && (
                        <Menu.Item>
                          <DropdownLink
                            className="dropdown-link"
                            href="/admin/dashboard"
                          >
                            Admin dashboard
                          </DropdownLink>
                        </Menu.Item>
                      )}

                      <Menu.Item>
                        <a
                          className="dropdown-link"
                          href="#"
                          onClick={logoutClickHandler}
                        >
                          Logout
                        </a>
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                ) : (
                  <Link href="/login">
                    <a className="p-2">เข้าสู่ระบบ</a>
                  </Link>
                )}
              </Link>
              <Link href="/register">
                <a className="p-2">สมัครสมาชิก</a>
              </Link>
              <Link href="/contact">
                <a className="p-2">ติดต่อเรา</a>
              </Link>
              <Link href="/post">
                <a className="p-2">ลงประกาศ</a>
              </Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex h-10 justify-center items-center shadow-inner">
          <p>Cozy Property Website</p>
        </footer>
      </div>
    </>
  );
}
