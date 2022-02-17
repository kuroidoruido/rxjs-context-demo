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

function reducer(state: Context, action: ContextAction): void {
  switch (action.type) {
    case 'context.setContext':
      state.userId = action.newContext.userId;
      state.userName = action.newContext.userName;
      break;
    case 'context.setUserId':
      state.userId = action.userId;
      break;
    case 'context.setUserName':
      state.userName = action.userName;
      break;
  }
}

const state$ = actions$.pipe(
  scan(
    (state: Context, action: ContextAction) =>
      produce(state, (draft) => {
        reducer(draft, action);
      }),
    initialState
  )
);

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
