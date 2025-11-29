import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button'; // assuming a button component exists, else use plain button

const Checkout = () => {
  const navigate = useNavigate();

  const handlePay = () => {
    // Navigate to payment page which will handle UPI redirect
    navigate('/payment');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl shadow-xl p-8 max-w-md w-full transform transition-transform hover:scale-105">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Checkout</h1>
        <p className="text-gray-700 mb-6 text-center">Review your order and proceed to payment.</p>
        {/* Placeholder for order summary */}
        <div className="border border-gray-300 rounded-md p-4 mb-6 bg-white bg-opacity-30">
          <p className="text-gray-800">Order Summary (placeholder)</p>
        </div>
        <button
          onClick={handlePay}
          className="w-full py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:from-green-500 hover:to-blue-600 transition-colors"
        >
          Pay with UPI
        </button>
      </div>
    </div>
  );
};

export default Checkout;
