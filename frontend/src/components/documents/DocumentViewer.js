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
      
      {/* Rest of the component... */}
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
      
      <div className="flex-1 flex justify-center items-center">
        <div className="text-center text-gray-500">
          <h3 className="text-xl mb-2">Dokumentenansicht</h3>
          <p>Diese Ansicht zeigt ein signiertes Dokument mit Seite {currentPage} von {totalPages} bei {zoomLevel}% Zoom.</p>
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;
