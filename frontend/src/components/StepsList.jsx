import React from 'react';
import { CheckCircle, Circle, Clock } from 'lucide-react';

export function StepsList({ steps, currentStep, onStepClick }) {
  return (
    <div className="bg-gray-900 rounded-lg shadow-lg p-4 h-full overflow-auto">
      <h2 className="text-lg font-semibold mb-4 text-gray-100">Build Steps</h2>
      <div className="space-y-4">
        {steps.map(({ id, status, title, description }) => (
          <div
            key={id}
            className={`p-1 rounded-lg cursor-pointer transition-colors ${
              currentStep === id
                ? 'bg-gray-800 border border-gray-700'
                : 'hover:bg-gray-800'
            }`}
            onClick={() => onStepClick(id)}
          >
            <div className="flex items-center gap-2">
              {status === 'completed' ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : status === 'in-progress' ? (
                <Clock className="w-5 h-5 text-blue-400" />
              ) : (
                <Circle className="w-5 h-5 text-gray-600" />
              )}
              <h3 className="font-medium text-gray-100">{title}</h3>
            </div>
            <p className="text-sm text-gray-400 mt-2">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
