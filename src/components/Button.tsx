export default function Button({
  type = 'button',
  onClick,
  disabled = false,
  children,
  className = '',
}: {
  type?: 'button' | 'submit' | 'reset';
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </button>
  );
}
