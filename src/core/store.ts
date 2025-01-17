/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-constructor-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TChatUser, TChat, TUser, TUserPassword,
  TMessage,
} from '../utils/types';
import EventBus from './event-bus';
import isEqual from './utils/is-equal';
import { set } from './utils/set';

export interface StoreData {
  currentUser?: {
    data?: TUser;
    password: TUserPassword;
    avatar_image: string;
  },
  chatList?: TChat[];
  currentChat?: {
    chat?: TChat | null;
    chat_users?: TChatUser[] | null;
    chat_token: any;
    messages: TMessage[],
  },
  foundUsers?: TUser[] | null;
}

const initialState: StoreData = {
  currentUser: {
    data: {
      id: null,
      first_name: '',
      second_name: '',
      display_name: '',
      phone: '',
      login: '',
      avatar: '',
      email: '',
    },
    password: {
      oldPassword: '',
      newPassword: '',
    },
    avatar_image: '',
  },
  chatList: [],
  currentChat: {
    chat: null,
    chat_users: null,
    chat_token: null,
    messages: [],
  },
  foundUsers: null,
};

export class Store extends EventBus {
  static EVENTS = {
    UPDATED: 'updated',
  } as const;

  public state: StoreData = { ...initialState };

  static __instance: any;

  constructor() {
    if (Store.__instance) {
      return Store.__instance;
    }
    super();

    Store.__instance = this;
  }

  private handleUpdate(prevState: any, nextState: any) {
    // console.log('State updated from', prevState, 'to', nextState);
  }

  public getState() {
    return this.state;
  }

  public set(path: string, nextState: any) {
    set(this.state, path, nextState);

    this.on(Store.EVENTS.UPDATED, this.handleUpdate);
    this.emit(Store.EVENTS.UPDATED, this.state, nextState);
  }
}

const store = new Store();

export function withStore(mapStateToProps: (state: StoreData) => Record<string, any>) {
  // eslint-disable-next-line func-names
  return function (Component: any) {
    return class extends Component {
      private onChangeStoreCallback: () => void;

      constructor(props: any) {
        // сохраняем начальное состояние
        let state = mapStateToProps(store.getState());

        super({ ...props, ...state });

        this.onChangeStoreCallback = () => {
          // при обновлении получаем новое состояние
          const newState = mapStateToProps(store.getState());
          // если что-то из используемых данных поменялось, обновляем компонент
          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
          }
          // не забываем сохранить новое состояние
          state = newState;
        };
        // подписываемся на событие
        store.on(Store.EVENTS.UPDATED, this.onChangeStoreCallback);
      }

      componentWillUnmount() {
        super.componentWillUnmount();
        store.off(Store.EVENTS.UPDATED, this.onChangeStoreCallback);
      }
    };
  };
}

export default store;
