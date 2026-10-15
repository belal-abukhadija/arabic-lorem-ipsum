import React, { useState } from 'react';
import { Copy, Check, Download, RefreshCw } from 'lucide-react';
import {
  generateArabicLoremIpsum,
  GenerationOptions,
  OutputFormat,
  GenerationType,
  Theme,
  GenerationResult
} from './lib/textGenerator';
import ControlPanel from './components/ControlPanel';
import OutputDisplay from './components/OutputDisplay';
import Header from './components/Header';
import StatsBar from './components/StatsBar';

function App() {
  const [options, setOptions] = useState<GenerationOptions>({
    type: 'paragraphs' as GenerationType,
    count: 3,
    format: 'plain' as OutputFormat,
    theme: 'general' as Theme,
    includePunctuation: true,
    preventRepetition: true,
    customKeywords: [],
    startWithClassic: false,
    minWordsPerSentence: 5,
    maxWordsPerSentence: 15
  });

  const [generatedText, setGeneratedText] = useState('');
  const [metadata, setMetadata] = useState<GenerationResult['metadata'] | null>(null);
  const [copied, setCopied] = useState(false);

  // Generate text on mount
  React.useEffect(() => {
    handleGenerate();
  }, []);

  const handleGenerate = () => {
    const { formatted, result } = generateArabicLoremIpsum(options);
    setGeneratedText(formatted);
    setMetadata(result.metadata);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleDownload = () => {
    const extensions: Record<OutputFormat, string> = {
      plain: 'txt',
      html: 'html',
      json: 'json',
      markdown: 'md'
    };

    const blob = new Blob([generatedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `arabic-lorem-ipsum.${extensions[options.format]}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleOptionsChange = (newOptions: Partial<GenerationOptions>) => {
    setOptions(prev => ({ ...prev, ...newOptions }));
  };

  return (
    <>
      <Header />

      <main className="wb-page">
        <div className="wb-head">
          <h1 className="wb-title">Arabic placeholder text</h1>
          <p className="wb-lede">
            Real Arabic sentences built from particles, conjunctions and themed vocabulary, ready to drop into a right-to-left layout.
          </p>
        </div>

        <div className="wb-bench">
          <ControlPanel
            options={options}
            onOptionsChange={handleOptionsChange}
          />

          <div className="wb-stack">
            {metadata && <StatsBar metadata={metadata} />}

            <div className="wb-row">
              <button onClick={handleGenerate} className="wb-btn wb-btn--primary wb-btn--lg">
                <RefreshCw />
                Generate text
              </button>
              <button onClick={handleCopy} className="wb-btn wb-btn--lg">
                {copied ? <Check /> : <Copy />}
                {copied ? 'Copied' : 'Copy'}
              </button>
              <button onClick={handleDownload} className="wb-btn wb-btn--quiet wb-btn--lg">
                <Download />
                Download
              </button>
            </div>

            <OutputDisplay
              text={generatedText}
              format={options.format}
            />
          </div>
        </div>
      </main>

      <footer className="wb-foot">
        <span>Made by <a href="mailto:belalabukhadija97@gmail.com">Belal</a></span>
        <span>More free tools at <a href="https://belal.work" target="_blank" rel="noopener noreferrer">belal.work</a></span>
      </footer>
    </>
  );
}

export default App;
