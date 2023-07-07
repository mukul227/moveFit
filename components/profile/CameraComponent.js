import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import {Camera} from "react-native-vision-camera";
import Icon from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const CameraComponent = ({camera, device, captureImage,onClosePress, supportsCameraFlipping, onFlipCameraPressed}) => {

  return (
      <View style={[styles.container, StyleSheet.absoluteFill]}>
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          enableZoomGesture={false}
          photo={true}
          video={false}
          audio={false}
          orientation='portrait'
        />
        <View style={[styles.container2, {height: 120, bottom: 0}]}>
              <TouchableOpacity
                onPress={captureImage}
              >
                <Icon
                  name="camera"
                  size={40}
                  color={'white'}
                />
              </TouchableOpacity>
          {supportsCameraFlipping && (
            <TouchableOpacity
              onPress={() => onFlipCameraPressed()}
              style={{position: 'absolute', right: 15, padding: 15}} disabledOpacity={0.4}>
              <MaterialCommunityIcons
                name="camera-flip"
                size={30}
                color={'white'}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={[styles.container2, {top: 0, paddingTop: 40, alignItems: 'flex-end'}]}>

          <TouchableOpacity
            style={{padding: 25}}
            onPress={() => onClosePress()}
          >
            <AntDesign
              name="close"
              size={30}
              color={'white'}
            />
          </TouchableOpacity>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white'
  },
  container2: {
    position: 'absolute',
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
});

export default CameraComponent;
