import React, {useRef, useState} from 'react';
import {View, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import Video from "react-native-video";
import Icons from "../../constants/Icons";
import asyncStorageService from "../../services/AsyncStorageService";

export default function WelcomeAuthVideoScreen({navigation}) {

  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef(null);

  const onVideoEnd = async () => {
    await asyncStorageService.setItem('introShown', true);
    navigation.navigate('WelcomeAuthScreen')
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={'white'}
        translucent
      />
      <TouchableOpacity onPress={() => onVideoEnd()} style={styles.button}>
        <Icons.Close color={'white'}/>
      </TouchableOpacity>
      <Video
        repeat={false}
        onReadyForDisplay={() => setVideoReady(true)}
        source={require('../../assets/videos/LongVerticalTall.mp4')}
        onEnd={() => onVideoEnd()}
        resizeMode={'cover'}
        style={StyleSheet.absoluteFillObject}
        ref={videoRef}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
  },

  loading: {
    marginTop: 30,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'absolute',
    right: 20,
    top: 60,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999
  }
});
