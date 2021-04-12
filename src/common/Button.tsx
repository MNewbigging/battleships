import React from 'react';

import './button.scss';

interface ButtonProps {
  enabled: boolean;
  text: string;
  onClick: () => void;
}

export class Button extends React.PureComponent<ButtonProps> {
  public render() {
    const { enabled, text } = this.props;
    return (
      <button className={'button'} onClick={this.onButtonClick} disabled={!enabled}>
        {text}
      </button>
    );
  }

  private readonly onButtonClick = (e: React.MouseEvent<HTMLElement>) => {
    const { onClick } = this.props;

    e.stopPropagation();
    onClick();
  };
}
