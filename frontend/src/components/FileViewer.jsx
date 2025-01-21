import React from 'react';
import { X } from 'lucide-react';

export function FileViewer({ file, onClose }) {
  if (!file) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 transition-opacity">
      <div className="bg-gray-900 rounded-lg w-full max-w-3xl max-h-[80vh] shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-gray-100 truncate">
            {file.path}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 transition-all"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-auto max-h-[calc(80vh-4rem)]">
          <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap bg-gray-800 p-4 rounded-md">
            {file.content || 'No content available'}
          </pre>
        </div>
      </div>
    </div>
  );
}
