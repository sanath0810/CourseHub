import { useEffect } from 'react';
import { UPI_LINK } from '../utils/constants';

const Payment = () => {
    useEffect(() => {
        // Redirect to UPI payment URL
        window.location.href = UPI_LINK;
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-500 p-6">
            <div className="bg-white bg-opacity-30 backdrop-blur-lg rounded-xl shadow-xl p-8 max-w-md w-full text-center">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Redirecting to payment...</h2>
                <p className="text-gray-700">If you are not redirected automatically, <a href={UPI_LINK} className="text-blue-600 underline">click here</a>.</p>
            </div>
        </div>
    );
};

export default Payment;
