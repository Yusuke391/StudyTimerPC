import { useEffect, useRef, useState } from 'react';

interface TimeSettingButtonProps {
  timeSet: number; // This is the total seconds
  setTime: (newTotalSeconds: number) => void;
  setIsTimeSetting: React.Dispatch<React.SetStateAction<boolean>>;
}

export function TimeSettingModal({
  timeSet,
  setTime,
  setIsTimeSetting,
}: TimeSettingButtonProps) {
  const [hourLeft, setHourLeft] = useState('');
  const [hourRight, setHourRight] = useState('');
  const [minuteLeft, setMinuteLeft] = useState('');
  const [minuteRight, setMinuteRight] = useState('');

  const hourLeftRef = useRef<HTMLInputElement>(null);
  const hourRightRef = useRef<HTMLInputElement>(null);
  const minuteLeftRef = useRef<HTMLInputElement>(null);
  const minuteRightRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const initialHours = Math.floor(timeSet / 3600);
    const initialMinutes = Math.floor((timeSet % 3600) / 60);

    // Convert hours to string. No padding needed for the first digit if it's 0
    const hoursString = String(initialHours);
    if (hoursString.length === 1) {
      setHourLeft(''); // Keep the left empty if it's a single digit hour
      setHourRight(hoursString.charAt(0));
    } else {
      setHourLeft(hoursString.charAt(0));
      setHourRight(hoursString.charAt(1));
    }

    // Convert minutes to string. No padding needed for the first digit if it's 0
    const minutesString = String(initialMinutes);
    if (minutesString.length === 1) {
      setMinuteLeft(''); // Keep the left empty if it's a single digit minute
      setMinuteRight(minutesString.charAt(0));
    } else {
      setMinuteLeft(minutesString.charAt(0));
      setMinuteRight(minutesString.charAt(1));
    }
  }, [timeSet]);

  const handleApply = () => {
    const hour = Number.parseInt(`${hourLeft || '0'}${hourRight || '0'}`, 10);
    const minute = Number.parseInt(
      `${minuteLeft || '0'}${minuteRight || '0'}`,
      10,
    );
    const totalSeconds = hour * 3600 + minute * 60;
    setTime(totalSeconds);
    setIsTimeSetting(false);
  };

  const handleTwoDigitInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    setCurrentDigit: React.Dispatch<React.SetStateAction<string>>,
    setNextDigit: React.Dispatch<React.SetStateAction<string>>,
    nextInputRef: React.RefObject<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    if (value.length === 2) {
      setCurrentDigit(value.charAt(1));
      setNextDigit(value.charAt(0));
      nextInputRef.current?.focus();
    } else {
      setCurrentDigit(value);
    }
  };

  const handleLeftDigitChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setLeftDigit: React.Dispatch<React.SetStateAction<string>>,
    rightInputRef: React.RefObject<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    setLeftDigit(value.slice(-1));
    if (value === '') {
      rightInputRef.current?.focus();
    }
  };

  return (
    <div className="time-setting-panel">
      <p className="description">◆タイマーの時間を設定することができます。</p>

      <div className="time-inputs">
        {/* Hour input */}
        <div style={{ display: 'flex', gap: '2px' }}>
          <input
            ref={hourLeftRef}
            type="number"
            className="input-box"
            value={hourLeft}
            onChange={(e) =>
              handleLeftDigitChange(e, setHourLeft, hourRightRef)
            }
          />
          <input
            ref={hourRightRef}
            type="number"
            className="input-box"
            value={hourRight}
            onChange={(e) =>
              handleTwoDigitInput(e, setHourRight, setHourLeft, hourLeftRef)
            }
          />
        </div>
        <span className="label">時間</span>

        {/* Minute input */}
        <div style={{ display: 'flex', gap: '2px' }}>
          <input
            ref={minuteLeftRef}
            type="number"
            className="input-box"
            value={minuteLeft}
            onChange={(e) =>
              handleLeftDigitChange(e, setMinuteLeft, minuteRightRef)
            }
          />
          <input
            ref={minuteRightRef}
            type="number"
            className="input-box"
            value={minuteRight}
            onChange={(e) =>
              handleTwoDigitInput(
                e,
                setMinuteRight,
                setMinuteLeft,
                minuteLeftRef,
              )
            }
          />
        </div>
        <span className="label">分</span>
      </div>

      <button type="button" className="click-note" onClick={handleApply}>
        ▲クリックして設定
      </button>
    </div>
  );
}
