export function formatOpeningHours({
  timezone,
  open,
  close,
}: {
  timezone: string;
  open: string;
  close: string;
}): string {
  const now = new Date();
  const tzTime = now.toLocaleTimeString("en-US", {
    timeZone: timezone,
    timeZoneName: "short",
  });

  // Extract short name and UTC offset, e.g. "WAT" or "GMT+1"
  const tzAbbrev = tzTime.split(" ").pop() || "";
  const tzOffset = now
    .toLocaleTimeString("en-US", {
      timeZone: timezone,
      timeZoneName: "longOffset",
    })
    .split(" ")
    .pop();

  // Format times
  const openFormatted = formatTo12Hour(open);
  const closeFormatted = formatTo12Hour(close);

  return `(${tzAbbrev}) ${tzOffset} - ${openFormatted} to ${closeFormatted}`;
}

function formatTo12Hour(time: string) {
  if (!time || typeof time !== "string" || !time.includes(":")) {
    return "";
  }
  const [hour, minute] = time.split(":");
  const h = parseInt(hour, 10);
  const ampm = h >= 12 ? "PM" : "AM";
  const formattedHour = ((h + 11) % 12) + 1; // convert 13 → 1 etc.
  return `${formattedHour}:${minute} ${ampm}`;
}
