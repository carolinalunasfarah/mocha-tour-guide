import { Search } from "lucide-react";
import { useEffect, useState } from "react";

import { useDebounceFunction } from "@/modules/shared/hooks/useDebounce/useDebounce";
import { cn } from "@/utils/styles/cn";

import { SearchBarProps } from "./types";
import { Input } from "../ui/Input";

const SearchBar = ({
  value,
  onChange,
  delay = 500,
  placeholder,
  className,
}: SearchBarProps) => {
  const [localValue, setLocalValue] = useState(value);
  const debouncedValue = useDebounceFunction(() => onChange(localValue), delay);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    debouncedValue();
  }, [debouncedValue]);

  return (
    <div className="relative w-full lg:w-1/3">
      <Search className="absolute left-2 top-2.5 size-4 text-primary" />
      <Input
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        className={cn("pl-8 text-primary", className)}
      />
    </div>
  );
};

export { SearchBar };
