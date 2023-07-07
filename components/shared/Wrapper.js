import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import StatusBarComp from "./StatusBarComp";
import {useTheme} from "react-native-paper";

const Wrapper = ({children, paddingHorizontal = 20, paddingBottom = 95, backgroundColor = false, showStatusBar = true, statusBarColor = false}) => {

  const { colors } = useTheme();

  return (
        <View style={[styles.container, {backgroundColor: backgroundColor ? backgroundColor : colors.backgroundColor, paddingHorizontal, paddingBottom}]}>
          <StatusBar backgroundColor={colors.backgroundColor} translucent barStyle={colors.statusBar} />
          {
            showStatusBar ?
              <StatusBarComp backgroundColor={statusBarColor}/> : null
          }
          {children}
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
  }
});

export default Wrapper;
