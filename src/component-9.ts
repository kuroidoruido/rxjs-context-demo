import { show } from './helper';
import { contextStore, setContext, setUserId, setUserName } from './context-9';

show({
  label: 'Context 9',
  selector: '#context-9',
  draw(component) {
    contextStore.subscribe((context) => component(context));
  },
  after3000() {
    contextStore.update(setContext({ userId: '123', userName: 'John' }));
  },
  after6000() {
    contextStore.update(setUserId('1234567890'));
  },
  after9000() {
    contextStore.update(setUserName('john.doe'));
  },
});
