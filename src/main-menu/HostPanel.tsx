import { observer } from 'mobx-react';
import React from 'react';

@observer
export class HostPanel extends React.PureComponent {
  public render() {
    return (
      <>
        <div>back</div>
        <div>copy link / host id</div>
        <div>waiting for player to join</div>
      </>
    );
  }
}
