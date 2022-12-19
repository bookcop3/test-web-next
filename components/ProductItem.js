/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';

export default function ProductItem({ product }) {
  return (
    <div className="card">
      <Link href={`/product_H/${product.name}`}>
        <a>
          <img
            src={product.post.image}
            alt={product.name}
            className="rounded shadow object-cover h-64 w-full"
          />
        </a>
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product_H/${product.name}`}>
          <a>
            <h2 className="text-lg">{product.post.name}</h2>
          </a>
        </Link>
        <p className="mb-2">{product.post.category}</p>
        <p>${product.post.price}</p>
        <button className="primary-button" type="button">
          รายละเอียด
        </button>
      </div>
    </div>
  );
}
