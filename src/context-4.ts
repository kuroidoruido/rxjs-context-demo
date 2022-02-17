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

export function patchContext(contextPatch: Partial<Context>): void {
  _context$.pipe(first()).subscribe((actual) => {
    setContext({ ...actual, ...contextPatch });
  });
}
