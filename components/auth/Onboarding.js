import React from "react";
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import OnboardingListItem from "./OnboardingListItem";
import Icons from "../../constants/Icons";
import CustomText from "../shared/CustomText";

const list = [
  {
    id: 1,
    image: require('../../assets/onboardingImages/Photo1.png')
  },
  {
    id: 2,
    image: require('../../assets/onboardingImages/Photo2.png')
  },
  {
    id: 3,
    image: require('../../assets/onboardingImages/Photo3.png')
  }
]

const Onboarding = ({navigation}) => {
  return (
    <View style={styles.container}>
      <FlatList
      data={list}
      horizontal
      bounces={false}
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) => <OnboardingListItem item={item}/>}
      />
      <View style={styles.textWrapper}>
        {/*<Icons.Logo_W width={70} height={30} color={'white'}/>*/}
        <Icons.Logo_W color={'white'}/>
        <CustomText children={'Ultimate workouts with Katie and Josh'} style={{textAlign: 'center', marginTop: 20}} size={24} fontWeight={'700'} color={'white'}/>
        <TouchableOpacity
          onPress={() => navigation.navigate('PhoneNumberAuthScreen')}
          style={styles.button}>
          <CustomText children={'Get Started'} color={'black'} size={18} fontWeight={'700'}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWrapper: {
    width: '100%',
    position: 'absolute',
    zIndex: 2,
    bottom: 120,
    alignItems: 'center',
    paddingHorizontal: '10%'
  },
  button: {
    backgroundColor: 'white',
    marginTop: 40,
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 20
  }
})

export default Onboarding;
