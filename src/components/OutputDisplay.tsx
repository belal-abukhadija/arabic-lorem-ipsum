import React from 'react';
import { OutputFormat } from '../lib/textGenerator';

interface OutputDisplayProps {
  text: string;
  format: OutputFormat;
  actions?: React.ReactNode;
}

const formatNames: Record<OutputFormat, string> = {
  plain: 'Plain text',
  html: 'HTML',
  json: 'JSON',
  markdown: 'Markdown',
};

const OutputDisplay: React.FC<OutputDisplayProps> = ({ text, format, actions }) => {
  return (
    <section className="wb-panel" aria-labelledby="output-title">
      <div className="wb-panel-head">
        <div className="wb-row">
          <h2 id="output-title" className="wb-h2">Generated text</h2>
          <span className="wb-chip">{formatNames[format]}</span>
        </div>
        {actions}
      </div>

      {format === 'json' ? (
        <pre className="wb-output wb-output--code" style={{ minHeight: 360, maxHeight: 640 }} dir="ltr">{text}</pre>
      ) : format === 'html' ? (
        <div
          className="wb-output arabic-output"
          style={{ minHeight: 360, maxHeight: 640, whiteSpace: 'normal' }}
          dir="rtl"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      ) : (
        <div className="wb-output arabic-output" style={{ minHeight: 360, maxHeight: 640 }} dir="rtl" lang="ar">
          {text}
        </div>
      )}
    </section>
  );
};

export default OutputDisplay;
