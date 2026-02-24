import React, { useMemo, useState } from "react";
import SelectButton from "@/components/reusable/SelectButton";

type OpeningHours = {
  timezone: string;
  open: string;
  close: string;
};

const OpeningHoursSelector = ({
  onChange,
  value,
  disabled,
}: {
  onChange: (data: OpeningHours) => void;
  value?: OpeningHours;
  disabled?: boolean;
}) => {
  const timeZones = useMemo(() => Intl.supportedValuesOf("timeZone"), []);

  const [timezone, setTimezone] = useState(value?.timezone || "Africa/Lagos");
  const [open, setOpen] = useState(value?.open || "09:00");
  const [close, setClose] = useState(value?.close || "17:00");

  const handleChange = (field: keyof OpeningHours, val: string) => {
    const newValue = { timezone, open, close, [field]: val };
    if (field === "timezone") setTimezone(val);
    if (field === "open") setOpen(val);
    if (field === "close") setClose(val);
    onChange?.(newValue);
  };

  // Generate readable options like: "Africa/Lagos (UTC+01:00)"
  const timezoneOptions = timeZones.map((tz) => {
    const offset = new Date()
      .toLocaleTimeString("en-us", {
        timeZone: tz,
        timeZoneName: "short",
      })
      .split(" ")
      .pop();
    return `${tz} (${offset})`;
  });

  return (
    <div className="flex flex-col gap-3 w-full md:w-[280px] lg:w-[400px]">
      <div className="flex flex-col md:flex-row md:items-center gap-1 w-full">
        <p className="w-fit text-[10px] md:text-[14px]">Time zone</p>
        <SelectButton
          title=""
          options={timezoneOptions}
          width="100%"
          value={`${timezone} (${new Date()
            .toLocaleTimeString("en-us", {
              timeZone: timezone,
              timeZoneName: "short",
            })
            .split(" ")
            .pop()})`}
          onChange={(val) => handleChange("timezone", val.split(" ")[0])}
          disabled={disabled}
        />
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-2">
        <p className="w-[120px]">Opening</p>
        <input
          type="time"
          value={open}
          onChange={(e) => handleChange("open", e.target.value)}
          className="border border-[#D0D5DD] rounded-[8px] px-2 py-1 w-full md:w-[150px]"
          disabled={disabled}
        />
        <span>to</span>
        <input
          type="time"
          value={close}
          onChange={(e) => handleChange("close", e.target.value)}
          className="border border-[#D0D5DD] rounded-[8px] px-2 py-1 w-full md:w-[150px]"
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default OpeningHoursSelector;
