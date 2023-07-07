import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import CustomText from "../shared/CustomText";
import ProfileWorkoutsListItem from "./ProfileWorkoutsListItem";
import {useTheme} from "react-native-paper";
import SectionList from "react-native/Libraries/Lists/SectionList";
import FeedbackWorkoutModal from "../workouts/FeedbackWorkoutModal";

const ProfileWorkoutsComponent = ({data, navigation, isAuthUser}) => {

    const [programs, setPrograms] = useState(data);

    const {colors} = useTheme();

    {/*TODO - MOVE TO CORRECT SCREEN*/}
    // const [isFeedbackModalVisible, setIsFeedbackModalVisible] = useState(false);
    // const goToHome = () => {
    //     setIsFeedbackModalVisible(false);
    //     navigation.navigate('Workouts', {screen: 'HomeScreen'});
    // }

    const renderNoContent = ({ section }) => {
        if (section.data?.length === 0) {
            return (
              <View style={{marginBottom: 16}}>
                  <CustomText size={18} children={isAuthUser ? 'You have no workouts' : 'User has no workouts'} color={colors.fontColor}/>
              </View>
            );
        }
        return null;
    };

    return (
        <View style={styles.container}>
            <SectionList
                sections={programs}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <ProfileWorkoutsListItem item={item} navigation={navigation} />}
                showsVerticalScrollIndicator={false}
                stickySectionHeadersEnabled={false}
                renderSectionHeader={({ section: { title } }) => (
                    <CustomText style={{marginVertical: 5}} children={title} size={15} color={ title === 'Active' ? colors.primaryColor : colors.profileTabTitles}/>
                )}
                renderSectionFooter={renderNoContent}
            />
            {/*TODO - MOVE TO CORRECT SCREEN*/}
            {/*<FeedbackWorkoutModal navigation={navigation} onPressToHome={() => goToHome()} isVisible={isFeedbackModalVisible}/>*/}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        paddingHorizontal: 15
    }
});


export default ProfileWorkoutsComponent;
