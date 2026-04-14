import { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { isValidHex, normalizeHex } from '@/utils/color';

interface ColorInputProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
}

export function ColorInput({ id, value, onChange }: ColorInputProps) {
  const [text, setText] = useState(value);

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      setText(raw);
      const normalized = normalizeHex(raw);
      if (isValidHex(normalized)) {
        onChange(normalized);
      }
    },
    [onChange]
  );

  const handleColorChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const normalized = e.target.value.toUpperCase();
      setText(normalized);
      onChange(normalized);
    },
    [onChange]
  );

  const handleBlur = useCallback(() => {
    setText(value);
  }, [value]);

  return (
    <div className="flex items-center gap-2">
      <input
        type="color"
        value={value}
        onChange={handleColorChange}
        className="h-9 w-9 shrink-0 cursor-pointer rounded border border-input bg-transparent p-0.5"
        aria-label="Pick color"
      />
      <Input
        id={id}
        value={text}
        onChange={handleTextChange}
        onBlur={handleBlur}
        className="w-28 font-mono text-xs"
        maxLength={7}
      />
    </div>
  );
}
