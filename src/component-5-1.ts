import { show } from './helper';
import { context$, setContext, patchContext } from './context-5-1';

show({
  label: 'Context 5.1',
  selector: '#context-5-1',
  draw(component) {
    context$.subscribe((context) => component(context));
  },
  after3000() {
    setContext({ userId: '123', userName: 'John' });
  },
  after6000() {
    patchContext((context) => {
      context.userId = '1234567890';
    });
  },
  after9000() {
    patchContext((context) => {
      context.userName = 'john.doe';
    });
  },
});
