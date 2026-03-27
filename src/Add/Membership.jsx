import React, { useEffect, useState } from "react";

export default function Membership({ onUpgrade }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isTrialActive, setIsTrialActive] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("premium_trial");
    if (saved) {
      setIsTrialActive(true);
    }
  }, []);

  const handleStartTrial = async () => {
    if (isTrialActive) return;

    try {
      setIsLoading(true);

      // simulate API call
      await new Promise((res) => setTimeout(res, 1200));

      localStorage.setItem("premium_trial", "true");
      setIsTrialActive(true);

      // optional backend hook
      if (onUpgrade) {
        onUpgrade({ plan: "premium", trial: true });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 text-white"
        data-testid="membership-cta"
      >
        <div className="text-sm font-semibold text-teal-400 mb-2">
          PREMIUM
        </div>

        <h3 className="text-2xl font-bold mb-3">Trade Like a Pro</h3>

        <p className="text-gray-300 text-sm mb-6">
          Unlock institutional-grade data and exclusive market analysis.
        </p>

        <button
          onClick={handleStartTrial}
          disabled={isLoading || isTrialActive}
          className="w-full bg-teal-500 text-white font-semibold py-3 rounded-lg hover:bg-teal-600 transition-colors"
          data-testid="premium-cta-button"
        >
          {isLoading
            ? "Starting..."
            : isTrialActive
            ? "Trial Activated"
            : "START FREE TRIAL"}
        </button>
      </div>
    </>
  );
}