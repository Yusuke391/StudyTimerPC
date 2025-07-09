type CircularTimerProps = {
  size: number;
  stroke: number;
  progress: number; // 0〜1
  timeText: string;
  isRunning: boolean;
  timerBackground: string;
};

export default function CircularTimer({
  size,
  stroke,
  progress,
  timeText,
  isRunning,
  timerBackground,
}: CircularTimerProps) {
  const radius = size / 2 - stroke / 2;
  const normalizedRadius = radius;
  const circumference = 2 * Math.PI * normalizedRadius;
  const dashoffset = circumference * (1 - progress);

  return (
    <div
      className="circular-timer-container"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        className="circular-timer-svg"
        style={{ width: size, height: size }}
      >
        <title>Timer Progress Circle</title>
        {/* 背景円 */}
        <circle
          className="circular-timer-bg"
          cx={size / 2}
          cy={size / 2}
          r={normalizedRadius}
          fill="none"
          strokeWidth={stroke}
        />
        {/* プログレスバー */}
        <circle
          className="circular-timer-bar"
          cx={size / 2}
          cy={size / 2}
          r={normalizedRadius}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
          strokeWidth={stroke}
          style={{
            transition: isRunning ? 'none' : 'stroke-dashoffset 0.5s linear',
          }}
        />
      </svg>
      {/* 円の中身にSVG画像を配置（stroke幅ぶん内側に収める） */}
      <img
        src={timerBackground}
        alt="timer-bg"
        className="circular-timer-inner"
        style={{
          width: size - stroke,
          height: size - stroke,
          left: stroke / 2,
          top: stroke / 2,
          position: 'absolute',
          borderRadius: '50%',
          objectFit: 'cover',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
      <div
        className="circular-timer-text"
        style={{
          fontSize: `${size / 6}px`,
          width: size,
          height: size,
        }}
      >
        {timeText}
      </div>
    </div>
  );
}
