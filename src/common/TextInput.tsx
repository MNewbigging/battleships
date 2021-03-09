import React from 'react';

import './text-input.scss';

interface InputProps {
  value: string;
  onChange?: (val: string) => void;
  placeholder?: string;
  readonly?: boolean;
}

export class TextInput extends React.PureComponent<InputProps> {
  public render() {
    const { value, onChange, placeholder, readonly } = this.props;
    return (
      <input
        className={'text-input'}
        type={'text'}
        readOnly={readonly ?? false}
        placeholder={placeholder ?? ''}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      />
    );
  }
}
