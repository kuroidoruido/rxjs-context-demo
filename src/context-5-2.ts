import { produce } from 'immer';
import { BehaviorSubject, first } from 'rxjs';

interface Context {
  userId?: string;
  userName?: string;
}

const _context$ = new BehaviorSubject<Context>({});
export const context$ = _context$.asObservable();

export function setContext(newContext: Context): void {
  _context$.next(newContext);
}

function patchContext(contextPatcher: (context: Context) => void): void {
  _context$.pipe(first()).subscribe((actual) => {
    setContext(produce(actual, contextPatcher));
  });
}

export function setUserId(userId: string): void {
  patchContext((context) => {
    context.userId = userId;
  });
}

export function setUserName(userName: string): void {
  patchContext((context) => {
    context.userName = userName;
  });
}
