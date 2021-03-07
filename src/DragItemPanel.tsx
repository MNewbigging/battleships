import React from 'react';

import './drag-item-panel.scss';
import { DragItem } from './DragItem';
import { AppState, Ship } from './AppState';

const ship1: Ship = {
  type: 'ship',
  width: 1,
  height: 1,
};

// Could I use accept on drop target to disallow certain ships?...
const ship2: Ship = {
  type: 'ship',
  width: 2,
  height: 1,
};

interface PanelProps {
  gState: AppState;
}

export class DragItemPanel extends React.PureComponent<PanelProps> {
  private readonly ships = [ship1, ship2];
  public render() {
    const { gState } = this.props;
    const shipItems: JSX.Element[] = [];
    this.ships.forEach((ship, i) => {
      shipItems.push(
        <DragItem key={'ship-' + i} ship={ship} onDragEnd={() => gState.onDragEnd()} />
      );
    });

    return <div className={'drag-item-panel'}>{shipItems}</div>;
  }
}
