"use client";

import Loader from "@/assets/Loader";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface PDFViewerProps {
  fileUrl: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ fileUrl }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageWidth, setPageWidth] = useState<number>();
  const containerRef = useRef<HTMLDivElement>(null);

  const file = useMemo(() => ({ url: fileUrl }), [fileUrl]);

  useEffect(() => {
    if (containerRef.current) {
      setPageWidth(containerRef.current.clientWidth);
    }
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div ref={containerRef} className="flex flex-col items-center w-full">
      {pageWidth ? (
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="py-10 text-gray-500">
              <Loader />
              <p>Loading PDF preview...</p>
            </div>
          }
          className="flex flex-col items-center"
        >
          {Array.from(new Array(numPages), (_, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              width={pageWidth}
              className="max-w-full mb-4"
            />
          ))}
        </Document>
      ) : (
        <div className="py-10 text-gray-500 flex items-center gap-3">
          <Loader />
          <p>Loading viewer...</p>
        </div>
      )}
    </div>
  );
};

export default PDFViewer;
