import { show } from './helper';
import { context$, setContext, setUserId, setUserName } from './context-5-2';

show({
  label: 'Context 5.2',
  selector: '#context-5-2',
  draw(component) {
    context$.subscribe((context) => component(context));
  },
  after3000() {
    setContext({ userId: '123', userName: 'John' });
  },
  after6000() {
    setUserId('1234567890');
  },
  after9000() {
    setUserName('john.doe');
  },
});
