// src/App.tsx
import { useEffect, useRef, useState } from 'react';
import './App.css'; // Viteが生成したCSS
import Button from './components/Button';
import CircularTimer from './components/CircularTimer';
import { MenuButton } from './components/MenuButton';
import { QuoteBox } from './components/QuoteBox';
import { TimeSettingButton } from './components/TimeSettingButton';
import { TimeSettingModal } from './components/TimerSettingModal';

function App() {
  const DEFAULT_INITIAL_TIME = 300; // デフォルトの初期時間（秒単位、例: 5分）
  const size = 400; // タイマーの直径(px)をここで一元管理
  const stroke = 24;
  const quote =
    '"成功があがりでもなければ、失敗が終わりでもない。\n肝心なのは、続ける勇気である。"';
  const person = 'ウィンストン・チャーチル';

  const [time, setTime] = useState(DEFAULT_INITIAL_TIME); // 現在の残り時間（秒単位）
  const [totalDuration, setTotalDuration] = useState(DEFAULT_INITIAL_TIME); // 現在のカウントダウンサイクルの総時間
  const [isRunning, setIsRunning] = useState(false);
  const timerIntervalRef = useRef<number | null>(null); // setInterval用（秒単位の時刻更新）
  const animationFrameRef = useRef<number | null>(null); // requestAnimationFrame用（スムーズなプログレス）
  const startTimeRef = useRef<number | null>(null); // タイマーが実際に開始または再開した時刻を追跡
  const [progress, setProgress] = useState(1); // 1 = 100%, 0 = 0%
  const [isTimeSetting, setIsTimeSetting] = useState(false);

  // --- アニメーション用 Effect ---
  // このEffectはスムーズなプログレスバーのアニメーションを実行します
  useEffect(() => {
    const animate = (now: number) => {
      if (startTimeRef.current === null) {
        // タイマーが開始または再開されたばかりの場合、開始時刻を記録
        startTimeRef.current = now;
      }

      // 開始時からの経過時間（秒）
      const elapsed = (now - startTimeRef.current) / 1000;
      // アニメーション用の残り時間を計算（負の値にならないように0でクリップ）
      const remainingTimeForAnimation = Math.max(0, totalDuration - elapsed);

      // 実際の時間設定に基づいてプログレスが反映されるようにする
      const newProgress =
        totalDuration > 0 ? remainingTimeForAnimation / totalDuration : 0;
      setProgress(newProgress);

      if (isRunning && remainingTimeForAnimation > 0) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else if (remainingTimeForAnimation <= 0 && isRunning) {
        // アニメーションが終了した場合、状態を0に設定して停止
        setIsRunning(false);
        setTime(0); // 数値の時間が0になるようにする
        setProgress(0); // プログレスが0になるようにする
      }
    };

    if (isRunning) {
      // タイマーが実行中の場合、アニメーションを開始/続行
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      // 停止した場合、開始時刻をリセットし、保留中のアニメーションフレームをクリア
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      startTimeRef.current = null; // 停止時に開始時刻をリセット
      // 停止した場合、現在の'time'にプログレスが正確に反映されるようにする
      if (totalDuration > 0) {
        setProgress(time / totalDuration);
      } else {
        setProgress(0); // totalDurationが0の場合を処理
      }
    }

    // クリーンアップ関数
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      startTimeRef.current = null; // アンマウント時またはEffectの再実行時に開始時刻をクリーンアップ
    };
  }, [isRunning, totalDuration, time]); // 依存配列: isRunningまたはtotalDurationが変更された場合に再実行

  // --- 秒単位のカウントダウン用 Effect ---
  // このEffectは表示用の'time'状態を毎秒更新します
  useEffect(() => {
    if (isRunning && time > 0) {
      timerIntervalRef.current = window.setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            setIsRunning(false); // 時間切れ時に停止
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000); // 1秒ごとに更新（1000ms）
    } else {
      // 実行中でないか、時間が0の場合、インターバルをクリア
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    }

    // クリーンアップ関数
    return () => {
      // アンマウント時またはEffectの再実行時にクリーンアップ
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [isRunning, time]); // 依存配列: isRunningまたはtimeが変更された場合に再実行

  // 時間をMM:SS形式にフォーマットする関数
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [minutes, seconds]
      .map((unit) => String(unit).padStart(2, '0'))
      .join(':');
  };

  // 開始/停止ボタンのハンドラ
  const handleStartStop = () => {
    if (time > 0) {
      setIsRunning((prevIsRunning) => !prevIsRunning);
    }
  };

  // リセットボタンのハンドラ
  const handleReset = () => {
    setIsRunning(false);
    setTime(DEFAULT_INITIAL_TIME);
    setTotalDuration(DEFAULT_INITIAL_TIME); // 総時間もデフォルトにリセット
    setProgress(1); // プログレスを100%にリセット
    startTimeRef.current = null; // 開始時刻をクリア
  };

  // 時間設定モーダルからの時間設定を処理する関数
  const handleSetTimeFromModal = (newTotalSeconds: number) => {
    setTime(newTotalSeconds);
    setTotalDuration(newTotalSeconds); // アニメーション用にtotalDurationも更新することが重要
    setIsRunning(false); // 新しい時間を設定する際はタイマーを停止
    setProgress(1); // プログレスを最大にリセット
    startTimeRef.current = null; // 開始時刻をクリアし、次回開始時に再計算させる
    setIsTimeSetting(false); // モーダルを閉じる
  };

  return (
    <div className="App">
      <MenuButton />
      <div>
        <div className="timer-container">
          <TimeSettingButton
            image="src\assets\time_setting_button_yozakura.svg"
            setIsTimeSetting={setIsTimeSetting}
          />
          <CircularTimer
            size={size}
            stroke={stroke}
            progress={progress}
            timeText={formatTime(time)}
            isRunning={isRunning}
            timerBackground="src\assets\Yozakura.svg"
          />
          {isTimeSetting ? (
            <TimeSettingModal
              timeSet={totalDuration} // モーダルにtotalDurationを渡し、初期表示に使う
              setTime={handleSetTimeFromModal} // 新しいハンドラを使用
              setIsTimeSetting={setIsTimeSetting}
            />
          ) : (
            <div className="controls">
              <Button
                type="button"
                onClick={handleStartStop}
                className={isRunning ? 'stop-btn' : 'start-btn'}
                disabled={time === 0}
              >
                {isRunning ? 'stop' : 'start'}
              </Button>
              <Button type="button" onClick={handleReset} className="reset-btn">
                reset
              </Button>
            </div>
          )}
        </div>
        <QuoteBox quote={quote} person={person} />
      </div>
    </div>
  );
}

export default App;
