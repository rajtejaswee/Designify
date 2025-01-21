import React from 'react';
import Editor from '@monaco-editor/react';

export function CodeEditor({ file }) {
  if (!file) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400 bg-gray-800">
        <p className="text-lg font-medium">Select a file to view its contents</p>
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-900 rounded-lg shadow-lg p-4">
      <Editor
        height="100%"
        defaultLanguage="javascript"
        theme="vs-dark"
        value={file.content || ''}
        options={{
          readOnly: true,
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: 'on',
          scrollBeyondLastLine: false,
          smoothScrolling: true,
        }}
      />
    </div>
  );
}
