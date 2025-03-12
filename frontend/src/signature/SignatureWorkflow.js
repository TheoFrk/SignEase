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
  
  const handleFileSelect = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };
  
  const handleAddRecipient = () => {
    if (newRecipient.name && newRecipient.email) {
      setRecipients([
        ...recipients, 
        { ...newRecipient, id: recipients.length + 1 }
      ]);
      setNewRecipient({ name: '', email: '', role: 'Unterzeichner' });
    }
  };
  
  const handleRemoveRecipient = (id) => {
    setRecipients(recipients.filter(recipient => recipient.id !== id));
  };
  
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
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Dokument hochladen</h3>
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
              onClick={() => document.getElementById('fileInput').click()}
            >
              {selectedFile ? (
                <div className="flex flex-col items-center">
                  <Check size={48} className="text-green-500 mb-2" />
                  <p className="text-green-600 font-medium">{selectedFile.name}</p>
                  <p className="text-gray-500 text-sm mt-1">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <button 
                    className="mt-4 text-red-500 hover:text-red-700 flex items-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFile(null);
                    }}
                  >
                    <X size={16} className="mr-1" /> Entfernen
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload size={48} className="text-blue-500 mb-2" />
                  <p className="text-gray-700 font-medium">Ziehen Sie Ihr Dokument hierher oder klicken Sie, um es hochzuladen</p>
                  <p className="text-gray-500 text-sm mt-1">
                    Unterstützte Formate: PDF, DOCX, JPG, PNG (max. 20MB)
                  </p>
                </div>
              )}
              <input 
                id="fileInput" 
                type="file" 
                className="hidden" 
                onChange={handleFileSelect}
                accept=".pdf,.docx,.jpg,.png"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Empfänger hinzufügen</h3>
            
            <div className="mb-6">
              <div className="flex mb-2">
                <div className="flex-1 mr-2">
                  <input 
                    type="text" 
                    placeholder="Name"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={newRecipient.name}
                    onChange={(e) => setNewRecipient({...newRecipient, name: e.target.value})}
                  />
                </div>
                <div className="flex-1 mr-2">
                  <input 
                    type="email" 
                    placeholder="E-Mail"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={newRecipient.email}
                    onChange={(e) => setNewRecipient({...newRecipient, email: e.target.value})}
                  />
                </div>
                <div className="w-32 mr-2">
                  <select 
                    className="w-full p-2 border border-gray-300 rounded"
                    value={newRecipient.role}
                    onChange={(e) => setNewRecipient({...newRecipient, role: e.target.value})}
                  >
                    <option value="Unterzeichner">Unterzeichner</option>
                    <option value="Kopie">Kopie</option>
                    <option value="Prüfer">Prüfer</option>
                  </select>
                </div>
                <button 
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                  onClick={handleAddRecipient}
                >
                  Hinzufügen
                </button>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">E-Mail</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rolle</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aktionen</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recipients.map((recipient) => (
                    <tr key={recipient.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{recipient.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{recipient.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{recipient.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleRemoveRecipient(recipient.id)}
                        >
                          Entfernen
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Signaturfelder definieren</h3>
            
            <div className="flex space-x-4">
              <div className="w-2/3 border border-gray-300 rounded-lg bg-gray-100 p-2 flex justify-center">
                <div className="bg-white w-full h-96 shadow rounded relative">
                  {/* Placeholder for document preview */}
                  <div className="absolute w-full h-full flex items-center justify-center text-gray-400">
                    Dokumentvorschau
                  </div>
                  
                  {/* Example signature field */}
                  <div className="absolute border-2 border-blue-500 bg-blue-50 opacity-70 w-40 h-16 top-64 left-48 rounded flex items-center justify-center">
                    <div className="text-blue-600 text-xs font-medium">Anna Schmidt (Unterschrift)</div>
                  </div>
                </div>
              </div>
              
              <div className="w-1/3 bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Felder</h4>
                <div className="space-y-2">
                  <button className="w-full bg-white border border-gray-300 rounded p-2 text-sm text-left flex items-center">
                    <PenTool size={16} className="mr-2 text-blue-600" /> Signatur
                  </button>
                  <button className="w-full bg-white border border-gray-300 rounded p-2 text-sm text-left flex items-center">
                    <Mail size={16} className="mr-2 text-green-600" /> Initialen
                  </button>
                  <button className="w-full bg-white border border-gray-300 rounded p-2 text-sm text-left flex items-center">
                    <Save size={16} className="mr-2 text-purple-600" /> Datum
                  </button>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Empfänger</h4>
                  <div className="space-y-2">
                    {recipients.map((recipient) => (
                      <div key={recipient.id} className="bg-white border border-gray-300 rounded p-2 text-sm flex items-center">
                        <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center mr-2 text-xs">
                          {recipient.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{recipient.name}</div>
                          <div className="text-xs text-gray-500">{recipient.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Überprüfen und Senden</h3>
            
            <div className="mb-6 border-b pb-4">
              <h4 className="font-medium mb-2">Dokument</h4>
              <div className="flex items-center">
                <div className="bg-gray-100 rounded p-3 mr-3">
                  <Upload size={20} className="text-gray-600" />
                </div>
                <div>
                  <div className="font-medium">{selectedFile ? selectedFile.name : 'Dokument.pdf'}</div>
                  <div className="text-sm text-gray-500">{selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB` : '1.2 MB'}</div>
                </div>
              </div>
            </div>
            
            <div className="mb-6 border-b pb-4">
              <h4 className="font-medium mb-2">Empfänger</h4>
              <div className="space-y-2">
                {recipients.map((recipient, index) => (
                  <div key={recipient.id} className="flex items-center">
                    <div className="bg-gray-100 rounded p-2 mr-3 text-xs text-gray-500">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{recipient.name}</div>
                      <div className="text-sm text-gray-500">{recipient.email} • {recipient.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="font-medium mb-2">Nachricht</h4>
              <textarea 
                className="w-full border border-gray-300 rounded p-3 h-24"
                placeholder="Fügen Sie eine optionale Nachricht für alle Empfänger hinzu..."
              ></textarea>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded p-4 flex items-start">
              <Check size={20} className="text-blue-600 mr-3 mt-1" />
              <div>
                <div className="font-medium text-blue-800">Bereit zum Senden</div>
                <div className="text-sm text-blue-600">
                  Sie können das Dokument jetzt zur Signatur versenden. Alle Empfänger werden per E-Mail benachrichtigt.
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="bg-gray-50 p-6 h-full">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Signatur anfordern</h2>
        
        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center">
            {steps.map((step, i) => (
              <React.Fragment key={step.id}>
                <div 
                  className={`flex items-center justify-center ${
                    step.id === currentStep ? 'bg-blue-600' : 
                    step.id < currentStep ? 'bg-green-500' : 'bg-gray-300'
                  } rounded-full w-10 h-10 text-white`}
                >
                  <step.icon size={18} />
                </div>
                <div 
                  className={`h-1 flex-1 ${
                    i < steps.length - 1 ? (
                      step.id < currentStep ? 'bg-green-500' : 'bg-gray-300'
                    ) : 'hidden'
                  }`}
                ></div>
                <div 
                  className={`text-xs mt-2 ${
                    step.id === currentStep ? 'text-blue-600 font-medium' : 
                    step.id < currentStep ? 'text-green-500' : 'text-gray-500'
                  } absolute`}
                  style={{ marginLeft: i * 200 + 'px' }}
                >
                  {step.name}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
        
        {/* Step Content */}
        {renderStepContent()}
        
        {/* Navigation Buttons */}
        <div className="mt-6 flex justify-between">
          <button 
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 flex items-center"
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
              <>Jetzt senden</>
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