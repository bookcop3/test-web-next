import Link from 'next/link';
import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

export default function LoginScreen() {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);

  //google Handler function
  async function handleGoogleSignin() {
    signIn('google', { callbackUrl: 'http://localhost:3000' });
  }
  //facebook Handler function
  async function handleFacebookSignin() {
    signIn('facebook', { callbackUrl: 'http://localhost:3000' });
  }
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <Layout title="Login">
      <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
        <div className="flex flex-col  items-center justify-center">
          <h1>เข้าสู่ระบบ</h1>
        </div>
        <form
          className="mx-auto max-w-screen-md"
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className="mb-4 mt-10">
            <label
              htmlFor="email"
              className="mb-1 text-xl tracking-wide text-zinc-600"
            >
              ชื่อผู้ใช้งาน
            </label>
            <input
              type="email"
              {...register('email', {
                required: 'กรุณาระบุชื่อบัญชี หรือ อีเมล',
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                  message: 'กรุณากรอกชื่อบัญชี หรือ อีเมลให้ถูกต้อง',
                },
              })}
              className=" placeholder-gray-400
            pl-5
            pr-4
            rounded-2xl
            border border-gray-900
            w-full
            py-2
            focus:outline-none focus:border-blue-400"
              placeholder="ระบุชื่อบัญชี หรือ อีเมล"
              id="email"
              autoFocus
            ></input>
            {errors.email && (
              <div className="text-red-500">{errors.email.message}</div>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="mb-1 text-xl tracking-wide text-zinc-600"
            >
              รหัสผ่าน
            </label>
            <input
              type="password"
              {...register('password', {
                required: 'กรุณาระบุรหัสผ่าน',
                minLength: {
                  value: 6,
                  message: 'กรุณากรอกรหัสผ่านมากกว่า 5',
                },
              })}
              className=" placeholder-gray-400
              pl-5
              pr-4
              rounded-2xl
              border border-gray-900
              w-full
              py-2
              focus:outline-none focus:border-blue-400"
              placeholder="ระบุรหัสผ่าน"
              id="password"
              autoFocus
            ></input>
            {errors.password && (
              <div className="text-red-500 ">{errors.password.message}</div>
            )}
          </div>
          <div className="mb-4 ">
            <button
              className="flex
                  mt-2
                  items-center
                  justify-center
                  focus:outline-none
                  text-white text-sm
                  sm:text-base
                  bg-yellow-500
                  hover:bg-yellow-600
                  rounded-2xl
                  py-2
                  w-full
                  transition
                  duration-150
                  ease-in"
            >
              ดำเนินการต่อ
            </button>
          </div>
          <div
            className="flex
            mt-2
            items-center
            justify-center
            focus:outline-none
            text-white text-sm
            sm:text-base
            bg-blue-500
            hover:bg-blue-600
            rounded-2xl
            py-2
            w-full
            transition
            duration-150
            ease-in"
          >
            <Link
              href={`/register?redirect=${redirect || '/'}`}
              className={styles.re}
            >
              สมัครสมาชิก
            </Link>
          </div>
          <div className="flex items-center justify-center space-x-2 my-10">
            <span className="h-px w-36 bg-gray-700"></span>
            <span className="text-2xl">หรือ</span>
            <span className="h-px w-36 bg-gray-700"></span>
          </div>
        </form>
        <div className="mb-4 ">
          <button
            className="flex
                  mt-2
                  items-center
                  justify-center
                  focus:outline-none
                  text-white text-sm
                  sm:text-base
                  bg-yellow-500
                  hover:bg-yellow-600
                  rounded-2xl
                  py-2
                  w-full
                  transition
                  duration-150
                  ease-in"
            onClick={handleGoogleSignin}
          >
            Google
          </button>
        </div>
        <div className="mb-4 ">
          <button
            className="flex
            mt-2
            items-center
            justify-center
            focus:outline-none
            text-white text-sm
            sm:text-base
            bg-blue-500
            hover:bg-blue-600
            rounded-2xl
            py-2
            w-full
            transition
            duration-150
            ease-in"
            onClick={handleFacebookSignin}
          >
            Facebook
          </button>
        </div>
      </div>
    </Layout>
  );
}
