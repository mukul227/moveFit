import React, {useState} from 'react';
import {Image, StyleSheet, View, Share, TouchableOpacity, Platform} from 'react-native';
import Wrapper from "../../components/shared/Wrapper";
import CustomText from "../../components/shared/CustomText";
import {useTheme} from "react-native-paper";
import Picture from "../../components/shared/Picture";
import LinearGradient from "react-native-linear-gradient";
import CustomButton from "../../components/shared/Button";
import {useDispatch, useSelector} from "react-redux";
import {setAchievement} from "../../store/profile/actions";
import {achievementSelector} from "../../store/profile";
import {shareProgramWorkoutSelector} from "../../store/workouts";
import {workoutService} from "../../services/WorkoutService";
import Icons from "../../constants/Icons";

const ShareProgressScreen = ({navigation}) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const achievement = useSelector(achievementSelector());
  const shareData = useSelector(shareProgramWorkoutSelector());
  const [isContinue, setIsContinue] = useState(false);

  const workoutImage = () => {
    return (
      <View style={styles.workoutImageWrapper}>
        <Picture
          style={[styles.workoutImage, {resizeMode: 'cover'}]}
          source={shareData.workout.thumbnail}
        />
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)']}
          style={styles.imageOverlay}
        />
      </View>
    );
  };

  const trainerWrapper = () => {
    return (
      <View style={{flexDirection: 'row', marginTop: 16}}>
        {
          shareData?.program?.trainers?.map((item, index) => {
            return(
              <View key={index} style={{flexDirection: 'row', marginRight: 8}}>
                {
                  item.photo ?
                    <Picture source={item.photo} style={styles.trainerImage}/> :
                    <Image source={require('../../assets/Profile.png')} style={styles.trainerImage}/>
                }
                <CustomText children={item.first_name} size={16} color={colors.fontColor} fontWeight={'500'}
                            style={{marginLeft: 6}}/>
              </View>
            )
          })
        }
      </View>
    );
  };

  const shareButton = () => {
    return (
      <View style={styles.buttonWrapper}>
        <CustomButton borderColor={colors.primaryColor} title={isContinue ? 'Continue' : 'Share'} onPress={onSharePress} backgroundColor={colors.primaryColor}/>
      </View>
    );
  };

  const onSharePress = async () => {
    if(isContinue){
      navigation.navigate('HomeScreen');
    } else {
      try {
        const result = await Share.share({
          message:
              "I've just completed " + shareData.workout.name +  " on the  MOVE App. Try a 7 day free trial! \n l31l0.app.link",
        });

        if (result.action === Share.sharedAction) {
          // shared
          try {
            setIsContinue(true);
            const res = await workoutService.shareWorkout();
            if(!achievement && res.id){
              dispatch(setAchievement(res))
            }
          } catch (e) {
            console.log({e});
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        alert(error.message);
      }
    }

  };


  return (
    <Wrapper paddingHorizontal={0} backgroundColor={colors.shareProgressBackground} showStatusBar={false}>
      <View style={styles.container}>
        <View style={{alignItems:'flex-end', width:'100%'}}>
          <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.closeBtn}>
            <Icons.Close width={40} color={colors.fontColor}/>
          </TouchableOpacity>
        </View>

        <CustomText children={'Share your progress!'} size={18} color={colors.fontColor} fontWeight={'600'}/>
        {workoutImage()}
        <CustomText children={shareData.workout.name} size={22} color={colors.fontColor} fontWeight={'600'}/>
        <CustomText children={"I've just completed " + shareData.workout.name +  " from " + shareData.program.name} size={16} color={colors.primaryColor} fontWeight={'600'}
                    style={styles.descText}/>
        {trainerWrapper()}
        {shareButton()}
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '12%',
    alignItems: 'center',
  },
  workoutImageWrapper: {
    width: '75%',
    aspectRatio: 0.95,
    marginTop: '10%',
    marginBottom: 30,
    borderRadius: 20
  },
  workoutImage: {
    flex: 1,
    borderRadius: 20,
  },
  imageOverlay: {
    width: '100%',
    position: 'absolute',
    left: 0,
    bottom: 0,
    height: '50%',
    borderRadius: 20
  },
  trainerImage: {
    width: 24,
    height: 24,
    borderRadius: 12
  },
  buttonWrapper: {
    flex: 1,
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  descText: {
    marginTop: 12,
    textAlign: 'center',
    paddingHorizontal: 20
  },
  closeBtn: {
    alignItems:'flex-end',
    padding:10,
  }
});

export default ShareProgressScreen;
