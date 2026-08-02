const RateLimitedUI = () => {
  return (
    <div className="mx-auto mb-6 flex max-w-2xl items-center gap-4 rounded-3xl border border-pink-200 bg-white/80 p-5 backdrop-blur">
      <span className="text-3xl">🍡</span>
      <div>
        <p className="font-display font-bold text-pink-500">Whoa, slow down bestie~</p>
        <p className="text-sm text-pink-400">
          You&apos;ve sent a few too many requests. Take a little breather and try again in a moment. ✨
        </p>
      </div>
    </div>
  );
};

export default RateLimitedUI;
