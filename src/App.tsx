import React, { useState } from 'react';
import { Copy, Download, RefreshCw, Settings, FileText, Code, FileJson } from 'lucide-react';
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

  // Generate text on mount and when options change
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Control Panel - Left Side */}
          <div className="lg:col-span-1">
            <ControlPanel 
              options={options} 
              onOptionsChange={handleOptionsChange}
            />
          </div>

          {/* Output Display - Right Side */}
          <div className="lg:col-span-2 space-y-4">
            {/* Stats Bar */}
            {metadata && <StatsBar metadata={metadata} />}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={handleGenerate}
                className="btn-primary flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Generate New Text
              </button>
              
              <button 
                onClick={handleCopy}
                className="btn-secondary flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
              
              <button 
                onClick={handleDownload}
                className="btn-outline flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>

            {/* Output Display */}
            <OutputDisplay 
              text={generatedText} 
              format={options.format}
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Realistic Arabic</h3>
            <p className="text-sm text-gray-600">
              Generate grammatically structured Arabic text with proper conjunctions and particles
            </p>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Settings className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Highly Customizable</h3>
            <p className="text-sm text-gray-600">
              Control every aspect: word count, themes, punctuation, and custom keywords
            </p>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Code className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Multiple Formats</h3>
            <p className="text-sm text-gray-600">
              Export as plain text, HTML with RTL support, JSON, or Markdown
            </p>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <FileJson className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Theme-Based</h3>
            <p className="text-sm text-gray-600">
              Choose from technology, UI, design, business, or general vocabularies
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p className="text-gray-700">
            Made with <span className="text-red-500">❤️</span> by{' '}
            <a 
              href="mailto:belalabukhadija97@gmail.com" 
              className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              Belal
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
