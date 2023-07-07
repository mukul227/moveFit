import React, {useEffect, useState, useRef, useMemo, useCallback} from 'react';
import Wrapper from "../../components/shared/Wrapper";
import ProfileHeaderComponent from "../../components/profile/ProfileHeaderComponent";
import {useDispatch, useSelector} from "react-redux";
import ProfilePostsComponent from "../../components/profile/ProfilePostsComponent";
import {Alert, BackHandler, FlatList, Linking, Platform, Dimensions, View} from "react-native";
import {userStats} from '../../dataForProfileStats/data';
import ProfileWorkoutsComponent from "../../components/profile/ProfileWorkoutsComponent";
import {useTheme} from "react-native-paper";
import {followUserSaga, userDataSelector} from "../../store/friends";
import PlusButton from "../../components/shared/PlusButton";
import {launchImageLibrary} from "react-native-image-picker";
import {
  getSettingsSaga,
  getUserPostsSaga,
  newPostSaga,
  postsSelector,
  userAchievementsSelector, userArrSelector
} from "../../store/profile";
import {setGlobalLoader, setIsBottomTabVisible} from "../../store/helpers/actions";
import {healthService} from "../../services/HealthService";
import {getUserAchievementsSaga} from "../../store/profile/actions";
import AchievementListComponent from "../../components/profile/AchievementListComponent";
import ImageUploadModal from "../../components/profile/ImageUploadModal";
import {Camera, useCameraDevices} from "react-native-vision-camera";
import CameraComponent from "../../components/profile/CameraComponent";
import RNFS from "react-native-fs";
import {useFocusEffect} from "@react-navigation/native";
import CustomText from "../../components/shared/CustomText";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

const windowWidth = Dimensions.get('window').width;

