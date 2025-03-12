import React, { useState } from 'react';
import { ArrowRight, PenTool, Mail, UserCheck, Check, Save, Upload, X } from 'lucide-react';

const SignatureWorkflow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [recipients, setRecipients] = useState([
    { id: 1, name: 'Anna Schmidt', email: 'anna.schmidt@example.com', role: 'Unterzeichner' }
  ]);
  const [newRecipient, setNewRecipient] = useState({ name: '', email: '', role: 'Unterzeichner' });
  
  const steps = [
    { id: 1, name: 'Dokument', icon: Upload },
    { id: 2, name: 'Empfänger', icon: Mail },
    { id: 3, name: 'Signatur', icon: PenTool },
    { id: 4, name: 'Überprüfen', icon: UserCheck }
  ];
  
  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  return (
    <div className="bg-gray-50 p-6 h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Signatur anfordern</h2>
        
        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between w-full">
            {steps.map((step, i) => (
              <div key={step.id} className="flex flex-col items-center">
                <div 
                  className={`flex items-center justify-center ${
                    step.id === currentStep ? 'bg-blue-600' : 
                    step.id < currentStep ? 'bg-green-500' : 'bg-gray-300'
                  } rounded-full w-10 h-10 text-white`}
                >
                  <step.icon size={18} />
                </div>
                <span className={`mt-2 text-xs ${
                  step.id === currentStep ? 'text-blue-600 font-medium' : 
                  step.id < currentStep ? 'text-green-500' : 'text-gray-500'
                }`}>
                  {step.name}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Content area */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="text-center p-12">
            <h3 className="text-lg font-medium mb-4">
              {currentStep === 1 && "Wählen Sie ein Dokument aus"}
              {currentStep === 2 && "Fügen Sie Empfänger hinzu"}
              {currentStep === 3 && "Platzieren Sie Signaturfelder"}
              {currentStep === 4 && "Überprüfen und senden"}
            </h3>
            <p className="text-gray-500">
              Sie befinden sich in Schritt {currentStep} des Signaturprozesses.
            </p>
          </div>
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button 
            className="px-4 py-2 border border-gray-300 rounded text-gray-700"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            Zurück
          </button>
          
          <button 
            className={`px-4 py-2 rounded flex items-center ${
              currentStep === steps.length 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
            onClick={currentStep === steps.length ? () => alert('Dokument gesendet!') : nextStep}
          >
            {currentStep === steps.length ? (
              'Jetzt senden'
            ) : (
              <>Weiter<ArrowRight size={16} className="ml-2" /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignatureWorkflow;
