import React from 'react';
import { DndProvider } from 'react-dnd-cjs';
import HTML5Backend from 'react-dnd-html5-backend-cjs';
import { AppState, GridPos, Ship } from './AppState';

import './dnd-page.scss';

import { DragItemPanel } from './DragItemPanel';
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
          <DragItemPanel gState={state} />
          <DropGrid gState={state} />
        </div>
      </DndProvider>
    );
  }
}