const HomeScreen = ({navigation}) => {

  const dispatch = useDispatch();
  const {colors} = useTheme();


  const camera = useRef(null);
  const flatListRef = useRef()

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
    return () => backHandler.remove()
  }, [])

  const [selectedTab, setSelectedTab] = useState(1);
  const [userData, setUserData] = useState(null);
  const [dataForWidget, setDataForWidget] = useState(userStats);
  const [openModal, setOpenModal] = useState(false);
  const [showScreen, setShowScreen] = useState(false);
  const [cameraPermissionStatus, setCameraPermissionStatus] = useState('not-determined');
  const [showCamera, setShowCamera] = useState(false);
  const [cameraPosition, setCameraPosition] = useState('back');

  const devices = useCameraDevices()
  const device = devices[cameraPosition];

  const supportsCameraFlipping = useMemo(() => devices.back != null && devices.front != null, [devices.back, devices.front]);

  const onFlipCameraPressed = useCallback(() => {
    setCameraPosition((p) => (p === 'back' ? 'front' : 'back'));
  }, []);

  const userSetData = useSelector(userDataSelector());
  const posts = useSelector(postsSelector());
  const userAchievementsData = useSelector(userAchievementsSelector());
  const {isLoading, data} = posts;

  const onRefresh = () => dispatch(getUserPostsSaga(1, 18, userSetData?.user?.id));

  const onLoadMore = () => {
    if (posts.total > posts.limit * posts.page) {
      dispatch(getUserPostsSaga(posts.page + 1, 18, userSetData?.user?.id));
    }
  };

  const captureImage = async () => {
    try {
      dispatch(setGlobalLoader(true));
      if (camera.current == null) throw new Error('Camera ref is null!');
      const photo = await camera.current.takePhoto({
        qualityPrioritization: 'speed',
        quality: 90,
        skipMetadata: true
      });
      let resBase64 = await RNFS.readFile(photo.path, 'base64');
      setShowCamera(false);
      dispatch(setIsBottomTabVisible(0));
      dispatch(newPostSaga('data:image/jpeg;base64,' + resBase64));
    } catch (error) {
      dispatch(setGlobalLoader(false));
      console.log({error});
    }
  };

  const activePrograms = {
    title: 'Active',
    data: userSetData?.user?.startedProgram ? [userSetData?.user?.startedProgram] : []
  };

  const pastPrograms = {
    title: 'Past',
    data: userSetData?.user?.enrolledPrograms
  };

  const sections = [activePrograms, pastPrograms];

  const getDataForWidget = async () => {
    const res = await healthService.appleHealthInit()
    if (res) {
      const steps = await healthService.getStepCounts();
      const heartRate = await healthService.getHeartRate();
      const sleep = await healthService.getSleep();
      const distance = await healthService.getDistance();
      setDataForWidget(userStats.map(stat => {

        if (stat.title === 'Walking') {
          stat.value = distance[0]?.quantity ? (distance[0]?.quantity / 1609.344).toFixed(2) : '-'
        } else if (stat.title === 'Heart') {
          stat.value = heartRate[0]?.quantity ? heartRate[0]?.quantity.toFixed() : '-'
        } else if (stat.title === 'Sleep') {
          stat.value = sleep[0]?.value ? sleep[0]?.value : '-'
        } else if (stat.title === 'Steps') {
          stat.value = steps[0]?.quantity ? steps[0]?.quantity : '-'
        }
        return stat
      }))
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getDataForWidget();
    }, [])
  );

  useEffect(() => {
    {
      !userData?.isAuthUser ?
        setSelectedTab(1) : setSelectedTab(1)
    }
  }, [userData]);

  const openGallery = () => {
    dispatch(setGlobalLoader(true));
    launchImageLibrary({
      includeBase64: true,
      maxHeight: 1024,
      maxWidth: 1024
    }, response => {
      if (!response.didCancel) {
        dispatch(newPostSaga('data:image/jpeg;base64,' + response.assets[0].base64));
      } else {
        dispatch(setGlobalLoader(false));
      }
    }).catch((e) => {
      dispatch(setGlobalLoader(false));
      console.log(e);
    });
  };

  const onGalleryOpenFn = () => {
    setOpenModal(false);
    openGallery();
  }

  const onCameraOpenFn = async () => {
    const res = await Camera.getCameraPermissionStatus();
    setCameraPermissionStatus(res);

    if (res === 'not-determined') {
      const permission = await Camera.requestCameraPermission();
      setCameraPermissionStatus(permission);
      if (permission === 'authorized') {
        setOpenModal(false);
        setShowCamera(true);
        dispatch(setIsBottomTabVisible(-150));
      }
    }
    if (res === 'denied') {
      Alert.alert(
        "Camera permission required",
        "You need to enable camera, go to settings",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "OK",
            onPress: () => {
              if (Platform.OS === 'ios') {
                Linking.openURL('app-settings:');
              } else {
                Linking.openSettings();
              }
            }
          }
        ]
      );
    }
    if (res === 'authorized') {
      setOpenModal(false);
      setShowCamera(true);
      dispatch(setIsBottomTabVisible(-150));
    }
  };

  const DATA = [
    {
      data: <AchievementListComponent user={userSetData?.user} isAuthUser={userSetData?.isAuthUser}
                                      dataForWidget={dataForWidget} achievements={userAchievementsData}
                                      colors={colors}/>
    },
    {
      data: <ProfileWorkoutsComponent navigation={navigation} data={sections} isAuthUser={userSetData?.isAuthUser}/>
    },
    {
      data: <ProfilePostsComponent navigation={navigation} data={data} onLoadMore={onLoadMore} onRefresh={onRefresh}
                                   refreshing={isLoading} colors={colors}/>
    }
  ];

  const renderItem = ({ item }) => {
    return(
      <View style={{width: windowWidth, flexGrow: 1, backgroundColor: item.color}}>
        {item.data}
      </View>
    )
  }

  const _onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
    setSelectedTab(viewableItems[0].index + 1);
  }, []);

  const getTabContent = () => {
    return(
      <View style={{width: '100%', flexGrow: 1}}>
        <FlatList
          ref={flatListRef}
          horizontal={true}
          pagingEnabled={true}
          onViewableItemsChanged={_onViewableItemsChanged}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50
          }}
          showsHorizontalScrollIndicator={false}
          data={DATA}
          renderItem={(item, index) => renderItem(item, index)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    )
  }

  const getPosts = (page, limit, userId) => dispatch(getUserPostsSaga(page, limit, userId));
  const getAchievements = (id) => dispatch(getUserAchievementsSaga(id));
  const onFollowPress = user => dispatch(followUserSaga(user.id));
  const onSettingsPress = () => dispatch(getSettingsSaga());
  const showUserContent = () => userSetData?.user?.public || userSetData?.isAuthUser || (userSetData?.user?.isFriend && userSetData?.user?.friendStatus);

  useEffect(() => {
    setUserData(userSetData);
    setShowScreen(true);
  }, [userSetData])

  useEffect(() => {
    if (userSetData && userSetData?.user && userSetData?.user?.id) {
      getAchievements(userSetData?.user?.id)
    }
  }, [selectedTab === 1, userSetData?.user])

  useEffect(() => {
    getPosts(1, 18, userSetData?.user?.id);
  }, [userSetData?.isAuthUser]);

  const onTabPress = (selectedTab) => {
    setSelectedTab(selectedTab);
    if (showUserContent()) {
      flatListRef.current.scrollToIndex({animated: true, index: selectedTab - 1});
    }
  }

  if (userData !== null) {
    return (
      <Wrapper paddingBottom={Platform.OS === 'ios' ? 95 : 52} paddingHorizontal={0} showStatusBar={false}
               backgroundColor={colors.profileHomeBackgroundColor}>
        <ProfileHeaderComponent onItemPress={(selectedItem) => onTabPress(selectedItem)} navigation={navigation}
                                selectedTab={selectedTab - 1}
                                userData={userData} colors={colors} onFollowPress={onFollowPress}
                                onSettingsPress={onSettingsPress} showUserContent={showUserContent}/>
        <View style={{backgroundColor: colors.profileHomeBackgroundColor, flex: 1, width: '100%'}}>
          {
            showUserContent() ?
              getTabContent() :
              <View style={{width: '100%', flexGrow: 1, alignItems: 'center', justifyContent: 'center'}}>
                {
                  userData && userData?.isAuthUser !== true ?
                    <View style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                      <SimpleLineIcons color={colors.primaryColor} name={'lock'} size={40} style={{marginBottom: 15}}/>
                      <CustomText color={colors.primaryColor} size={18} children={'This account is private.'}
                                  style={{textAlign: 'center'}}/>
                      <CustomText color={colors.primaryColor} size={14}
                                  children={'Follow this account to see their Progress, Workouts and Posts.'}
                                  style={{textAlign: 'center', marginTop: 10, paddingHorizontal: '10%'}}/>
                    </View> : null
                }
              </View>
          }
        </View>
        {selectedTab === 3 && userSetData?.isAuthUser && userSetData?.user?.subscribed ?
          // <PlusButton  onPress={() => openGallery()}/> : null
          <PlusButton onPress={() => setOpenModal(true)}/> : null
        }

        <ImageUploadModal onCameraOpen={() => onCameraOpenFn()} onGalleryOpen={() => onGalleryOpenFn()}
                          onClose={() => setOpenModal(false)} isModalVisible={openModal}/>
        {
          selectedTab === 3 && showCamera ?
            <CameraComponent
              onClosePress={() => {
                setShowCamera(false);
                dispatch(setIsBottomTabVisible(0));
              }}
              captureImage={captureImage}
              onFlipCameraPressed={() => onFlipCameraPressed()}
              supportsCameraFlipping={supportsCameraFlipping}
              camera={camera}
              device={device}/> : null
        }
      </Wrapper>

    );
  } else {
    return <View></View>
  }
};

export default HomeScreen;
