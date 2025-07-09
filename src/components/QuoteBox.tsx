interface QuoteBoxProps {
  quote: string;
  person: string;
}

export function QuoteBox({ quote, person }: QuoteBoxProps) {
  return (
    <div className="quote-box">
      <div className="quote-content">
        <p>{quote}</p>
        <p>({person})</p>
      </div>
    </div>
  );
}
