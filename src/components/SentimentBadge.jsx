export function SentimentBadge({ label = 'neutral' }) {
  const colorMap = {
    positive: '#16a34a',
    neutral:  '#eab308',
    negative: '#dc2626',
  };
  const color = colorMap[label] || '#6b7280';

  return (
    <span
      title={label}
      style={{
        display: 'inline-block',
        width: 12,
        height: 12,
        borderRadius: '50%',
        backgroundColor: color,
        marginRight: 8
      }}
    />
  );
}

export function formatSalary(min, max) {
  if (!min && !max) return '—';
  if (min && max) return `${min}-${max} OMR`;
  return `${min || max} OMR`;
}

export function truncate(text, max = 160) {
  if (!text) return '';
  return text.length > max ? text.slice(0, max) + '…' : text;
}