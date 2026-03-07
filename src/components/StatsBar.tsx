import React from 'react';
import { GenerationResult } from '../lib/textGenerator';
import { FileText, Hash, Type, AlignLeft } from 'lucide-react';

interface StatsBarProps {
  metadata: GenerationResult['metadata'];
}

const StatsBar: React.FC<StatsBarProps> = ({ metadata }) => {
  const stats = [
    { label: 'Paragraphs', value: metadata.paragraphCount, icon: AlignLeft, color: 'bg-blue-100 text-blue-600' },
    { label: 'Sentences', value: metadata.sentenceCount, icon: FileText, color: 'bg-green-100 text-green-600' },
    { label: 'Words', value: metadata.wordCount, icon: Type, color: 'bg-purple-100 text-purple-600' },
    { label: 'Characters', value: metadata.characterCount, icon: Hash, color: 'bg-orange-100 text-orange-600' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map(({ label, value, icon: Icon, color }) => (
        <div key={label} className="card">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-xs text-gray-600">{label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;
