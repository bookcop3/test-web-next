import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useReducer } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Layout from '../../../components/Layout';
import { getError } from '../../../utils/error';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

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
export default function AdminProductEditScreen() {
  const { query } = useRouter();
  const productId = query.id;
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/products_H/${productId}`);
        dispatch({ type: 'FETCH_SUCCESS' });
        setValue('name', data.postp.name);
        setValue('category', data.postp.category);
        setValue('status_p', data.postp.status_p);
        setValue('status_o', data.postp.status_o);
        setValue('receive_m', data.postp.receive_m);
        setValue('price_type', data.postp.price_type);
        setValue('price', data.postp.price);
        setValue('price_h', data.postp.price_h);
        setValue('area_p', data.postp2.area_p);
        setValue('floor', data.postp2.floor);
        setValue('room_b', data.postp2.room_b);
        setValue('room_t', data.postp2.room_t);
        setValue('details', data.postp2.details);
        setValue('address', data.postp2.address);
        setValue('city', data.postp2.city);
        setValue('image', data.postp2.image);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    fetchData();
  }, [productId, setValue]);

  const router = useRouter();

  const uploadHandler = async (e, imageField = 'image') => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const {
        data: { signature, timestamp },
      } = await axios('/api/admin/cloudinary-sign');

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

  const submitHandler = async ({
    name,
    category,
    status_p,
    status_o,
    receive_m,
    price_type,
    price,
    price_h,
    area_p,
    floor,
    room_b,
    room_t,
    details,
    address,
    city,
    image,
  }) => {
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(`/api/admin/products_H/${productId}`, {
        name,
        category,
        status_p,
        status_o,
        receive_m,
        price_type,
        price,
        price_h,
        area_p,
        floor,
        room_b,
        room_t,
        details,
        address,
        city,
        image,
      });
      dispatch({ type: 'UPDATE_SUCCESS' });
      toast.success('Product updated successfully');
      router.push('/admin/products');
    } catch (err) {
      dispatch({ type: 'UPDATE_FAIL', payload: getError(err) });
      toast.error(getError(err));
    }
  };

  return (
    <Layout title={`Edit Product ${productId}`}>
      <div className="grid md:grid-cols-4 md:gap-5">
        <div>
          <ul>
            <li>
              <Link href="/admin/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/profile">Update Profile</Link>
            </li>
            <li>
              <Link href="/admin/product-history_H">Orders</Link>
            </li>
            <li>
              <Link href="/admin/products">
                <a className="font-bold">Products</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-3">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div className=" max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
              <div className="flex flex-col  items-center justify-center">
                <h1 className="mb-4 text-xl">{`Edit Product ${productId}`}</h1>
              </div>
              <form
                className="mx-auto max-w-screen-md"
                onSubmit={handleSubmit(submitHandler)}
              >
                <div className="mb-4">
                  <label htmlFor="name">????????????</label>
                  <input
                    className="placeholder-gray-400
            pl-5
            pr-4
            rounded-2xl
            border border-gray-900
            w-full
            py-2
            focus:outline-none focus:border-blue-400"
                    placeholder="?????????????????????"
                    id="name"
                    autoFocus
                    {...register('name', {
                      required: '???????????????????????????????????????',
                    })}
                  />
                  {errors.name && (
                    <div className="text-red-500">{errors.name.message}</div>
                  )}
                </div>

                <div className="mb-4 ">
                  <label htmlFor="status_p">?????????????????????????????????</label>
                  <select
                    className="placeholder-gray-400
              pl-5
              pr-4
              rounded-2xl
              border border-gray-900
              w-full
              py-2
              focus:outline-none focus:border-blue-400"
                    placeholder="?????????????????????????????????????????????"
                    {...register('status_p')}
                  >
                    <option value="one">????????????????????????</option>
                    <option value="two">??????????????????</option>
                  </select>
                </div>

                <div className="mb-4 ">
                  <label htmlFor="status_o">?????????????????????????????????</label>
                  <select
                    className="placeholder-gray-400
              pl-5
              pr-4
              rounded-2xl
              border border-gray-900
              w-full
              py-2
              focus:outline-none focus:border-blue-400"
                    placeholder="?????????????????????????????????????????????"
                    {...register('status_o')}
                  >
                    <option value="owner">?????????????????????</option>
                    <option value="others">?????????????????????</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="receive_m">??????????????????????????????</label>
                  <select
                    className="placeholder-gray-400
              pl-5
              pr-4
              rounded-2xl
              border border-gray-900
              w-full
              py-2
              focus:outline-none focus:border-blue-400"
                    placeholder="???????????????????????????????????????"
                    {...register('receive_m')}
                  >
                    <option value="ok">?????????</option>
                    <option value="no">??????????????????</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="price_type">???????????????????????????</label>
                  <select
                    className="placeholder-gray-400
              pl-5
              pr-4
              rounded-2xl
              border border-gray-900
              w-full
              py-2
              focus:outline-none focus:border-blue-400"
                    placeholder="???????????????????????????????????????"
                    {...register('price_type')}
                  >
                    <option value="sell">?????????</option>
                    <option value="hire">????????????</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="price">????????????</label>
                  <input
                    className="placeholder-gray-400
           pl-5
           pr-4
           rounded-2xl
           border border-gray-900
           w-full
           py-2
           focus:outline-none focus:border-blue-400"
                    placeholder="????????????????????????"
                    id="price"
                    {...register('price', {
                      required: '???????????????????????????????????????',
                    })}
                  />
                  {errors.price && (
                    <div className="text-red-500">{errors.price.message}</div>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="price_h">????????????????????????????????????</label>
                  <input
                    className="placeholder-gray-400
           pl-5
           pr-4
           rounded-2xl
           border border-gray-900
           w-full
           py-2
           focus:outline-none focus:border-blue-400"
                    placeholder="????????????????????????"
                    id="price_h"
                    {...register('price_h', {
                      required: '???????????????????????????????????????????????????????????????',
                    })}
                  />
                  {errors.price_h && (
                    <div className="text-red-500">{errors.price_h.message}</div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="area_p">?????????????????????????????????</label>
                  <input
                    className="placeholder-gray-400
            pl-5
            pr-4
            rounded-2xl
            border border-gray-900
            w-full
            py-2
            focus:outline-none focus:border-blue-400"
                    placeholder="????????????????????????"
                    id="area_p"
                    autoFocus
                    {...register('area_p', {
                      required: '???????????????????????????????????????',
                    })}
                  />
                  {errors.area_p && (
                    <div className="text-red-500">{errors.area_p.message}</div>
                  )}
                </div>

                <div className="mb-4 ">
                  <label htmlFor="floor">???????????????????????????</label>
                  <select
                    className="placeholder-gray-400
              pl-5
              pr-4
              rounded-2xl
              border border-gray-900
              w-full
              py-2
              focus:outline-none focus:border-blue-400"
                    placeholder="???????????????????????????????????????"
                    {...register('floor')}
                  >
                    <option value="1-2">1-2????????????</option>
                    <option value="3-4">3-4????????????</option>
                    <option value="4up">4??????????????????????????????</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="room_b">????????????????????????????????????</label>
                  <input
                    className="placeholder-gray-400
            pl-5
            pr-4
            rounded-2xl
            border border-gray-900
            w-full
            py-2
            focus:outline-none focus:border-blue-400"
                    placeholder="????????????????????????????????????????????????"
                    id="room_b"
                    autoFocus
                    {...register('room_b', {
                      required: '???????????????????????????????????????????????????????????????',
                    })}
                  />
                  {errors.room_b && (
                    <div className="text-red-500">{errors.room_b.message}</div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="room_t">????????????????????????????????????</label>
                  <input
                    className="placeholder-gray-400
            pl-5
            pr-4
            rounded-2xl
            border border-gray-900
            w-full
            py-2
            focus:outline-none focus:border-blue-400"
                    placeholder="????????????????????????????????????????????????"
                    id="room_t"
                    autoFocus
                    {...register('room_t', {
                      required: '???????????????????????????????????????????????????????????????',
                    })}
                  />
                  {errors.room_t && (
                    <div className="text-red-500">{errors.room_t.message}</div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="details">??????????????????????????????</label>
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
                    placeholder="??????????????????????????????????????????"
                    id="details"
                    autoFocus
                    {...register('details', {
                      required: '?????????????????????????????????????????????????????????',
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
                  <label htmlFor="address">?????????????????????</label>
                  <input
                    className="placeholder-gray-400
            pl-5
            pr-4
            rounded-2xl
            border border-gray-900
            w-full
            py-2
            focus:outline-none focus:border-blue-400"
                    placeholder="?????????????????????????????????"
                    id="address"
                    autoFocus
                    {...register('address', {
                      required: '????????????????????????????????????????????????',
                    })}
                  />
                  {errors.address && (
                    <div className="text-red-500">{errors.address.message}</div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="city">?????????????????????</label>
                  <input
                    className="placeholder-gray-400
            pl-5
            pr-4
            rounded-2xl
            border border-gray-900
            w-full
            py-2
            focus:outline-none focus:border-blue-400"
                    placeholder="?????????????????????????????????"
                    id="city"
                    autoFocus
                    {...register('city', {
                      required: '????????????????????????????????????????????????',
                    })}
                  />
                  {errors.city && (
                    <div className="text-red-500">{errors.city.message}</div>
                  )}
                </div>

                <div className="mb-4">
                  <button disabled={loadingUpdate} className="primary-button">
                    {loadingUpdate ? 'Loading' : 'Update'}
                  </button>
                </div>
                <div className="mb-4">
                  <Link href={`/admin/products`}>Back</Link>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

AdminProductEditScreen.auth = { adminOnly: true };
