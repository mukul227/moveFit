import React, {useState} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Image} from 'react-native';
import Button from "../shared/Button";
import {Formik, Field} from 'formik';
import {TextInputField} from "../formFields/TextInputField";
import CustomText from "../shared/CustomText";
import ProceedButtonWithText from "./ProceedButtonWithText";
import {launchImageLibrary} from "react-native-image-picker";
import {useSelector} from "react-redux";
import {SelectField} from "../formFields/SelectField";
import DatePicker from 'react-native-date-picker'
import moment from "moment";
import {activeUserSelector} from "../../store/auth";
import {useTheme} from "react-native-paper";
import {completeProfileValidationRules} from "../../validation/auth";
import Icons from "../../constants/Icons";

export const UserDetailsForm = ({onSubmit, isEditProfile}) => {

  const user = useSelector(activeUserSelector());
  const [image, setImage] = useState(isEditProfile ? user.photo : null);
  const [selectedGenderId, setSelectedGenderId] = useState(isEditProfile ? user.gender : null);
  const genderArr = [{value: 'male', label: 'Male'}, {value: 'female', label: 'Female'}, {value: 'other', label: 'Other'}];
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(isEditProfile ? moment(user.date_of_birth).format('YYYY-MM-DD') : null);
  const [open, setOpen] = useState(false);
  const [isPublicSelected, setIsPublicSelected] = useState(user?.public);
  const {colors} = useTheme();
  const [touchedDob, setTouchedDob] = useState(false)

  const openGallery = (setFieldValue) => {
    launchImageLibrary({
      includeBase64: true,
      maxWidth: 400,
      maxHeight: 400
    }, response => {
      if (!response.didCancel) {
        setImage(response.assets[0].uri);
        setFieldValue('photo', 'data:image/jpeg;base64,' + response.assets[0].base64);
      }
    }).catch((e) => {
      console.log(e);
    });
  }

  const getImage = () => {
    if (!image) {
      return (
        <Icons.ProfileIcon width={125} height={125} color={colors.primaryColor} style={{marginBottom: 10}}/>
      )
    } else {
      return (
        <Image source={{uri: image}} style={{width: 125, height: 125, borderRadius: 99, marginBottom: 10}}/>
      )
    }
  };

  const setProfileStatus = (status, setFieldValue) => {

    setFieldValue('public', status);
    setIsPublicSelected(status);

  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.wrapper}>
          {getImage()}
        <Formik
          initialValues={{public: user?.public, first_name: isEditProfile ? user.first_name : '', last_name: isEditProfile ? user.last_name :  '', date_of_birth: isEditProfile ? user.date_of_birth : '', gender: isEditProfile ? user.gender : '', photo: isEditProfile ? user.photo : null, username: user.username, isEdit: isEditProfile}}
          onSubmit={onSubmit}
          validateOnMount={true}
          validationSchema={completeProfileValidationRules}
        >
          {({handleSubmit, isValid, dirty, setFieldValue, errors, touched}) => (
            <View style={styles.formikWrapper}>
              <TouchableOpacity onPress={() => openGallery(setFieldValue)} style={{marginBottom: 35}}>
                <CustomText children={'Upload Photo'} size={16} textDecorationLine={'underline'} color={colors.primaryColor}/>
              </TouchableOpacity>
              <DatePicker
                modal
                open={open}
                date={date}
                mode={'date'}

                onConfirm={(date) => {
                  setOpen(false)
                  setDate(date)
                  setSelectedDate(moment(date).format('YYYY-MM-DD'));
                  setFieldValue('date_of_birth', date);
                }}
                onCancel={() => {
                  setOpen(false)
                  setTouchedDob(true)
                }}
              />
              {
                isEditProfile ?
                  <Field
                    style={[styles.fields, {color: colors.fontColor}]}
                    name="username"
                    autoCapitalize="none"
                    placeholder={'Username'}
                    component={TextInputField}
                    backgroundColor={colors.statsBoxColor}
                    // borderColor={colors.inputCalendarBorderColor}
                    error={errors.username ? errors.username : null}
                    onChangeText={value => {
                      setFieldValue('username', value);
                    }}
                  /> : null
              }
              <Field
                style={[styles.fields, {color: colors.fontColor}]}
                name="first_name"
                autoCapitalize="words"
                placeholder={'First Name'}
                component={TextInputField}
                backgroundColor={colors.statsBoxColor}
                // borderColor={colors.inputCalendarBorderColor}
                error={errors.first_name ? errors.first_name : null}
                onChangeText={value => {
                  setFieldValue('first_name', value);
                }}
              />
              <Field
                style={[styles.fields, {color: colors.fontColor}]}
                name="last_name"
                autoCapitalize="words"
                placeholder={'Last Name'}
                component={TextInputField}
                backgroundColor={colors.statsBoxColor}
                // borderColor={colors.inputCalendarBorderColor}
                error={errors.last_name ? errors.last_name : null}
                onChangeText={value => {
                  setFieldValue('last_name', value);
                }}
              />
              <View style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <View style={{width: '48%'}}>
                  <TouchableOpacity
                    onPress={() => setOpen(true)}
                    style={{
                    borderWidth: 1,
                    height: 55,
                    paddingLeft: 15,
                    borderRadius: 20,
                    justifyContent: 'center',
                    backgroundColor: colors.statsBoxColor,
                    borderColor: touchedDob && errors.date_of_birth ? 'red' : colors.inputCalendarBorderColor
                  }}>
                    <CustomText
                      color={selectedDate ? colors.fontColor : 'gray'}
                      children={selectedDate ? selectedDate : 'Select DOB'}/>
                  </TouchableOpacity>
                    <CustomText children={(touchedDob && errors.date_of_birth) ? errors.date_of_birth : null} color={'red'} size={10}/>
                </View>
                <View style={{width: '48%'}}>
                  <SelectField selectedValue={selectedGenderId} items={genderArr} field={'gender'}
                               placeholder={'Gender'}
                               errors={errors}
                               setFieldValue={(field, value) => {
                                 setFieldValue('gender', value);
                                 setSelectedGenderId(value)
                               }}
                  />
                </View>
              </View>
              {
                isEditProfile ? null :
                  <View style={styles.profileTypeWrapper}>
                    <CustomText style={{marginBottom: 8}} size={16} color={colors.fontColor} children={'Profile Type'}/>
                    <View style={styles.profileTypeOptionsWrapper}>
                      <TouchableOpacity style={[styles.singleOption, {borderColor: isPublicSelected ? colors.primaryColor : colors.inputCalendarBorderColor}]} onPress={() => setProfileStatus(true, setFieldValue)}>
                        <Icons.Globe marginLeft={10} marginRight={10} width={24} height={24} color={colors.primaryColor}/>
                        <CustomText children={"Public"} size={16} color={colors.fontColor}/>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.singleOption, {borderColor: !isPublicSelected ? colors.primaryColor : colors.inputCalendarBorderColor}]} onPress={() => setProfileStatus(false, setFieldValue)}>
                        <Icons.Lock marginLeft={10} marginRight={10} width={24} height={24} color={colors.fontColor}/>
                        <CustomText children={"Private"} size={16} color={colors.fontColor}/>
                      </TouchableOpacity>
                    </View>
                  </View>
              }
              {
                isEditProfile ?
                  <Button setWidth={'100%'} isActive={isValid} onPress={()=> handleSubmit()} title={'Save'} gradientColors={ isValid ? colors.primaryColorGradient : colors.primaryColorGradientDisabled} borderColor={ colors.backgroundColor} />
                  :
                  <ProceedButtonWithText onHandlePress={handleSubmit} isFormValid={isValid}/>
              }
            </View>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  )
};

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    width: '100%',
    alignItems: 'center'
  },
  formikWrapper: {
    flexGrow: 1,
    width: '100%',
    alignItems: 'center',
  },
  fields: {
    width: '100%',
  },
  profileTypeWrapper: {
    width: '100%',
  },
  profileTypeOptionsWrapper: {
    flexDirection: 'row',
    width: "100%",
    justifyContent: 'space-between',
    marginBottom: 10
  },
  singleOption: {
    width: '48%',
    height: 55,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  }
});
