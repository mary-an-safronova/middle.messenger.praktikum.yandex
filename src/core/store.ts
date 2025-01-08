/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-constructor-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TChatUser, TMessage, TUser, TUserPassword,
} from '../utils/types';
import Block from './block';
import EventBus from './event-bus';
import isEqual from './utils/is-equal';
import { set } from './utils/set';

export interface StoreData {
  currentUser?: {
    data?: TUser;
    password: TUserPassword;
    avatar_image: string;
  },
  chatList?: TMessage[];
  currentChat?: {
    chat?: TMessage | null;
    chat_users?: TChatUser[] | null;
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
  },
  foundUsers: null,
};

export class Store extends EventBus {
  static EVENTS = {
    UPDATED: 'updated',
  } as const;

  private state: StoreData = { ...initialState };

  static __instance: any;

  constructor() {
    if (Store.__instance) {
      return Store.__instance;
    }
    super();

    Store.__instance = this;
  }

  private handleUpdate(prevState: any, nextState: any) {
    console.log('State updated from', prevState, 'to', nextState);
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

export const withStore = (mapStateToProps: (state: StoreData) => Record<string, unknown>) => (Component: typeof Block) => {
  let state: any;

  return class extends Component {
    constructor(props: object) {
      state = mapStateToProps(store.getState());

      super({ ...props, ...state });

      store.on(Store.EVENTS.UPDATED, () => {
        const newState = mapStateToProps(store.getState());

        if (!isEqual(state, newState)) {
          this.setProps({
            ...newState,
          });
        }
      });
    }
  };
};

export default store;
