import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Video from "react-native-video";
import RestModal from "../../components/workouts/exercises/RestModal";
import PlayWorkoutFooter from "../../components/workouts/PlayWorkoutFooter";
import Icons from "../../constants/Icons";
import CustomText from "../../components/shared/CustomText";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PlayVideoComponent = ({ data, navigation, paused, onRestTimeEnd, openPopUp, timerStopped }) => {

  const videoRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);
  const [showFinisher, setShowFinisher] = useState(false);
  const [videoPaused, setVideoPaused] = useState(true);

  useEffect(() => {
    if (data && !data.isActive) {
      if (data?.item?.exercise) {
        videoRef.current.seek(0);
      }
    }
    if (data && data.item) {
      if (data?.item?.finisher) {
        setShowFinisher(true);
        if (data.isActive) {
          setVideoPaused(true);
        }
      }
    }
  },[data]);

  useEffect(() => {
    if (showFinisher) {
      setTimeout(() => {
        setShowFinisher(false);
        setVideoPaused(false);
      },3000)
    }
  },[showFinisher]);

  useEffect(() => {
    if (timerStopped) {
      if (videoRef.current){
        setVideoPaused(true);
      }
    }
  },[timerStopped]);

  useEffect(() => {
    // console.log(paused, timerStopped);
    if (videoRef.current && paused && !showFinisher) {
      setVideoPaused(paused);
    }
    if (videoRef.current && !paused && !timerStopped) {
      setVideoPaused(paused);
    }
  },[paused]);

  return (
    <View style={{flex: 1, width: '100%', zIndex: 100}}>
      {
        showFinisher &&
        <View style={{width: windowWidth, height: windowHeight, backgroundColor: 'rgba(0,0,0,0.6)', position: 'absolute', zIndex: 200, justifyContent: 'center', alignItems: 'center'}}>
          <Icons.Finisher width={200} height={60}/>
          <CustomText children={'Finisher!'} size={40} fontWeight={'600'} style={{marginTop: 30}} color={'white'}/>
        </View>
      }
      {
        data.item.type === 'break' &&  <RestModal timerStopped={timerStopped} onRestTimeEnd={onRestTimeEnd} openPopUp={openPopUp} quantity={data.item.quantity} isActive={data.isActive} paused={paused}/>
      }
      {
        data?.item?.exercise &&
        <Video
          repeat={true}
          allowsExternalPlayback={false}
          onReadyForDisplay={() => setVideoReady(true)}
          posterResizeMode={'center'}
          source={{uri: data?.item?.exercise?.video}}
          paused={videoPaused}
          resizeMode={'cover'}
          ignoreSilentSwitch={'obey'}
          style={StyleSheet.absoluteFillObject}
          ref={videoRef}/>
      }
      <PlayWorkoutFooter timerStopped={timerStopped} openPopUp={openPopUp} data={data} onRestTimeEnd={onRestTimeEnd}/>
    </View>
  );
};

export default PlayVideoComponent;
