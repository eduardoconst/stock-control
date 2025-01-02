// src/app/page.tsx
import React from 'react';

interface Product {
  id: number;
  name: string;
  stock: number;
}

async function getProducts(): Promise<Product[]> {
  const res = await fetch('http://localhost:5000/api/products', { cache: 'no-store' });
  if (!res.ok) throw new Error('Falha ao buscar os produtos');
  return res.json();
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main>
      <h1>Gerenciador de Estoque</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - Estoque: {product.stock}
          </li>
        ))}
      </ul>
    </main>
  );
}
