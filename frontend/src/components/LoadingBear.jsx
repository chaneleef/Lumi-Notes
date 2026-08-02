// A cute white & pink kawaii bear that waddles along a filling loading bar.
// Pure SVG + CSS (keyframes live in index.css) — no image/video asset needed.
const LoadingBear = ({ label = "loading..." }) => {
  return (
    <div className="flex flex-col items-center gap-3 py-20">
      <div className="w-60">
        {/* the walking area (bear sits on top of the bar) */}
        <div className="relative h-12 w-full">
          <div className="bear-across absolute bottom-0 left-0">
            <svg viewBox="0 0 48 48" className="size-12" aria-hidden="true">
              <g className="bear-bob">
                {/* ears */}
                <circle cx="14" cy="13" r="6" fill="#ffffff" stroke="#f9a8d4" strokeWidth="1.5" />
                <circle cx="14" cy="13" r="2.8" fill="#f9a8d4" />
                <circle cx="34" cy="13" r="6" fill="#ffffff" stroke="#f9a8d4" strokeWidth="1.5" />
                <circle cx="34" cy="13" r="2.8" fill="#f9a8d4" />

                {/* head / body blob */}
                <circle cx="24" cy="24" r="15" fill="#ffffff" stroke="#f9a8d4" strokeWidth="1.5" />

                {/* blush cheeks */}
                <circle cx="16" cy="27" r="2.6" fill="#f9a8d4" opacity="0.8" />
                <circle cx="32" cy="27" r="2.6" fill="#f9a8d4" opacity="0.8" />

                {/* eyes */}
                <circle cx="19.5" cy="23" r="1.7" fill="#4b5563" />
                <circle cx="28.5" cy="23" r="1.7" fill="#4b5563" />

                {/* muzzle + nose + smile */}
                <ellipse cx="24" cy="28" rx="4.5" ry="3.4" fill="#fdf2f8" />
                <ellipse cx="24" cy="26.6" rx="1.6" ry="1.1" fill="#f472b6" />
                <path
                  d="M21.6 29 Q24 31 26.4 29"
                  fill="none"
                  stroke="#9ca3af"
                  strokeWidth="1"
                  strokeLinecap="round"
                />

                {/* feet (alternating steps) */}
                <ellipse className="bear-step-a" cx="18" cy="40" rx="4" ry="2.8" fill="#ffffff" stroke="#f9a8d4" strokeWidth="1.2" />
                <ellipse className="bear-step-b" cx="30" cy="40" rx="4" ry="2.8" fill="#ffffff" stroke="#f9a8d4" strokeWidth="1.2" />
              </g>
            </svg>
          </div>
        </div>

        {/* the loading bar the bear walks on */}
        <div className="h-3 w-full overflow-hidden rounded-full bg-pink-100">
          <div className="bear-bar h-full rounded-full bg-pink-400" />
        </div>
      </div>

      <p className="font-display text-sm text-pink-400">{label}</p>
    </div>
  );
};

export default LoadingBear;
