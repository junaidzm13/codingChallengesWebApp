import React from 'react';

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const TextInput: React.FC<Props> = props => {
  const { value, onChange, placeholder } = props;

  const onTextChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <input
      type="text"
      value={value}
      onChange={onTextChange}
      placeholder={placeholder}
    />
  );
};
