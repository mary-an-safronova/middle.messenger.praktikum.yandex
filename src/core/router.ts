/* eslint-disable no-constructor-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BlockConstructable } from '../utils/types';
import Route from './route';

export default class Router {
  static __instance: any;

  public routes!: Route[];

  private history!: History;

  private _currentRoute: Route | null | undefined;

  private _rootQuery!: string;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, block: BlockConstructable) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes?.push(route);
    return this; // для возможности цепочки вызовов
  }

  start() {
    window.onpopstate = ((event: PopStateEvent) => {
      const target = event.currentTarget as Window;
      this._onRoute(target.location.pathname);
    });
    this._onRoute(window.location.pathname); // начальная загрузка
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (this._currentRoute) {
      this._currentRoute = route;
    }

    if (route) {
      route.render();
    }
  }

  go(pathname: string) {
    this.history?.pushState({}, '', pathname);
    this._onRoute(pathname); // отображение нового роута
  }

  back() {
    this.history?.back();
  }

  forward() {
    this.history?.forward();
  }

  getRoute(pathname: string) {
    const route = this.routes?.find((routeItem) => routeItem.match(pathname));
    if (!route) {
      return this.routes?.find((routeItem) => routeItem.match('*'));
    }
    return route;
  }
}
