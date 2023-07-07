import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import { WebView } from 'react-native-webview';

export default function WebViewComponent({link, redirectToHome}) {

  const handleResponse = data => {

    if(data.url.includes("/api/stripe/subscription/success?session_id=")){
      redirectToHome(true);
    } else {
      return;
    }
  };

    return (
        <View style={styles.container}>
            <WebView
                source={{uri: link}}
                style={styles.video}
                onNavigationStateChange={data =>
                  handleResponse(data)
                }
            />
        </View>
    );
}
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    video: {
        marginTop: 20,
        maxHeight: '100%',
        width: width*1,
        flex: 1
    }
});
