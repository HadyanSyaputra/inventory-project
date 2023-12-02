import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';
import Navbar from '../Navbar';
import { MdError } from 'react-icons/md';
import { jwtDecode } from 'jwt-decode';

const AddProduct = () => {
  const [versionId, setVersionId] = useState("");
  const [productName, setProductName] = useState("");
  const [keterangan, setketerangan] = useState("");
  const [qty, setQty] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState(false); // Track whether the form is submitted
  const navigate = useNavigate();

  const isStaff = jwtDecode(localStorage.getItem('token')).data.role === 'Staff';

  const createProduct = async (e) => {
    e.preventDefault();
    setSubmitted(true); // Set the form as submitted
    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token);

      if (!token) {
        console.error("Token is missing or invalid");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/products",
        {
          versionId: versionId,
          productName: productName,
          keterangan: keterangan,
          qty: qty,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 2000
      });

      navigate("/product");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorMessage || 'Check your data again!',
        });
      }
    }
  };

  return (
    <section className="bg-[#03001C] min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center ">
        <div className="max-w-xl mx-auto w-full">
          <form
            className="bg-gray-900 shadow-md rounded px-5 pt-6 pb-8 mb-4"
            onSubmit={createProduct}
          >
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="version"
              >
                Version
              </label>
              <select
                className="rounded-lg w-full bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-gray-400"
                id="version"
                value={versionId}
                onChange={(e) => setVersionId(e.target.value)}
              >
                <option value="" disabled selected>Select Verison</option>
                <option value="1">Playstation 1</option>
                <option value="2">Playstation 2</option>
                <option value="3">Playstation 3</option>
                <option value="4">Playstation 4</option>
                <option value="5">Playstation 5</option>
              </select>
              {submitted && !versionId && <p className="text-red-500">Version is required</p>}
            </div>

            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="product"
              >
                Product
              </label>
              <input
                className="rounded-lg w-full bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-gray-400"
                id="product"
                type="text"
                placeholder="Product"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
              {submitted && !productName && <p className="text-red-500">Product is required</p>}
            </div>

            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="stock"
              >
                Stock
              </label>
              <input
                className="rounded-lg w-full bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-gray-400"
                id="stock"
                type="text"
                placeholder="Stock"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              />
               {submitted && !qty && <p className="text-red-500">Stock is required</p>}
            </div>

            {!isStaff && (
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="keterangan"
              >
                Keterangan
              </label>
              <select
                className="rounded-lg w-full bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-gray-400"
                id="version"
                value={keterangan}
                onChange={(e) => setketerangan(e.target.value)}
              >
                <option value="" disabled selected>Select Keterangan</option>
                <option value="Check">Check</option>
                <option value="Uncheck">Uncheck</option>
              </select>
              {submitted && !keterangan && <p className="text-red-500">Keterangan is required</p>}
            </div>
            )}

            {errorMessage && (
              <div role="alert" className="text-white text-md font-light alert alert-warning my-5">
              <p className='flex justify-center items-center text-white text-sm'> <MdError /> {errorMessage}</p>
              </div>
            )}

            <div className="flex items-center justify-center">
              <button
                className="btn w-full bg-[#363062] hover:bg-[#484275] text-white hover:text-white font-semibold"
                type="submit"
              >
                Create
              </button>
            </div>
            <div className="flex items-center justify-center mt-4">
            <button
              className="btn w-full bg-[#DA0C81] hover:bg-[#c9609b] text-white hover:text-white font-semibold"
              onClick={() => navigate('/product')}
            >
              Back to Products
            </button>
          </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddProduct;
