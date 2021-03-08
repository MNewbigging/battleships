import React from 'react';
import { DndProvider } from 'react-dnd-cjs';
import HTML5Backend from 'react-dnd-html5-backend-cjs';
import { AppState, GridPos } from './AppState';
import { Ship } from './ShipUtils';

import './dnd-page.scss';

import { DropGrid } from './DropGrid';

interface DnDPageProps {
  state: AppState;
}

export class DnDPage extends React.Component<DnDPageProps> {
  public render() {
    const { state } = this.props;
    return (
      <DndProvider backend={HTML5Backend}>
        <div className={'dnd-page'}>
          <DropGrid gState={state} />
        </div>
      </DndProvider>
    );
  }
}
