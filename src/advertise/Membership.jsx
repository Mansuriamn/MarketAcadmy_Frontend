import React, { useEffect, useState } from "react";

export default function Membership({ onUpgrade }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isTrialActive, setIsTrialActive] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("premium_trial");
    if (saved) setIsTrialActive(true);
  }, []);
 const handleJoinCommunity = () => {
  const inviteLink = "https://chat.whatsapp.com/Hcl3srYljmMFnU7aOsMLWH";
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (isMobile) {
    // Direct open in app (fast)
    window.location.href = inviteLink;
  } else {
    // Desktop → show message first
     window.open(inviteLink, "_blank");
  }
};
  const openWhatsApp = () => {
    handleJoinCommunity();
  };

  const handleStartTrial = async () => {
    if (isLoading) return;

    // If already active → direct open
    if (isTrialActive) {
      openWhatsApp();
      return;
    }

    setIsLoading(true);

    // Let React render "Processing..." first
    setTimeout(async () => {
      try {
        // Simulated API delay
        await new Promise((res) => setTimeout(res, 1000));

        localStorage.setItem("premium_trial", "true");
        setIsTrialActive(true);

        if (onUpgrade) {
          onUpgrade({ plan: "premium", trial: true });
        }

        openWhatsApp();
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }, 100); // small delay to allow UI update
  };

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 text-white">
      <div className="text-sm font-semibold text-teal-400 mb-2">
        PREMIUM
      </div>

      <h3 className="text-2xl font-bold mb-3">Trade Like a Pro</h3>

      <p className="text-gray-300 text-sm mb-6">
        Unlock institutional-grade data and exclusive market analysis.
      </p>

      <button
        onClick={handleStartTrial}
        disabled={isLoading}
        className={`
          w-full font-semibold py-3 rounded-lg transition-all duration-200
          ${isTrialActive 
            ? "bg-teal-500 hover:bg-teal-600" 
            : "bg-teal-500 hover:bg-teal-600"}
          ${isLoading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}
        `}
      >
        
        {isLoading
          ? "Processing..."
          : isTrialActive
          ? "Join Community"
          : "START FREE TRIAL"}
      </button>
    </div>
  );
}