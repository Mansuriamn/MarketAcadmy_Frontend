import React, { useState } from 'react';
import { apiCall } from '../api/config';
export default function Join() {
  const [step, setStep] = useState("email"); // email | otp
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // ✅ Email validation
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // ================= SEND OTP =================
  const handleSendOTP = async () => {
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

      const data = await apiCall("/api/send-otp", {
        method: "POST",
        body: JSON.stringify({ email, name }),
      });

      setStep("otp");
      setMessage("OTP sent to your email 📩");

    } catch (err) {
      setMessage(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // ================= VERIFY OTP =================
  const handleVerifyOTP = async () => {
    if (!otp) {
      setMessage("Please enter OTP");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const data = await apiCall("/api/verify-otp", {
        method: "POST",
        body: JSON.stringify({ email, otp }),
      });

      setMessage("Successfully Joined 🎉");
      setEmail("");
      setOtp("");
      setStep("email");

    } catch (err) {
      setMessage(err.message || "Verification failed");
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
          Join 45,000+ institutional investors receiving market analysis.
        </h3>

        {/* ================= EMAIL STEP ================= */}
        {step === "email" && (
          <>
           

            <input
              type="email"
              placeholder="Professional Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 mb-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              data-testid="newsletter-email-input"
            />

            <button
              onClick={handleSendOTP}
              disabled={loading}
              className="w-full bg-teal-500 text-white font-semibold py-3 rounded-lg hover:bg-teal-600 transition-colors mb-4"
              data-testid="join-elite-button"
            >
              {loading ? "Sending..." : "Get OTP"}
            </button>
          </>
        )}

        {/* ================= OTP STEP ================= */}
        {step === "otp" && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-3 mb-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />

            <button
              onClick={handleVerifyOTP}
              disabled={loading}
              className="w-full bg-teal-500 text-white font-semibold py-3 rounded-lg hover:bg-teal-600 transition-colors mb-4"
            >
              {loading ? "Verifying..." : "Verify & Join"}
            </button>
          </>
        )}

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