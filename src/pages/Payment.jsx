import { useEffect } from 'react';
import { UPI_LINK } from '../utils/constants';
import { Loader2, ArrowRight } from 'lucide-react';
import { SEO } from '../components/SEO';

const Payment = () => {
    useEffect(() => {
        // Redirect to UPI link after a short delay to show the UI
        const timer = setTimeout(() => {
            window.location.href = UPI_LINK;
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
            <SEO title="Processing Payment" description="Redirecting to secure payment gateway" />

            <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 text-center">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Loader2 className="w-8 h-8 text-primary-600 dark:text-primary-400 animate-spin" />
                </div>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Redirecting to Payment
                </h2>

                <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Please wait while we securely transfer you to your UPI app to complete the transaction.
                </p>

                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl mb-6">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Don't close this window or press back.
                    </p>
                </div>

                <a
                    href={UPI_LINK}
                    className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                >
                    Click here if not redirected automatically
                    <ArrowRight className="w-4 h-4 ml-1" />
                </a>
            </div>
        </div>
    );
};

export default Payment;
