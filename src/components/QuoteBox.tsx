interface QuoteBoxProps {
  quote: string;
  person: string;
}

export function QuoteBox({ quote, person }: QuoteBoxProps) {
  return (
    <div
      className="quote-box"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: 600,
        }}
      >
        <p>{quote}</p>
        <p>({person})</p>
      </div>
    </div>
  );
}
