'use client';

export function RiskGauge({ score }: { score: number }) {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  let color = 'text-emerald-500';
  let shadow = 'shadow-[0_0_20px_rgba(16,185,129,0.3)]';
  
  if (score >= 40 && score < 70) {
    color = 'text-amber-500';
    shadow = 'shadow-[0_0_20px_rgba(245,158,11,0.3)]';
  }
  if (score >= 70) {
    color = 'text-destructive';
    shadow = 'shadow-[0_0_20px_rgba(239,68,68,0.3)]';
  }

  return (
    <div className="relative flex items-center justify-center">
      <svg className="w-56 h-56 transform -rotate-90">
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <circle
          cx="112"
          cy="112"
          r={radius}
          stroke="currentColor"
          strokeWidth="14"
          fill="transparent"
          className="text-border/50"
        />
        <circle
          cx="112"
          cy="112"
          r={radius}
          stroke="url(#gaugeGradient)"
          strokeWidth="14"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={`${color} transition-all duration-1000 ease-out drop-shadow-lg`}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <div className="flex items-baseline">
          <span className="text-6xl font-black tracking-tighter">{score}</span>
          <span className="text-xl font-bold text-muted-foreground/60">/100</span>
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 mt-1">Diagnostic Score</span>
      </div>
    </div>
  );
}
