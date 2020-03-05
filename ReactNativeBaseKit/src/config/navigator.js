// import {createStackNavigator} from 'react-navigation';
// import {
//   createReduxContainer,
//   createReactNavigationReduxMiddleware,
// } from 'react-navigation-redux-helpers';
// import {connect} from 'react-redux';
// import routes from './routes';

// const stackNavigatorConfiguration = {
//   headerMode: 'none',
//   mode: 'card',
//   navigationOptions: {gesturesEnabled: false},
// };

// export const AppNavigator = createStackNavigator(
//   routes,
//   stackNavigatorConfiguration,
// );

// // Note: createReactNavigationReduxMiddleware must be run before reduxifyNavigatorexport
// export const routerMiddleware = createReactNavigationReduxMiddleware(
//   // 'root',
//   state => state.nav,
// );

// const App = createReduxContainer(AppNavigator, 'root');
// const mapStateToProps = state => ({state: state.nav});
// const navigator = connect(mapStateToProps)(App);

// export default navigator;

import { NavigationActions, createStackNavigator } from 'react-navigation';
import { createReduxContainer, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';
import React from 'react';
import { BackHandler } from 'react-native';
import { shape, string, number, func } from 'prop-types';
import routes from './routes';

const stackNavigatorConfiguration = {
  headerMode: 'none',
  mode: 'card',
  navigationOptions: { gesturesEnabled: false },
};

// Note: createReactNavigationReduxMiddleware must be run before createReduxContainer

export const routerMiddleware = createReactNavigationReduxMiddleware((state) => state.nav);

export const AppNavigator = createStackNavigator(routes, stackNavigatorConfiguration);

const App = createReduxContainer(AppNavigator, 'root');

class navigator extends React.Component {
  static propTypes = {
    dispatch: func.isRequired,
    nav: shape({
      index: number,
      key: string.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    const {
      nav, dispatch,
    } = this.props;

    if (nav.index === 0) {
      BackHandler.exitApp();

      return true;
    }
    dispatch(NavigationActions.back());

    return true;
  };

  render() {
    const {
      nav, dispatch,
    } = this.props;

    return <App state={nav} dispatch={dispatch} />;
  }
}

const mapStateToProps = ({ nav }) => ({ nav });

export default connect(mapStateToProps)(navigator);
