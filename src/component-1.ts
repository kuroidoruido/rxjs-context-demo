import { first } from 'rxjs';
import { show } from './helper';
import { context$ } from './context-1';

show({
  label: 'Context 1',
  selector: '#context-1',
  draw(component) {
    context$.subscribe((context) => component(context));
  },
  after3000() {
    context$.next({ userId: '123', userName: 'John' });
  },
  after6000() {
    context$.pipe(first()).subscribe((context) => {
      context$.next({ ...context, userId: '1234567890' });
    });
  },
  after9000() {
    context$.pipe(first()).subscribe((context) => {
      context$.next({ ...context, userName: 'john.doe' });
    });
  },
});
