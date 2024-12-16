import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import qr from '../assets/qrcode.png'; // Adjust the path based on your folder structure

const Deposit_redirect = () => {
    const [transactionId, setTransactionId] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const location = useLocation();
    const { amount } = location.state || {}; // Get the amount from the state

    const handleSubmit = async () => {
        if (!transactionId) {
            alert('Please enter a transaction ID');
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/deposit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ transactionId, amount }) // Send transactionId and amount
            });

            if (response.status === 201) {
                alert('Request submitted');
                setTransactionId(''); // Reset the input field
                // Optionally, navigate to another page
                navigate('/'); // Replace with your desired route
            } else {
                alert('Failed to submit request');
            }
        } catch (error) {
            console.error('Error submitting request:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen  text-white">
            <div className="w -full bg-gray-800 shadow-md">
                <div className="flex items-center justify-between bg-green-600 p-4 text-white w-full">
                    <a href="/">
                        <i className="fas fa-arrow-left"></i>
                    </a>
                    <h1 className="text-lg">Deposit</h1>
                    <a href="/transaction">
                        <i className="fas fa-ellipsis-v"></i>
                    </a>
                </div>
            </div>
            <div className="mt-8 w-full px-4 text-center">
                <h1 className="text-lg">Recharge Confirmation</h1>
                <p className="mt-4">You are about to recharge: <strong>{amount}</strong></p>
                <p className="text-gray-400 mb-4">
                    Please complete the payment using the QR code and enter the transaction ID of the transaction in the field below.
                </p>
                <img 
                    alt="A placeholder QR code image with a text 'QR Code' in the center" 
                    className="w-64 h-64 mx-auto" 
                    src={qr}
                />
            </div>
            <div className="mt-8 w-full px-4 text-center">
            <p className="mt-4">Address:  TMnKSoqjeFxb2oAUkRhiRn7k1nAeJzq7hT</p>
            </div>
            <div className="mt-8 w-full px-4">
                <label className="block text-gray-400 mb-2" htmlFor="transactionId">Transaction ID</label>
                <input 
                    className="border border-gray-600 rounded-lg p-2 w-full text-gray-400 outline-none bg-gray-800" 
                    id="transactionId" 
                    placeholder="Enter Transaction ID" 
                    type="text" 
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)} // Update state on input change
                />
                <button 
                    className="w-full bg-green-600 text-white py-2 rounded-lg mt-4" 
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default Deposit_redirect;