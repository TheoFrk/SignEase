import React, { useState } from 'react';
import { File, Upload, PenTool, Users, Bell, Search, Settings, Plus, ChevronDown, User, Mail, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SignEaseApp = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Vertrag_2025-03-01.pdf', status: 'Warten auf Signatur', date: '10.03.2025', signers: ['Max Mustermann', 'Sie'] },
    { id: 2, name: 'Angebot_Software_XYZ.pdf', status: 'Signiert', date: '05.03.2025', signers: ['Sie', 'Anna Schmidt'] },
    { id: 3, name: 'NDA_Projekt_Alpha.pdf', status: 'Abgeschlossen', date: '28.02.2025', signers: ['Sie', 'Thomas Weber', 'Laura Meyer'] },
  ]);
  
  const [activeTab, setActiveTab] = useState('inbox');
  const [showUploadOptions, setShowUploadOptions] = useState(false);
  
  const handleViewDocument = (id) => {
    console.log('Navigating to document:', id);
    navigate(`/document/${id}`);
  };
  
  const handleNewSignature = () => {
    console.log('Navigating to signature workflow');
    navigate('/signature');
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-blue-600">SignEase</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <Bell size={20} />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <Settings size={20} />
            </button>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <User size={16} />
              </div>
              <ChevronDown size={16} className="ml-2 text-gray-500" />
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 p-4">
          <button 
            className="w-full bg-blue-600 text-white rounded-lg py-3 px-4 font-medium flex items-center justify-center mb-6"
            onClick={() => setShowUploadOptions(!showUploadOptions)}
          >
            <Plus size={18} className="mr-2" /> Neu
          </button>
          
          {showUploadOptions && (
            <div className="bg-white shadow-lg rounded-lg p-2 absolute mt-2 z-10 border border-gray-200">
              <button 
                className="w-full text-left p-2 hover:bg-gray-100 rounded flex items-center"
                onClick={() => console.log('Document upload clicked')}
              >
                <Upload size={16} className="mr-2" /> Dokument hochladen
              </button>
              <button 
                className="w-full text-left p-2 hover:bg-gray-100 rounded flex items-center"
                onClick={handleNewSignature}
              >
                <PenTool size={16} className="mr-2" /> Signatur anfordern
              </button>
              <button className="w-full text-left p-2 hover:bg-gray-100 rounded flex items-center">
                <File size={16} className="mr-2" /> Vorlage erstellen
              </button>
            </div>
          )}
          
          <nav>
            <ul className="space-y-1">
              <li>
                <button 
                  className={`w-full text-left px-4 py-2 rounded flex items-center ${activeTab === 'inbox' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => setActiveTab('inbox')}
                >
                  <Mail size={18} className="mr-3" /> Posteingang
                </button>
              </li>
              <li>
                <button 
                  className={`w-full text-left px-4 py-2 rounded flex items-center ${activeTab === 'sent' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => setActiveTab('sent')}
                >
                  <File size={18} className="mr-3" /> Gesendet
                </button>
              </li>
              <li>
                <button 
                  className={`w-full text-left px-4 py-2 rounded flex items-center ${activeTab === 'templates' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => setActiveTab('templates')}
                >
                  <Package size={18} className="mr-3" /> Vorlagen
                </button>
              </li>
              <li>
                <button 
                  className={`w-full text-left px-4 py-2 rounded flex items-center ${activeTab === 'contacts' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => setActiveTab('contacts')}
                >
                  <Users size={18} className="mr-3" /> Kontakte
                </button>
              </li>
            </ul>
          </nav>
        </aside>
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Dokumente</h2>
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Dokumente durchsuchen..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dokument</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Datum</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unterzeichner</th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Aktionen</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <File size={18} className="mr-3 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">{doc.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          doc.status === 'Signiert' ? 'bg-yellow-100 text-yellow-800' : 
                          doc.status === 'Abgeschlossen' ? 'bg-green-100 text-green-800' : 
                          'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {doc.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex -space-x-2">
                        {doc.signers.map((signer, index) => (
                          <div key={index} className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs text-white" title={signer}>
                            {signer.charAt(0)}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => handleViewDocument(doc.id)}
                      >
                        Anzeigen
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SignEaseApp;