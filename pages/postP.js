import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';

export default function PostPScreen() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { postp } = cart;
  const router = useRouter();

  useEffect(() => {
    setValue('name', postp.name);
    setValue('category', postp.category);
    setValue('status_p', postp.status_p);
    setValue('status_o', postp.status_o);
    setValue('receive_m', postp.receive_m);
    setValue('price_type', postp.price_type);
    setValue('price', postp.price);
    setValue('price_h', postp.price_h);
  }, [setValue, postp]);

  const submitHandler = ({
    name,
    category,
    status_p,
    status_o,
    receive_m,
    price_type,
    price,
    price_h,
  }) => {
    dispatch({
      type: 'SAVE_POSTP_NAME',
      payload: {
        name,
        category,
        status_p,
        status_o,
        receive_m,
        price_type,
        price,
        price_h,
      },
    });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        postp: {
          name,
          category,
          status_p,
          status_o,
          receive_m,
          price_type,
          price,
          price_h,
        },
      })
    );

    router.push('/postP2');
  };

  return (
    <Layout title="Shipping Address">
      <CheckoutWizard activeStep={1} />
      <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
        <div className="flex flex-col  items-center justify-center">
          <h1 className="mb-4 text-xl">Step1</h1>
        </div>

        <form
          className="mx-auto max-w-screen-md"
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className="mb-4">
            <label htmlFor="name">ชื่อ</label>
            <input
              className="placeholder-gray-400
            pl-5
            pr-4
            rounded-2xl
            border border-gray-900
            w-full
            py-2
            focus:outline-none focus:border-blue-400"
              placeholder="ระบุชื่"
              id="name"
              autoFocus
              {...register('name', {
                required: 'กรุณาระบุชื่อ',
              })}
            />
            {errors.name && (
              <div className="text-red-500">{errors.name.message}</div>
            )}
          </div>

          <div className="mb-4 ">
            <label htmlFor="status_p">สถานะสินค้า</label>
            <select
              className="placeholder-gray-400
              pl-5
              pr-4
              rounded-2xl
              border border-gray-900
              w-full
              py-2
              focus:outline-none focus:border-blue-400"
              placeholder="ระบุสถานะสินค้า"
              {...register('status_p')}
            >
              <option value="one">มือหนึ่ง</option>
              <option value="two">มือสอง</option>
            </select>
          </div>

          <div className="mb-4 ">
            <label htmlFor="status_o">สถานะผู้ขาย</label>
            <select
              className="placeholder-gray-400
              pl-5
              pr-4
              rounded-2xl
              border border-gray-900
              w-full
              py-2
              focus:outline-none focus:border-blue-400"
              placeholder="ระบุสถานะผู้ขาย"
              {...register('status_o')}
            >
              <option value="owner">เจ้าของ</option>
              <option value="others">นายหน้า</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="receive_m">รับนายหน้า</label>
            <select
              className="placeholder-gray-400
              pl-5
              pr-4
              rounded-2xl
              border border-gray-900
              w-full
              py-2
              focus:outline-none focus:border-blue-400"
              placeholder="ระบุประเภทขาย"
              {...register('receive_m')}
            >
              <option value="ok">รับ</option>
              <option value="no">ไม่รับ</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="price_type">ประเภทขาย</label>
            <select
              className="placeholder-gray-400
              pl-5
              pr-4
              rounded-2xl
              border border-gray-900
              w-full
              py-2
              focus:outline-none focus:border-blue-400"
              placeholder="ระบุประเภทขาย"
              {...register('price_type')}
            >
              <option value="sell">ขาย</option>
              <option value="hire">เช่า</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="price">ราคา</label>
            <input
              className="placeholder-gray-400
           pl-5
           pr-4
           rounded-2xl
           border border-gray-900
           w-full
           py-2
           focus:outline-none focus:border-blue-400"
              placeholder="ระบุราคา"
              id="price"
              {...register('price', {
                required: 'กรุณาระบุราคา',
              })}
            />
            {errors.price && (
              <div className="text-red-500">{errors.price.message}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="price_h">ราคาต่อเดือน</label>
            <input
              className="placeholder-gray-400
           pl-5
           pr-4
           rounded-2xl
           border border-gray-900
           w-full
           py-2
           focus:outline-none focus:border-blue-400"
              placeholder="ระบุราคา"
              id="price_h"
              {...register('price_h', {
                required: 'กรุณาระบุราคาต่อเดือน',
              })}
            />
            {errors.price_h && (
              <div className="text-red-500">{errors.price_h.message}</div>
            )}
          </div>

          <div className="mb-4 flex justify-between">
            <button className="primary-button">ถัดไป</button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

PostPScreen.auth = true;
