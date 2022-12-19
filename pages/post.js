import Link from 'next/link';
import React from 'react';
import Layout from '../components/Layout';

export default function post() {
  return (
    <Layout>
      <Link href="/postP">POST</Link>
    </Layout>
  );
}
