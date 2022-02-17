import { produce } from 'immer';
import { BehaviorSubject, scan } from 'rxjs';

interface Context {
  userId?: string;
  userName?: string;
}

type Action<ActionType> = { type: ActionType };
type InitAction = Action<'context.INIT'>;
type SetContextAction = Action<'context.setContext'> & { newContext: Context };
type SetUserIdAction = Action<'context.setUserId'> & { userId: string };
type SetUserNameAction = Action<'context.setUserName'> & { userName: string };

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

export const context$ = actions$.pipe(
  scan(
    (state: Context, action: ContextAction) =>
      produce(state, (draft) => {
        reducer(draft, action);
      }),
    initialState
  )
);

export function setContext(newContext: Context): void {
  actions$.next({ type: 'context.setContext', newContext });
}

export function setUserId(userId: string): void {
  actions$.next({ type: 'context.setUserId', userId });
}

export function setUserName(userName: string): void {
  actions$.next({ type: 'context.setUserName', userName });
}
