// FUNCTION TO FORMAT DATE
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };
  return date.toLocaleDateString("en-US", options);
};

// Short Date Format
export const formatDateShort = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short", // 'Feb' instead of 'February'
    day: "numeric", // '5' instead of '05'
  };
  return date.toLocaleDateString("en-US", options);
};

// FUNCTION TO FORMAT DATE AND TIME
export function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Africa/Lagos",
  };
  const formattedDate = new Intl.DateTimeFormat("en-NG", options).format(date);
  return formattedDate.replace(",", "").replace(" ", " at ");
}

export const avatarPlaceholderUrlOne = `https://api.dicebear.com/7.x/avataaars/png?seed=5`;
