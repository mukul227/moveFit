import 'react-native-gesture-handler';
import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {AppNavigator} from './navigation/AppNavigator';
import NavigationService from './services/NavigationService';
import store from './store';
import { Provider, useSelector} from 'react-redux';
import NetworkInterceptor from './screens/NetworkInterceptor';
import {themeSelector} from "./store/helpers";
import Toast, {BaseToast} from "react-native-toast-message";


export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    theme: 'dark'
  };


  constructor(props) {
    super(props);
    this.routeNameRef = React.createRef();
    this.navigationRef = React.createRef();
  }

  componentDidMount() {
    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.allowFontScaling = false;
    TextInput.defaultProps = TextInput.defaultProps || {};
    TextInput.defaultProps.allowFontScaling = false;
  }

  ThemeView = () => {
    const theme = useSelector(themeSelector())
    useEffect(() => {
      this.setState({
        theme : theme
      })
    }, [theme])
    return null
  }

  toastConfig = {
    messageSent: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: this.state.theme === 'dark' ? '#CC48C8' : '#32A1C7', backgroundColor: this.state.theme === 'dark' ? '#0e0f0f' : 'white'}}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: '400',
          color: this.state.theme === 'dark' ? 'white' : 'black'
        }}
      />
    ),
  };

  render() {
    return (
      <Provider store={store}>
        <NetworkInterceptor>
          <View style={styles.container}>
            <this.ThemeView/>
            <NavigationContainer
              theme={this.state.theme === 'dark' ? DarkTheme : DefaultTheme}
              ref={(navigatorRef) => {
                NavigationService.setTopLevelNavigator(navigatorRef);
                this.navigationRef = navigatorRef;
              }}
              onReady={() => {
                this.routeNameRef.current =
                  this.navigationRef.getCurrentRoute().name;
              }}
              onStateChange={async () => {
                const previousRouteName = this.routeNameRef.current;
                const currentRouteName =
                  this.navigationRef.getCurrentRoute().name;

                this.routeNameRef.current = currentRouteName;
              }}
            >
              <AppNavigator/>
              <Toast config={this.toastConfig}/>
            </NavigationContainer>
          </View>
        </NetworkInterceptor>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
