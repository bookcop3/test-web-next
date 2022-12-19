import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../components/Layout';
import data from '../../utils/data';

export default function ProductScreen() {
  const { query } = useRouter();
  const { name } = query;
  const product = data.products.find((x) => x.name === name);
  if (!product) {
    return <div>Produt Not Found</div>;
  }
  return (
    <Layout title={product.postp.name}>
      <div className="py-2">
        <Link href="/">back to products</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.postp2.image}
            alt={product.postp.name}
            width={640}
            height={640}
            layout="responsive"
          ></Image>
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg">{product.postp.name}</h1>
            </li>
            <li>Category: {product.postp.category}</li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>${product.postp.price}</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
