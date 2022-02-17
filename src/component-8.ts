import { show } from './helper';
import { contextStore, setContext, setUserId, setUserName } from './context-8';

show({
  label: 'Context 8',
  selector: '#context-8',
  draw(component) {
    contextStore.get().subscribe((context) => component(context));
  },
  after3000() {
    contextStore.dispatch(setContext({ userId: '123', userName: 'John' }));
  },
  after6000() {
    contextStore.dispatch(setUserId('1234567890'));
  },
  after9000() {
    contextStore.dispatch(setUserName('john.doe'));
  },
});
