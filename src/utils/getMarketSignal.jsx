export const getMarketSignal = (title) => {
  const text = title.toLowerCase();

  const upStrong = ["surge", "rally", "soar", "rocket", "breakout"];
  const up = ["rise", "gain", "up", "climb"];

  const downStrong = ["crash", "collapse", "bloodbath", "plunge"];
  const down = ["fall", "down", "decline", "drop"];

  const volatile = ["volatile", "mixed", "flat", "sideways"];

  // ✅ 1. Volatile should override EVERYTHING
  if (volatile.some(w => text.includes(w))) {
    return { symbol: "⇅", color: "text-yellow-400" };
  }

  // ✅ 2. Strong signals next
  if (upStrong.some(w => text.includes(w))) {
    return { symbol: "▲▲", color: "text-green-500" };
  }

  if (downStrong.some(w => text.includes(w))) {
    return { symbol: "▼▼", color: "text-red-500" };
  }

  // ✅ 3. Normal signals
  if (up.some(w => text.includes(w))) {
    return { symbol: "▲", color: "text-green-400" };
  }

  if (down.some(w => text.includes(w))) {
    return { symbol: "▼", color: "text-red-400" };
  }

  // ✅ 4. Default neutral
  return { symbol: "⟷", color: "text-gray-400" };
};