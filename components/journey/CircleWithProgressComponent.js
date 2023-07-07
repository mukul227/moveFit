import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import CustomText from "../shared/CustomText";
import ProgressCircle from "rn-animated-progress-circle";
import Dot from "../shared/Dot";
import {useTheme} from "react-native-paper";

const CircleWithProgressComponent = ({ inCircleText,  ifToday = false, onPress, progress, size, isSelected}) => {
    const { colors } = useTheme();
    return (
        <TouchableOpacity activeOpacity={1} onPress={onPress}>
            {
                ifToday ?
                    <View style={styles.dotView}>
                        <Dot size={7}/>
                    </View>
                : null
            }
            <ProgressCircle
                value={progress}
                size={size}
                thickness={2}
                color={colors.primaryColor}
                unfilledColor={colors.unfilledProgress}
                animationMethod="timing"
                shouldAnimateFirstValue={true}
                animationConfig={{ speed: 1000 }}
            >
                <CustomText children={inCircleText ? inCircleText : ''} color={isSelected ? colors.primaryColor : progress === 1 ? colors.fontColor : colors.titleInProgress} />
            </ProgressCircle>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    dotView: {
        position:'absolute',
        right: -7,
        top: -1
    }
});

export default CircleWithProgressComponent;
