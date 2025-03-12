import React, { useState } from 'react';
import { Download, Printer, Share, Lock, Check, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

const DocumentViewer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const totalPages = 3;
  
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const increaseZoom = () => {
    if (zoomLevel < 200) {
      setZoomLevel(zoomLevel + 25);
    }
  };
  
  const decreaseZoom = () => {
    if (zoomLevel > 50) {
      setZoomLevel(zoomLevel - 25);
    }
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-blue-600 mr-4">SignEase</h1>
            <h2 className="text-lg font-medium text-gray-700">Vertrag_2025-03-01.pdf</h2>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
              <Download size={20} />
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
              <Printer size={20} />
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
              <Share size={20} />
            </button>
            <span className="mx-2 border-r border-gray-300 h-6"></span>
            <div className="flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full">
              <Check size={16} className="mr-1" />
              <span className="text-sm font-medium">Signiert</span>
            </div>
          </div>
        </div>
      </header>
      
      {/* Document Toolbar */}
      <div className="bg-white border-b border-gray-200 px-6 py-2 flex items-center justify-between">
        <div className="flex items-center">
          <button
            className="p-1 text-gray-600 hover:bg-gray-100 rounded mr-1"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={20} className={currentPage === 1 ? 'text-gray-300' : ''} />
          </button>
          <span className="mx-2 text-sm">
            Seite <strong>{currentPage}</strong> von <strong>{totalPages}</strong>
          </span>
          <button
            className="p-1 text-gray-600 hover:bg-gray-100 rounded ml-1"
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={20} className={currentPage === totalPages ? 'text-gray-300' : ''} />
          </button>
        </div>
        
        <div className="flex items-center">
          <button
            className="p-1 text-gray-600 hover:bg-gray-100 rounded mr-1"
            onClick={decreaseZoom}
            disabled={zoomLevel <= 50}
          >
            <ZoomOut size={20} className={zoomLevel <= 50 ? 'text-gray-300' : ''} />
          </button>
          <span className="mx-2 text-sm">{zoomLevel}%</span>
          <button
            className="p-1 text-gray-600 hover:bg-gray-100 rounded ml-1"
            onClick={increaseZoom}
            disabled={zoomLevel >= 200}
          >
            <ZoomIn size={20} className={zoomLevel >= 200 ? 'text-gray-300' : ''} />
          </button>
        </div>
      </div>
      
      {/* Document Content */}
      <div className="flex-1 overflow-auto p-6 flex justify-center">
        <div 
          className="bg-white shadow-lg rounded-lg overflow-hidden" 
          style={{ width: `${8.27 * (zoomLevel/100)}in`, height: `${11.69 * (zoomLevel/100)}in` }}
        >
          {/* This would be the actual PDF rendering in a real app */}
          {currentPage === 1 && (
            <div className="p-8">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold">VERTRAG</h1>
                <p className="text-gray-500">Zwischen</p>
                <p className="font-medium mt-2">Musterfirma GmbH</p>
                <p className="text-gray-500">und</p>
                <p className="font-medium mt-2">Kunde AG</p>
              </div>
              
              <div className="mb-6">
                <h2 className="text-lg font-bold mb-2">§1 Vertragsgegenstand</h2>
                <p className="text-sm text-gray-700 mb-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nunc 
                  fermentum nunc, vitae aliquam nunc nisl eget nunc. Nullam auctor, nisl eget ultricies tincidunt, nisl nunc
                  fermentum nunc, vitae aliquam nunc nisl eget nunc.
                </p>
                <p className="text-sm text-gray-700">
                  Nullam auctor, nisl eget ultricies tincidunt, nisl nunc fermentum nunc, vitae aliquam nunc nisl eget nunc.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
              
              <div className="mb-6">
                <h2 className="text-lg font-bold mb-2">§2 Leistungen</h2>
                <p className="text-sm text-gray-700 mb-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt:
                </p>
                <ul className="list-disc pl-6 text-sm text-gray-700 mb-2">
                  <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                  <li>Nullam auctor, nisl eget ultricies tincidunt.</li>
                  <li>Vitae aliquam nunc nisl eget nunc.</li>
                </ul>
                <p className="text-sm text-gray-700">
                  Nullam auctor, nisl eget ultricies tincidunt, nisl nunc fermentum nunc, vitae aliquam nunc nisl eget nunc.
                </p>
              </div>
              
              <div>
                <h2 className="text-lg font-bold mb-2">§3 Vergütung</h2>
                <p className="text-sm text-gray-700 mb-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nunc 
                  fermentum nunc, vitae aliquam nunc nisl eget nunc.
                </p>
                <table className="min-w-full border border-gray-300 text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2">Position</th>
                      <th className="border border-gray-300 px-4 py-2">Preis (EUR)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Leistung A</td>
                      <td className="border border-gray-300 px-4 py-2 text-right">1.000,00</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Leistung B</td>
                      <td className="border border-gray-300 px-4 py-2 text-right">2.500,00</td>
                    </tr>
                    <tr className="bg-gray-50 font-medium">
                      <td className="border border-gray-300 px-4 py-2">Gesamt</td>
                      <td className="border border-gray-300 px-4 py-2 text-right">3.500,00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {currentPage === 2 && (
            <div className="p-8">
              <div className="mb-6">
                <h2 className="text-lg font-bold mb-2">§4 Laufzeit und Kündigung</h2>
                <p className="text-sm text-gray-700 mb-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nunc 
                  fermentum nunc, vitae aliquam nunc nisl eget nunc. Nullam auctor, nisl eget ultricies tincidunt, nisl nunc
                  fermentum nunc, vitae aliquam nunc nisl eget nunc.
                </p>
                <p className="text-sm text-gray-700">
                  Nullam auctor, nisl eget ultricies tincidunt, nisl nunc fermentum nunc, vitae aliquam nunc nisl eget nunc.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
              
              <div className="mb-6">
                <h2 className="text-lg font-bold mb-2">§5 Geheimhaltung</h2>
                <p className="text-sm text-gray-700 mb-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nunc 
                  fermentum nunc, vitae aliquam nunc nisl eget nunc. Nullam auctor, nisl eget ultricies tincidunt, nisl nunc
                  fermentum nunc, vitae aliquam nunc nisl eget nunc.
                </p>
                <p className="text-sm text-gray-700">
                  Nullam auctor, nisl eget ultricies tincidunt, nisl nunc fermentum nunc, vitae aliquam nunc nisl eget nunc.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
              
              <div>
                <h2 className="text-lg font-bold mb-2">§6 Haftung</h2>
                <p className="text-sm text-gray-700 mb-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nunc 
                  fermentum nunc, vitae aliquam nunc nisl eget nunc. Nullam auctor, nisl eget ultricies tincidunt, nisl nunc
                  fermentum nunc, vitae aliquam nunc nisl eget nunc.
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  Nullam auctor, nisl eget ultricies tincidunt, nisl nunc fermentum nunc, vitae aliquam nunc nisl eget nunc.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <p className="text-sm text-gray-700">
                  Nullam auctor, nisl eget ultricies tincidunt, nisl nunc fermentum nunc, vitae aliquam nunc nisl eget nunc.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>
          )}
          
          {currentPage === 3 && (
            <div className="p-8">
              <div className="mb-6">
                <h2 className="text-lg font-bold mb-2">§7 Schlussbestimmungen</h2>
                <p className="text-sm text-gray-700 mb-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nunc 
                  fermentum nunc, vitae aliquam nunc nisl eget nunc. Nullam auctor, nisl eget ultricies tincidunt, nisl nunc
                  fermentum nunc, vitae aliquam nunc nisl eget nunc.
                </p>
                <p className="text-sm text-gray-700">
                  Nullam auctor, nisl eget ultricies tincidunt, nisl nunc fermentum nunc, vitae aliquam nunc nisl eget nunc.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
              
              <div className="mt-16 flex justify-between">
                <div className="w-5/12">
                  <div className="border-b border-gray-400 pb-1 mb-1">
                    {/* Signature Box */}
                    <div className="flex items-center mb-2">
                      <div className="p-1 bg-green-100 rounded-full mr-2">
                        <Check size={16} className="text-green-600" />
                      </div>
                      <span className="text-sm text-green-600 font-medium">Digital signiert</span>
                    </div>
                    <div className="font-handwriting text-2xl text-blue-600">Max Mustermann</div>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Musterfirma GmbH</p>
                    <p className="text-gray-600">01.03.2025, 10:32 Uhr</p>
                  </div>
                </div>
                
                <div className="w-5/12">
                  <div className="border-b border-gray-400 pb-1 mb-1">
                    {/* Signature Box */}
                    <div className="flex items-center mb-2">
                      <div className="p-1 bg-green-100 rounded-full mr-2">
                        <Check size={16} className="text-green-600" />
                      </div>
                      <span className="text-sm text-green-600 font-medium">Digital signiert</span>
                    </div>
                    <div className="font-handwriting text-2xl text-blue-600">Anna Schmidt</div>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Kunde AG</p>
                    <p className="text-gray-600">03.03.2025, 14:17 Uhr</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Document Signatures */}
          {currentPage === 3 && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center">
              <Lock size={18} className="text-blue-600 mr-2" />
              <div>
                <div className="text-sm font-medium text-blue-800">Rechtsverbindlich signiertes Dokument</div>
                <div className="text-xs text-blue-600">Durch eIDAS-konforme Signaturen gesichert und nachweisbar</div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Activity Sidebar */}
      <div className="w-80 bg-white border-l border-gray-200 h-full absolute right-0 top-0 overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-medium text-gray-800">Dokumentaktivität</h3>
        </div>
        
        <div className="p-4">
          <div className="space-y-6">
            <div className="relative pl-6 pb-6 border-l-2 border-green-500">
              <div className="absolute w-4 h-4 rounded-full bg-green-500 -left-2 top-0"></div>
              <div className="mb-1">
                <span className="text-sm font-medium">Anna Schmidt</span>
                <span className="text-xs text-gray-500 ml-2">03.03.2025, 14:17</span>
              </div>
              <div className="text-sm text-gray-700">Hat das Dokument signiert</div>
            </div>
            
            <div className="relative pl-6 pb-6 border-l-2 border-blue-500">
              <div className="absolute w-4 h-4 rounded-full bg-blue-500 -left-2 top-0"></div>
              <div className="mb-1">
                <span className="text-sm font-medium">System</span>
                <span className="text-xs text-gray-500 ml-2">03.03.2025, 14:15</span>
              </div>
              <div className="text-sm text-gray-700">E-Mail-Erinnerung gesendet</div>
            </div>
            
            <div className="relative pl-6 pb-6 border-l-2 border-blue-500">
              <div className="absolute w-4 h-4 rounded-full bg-blue-500 -left-2 top-0"></div>
              <div className="mb-1">
                <span className="text-sm font-medium">Anna Schmidt</span>
                <span className="text-xs text-gray-500 ml-2">03.03.2025, 14:10</span>
              </div>
              <div className="text-sm text-gray-700">Hat das Dokument angesehen</div>
            </div>
            
            <div className="relative pl-6 pb-6 border-l-2 border-green-500">
              <div className="absolute w-4 h-4 rounded-full bg-green-500 -left-2 top-0"></div>
              <div className="mb-1">
                <span className="text-sm font-medium">Max Mustermann</span>
                <span className="text-xs text-gray-500 ml-2">01.03.2025, 10:32</span>
              </div>
              <div className="text-sm text-gray-700">Hat das Dokument signiert</div>
            </div>
            
            <div className="relative pl-6 pb-6 border-l-2 border-blue-500">
              <div className="absolute w-4 h-4 rounded-full bg-blue-500 -left-2 top-0"></div>
              <div className="mb-1">
                <span className="text-sm font-medium">Max Mustermann</span>
                <span className="text-xs text-gray-500 ml-2">01.03.2025, 10:25</span>
              </div>
              <div className="text-sm text-gray-700">Hat das Dokument erstellt</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;