import { Store, createState, withProps, setProp } from '@ngneat/elf';

interface Context {
  userId?: string;
  userName?: string;
}

const { state, config } = createState(withProps<Context>({}));

export const contextStore = new Store({ state, name: 'auth', config });

export function setContext(newContext: Context) {
  return () => newContext;
}

export function setUserId(userId: string) {
  return setProp('userId', userId);
}

export function setUserName(userName: string) {
  return setProp('userName', userName);
}
