import React from 'react';

import './drag-item-panel.scss';
import { DragItem } from './DragItem';
import { AppState, Ship } from './AppState';

interface PanelProps {
  gState: AppState;
}

export class DragItemPanel extends React.PureComponent<PanelProps> {
  public render() {
    const { gState } = this.props;
    const shipItems: JSX.Element[] = [];
    gState.ships.forEach((ship, i) => {
      shipItems.push(
        <DragItem key={'ship-' + i} ship={ship} onDragEnd={() => gState.onDragEnd()} />
      );
    });

    return <div className={'drag-item-panel'}>{shipItems}</div>;
  }
}
