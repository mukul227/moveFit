import React, {useRef, useState, useEffect} from 'react';
import {View, StyleSheet, StatusBar, TouchableOpacity, AppState} from 'react-native';
import Video from "react-native-video";
import CustomText from "../../components/shared/CustomText";
import {useDispatch, useSelector} from "react-redux";
import {setOnVideoScreen} from "../../store/helpers/actions";
import {onVideoScreenSelector} from "../../store/helpers";
import {useFocusEffect} from "@react-navigation/native";

export default function WelcomeAuthScreen({navigation}) {

  const dispatch = useDispatch();

  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef(null);
  const [pause, setPause] = useState(false);
  const test = useSelector(onVideoScreenSelector());

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const blur = navigation.addListener('blur', () => {
      setPause(true)
    });

    const focus = navigation.addListener('focus', () => {
      setPause(false)
    });
  },[]);

  let subs;

  useFocusEffect(
    React.useCallback(() => {
      videoRef.current.seek(0);
      dispatch(setOnVideoScreen(true));
      // subs = AppState.addEventListener("change", async nextAppState => {
      //   appState.current = nextAppState;
      //   setAppStateVisible(appState.current);
      //   if (appState.current === 'inactive' || appState.current === 'background') {
      //     setPause(true)
      //   }
      //   if (appState.current === 'active') {
      //     console.log(test);
      //     if (test) {
      //       setPause(false)
      //     }
      //   }
      // });
      //
      // return () => {
      //   subs.remove();
      // };
    }, [])
  );

  useEffect(() => {
    subs = AppState.addEventListener("change", async nextAppState => {
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      if (appState.current === 'inactive' || appState.current === 'background') {
        setPause(true)
      }
      if (appState.current === 'active') {
        console.log(test);
        if (test) {
          setPause(false)
        }
      }
    });

    return () => {
      subs.remove();
    };
  },[test])

  const onGetStartedPress = () => {
    dispatch(setOnVideoScreen(false));
    navigation.navigate('PhoneNumberAuthScreen');
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent barStyle="light-content" backgroundColor={'transparent'}/>
      <Video
        paused={pause}
        repeat={true}
        onReadyForDisplay={() => setVideoReady(true)}
        source={require('../../assets/videos/LongVerticalTall.mp4')}
        resizeMode={'cover'}
        style={StyleSheet.absoluteFillObject}
        ref={videoRef}/>
      <TouchableOpacity
        onPress={() => onGetStartedPress()}
        style={styles.button}>
        <CustomText children={'Get Started'} color={'black'} size={18} fontWeight={'700'}/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    position: 'absolute',
    bottom: 50,
    zIndex: 999,
    backgroundColor: 'white',
    marginTop: 40,
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 20
  }
});
