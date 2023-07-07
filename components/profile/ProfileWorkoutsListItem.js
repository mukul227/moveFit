import React from 'react';
import {StyleSheet, View} from 'react-native';
import Picture from "../shared/Picture";
import CustomText from "../shared/CustomText";
import Icons from "../../constants/Icons";
import {useTheme} from "react-native-paper";

const ProfileWorkoutsListItem = ({item}) => {
    const {colors} = useTheme();

    const program = item?.program;

    const trainer = program?.trainer;

    const progressBar = () => {
        return (
            <View>
                <View style={styles.progressDetails}>
                    <CustomText children={item?.completed_percentage ? Math.ceil((item?.completed_percentage * 100)) + '%' : '0%'} color={colors.primaryColor} fontWeight={'500'}/>
                    <CustomText children={item?.programWeekName} color={colors.bottomTabLabel} fontWeight={'300'}/>
                </View>
                <View style={styles.progressBar}>
                    <View style={[styles.progressBar, {backgroundColor: colors.primaryColor, width: item?.completed_percentage ? ((item?.completed_percentage * 100).toString() + '%') : '0%'}]}></View>
                </View>
            </View>
        );
    }
    const completed = () => {
        return (
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <CustomText children={'Completed'} fontWeight={'600'} color={colors.fontColor}/>
                <Icons.FilledColor color={colors.primaryColor}/>
            </View>
        );
    }

    return (
        <View style={[styles.card, {backgroundColor: colors.profileWorkoutItemBackgroundColor }]}>
            <Picture source={program?.thumbnail} style={[styles.workoutImage, {aspectRatio: item?.progress === 100 ? 1/1.1 : 1/1.5}]}/>
            <View style={styles.workoutItemInfo}>
                <View>
                    <CustomText children={program?.name} size={17} color={colors.primaryColor}/>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      {
                        program.trainers.map((trainer) => {
                          return(
                            <View key={trainer.id.toString()} style={{marginTop: 10}}>
                              <Picture source={trainer?.photo} style={styles.coachPhoto}/>
                              <CustomText children={trainer?.first_name} size={16} fontWeight={'500'} color={colors.fontColor} style={{marginRight: 5}}/>
                            </View>
                          )
                        })
                      }
                        <CustomText children={'· '} size={24} color={colors.bottomTabLabel} />
                        <Icons.WakeUp color={colors.fontColor}/>
                        <CustomText children={' ' + program?.duration + ' Min'} size={16} color={colors.fontColor} fontWeight={'400'} style={{marginRight: 5}}/>
                    </View>
                </View>
                {
                    item?.completed_percentage === 100 ? completed() : progressBar()
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: '100%',
        borderRadius: 20,
        flexDirection: 'row',
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    progressBar: {
        width: '100%',
        height: 4,
        backgroundColor: 'lightgray',
        borderRadius: 20
    },
    workoutImage: {
        width: '30%',
        borderRadius: 20
    },
    workoutItemInfo: {
      width: '70%',
      padding: 15,
      justifyContent: 'space-between'
    },
    progressDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    coachPhoto: {
        width: 25,
        aspectRatio: 1,
        borderRadius: 20,
        marginRight: 5
    }
});


export default ProfileWorkoutsListItem;
