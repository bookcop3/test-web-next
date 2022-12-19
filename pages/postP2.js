import React, { useContext, useEffect, useReducer } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import axios from 'axios';

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true, errorUpdate: '' };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false, errorUpdate: '' };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };

    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
}

export default function PostPScreen() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { postp2 } = cart;
  const [{ loadingUpload }] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  const router = useRouter();

  useEffect(() => {
    setValue('area_p', postp2.area_p);
    setValue('floor', postp2.floor);
    setValue('room_b', postp2.room_b);
    setValue('room_t', postp2.room_t);
    setValue('details', postp2.details);
    setValue('image', postp2.image);
    setValue('address', postp2.address);
    setValue('city', postp2.city);
  }, [setValue, postp2]);

  const uploadHandler = async (e, imageField = 'image') => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const {
        data: { signature, timestamp },
      } = await axios('/api/user/cloudinary-sign');

      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('signature', signature);
      formData.append('timestamp', timestamp);
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
      const { data } = await axios.post(url, formData);
      dispatch({ type: 'UPLOAD_SUCCESS' });
      setValue(imageField, data.secure_url);
      toast.success('File uploaded successfully');
    } catch (err) {
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
      toast.error(getError(err));
    }
  };

  const submitHandler = ({
    area_p,
    floor,
    room_b,
    room_t,
    details,
    address,
    city,
    image,
  }) => {
    dispatch({
      type: 'SAVE_POSTP2_NAME',
      payload: { area_p, floor, room_b, room_t, details, address, city, image },
    });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        postp2: {
          area_p,
          floor,
          room_b,
          room_t,
          details,
          address,
          city,
          image,
        },
      })
    );

    router.push('/placeproduct');
  };

  return (
    <Layout title="Shipping Address">
      <CheckoutWizard activeStep={2} />
      <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
        <div className="flex flex-col  items-center justify-center">
          <h1 className="mb-4 text-xl">Step2</h1>
        </div>

        <form
          className="mx-auto max-w-screen-md"
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className="mb-4">
            <label htmlFor="area_p">ขนาดพื้นที่</label>
            <input
              className="placeholder-gray-400
            pl-5
            pr-4
            rounded-2xl
            border border-gray-900
            w-full
            py-2
            focus:outline-none focus:border-blue-400"
              placeholder="ระบุขนาดพื้นที่"
              id="area_p"
              autoFocus
              {...register('area_p', {
                required: 'กรุณาระบุขนาดพื้นที่',
              })}
            />
            {errors.area_p && (
              <div className="text-red-500">{errors.area_p.message}</div>
            )}
          </div>

          <div className="mb-4 ">
            <label htmlFor="floor">จำนวนชั้น</label>
            <select
              className="placeholder-gray-400
              pl-5
              pr-4
              rounded-2xl
              border border-gray-900
              w-full
              py-2
              focus:outline-none focus:border-blue-400"
              placeholder="ระบุจำนวนชั้น"
              {...register('floor')}
            >
              <option value="1-2">1-2ชั้น</option>
              <option value="3-4">3-4ชั้น</option>
              <option value="4up">4ชั้นขึ้นไป</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="room_b">จำนวนห้องนอน</label>
            <input
              className="placeholder-gray-400
            pl-5
            pr-4
            rounded-2xl
            border border-gray-900
            w-full
            py-2
            focus:outline-none focus:border-blue-400"
              placeholder="ระบุจำนวนห้องนอน"
              id="room_b"
              autoFocus
              {...register('room_b', {
                required: 'กรุณาระบุจำนวนห้องนอน',
              })}
            />
            {errors.room_b && (
              <div className="text-red-500">{errors.room_b.message}</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="room_t">จำนวนห้องน้ำ</label>
            <input
              className="placeholder-gray-400
            pl-5
            pr-4
            rounded-2xl
            border border-gray-900
            w-full
            py-2
            focus:outline-none focus:border-blue-400"
              placeholder="ระบุจำนวนห้องน้ำ"
              id="room_t"
              autoFocus
              {...register('room_t', {
                required: 'กรุณาระบุจำนวนห้องน้ำ',
              })}
            />
            {errors.room_t && (
              <div className="text-red-500">{errors.room_t.message}</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="details">รายละเอียด</label>
            <input
              className="placeholder-gray-400
            pl-5
            pr-4
            rounded-2xl
            border border-gray-900
            w-full
            py-2
            focus:outline-none focus:border-blue-400"
              type="textarea"
              placeholder="ระบุรายละเอียด"
              id="details"
              autoFocus
              {...register('details', {
                required: 'กรุณาระบุรายละเอียด',
              })}
            />
            {errors.details && (
              <div className="text-red-500">{errors.details.message}</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="imageFile">Upload image</label>
            <input
              type="file"
              className="w-full"
              id="imageFile"
              onChange={uploadHandler}
            />

            {loadingUpload && <div>Uploading....</div>}
          </div>

          <div className="mb-4">
            <label htmlFor="address">ที่อยู่</label>
            <input
              className="placeholder-gray-400
            pl-5
            pr-4
            rounded-2xl
            border border-gray-900
            w-full
            py-2
            focus:outline-none focus:border-blue-400"
              placeholder="ระบุที่อยู่"
              id="address"
              autoFocus
              {...register('address', {
                required: 'กรุณาระบุที่อยู่',
              })}
            />
            {errors.address && (
              <div className="text-red-500">{errors.address.message}</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="city">จังหวัด</label>
            <input
              className="placeholder-gray-400
            pl-5
            pr-4
            rounded-2xl
            border border-gray-900
            w-full
            py-2
            focus:outline-none focus:border-blue-400"
              placeholder="ระบุจังหวัด"
              id="city"
              autoFocus
              {...register('city', {
                required: 'กรุณาระบุจังหวัด',
              })}
            />
            {errors.city && (
              <div className="text-red-500">{errors.city.message}</div>
            )}
          </div>

          <div className="mb-4 flex justify-center">
            <Link href="/postP">
              <button className="primary-button ">ย้อนกลับ</button>
            </Link>
            <button className="primary-button ml-5">ถัดไป</button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

PostPScreen.auth = true;
