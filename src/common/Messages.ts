// tslint:disable: max-classes-per-file

export enum MessageType {
  NAME,
  READY,
  START,
}

export abstract class BaseMessage {
  constructor(public type: MessageType) {}
}

export class NameMessage extends BaseMessage {
  constructor(public name: string) {
    super(MessageType.NAME);
  }
}

export class ReadyMessage extends BaseMessage {
  constructor(public grid: string) {
    super(MessageType.READY);
  }
}

export class StartMessage extends BaseMessage {
  constructor(public youStart: boolean) {
    super(MessageType.START);
  }
}
