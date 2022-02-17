import { show } from './helper';
import { context$, setContext, patchContext } from './context-4';

show({
  label: 'Context 4',
  selector: '#context-4',
  draw(component) {
    context$.subscribe((context) => component(context));
  },
  after3000() {
    setContext({ userId: '123', userName: 'John' });
  },
  after6000() {
    patchContext({ userId: '1234567890' });
  },
  after9000() {
    patchContext({ userName: 'john.doe' });
  },
});
