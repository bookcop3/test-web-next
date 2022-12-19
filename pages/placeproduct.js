import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { getError } from '../utils/error';
import { Store } from '../utils/Store';

export default function PlaceProductScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { postp, postp2 } = cart;

  const placeProductHandler = async () => {
    try {
      await axios.post('/api/products_H', {
        postp,
        postp2,
      });
      dispatch({ type: 'CART_CLEAR_ITEMS' });
      Cookies.set(
        'cart',
        JSON.stringify({
          ...cart,
          cartItems: [],
        })
      );
      router.push('/');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Place product">
      <CheckoutWizard activeStep={3} />
      <h1 className="mb-4 text-xl">Place product</h1>
      <div className="grid md:grid-cols-4 md:gap-5">
        <div className="overflow-x-auto md:col-span-3">
          <div className="card p-5">
            <h2 className="mb-2 text-lg">Post</h2>
            <div>
              <a>ชื่อ : {postp.name}</a>
            </div>
            <div>
              <a>ประเภทสินค้า : home</a>
              <a>สถานะสินค้า : {postp.address}</a>
            </div>
            <div>
              <a>สถานะเจ้าของ : {postp.city}</a>
              <a>ต้องการนายหน้า : {postp.price_type}</a>
            </div>
            <div>
              <a>ประเภทขาย : {postp.price}</a>
              <a>ราคา : {postp2.floor}</a>
              <a>ราคาต่อเดือน :{postp2.price_h}</a>
            </div>
            <div>
              <a>ขนาดพื้นที่ : {postp2.area_p}</a>
              <a>จำนวนชั้น : {postp2.floor}</a>
            </div>
            <div>
              {' '}
              <a>จำนวนห้องนอน : {postp2.room_b}</a>
              <a>จำนวนห้องน้ำ : {postp2.room_t}</a>
            </div>
            <div>
              {' '}
              <a>รูป : {postp2.image}</a>
              <a>รายละเอียด : {postp2.details}</a>
            </div>
            <div>
              <a>ที่อยู่ : {postp2.address}</a>
              <a>จังหว้ด : {postp2.city}</a>
            </div>
            <Link href="/postP">Edit</Link>
            <button
              onClick={placeProductHandler}
              className="primary-button w-full"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

PlaceProductScreen.auth = true;
