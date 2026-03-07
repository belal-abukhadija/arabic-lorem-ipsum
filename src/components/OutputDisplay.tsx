import React from 'react';
import { OutputFormat } from '../lib/textGenerator';
import { Code2 } from 'lucide-react';

interface OutputDisplayProps {
  text: string;
  format: OutputFormat;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ text, format }) => {
  const isRTL = format !== 'json';

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
        <Code2 className="w-5 h-5 text-primary-600" />
        <h2 className="text-lg font-semibold">Generated Output</h2>
        <span className="ml-auto text-xs font-medium px-2 py-1 bg-gray-100 rounded">
          {format.toUpperCase()}
        </span>
      </div>

      <div 
        className={`min-h-[400px] max-h-[600px] overflow-auto p-4 bg-gray-50 rounded-lg border border-gray-200 ${
          isRTL ? 'arabic-text' : ''
        }`}
        style={{ 
          direction: isRTL ? 'rtl' : 'ltr',
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word'
        }}
      >
        {format === 'html' ? (
          <div dangerouslySetInnerHTML={{ __html: text }} />
        ) : format === 'json' ? (
          <pre className="text-sm font-mono">{text}</pre>
        ) : (
          <div className="text-base leading-relaxed">{text}</div>
        )}
      </div>
    </div>
  );
};

export default OutputDisplay;
