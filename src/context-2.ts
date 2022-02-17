import { BehaviorSubject } from 'rxjs';

const _context$ = new BehaviorSubject<any>({});
export const context$ = _context$.asObservable();

export function setContext(newContext: any): void {
  _context$.next(newContext);
}
