import { first } from 'rxjs';
import { show } from './helper';
import { context$, setContext } from './context-3';

show({
  label: 'Context 3',
  selector: '#context-3',
  draw(component) {
    context$.subscribe((context) => component(context));
  },
  after3000() {
    setContext({ userId: '123', userName: 'John' });
  },
  after6000() {
    context$.pipe(first()).subscribe((context) => {
      setContext({ ...context, userId: '1234567890' });
    });
  },
  after9000() {
    context$.pipe(first()).subscribe((context) => {
      setContext({ ...context, userName: 'john.doe' });
    });
  },
});
