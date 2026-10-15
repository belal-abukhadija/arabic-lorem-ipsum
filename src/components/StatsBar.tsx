import React from 'react';
import { GenerationResult } from '../lib/textGenerator';

interface StatsBarProps {
  metadata: GenerationResult['metadata'];
}

const StatsBar: React.FC<StatsBarProps> = ({ metadata }) => {
  const stats = [
    { label: 'Words', value: metadata.wordCount },
    { label: 'Sentences', value: metadata.sentenceCount },
    { label: 'Paragraphs', value: metadata.paragraphCount },
    { label: 'Characters', value: metadata.characterCount },
  ];

  return (
    <div className="wb-stats">
      {stats.map(({ label, value }, i) => (
        <div key={label} className={`wb-stat${i === 0 ? ' wb-stat--lead' : ''}`}>
          <span className="wb-stat-value">{value.toLocaleString()}</span>
          <span className="wb-stat-label">{label}</span>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;
