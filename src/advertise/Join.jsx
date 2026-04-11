import React, { useState } from 'react';

export default function Join() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // ✅ Email validation
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // ✅ Handle Submit
  const handleSubmit = async () => {
  if (!email) {
    setMessage("Please enter your email");
    return;
  }

  if (!isValidEmail(email)) {
    setMessage("Invalid email format");
    return;
  }

  try {
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    setMessage("Successfully Joined 🎉");
    setEmail("");
  } catch (err) {
    setMessage(err.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};
  return (
    <>
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 text-white" data-testid="newsletter-signup">
        
        <div className="text-sm font-semibold text-teal-400 mb-2">
          ELITE INSIGHTS WEEKLY
        </div>

        <h3 className="text-xl font-bold mb-3">
          Join 45,000+ institutional investors receiving Monday market analysis.
        </h3>

        <input
          type="email"
          placeholder="Professional Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 mb-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          data-testid="newsletter-email-input"
        />

        <button
          onClick={handleSubmit}   // ✅ added
          disabled={loading}       // ✅ prevent multiple clicks
          className="w-full bg-teal-500 text-white font-semibold py-3 rounded-lg hover:bg-teal-600 transition-colors mb-4"
          data-testid="join-elite-button"
        >
          {loading ? "Joining..." : "Join the Elite"}  {/* ✅ loading text */}
        </button>

        {/* ✅ message display */}
        {message && (
          <p className="text-sm mb-2 text-teal-300">{message}</p>
        )}

        <p className="text-xs text-gray-400">
          Unsubscribe anytime. Zero spam.
        </p>

      </div>
    </>
  );
}