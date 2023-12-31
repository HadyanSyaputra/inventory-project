import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import '../style/index.css'
import dashboardImg from '../assest/ps1.jpg';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then(response => {
        console.log('Data from API:', response.data);
        setInventoryData(response.data);
      })
      .catch(error => {
        console.error('Error fetching inventory data:', error);
      });
  }, []);

  const filteredInventory = inventoryData.filter((item) => {
    const includesSearchTerm = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    console.log(`Item: ${item.name}, Search Term: ${searchTerm}, Result: ${includesSearchTerm}`);
    return includesSearchTerm;
  });

  return (
    <div>
    <section className="hero is-fullheight w-full" style={{ background:`url(${dashboardImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Navbar />
      <div className="hero-body">
        <div className="container has-text-left"> 
          <h1 className="title is-size-1 has-text-black w-[600px]">
            Inventory Management Dashboard
          </h1>
          <h4 className="subtitle is-size-5 has-text-black mt-1">
            <Link to={`/product`} className="btn bg-[#fff1] hover:bg-[#000000]  text-black hover:text-white font-semibold border-2 mx-1">Manage Product </Link>
          </h4>
        </div>
      </div>
    </section>
    <Footer />
  </div>

  );
};

export default Dashboard;
