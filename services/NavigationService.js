import {CommonActions, DarkTheme, DefaultTheme, DrawerActions, ThemeProvider,StackActions} from '@react-navigation/native';

let _navigator;

export const setTopLevelNavigator = (navigatorRef) => {
  _navigator = navigatorRef;
};

export const navigate = (routeName, params) => {
  if (_navigator && routeName) {
    _navigator.navigate(routeName, params);
  }
};

export const push = (routeName,params) => {
  if (_navigator && routeName) {
    _navigator.dispatch(StackActions.push(routeName, params));
  }
};

export const changeTheme = (theme) => {
  if (_navigator) {
    if (theme === 'light') {
      ThemeProvider('default')
    } else {
      ThemeProvider('dark')
    }

  }
};

export const openDrawerFn = () => {
  if (_navigator) {
    _navigator.dispatch(DrawerActions.openDrawer());
  }
};

export const goBack = () => {
  if (_navigator) {
    _navigator.goBack();
  }
};

export const resetNavigationState = (screen = 'AuthLoadingScreen') => {
  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{ name: screen }],
  });
  if (_navigator) {
    _navigator.dispatch(resetAction);
  }
};

export const dispatchNavigationState = (
  routes = [{ name: 'AuthLoadingScreen' }],
  index = 0
) => {
  const dispatchAction = CommonActions.reset({
    index,
    routes,
  });
  if (_navigator) {
    _navigator.dispatch(dispatchAction);
  }
};

// add other navigation functions that you need and export them

export default {
  navigate,
  goBack,
  openDrawerFn,
  setTopLevelNavigator,
  resetNavigationState,
  dispatchNavigationState,
  changeTheme,
  push
};
