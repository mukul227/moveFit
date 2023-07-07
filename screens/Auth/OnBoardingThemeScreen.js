import React from 'react';
import {View, StyleSheet, TouchableOpacity, StatusBar} from 'react-native';
import AuthHeader from "../../components/auth/AuthHeader";
import StatusBarComp from "../../components/shared/StatusBarComp";
import CheckboxTitle from "../../components/auth/CheckboxTitle";
import CustomText from "../../components/shared/CustomText";
import Icons from "../../constants/Icons";
import {useDispatch} from "react-redux";
import {setTheme, setThemeSaga} from "../../store/helpers/actions";

export default function OnBoardingThemeScreen({ navigation }) {

  const dispatch = useDispatch();

  const handleChangeTheme = (data) => dispatch(setThemeSaga(data));

  return (
    <View style={styles.container}>
      <StatusBar translucent barStyle="dark-content" />
      <StatusBarComp/>
      <AuthHeader navigation={navigation}/>
      <CheckboxTitle
        fontWeight={'600'}
        marginTop={40}
        title={"Choose your theme"}
        subtitle={'You can always change this later \n in the settings'}
      />
      <View style={{width: '100%', marginTop: 50}}>
        <TouchableOpacity
          onPress={() => handleChangeTheme('light')}
          style={[styles.button, styles.lightButton]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icons.LIght />
            <CustomText size={18} children={'Light'} style={{marginLeft: 15}} fontWeight={'600'}/>
          </View>
          <Icons.NextBlack  />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleChangeTheme('dark')}
          style={[styles.button, styles.darkButton]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icons.Dark />
            <CustomText size={18} color={'white'} style={{marginLeft: 15}} children={'Dark'} fontWeight={'600'}/>
          </View>
          <Icons.ArrowWhite width={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 15
  },
  button: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 60,
    borderRadius: 20,
    paddingHorizontal: 25
  },
  lightButton: {
    borderWidth: 1,
    borderColor: '#EAEAEA'
  },
  darkButton: {
    marginTop: 15,
    backgroundColor: 'black'
  }
});
