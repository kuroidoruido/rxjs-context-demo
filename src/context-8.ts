import { produce } from 'immer';
import { BehaviorSubject, Observable, scan } from 'rxjs';
import { first, map } from 'rxjs/operators';

interface Context {
  userId?: string;
  userName?: string;
}

export function setContext(newContext: Context) {
  return { type: 'context.setContext', newContext } as const;
}

export function setUserId(userId: string) {
  return { type: 'context.setUserId', userId } as const;
}

export function setUserName(userName: string) {
  return { type: 'context.setUserName', userName } as const;
}

type InitAction = { type: 'context.INIT' };
type SetContextAction = ReturnType<typeof setContext>;
type SetUserIdAction = ReturnType<typeof setUserId>;
type SetUserNameAction = ReturnType<typeof setUserName>;

type ContextAction =
  | InitAction
  | SetContextAction
  | SetUserIdAction
  | SetUserNameAction;

const actions$ = new BehaviorSubject<ContextAction>({ type: 'context.INIT' });
const initialState: Context = {};

function reducer(state: Context, action: ContextAction): Context {
  switch (action.type) {
    case 'context.setContext':
      return {
        userId: action.newContext.userId,
        userName: action.newContext.userName,
      };
    case 'context.setUserId':
      return produce(state, (draft) => {
        draft.userId = action.userId;
      });
    case 'context.setUserName':
      return produce(state, (draft) => {
        draft.userName = action.userName;
      });
    default:
      return state;
  }
}

const state$ = actions$.pipe(scan(reducer, initialState));

export const contextStore = {
  get(): Observable<Context> {
    return state$;
  },
  select<T>(selector: (context: Context) => T): Observable<T> {
    return state$.pipe(map(selector));
  },
  selectOnce<T>(selector: (context: Context) => T): Observable<T> {
    return state$.pipe(map(selector), first());
  },
  dispatch(action: ContextAction): void {
    actions$.next(action);
  },
} as const;
