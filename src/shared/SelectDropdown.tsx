import React from 'react';

type Props<T extends string> = {
  value: T;
  onChange: (value: T) => void;
  options: Array<{ value: T; label: string }>;
};

export const SelectDropdown = <T extends string>(props: Props<T>) => {
  const { value, onChange, options } = props;

  return (
    <select onChange={e => onChange(e.target.value as T)} value={value}>
      {options.map(({ value, label }) => (
        <option value={value} key={value}>
          {label}
        </option>
      ))}
    </select>
  );
};
