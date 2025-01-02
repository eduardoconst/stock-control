'use client';
import React, { useState } from 'react';

interface Product {
  id: number;
  name: string;
  stock: number;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Produto A', stock: 10 },
    { id: 2, name: 'Produto B', stock: 20 },
  ]);

  const [name, setName] = useState('');
  const [stock, setStock] = useState(0);

  const handleAddProduct = async () => {
    const newProduct = { name, stock: Number(stock) };

    try {
      const res = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) {
        throw new Error(`Erro: ${res.statusText}`);
      }

      const data = await res.json();
      setProducts([...products, data]);
      setName('');
      setStock(0);
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
    }
  };

  return (
    <main>
      <h1>Gerenciador de Estoque</h1>

      {/* Lista de Produtos */}
      <h2>Lista de Produtos</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - Estoque: {product.stock}
          </li>
        ))}
      </ul>

      {/* Formulário para Adicionar Produto */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddProduct();
        }}
      >
        <label htmlFor="name">Nome do Produto</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite o nome do produto"
        />

        <label htmlFor="stock">Estoque</label>
        <input
          type="number"
          id="stock"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
          placeholder="Digite o estoque"
        />

        <button type="submit">Adicionar Produto</button>
      </form>
    </main>
  );
}