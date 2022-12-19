import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { getError } from '../../utils/error';
import axios from 'axios';
import Layout from '../../components/Layout';
import Link from 'next/link';

export default function ProfileScreen() {
  const { data: session } = useSession();

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue('name', session.user.name);
    setValue('email', session.user.email);
  }, [session.user, setValue]);

  const submitHandler = async ({ name, email, password, phone_number }) => {
    try {
      await axios.put('/api/auth/update', {
        name,
        email,
        password,
        phone_number,
      });
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      toast.success('Profile updated successfully');
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Profile">
      <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
        <div className="flex flex-col  items-center justify-center">
          <h1>Update Profile</h1>
        </div>
        <form
          className="mx-auto mxa-w-screen-md"
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className="mb-4 mt-10">
            <label
              htmlFor="name"
              className="
                    mb-1 text-xl tracking-wide text-zinc-600
                  "
            >
              ชื่อผู้ใช้งาน
            </label>
            <input
              type="text"
              className="placeholder-gray-400
              pl-5
              pr-4
              rounded-2xl
              border border-gray-900
              w-full
              py-2
              focus:outline-none focus:border-blue-400"
              placeholder="ระบุชื่อบัญชี"
              id="name"
              autoFocus
              {...register('name', {
                required: 'กรุณาระบุชื่อบัญชี',
              })}
            />
            {errors.name && (
              <div className="text-red-500">{errors.name.message}</div>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-1 text-xl tracking-wide text-zinc-600"
            >
              อีเมล
            </label>
            <input
              type="email"
              {...register('email', {
                required: 'กรุณาระบุอีเมล',
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                  message: 'กรุณากรอกอีเมลให้ถูกต้อง',
                },
              })}
              className="placeholder-gray-400
              pl-5
              pr-4
              rounded-2xl
              border border-gray-900
              w-full
              py-2
              focus:outline-none focus:border-blue-400"
              placeholder="ระบุชื่ออีเมล"
              id="email"
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
              className="placeholder-gray-400
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

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="mb-1 text-xl tracking-wide text-zinc-600"
            >
              ยืนยันรหัสผ่าน
            </label>
            <input
              className="placeholder-gray-400
              pl-5
              pr-4
              rounded-2xl
              border border-gray-900
              w-full
              py-2
              focus:outline-none focus:border-blue-400"
              placeholder="ระบุรหัสผ่านอีกครั้ง"
              type="password"
              id="confirmPassword"
              {...register('confirmPassword', {
                required: 'กรุณาระบุรหัสผ่านอีกครั้ง',
                validate: (value) => value === getValues('password'),
                minLength: {
                  value: 6,
                  message: 'กรุณากรอกรหัสผ่านมากกว่า 5',
                },
              })}
            />
            {errors.confirmPassword && (
              <div className="text-red-500 ">
                {errors.confirmPassword.message}
              </div>
            )}
            {errors.confirmPassword &&
              errors.confirmPassword.type === 'validate' && (
                <div className="text-red-500 ">รหัสไม่ตรงกัน</div>
              )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="phone_number"
              className="mb-1 text-xl tracking-wide text-zinc-600"
            >
              เบอร์โทรศัพท์
            </label>
            <input
              type="text"
              {...register('phone_number', {
                required: 'ระบุเบอร์โทรศัพท์',
                minLength: {
                  value: 10,
                  message: 'กรุณาระบุเบอร์โทรศัพท์มากกว่า 9',
                },
              })}
              className="placeholder-gray-400
              pl-5
              pr-4
              rounded-2xl
              border border-gray-900
              w-full
              py-2
              focus:outline-none focus:border-blue-400"
              placeholder="ระบุเบอร์โทรศัพท์"
              id="phone_number"
              autoFocus
            ></input>
            {errors.phone_number && (
              <div className="text-red-500 ">{errors.phone_number.message}</div>
            )}
          </div>

          <div className="mb-4 flex justify-center">
            <Link href="/user/dashboard">
              <button className="primary-button ">ย้อนกลับ</button>
            </Link>
            <Link href="/user/dashboard">
              <button className="primary-button ml-5">ตกลง</button>
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
}

ProfileScreen.auth = true;
