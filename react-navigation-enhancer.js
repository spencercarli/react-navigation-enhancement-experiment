import { NavigationActions } from 'react-navigation';

const PUSH_ACTION = 'Navigation/PUSH';
export const push = (routeName, params) => {
 return NavigationActions.navigate({ routeName, params });
};

const POP_ACTION = 'Navigation/POP';
export const pop = (numberOfScreens = 1) => {
 return {
   type: POP_ACTION,
   numberOfScreens,
 };
};

const POP_TO_TOP_ACTION = 'Navigation/POP_TO_TOP';
export const popToTop = () => {
 return {
   type: POP_TO_TOP_ACTION,
 };
};

const REPLACE_ACTION = 'Navigation/REPLACE';
export const replace = (routeName, params) => {
 return {
   type: REPLACE_ACTION,
   routeName,
   params,
 };
};

export const enhanceStackNavigator = (StackNav) => {
  const defaultGetStateForActon = StackNav.router.getStateForAction;

  StackNav.router.getStateForAction = (action, state) => {
    if (state && action.type === REPLACE_ACTION) {
      const routes = state.routes.slice(0, state.routes.length - 1);
      routes.push({
        ...action,
        type: undefined,
        key: state.routes[state.routes.length - 1].key,
      });
      return {
        ...state,
        routes,
        index: routes.length - 1,
      };
    }

    if (state && action.type === POP_TO_TOP_ACTION) {
      const routes = [state.routes[0]];
      return {
        ...state,
        routes,
        index: 0,
      };
    }

    if (state && action.type === POP_ACTION) {
      const length = state.routes.length;
      const numberOfScreens = action.numberOfScreens > length  - 1 ? length - 1 : action.numberOfScreens;
      const routes = state.routes.slice(0, length - numberOfScreens);
      return {
        ...state,
        routes,
        index: routes.length - 1,
      };
    }

    return defaultGetStateForActon(action, state);
  }

  return StackNav;
};
