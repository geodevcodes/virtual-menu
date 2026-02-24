// Helper function to get file type from URL
export const getFileTypeFromUrl = (url: string): string => {
  if (!url) return "application/pdf";
  const extension = url.split(".").pop()?.toLowerCase();
  switch (extension) {
    case "pdf":
      return "application/pdf";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "svg":
      return "image/svg+xml";
    default:
      return "application/pdf"; // Default to PDF
  }
};
