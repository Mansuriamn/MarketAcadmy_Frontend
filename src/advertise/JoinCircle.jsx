import React, { useState } from 'react';
import API_BASE_URL from '../api/config';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
export default function JoinCircle() {
          const [email, setEmail] = useState('');
          const [isLoading, setIsLoading] = useState(false);
          const [message, setMessage] = useState('');


         const handleSubscribe = async (e) => {
  e.preventDefault();

  // Better email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setMessage('Please enter a valid email');
    return;
  }

  try {
    setIsLoading(true);
    setMessage('');

    const response = await fetch(`${API_BASE_URL}/api/create/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to subscribe');
    }

    setMessage('Successfully subscribed 🎉');
    setEmail('');

  } catch (err) {
    console.error(err);
    setMessage(err.message || 'Something went wrong. Try again.');
  } finally {
    setIsLoading(false);
  }
};

  return (
   <>
    <section className=" py-16 md:py-20 ">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-testid="newsletter-heading">
            Join the Elite Circle
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Receive our weekly newsletter with institutional-grade market analysis and trade alerts directly to your inbox.
          </p>
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your business email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-4 border bg-gray-100 focus:bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
                data-testid="newsletter-email-input"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium whitespace-nowrap"
              >
                {isLoading ? "Subscribing..." : "Subscribe Now"}
              </button>
            </div>
          </form>
          {message && (
            <p className="text-sm mt-4 text-center text-gray-700">
              {message}
            </p>
          )}
        </div>
      </section>
   
   </>
  )
}
