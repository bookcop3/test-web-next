import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useReducer } from 'react';
import Layout from '../../components/Layout';
import { getError } from '../../utils/error';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, products: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
function AdminProductHistoryScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    products: [],
    error: '',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/products_H/history_H`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchProducts();
  }, []);
  return (
    <Layout title="Order History">
      <div className="grid  md:grid-cols-4 md:gap-5">
        <div>
          <ul>
            <li>
              <Link href="/admin/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/admin/profile">แก้ไขโปรไฟล์</Link>
            </li>
            <li>
              <Link href="/admin/product-history">
                <a className="font-bold">ประวัติการประกาศ</a>
              </Link>
            </li>
            <li>
              <Link href="/admin/products">ประกาศ</Link>
            </li>
            <li>
              <Link href="/admin/list-post">รายการโปรด</Link>
            </li>
            <li>
              <Link href="/admin/users">ผู้ใช้งาน</Link>
            </li>
          </ul>
        </div>
        <div className="overflow-x-auto md:col-span-3">
          <div className="flex justify-between">
            <h1 className="mb-4 text-xl">ประวัติการประกาศ</h1>
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left">ID</th>
                    <th className="p-5 text-left">DATE</th>
                    <th className="p-5 text-left">NAME</th>
                    <th className="p-5 text-left">CATEGORY</th>
                    <th className="p-5 text-left">PRICE-TYPE</th>
                    <th className="p-5 text-left">PRICE</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} className="border-b">
                      <td className=" p-5 ">{product._id.substring(20, 24)}</td>
                      <td className=" p-5 ">
                        {product.createdAt.substring(0, 10)}
                      </td>
                      <td className=" p-5 ">{product.postp.name}</td>
                      <td className="p-5">{product.postp.category}</td>
                      <td className="p-5">{product.postp.price_type}</td>
                      <td className="p-5">{product.postp.price}</td>
                      <td className=" p-5 "></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

AdminProductHistoryScreen.auth = { adminOnly: true };
export default AdminProductHistoryScreen;
