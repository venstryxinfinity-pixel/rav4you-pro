"use client";
import { useState, useEffect } from "react";

export default function Admin() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const login = localStorage.getItem("login");
    if (login === "true") setIsLogin(true);

    const data = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(data);
  }, []);

  const handleLogin = () => {
    if (user === "admin" && pass === "12345") {
      localStorage.setItem("login", "true");
      setIsLogin(true);
    } else {
      alert("Login salah!");
    }
  };

  const logout = () => {
    localStorage.removeItem("login");
    setIsLogin(false);
  };

  const saveProducts = (data) => {
    localStorage.setItem("products", JSON.stringify(data));
    setProducts(data);
  };

  const addProduct = () => {
    if (!name || !price) return alert("Isi semua!");
    const newProduct = {
      id: Date.now(),
      name,
      price: Number(price),
    };
    saveProducts([...products, newProduct]);
    setName("");
    setPrice("");
  };

  const deleteProduct = (id) => {
    const filtered = products.filter((p) => p.id !== id);
    saveProducts(filtered);
  };

  if (!isLogin) {
    return (
      <main className="p-4">
        <h1 className="text-cyan-400 mb-4">LOGIN ADMIN</h1>

        <input
          placeholder="Username"
          className="w-full p-2 mb-2 bg-gray-800"
          onChange={(e) => setUser(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-2 bg-gray-800"
          onChange={(e) => setPass(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-blue-500 px-4 py-2 rounded"
        >
          Login
        </button>
      </main>
    );
  }

  return (
    <main className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-cyan-400">ADMIN PANEL</h1>
        <button onClick={logout} className="bg-red-500 px-2 py-1 rounded">
          Logout
        </button>
      </div>

      <input
        placeholder="Nama produk"
        className="w-full p-2 mb-2 bg-gray-800"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Harga"
        className="w-full p-2 mb-2 bg-gray-800"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button
        onClick={addProduct}
        className="bg-green-500 px-4 py-2 mb-4 rounded"
      >
        Tambah Produk
      </button>

      {products.map((p) => (
        <div key={p.id} className="bg-gray-900 p-3 mb-2 rounded">
          <p>{p.name}</p>
          <p>Rp {p.price}</p>
          <button
            onClick={() => deleteProduct(p.id)}
            className="bg-red-500 px-2 py-1 mt-2 rounded"
          >
            Hapus
          </button>
        </div>
      ))}
    </main>
  );
}