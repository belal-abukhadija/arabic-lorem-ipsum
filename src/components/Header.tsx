import React from 'react';
import { Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Arabic Lorem Ipsum Generator
              </h1>
              <p className="text-sm text-gray-600">
                Professional placeholder text for your projects
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <span className="text-sm text-gray-600">v1.0.0</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
