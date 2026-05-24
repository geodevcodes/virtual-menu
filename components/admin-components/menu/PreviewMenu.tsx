"use client";
import { X, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useMemo, useRef, useEffect } from "react";
import { useGetMenu } from "@/services/menu/menuService";
import { PreviewMenuProps } from "@/types/menuType";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Image from "next/image";

// Configure PDF.js worker URL
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

export default function PreviewMenu({
  setShowPreviewMenu,
  menuId,
}: PreviewMenuProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [numPages, setNumPages] = useState<number>();
  const [pageWidth, setPageWidth] = useState<number>();
  const { data: menuResponse, isLoading: isFetching } = useGetMenu(menuId);
  const menu = menuResponse?.data;

  // base list (may contain empty urls)
  const menuFiles = useMemo(
    () => [
      { key: "foodMenuFile", label: "Food Menu", url: menu?.foodMenuFile },
      { key: "drinkMenuFile", label: "Drink Menu", url: menu?.drinkMenuFile },
      { key: "spaMenuFile", label: "Spa Menu", url: menu?.spaMenuFile },
      {
        key: "accommodationMenuFile",
        label: "Accommodation",
        url: menu?.accommodationMenuFile,
      },
    ],
    [menu],
  );

  // only valid files we can preview
  const validFiles = useMemo(
    () => menuFiles.filter((f) => !!f.url),
    [menuFiles],
  );

  // ensure current index always points into validFiles
  const currentFile = useMemo(() => {
    if (validFiles.length === 0) return { url: "", label: "" };
    const safeIndex =
      ((currentIndex % validFiles.length) + validFiles.length) %
      validFiles.length;
    return {
      url: validFiles[safeIndex].url!,
      label: validFiles[safeIndex].label,
      index: safeIndex,
    };
  }, [validFiles, currentIndex]);

  const fileUrl = currentFile.url;
  const currentLabel = currentFile.label;

  // memoize file object so Document's prop identity
  // doesn't change unnecessarily
  const fileProp = useMemo(
    () => (fileUrl ? { url: fileUrl } : null),
    [fileUrl],
  );

  const handleOpenInNewTab = () => {
    if (fileUrl) window.open(fileUrl, "_blank");
  };

  // Next/Previous should wrap based on validFiles length
  const handleNext = () => {
    if (validFiles.length === 0) return;
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (validFiles.length === 0) return;
    setCurrentIndex((prev) => prev - 1);
  };

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  // ref for the container that holds the PDF pages
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Keep pageWidth in sync with container size.
  // Uses ResizeObserver with a window resize fallback.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateWidth = () => {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth;
        setPageWidth(w);
      }
    };
    // initial set
    updateWidth();

    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(() => {
        updateWidth();
      });
      ro.observe(el);
      return () => ro.disconnect();
    } else {
      // fallback for older browsers
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }
  }, [fileUrl]);

  const isPdf = fileUrl?.toLowerCase().endsWith(".pdf");

  return (
    <section className="bg-white w-[90vw] sm:w-[600px] md:w-[700px] lg:w-[900px] max-h-[90vh] rounded-xl shadow-2xl flex flex-col">
      {/* ========= Header ========== */}
      <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100 flex-shrink-0">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate max-w-[24ch]">
          Preview: {menu?.name || "Loading..."}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handleOpenInNewTab}
            disabled={!fileUrl}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
            type="button"
          >
            <span className="hidden sm:inline">Open in new tab</span>
            <ExternalLink className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowPreviewMenu?.(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            type="button"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* ======== Main Content ======== */}
      <div className="flex-1 overflow-auto p-4 sm:p-6 bg-gray-50">
        <div className="max-w-full mx-auto">
          {/* <====== Loading State =======> */}
          {isFetching && (
            <div className="flex items-center justify-center min-h-[500px]">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 border-4 border-gray-200 border-t-[#5C2E1B] rounded-full animate-spin"></div>
                <p className="text-sm text-gray-500">Loading preview...</p>
              </div>
            </div>
          )}

          {/* <====== Error State =======> */}
          {hasError && !isFetching && (
            <div className="flex items-center justify-center min-h-[500px]">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                  <X className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Failed to load preview
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  The menu file could not be loaded. Please try again.
                </p>
                <button
                  onClick={() => {
                    setHasError(false);
                    setIsLoading(true);
                  }}
                  className="px-4 py-2 bg-[#5C2E1B] text-white rounded-lg hover:bg-[#5C2E1B]/90 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* <====== File Preview (Image or PDF) ======> */}
          {!isFetching && !hasError && fileUrl && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden flex justify-center">
              {isPdf ? (
                <div
                  ref={containerRef}
                  className="flex flex-col items-center w-full min-h-[500px]"
                >
                  <Document
                    file={fileProp}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={(err: any) => {
                      console.error("PDF Load Error:", err);
                      setHasError(true);
                    }}
                    loading={
                      <div className="py-10 text-gray-500">
                        Loading PDF preview...
                      </div>
                    }
                    className="flex flex-col items-center"
                  >
                    {Array.from({ length: numPages ?? 0 }).map((_, index) => (
                      <Page
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                        width={pageWidth}
                        className="max-w-full mb-4"
                      />
                    ))}
                  </Document>
                </div>
              ) : (
                <Image
                  width={100}
                  height={100}
                  src={fileUrl}
                  alt={`${menu?.name || "Menu"} preview`}
                  onLoad={() => setIsLoading(false)}
                  onError={() => setHasError(true)}
                  sizes="(max-width: 500px) 100vw, 700px"
                  quality={100}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/PZxPQAIogM0nyRNiQAAAABJRU5ErkJggg=="
                  className="w-full h-auto"
                />
              )}
            </div>
          )}

          {/* <====== Fallback if no file ======> */}
          {!isFetching && !fileUrl && (
            <div className="flex items-center justify-center min-h-[500px] bg-white rounded-lg">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-gray-500">No preview available</p>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* ======= Preview Navigation  ======= */}
      {fileUrl && (
        <div className="flex items-center justify-center gap-10 py-4">
          <button
            onClick={handlePrevious}
            type="button"
            className="cursor-pointer p-2 rounded-full bg-white shadow-md border-[0.3px] hover:bg-gray-100 transition"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <p className="text-gray-700 font-medium text-lg">{currentLabel}</p>
          <button
            onClick={handleNext}
            type="button"
            className="cursor-pointer p-2 rounded-full bg-white shadow-md border-[0.3px] hover:bg-gray-100 transition"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      )}
    </section>
  );
}
