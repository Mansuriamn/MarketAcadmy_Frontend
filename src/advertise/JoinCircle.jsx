import React, { useState } from "react";
import { apiCall } from "../api/config";

export default function JoinCircle() {
  const [step, setStep] = useState("email"); // email | otp
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ================= VALIDATION =================
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // ================= SEND OTP =================
  const handleSendOTP = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setMessage("Please enter a valid email");
      return;
    }

    try {
      setIsLoading(true);
      setMessage("");

      const data = await apiCall("/api/send-otp", {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      setStep("otp");
      setMessage("OTP sent to your email 📩");

    } catch (err) {
      setMessage(err.message || "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  // ================= VERIFY OTP =================
  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    if (!otp) {
      setMessage("Please enter OTP");
      return;
    }

    try {
      setIsLoading(true);
      setMessage("");

      const data = await apiCall("/api/verify-otp", {
        method: "POST",
        body: JSON.stringify({ email, otp }),
      });

      setMessage("Successfully Verified 🎉");

      // reset
      setEmail("");
      setOtp("");
      setStep("email");

    } catch (err) {
      setMessage(err.message || "Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Join Us
        </h2>

        <p className="text-gray-600 text-lg mb-8">
          Receive weekly market insights and trade alerts.
        </p>

        {/* ================= EMAIL STEP ================= */}
        {step === "email" && (
          <form onSubmit={handleSendOTP} className="max-w-md  mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your business email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />

              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
              >
                {isLoading ? "Sending OTP..." : "Get OTP"}
              </button>
            </div>
          </form>
        )}

        {/* ================= OTP STEP ================= */}
        {step === "otp" && (
          <form onSubmit={handleVerifyOTP} className="max-w-md mx-auto">
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="flex-1 px-6 py-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />

              <button
                type="submit"
                disabled={isLoading}
                 className="px-8 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
              >
                {isLoading ? "Verifying..." : "Verify & Join"}
              </button>
            </div>
          </form>
        )}

        {/* ================= MESSAGE ================= */}
        {message && (
          <p className="text-sm mt-4 text-gray-700">{message}</p>
        )}
      </div>
    </section>
  );
}