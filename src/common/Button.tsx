import React from 'react';

import './button.scss';

interface ButtonProps {
  text: string;
  onClick: () => void;
}

export class Button extends React.PureComponent<ButtonProps> {
  public render() {
    const { text, onClick } = this.props;
    return (
      <button className={'button'} onClick={onClick}>
        {text}
      </button>
    );
  }
}
