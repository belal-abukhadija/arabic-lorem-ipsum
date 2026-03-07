import React from 'react';
import { GenerationOptions, GenerationType, OutputFormat, Theme } from '../lib/textGenerator';
import { Sliders } from 'lucide-react';

interface ControlPanelProps {
  options: GenerationOptions;
  onOptionsChange: (newOptions: Partial<GenerationOptions>) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ options, onOptionsChange }) => {
  const handleKeywordsChange = (value: string) => {
    const keywords = value.split(',').map(k => k.trim()).filter(k => k.length > 0);
    onOptionsChange({ customKeywords: keywords });
  };

  return (
    <div className="card space-y-6 sticky top-4">
      <div className="flex items-center gap-2 pb-4 border-b border-gray-200">
        <Sliders className="w-5 h-5 text-primary-600" />
        <h2 className="text-lg font-semibold">Generation Controls</h2>
      </div>

      {/* Generation Type */}
      <div>
        <label className="label">Generation Type</label>
        <select 
          className="input w-full"
          value={options.type}
          onChange={(e) => onOptionsChange({ type: e.target.value as GenerationType })}
        >
          <option value="paragraphs">Paragraphs</option>
          <option value="sentences">Sentences</option>
          <option value="words">Words</option>
          <option value="characters">Characters</option>
        </select>
      </div>

      {/* Count */}
      <div>
        <label className="label">
          Count: {options.count}
        </label>
        <input 
          type="range"
          min="1"
          max={options.type === 'characters' ? 1000 : options.type === 'words' ? 500 : 20}
          value={options.count}
          onChange={(e) => onOptionsChange({ count: parseInt(e.target.value) })}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>1</span>
          <span>{options.type === 'characters' ? 1000 : options.type === 'words' ? 500 : 20}</span>
        </div>
      </div>

      {/* Theme */}
      <div>
        <label className="label">Theme / Vocabulary</label>
        <select 
          className="input w-full"
          value={options.theme}
          onChange={(e) => onOptionsChange({ theme: e.target.value as Theme })}
        >
          <option value="general">General</option>
          <option value="technology">Technology</option>
          <option value="ui">User Interface</option>
          <option value="design">Design</option>
          <option value="business">Business</option>
          <option value="mixed">Mixed</option>
        </select>
      </div>

      {/* Output Format */}
      <div>
        <label className="label">Output Format</label>
        <div className="grid grid-cols-2 gap-2">
          {(['plain', 'html', 'json', 'markdown'] as OutputFormat[]).map(format => (
            <button
              key={format}
              onClick={() => onOptionsChange({ format })}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                options.format === format 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {format.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Sentence Length */}
      <div>
        <label className="label">Sentence Length</label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-600">Min Words</label>
            <input 
              type="number"
              min="3"
              max="20"
              value={options.minWordsPerSentence}
              onChange={(e) => onOptionsChange({ minWordsPerSentence: parseInt(e.target.value) })}
              className="input w-full mt-1"
            />
          </div>
          <div>
            <label className="text-xs text-gray-600">Max Words</label>
            <input 
              type="number"
              min="5"
              max="30"
              value={options.maxWordsPerSentence}
              onChange={(e) => onOptionsChange({ maxWordsPerSentence: parseInt(e.target.value) })}
              className="input w-full mt-1"
            />
          </div>
        </div>
      </div>

      {/* Custom Keywords */}
      <div>
        <label className="label">Custom Keywords (comma-separated)</label>
        <textarea 
          className="input w-full min-h-[80px]"
          placeholder="e.g., المشروع, التصميم, التطوير"
          value={options.customKeywords?.join(', ') || ''}
          onChange={(e) => handleKeywordsChange(e.target.value)}
        />
      </div>

      {/* Options */}
      <div className="space-y-3 pt-4 border-t border-gray-200">
        <label className="flex items-center gap-2 cursor-pointer">
          <input 
            type="checkbox"
            checked={options.includePunctuation}
            onChange={(e) => onOptionsChange({ includePunctuation: e.target.checked })}
            className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
          />
          <span className="text-sm text-gray-700">Include Punctuation</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input 
            type="checkbox"
            checked={options.preventRepetition}
            onChange={(e) => onOptionsChange({ preventRepetition: e.target.checked })}
            className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
          />
          <span className="text-sm text-gray-700">Prevent Word Repetition</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input 
            type="checkbox"
            checked={options.startWithClassic}
            onChange={(e) => onOptionsChange({ startWithClassic: e.target.checked })}
            className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
          />
          <span className="text-sm text-gray-700">Start with Classic Lorem Ipsum</span>
        </label>
      </div>
    </div>
  );
};

export default ControlPanel;
