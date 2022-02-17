import { produce } from 'immer';
import { BehaviorSubject, scan } from 'rxjs';

interface Context {
  userId?: string;
  userName?: string;
}

type Action = (context: Context) => Context | void;

const initialState: Context = {};
const _context$ = new BehaviorSubject<Action>(() => initialState);

export const context$ = _context$.pipe(
  scan((state, patcher) => produce(state, patcher), initialState)
);

export function setContext(newContext: Context): void {
  _context$.next(() => newContext);
}

export function setUserId(userId: string): void {
  _context$.next((context) => {
    context.userId = userId;
  });
}

export function setUserName(userName: string): void {
  _context$.next((context) => {
    context.userName = userName;
  });
}
