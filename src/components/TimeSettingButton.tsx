type Props = {
  image: string;
  setIsTimeSetting: React.Dispatch<React.SetStateAction<boolean>>;
};

export function TimeSettingButton({ image, setIsTimeSetting }: Props) {
  return (
    <button
      type="button"
      className="time-setting-btn"
      onClick={() => setIsTimeSetting(true)}
    >
      <img src={image} alt="Time Setting" />
    </button>
  );
}
