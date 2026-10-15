import React from 'react';
import { GenerationOptions, GenerationType, OutputFormat, Theme } from '../lib/textGenerator';

interface ControlPanelProps {
  options: GenerationOptions;
  onOptionsChange: (newOptions: Partial<GenerationOptions>) => void;
}

const types: { value: GenerationType; label: string }[] = [
  { value: 'paragraphs', label: 'Paragraphs' },
  { value: 'sentences', label: 'Sentences' },
  { value: 'words', label: 'Words' },
  { value: 'characters', label: 'Characters' },
];

const formats: { value: OutputFormat; label: string }[] = [
  { value: 'plain', label: 'Text' },
  { value: 'html', label: 'HTML' },
  { value: 'json', label: 'JSON' },
  { value: 'markdown', label: 'Markdown' },
];

const ControlPanel: React.FC<ControlPanelProps> = ({ options, onOptionsChange }) => {
  const handleKeywordsChange = (value: string) => {
    const keywords = value.split(',').map(k => k.trim()).filter(k => k.length > 0);
    onOptionsChange({ customKeywords: keywords });
  };

  const maxCount = options.type === 'characters' ? 1000 : options.type === 'words' ? 500 : 20;
  const unit = types.find(t => t.value === options.type)?.label.toLowerCase();

  return (
    <aside className="wb-panel wb-stack wb-stack--lg wb-bench-later lg:sticky lg:top-4" aria-label="Generation settings">
      <h2 className="wb-h2">Settings</h2>

      <div>
        <span className="wb-label">Generate</span>
        <div className="wb-seg wb-seg--grid" role="group" aria-label="Generate">
          {types.map(t => (
            <button
              key={t.value}
              type="button"
              aria-pressed={options.type === t.value}
              onClick={() => onOptionsChange({ type: t.value })}
              style={{ paddingInline: 10 }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="wb-label-row">
          <label className="wb-label" htmlFor="count">How many {unit}</label>
          <span className="wb-num" style={{ fontWeight: 600, fontSize: '1.25rem' }}>{options.count}</span>
        </div>
        <input
          id="count"
          type="range"
          min="1"
          max={maxCount}
          value={options.count}
          onChange={(e) => onOptionsChange({ count: parseInt(e.target.value) })}
          className="wb-range"
        />
        <div className="wb-row wb-row--between wb-hint wb-num">
          <span>1</span>
          <span>{maxCount}</span>
        </div>
      </div>

      <div>
        <label className="wb-label" htmlFor="theme">Vocabulary</label>
        <select
          id="theme"
          className="wb-select"
          value={options.theme}
          onChange={(e) => onOptionsChange({ theme: e.target.value as Theme })}
        >
          <option value="general">General</option>
          <option value="technology">Technology</option>
          <option value="ui">User interface</option>
          <option value="design">Design</option>
          <option value="business">Business</option>
          <option value="mixed">Mixed</option>
        </select>
      </div>

      <div>
        <span className="wb-label">Output format</span>
        <div className="wb-seg wb-seg--block" role="group" aria-label="Output format">
          {formats.map(f => (
            <button
              key={f.value}
              type="button"
              aria-pressed={options.format === f.value}
              onClick={() => onOptionsChange({ format: f.value })}
              style={{ paddingInline: 10 }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <span className="wb-label">Words per sentence</span>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="wb-hint" htmlFor="min-words">At least</label>
            <input
              id="min-words"
              type="number"
              min="3"
              max="20"
              value={options.minWordsPerSentence}
              onChange={(e) => onOptionsChange({ minWordsPerSentence: parseInt(e.target.value) })}
              className="wb-input wb-num mt-1"
            />
          </div>
          <div>
            <label className="wb-hint" htmlFor="max-words">At most</label>
            <input
              id="max-words"
              type="number"
              min="5"
              max="30"
              value={options.maxWordsPerSentence}
              onChange={(e) => onOptionsChange({ maxWordsPerSentence: parseInt(e.target.value) })}
              className="wb-input wb-num mt-1"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="wb-label" htmlFor="keywords">Your own words</label>
        <textarea
          id="keywords"
          className="wb-textarea"
          style={{ minHeight: 88 }}
          placeholder="المشروع، التصميم، التطوير"
          value={options.customKeywords?.join(', ') || ''}
          onChange={(e) => handleKeywordsChange(e.target.value)}
        />
        <p className="wb-hint" style={{ margin: '6px 0 0' }}>Separate with commas. They get mixed into the text.</p>
      </div>

      <div className="wb-stack" style={{ gap: 4 }}>
        <label className="wb-toggle-row">
          <span>Punctuation</span>
          <input
            type="checkbox"
            role="switch"
            className="wb-switch"
            checked={options.includePunctuation}
            onChange={(e) => onOptionsChange({ includePunctuation: e.target.checked })}
          />
        </label>
        <label className="wb-toggle-row">
          <span>Avoid repeated words</span>
          <input
            type="checkbox"
            role="switch"
            className="wb-switch"
            checked={options.preventRepetition}
            onChange={(e) => onOptionsChange({ preventRepetition: e.target.checked })}
          />
        </label>
        <label className="wb-toggle-row">
          <span>Open with the classic phrase</span>
          <input
            type="checkbox"
            role="switch"
            className="wb-switch"
            checked={options.startWithClassic}
            onChange={(e) => onOptionsChange({ startWithClassic: e.target.checked })}
          />
        </label>
      </div>
    </aside>
  );
};

export default ControlPanel;
