const RateLimitedUI = () => {
  return (
    <div className="mx-auto mb-6 max-w-2xl rounded-3xl border border-pink-200 bg-white/80 p-5 backdrop-blur">
      <p className="font-display font-bold text-pink-500">Slow down a moment</p>
      <p className="mt-1 text-sm text-pink-400">
        You&apos;ve sent a few too many requests. Please wait a moment and try again.
      </p>
    </div>
  );
};

export default RateLimitedUI;
