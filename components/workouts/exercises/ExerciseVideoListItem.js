import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Dimensions, StyleSheet, View} from "react-native";
import Video from 'react-native-video';
import RestModal from "./RestModal";

const ExerciseVideoListItem = ({ item, index, selectedIndex, indexFromModal, scrollToIndex }) => {
  const [isReady, setIsReady] = useState(false);
  const [pause, setPause] = useState(true);

  const videoRef = useRef(null);

  useEffect(() => {
    if (selectedIndex === index) {
      videoRef.current.seek(0);
      setPause(false);
    } else {
      setPause(true);
    }
  },[selectedIndex]);

  useEffect(() => {
    if (selectedIndex === indexFromModal) {
      setPause(false);
    } else {
      setPause(true);
    }
  },[indexFromModal]);

  const screenHeight = Dimensions.get('window').height;

  const playVideo = () => setIsReady(true);

  const  validateVideo = video => {
    if (video) {
      return {uri: video};
    } else {
      return undefined;
    }
  };

  const onVideoEnd = () => {
    setPause(true);
    scrollToIndex(index + 1);

  }

  return (
    <View style={{height: screenHeight}}>
      {/*<Video*/}
      {/*  ref={videoRef}*/}
      {/*  onReadyForDisplay={playVideo}*/}
      {/*  // source={validateVideo(item.exercise.video)}*/}
      {/*  source={require('../../../assets/videos/big_buck_bunny_720p_1mb.mp4')}*/}
      {/*  style={styles.video}*/}
      {/*  paused={pause}*/}
      {/*  resizeMode={'cover'}*/}
      {/*  onEnd={() => onVideoEnd()}*/}
      {/*/>*/}
      {
        !isReady && <ActivityIndicator style={styles.loader} size='large'/>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: '100%'
  },
  loader: {
    height: '100%',
    width: '100%',
    position: 'absolute'
  }
});

export default ExerciseVideoListItem;
