import React from 'react';

import './button.scss';

interface ButtonProps {
  enabled: boolean;
  text: string;
  onClick: () => void;
}

export class Button extends React.PureComponent<ButtonProps> {
  public render() {
    const { enabled, text, onClick } = this.props;
    return (
      <button className={'button'} onClick={onClick} disabled={!enabled}>
        {text}
      </button>
    );
  }
}
