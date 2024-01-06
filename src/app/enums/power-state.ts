/**
 * Power state of a machine
 */
export enum PowerState {
  UNKNOWN = -1,
  OFFLINE = 0,
  ONLINE = 1,
}

export function PowerStateFromNumber(state: number): PowerState {
  switch (state) {
    case -1:
      return PowerState.UNKNOWN;

    case 0:
      return PowerState.OFFLINE;

    case 1:
      return PowerState.ONLINE;

    default:
      throw new Error(`Invalid power state value: ${state}!`);
  }
}
