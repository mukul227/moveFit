import React, {useEffect, useState} from 'react';
import Wrapper from "../../components/shared/Wrapper";
import CustomHeader from "../../components/shared/CustomHeader";
import ProfileNewPostComponent from "../../components/profile/ProfileNewPostComponent";
import {Platform} from "react-native";

const NewPostScreen = ({ navigation }) => {

    return (
        <Wrapper paddingBottom={Platform.OS === 'ios' ? 95 : 0}>
            <CustomHeader isNewPost={true} title={'New Post'} navigation={navigation}/>
            <ProfileNewPostComponent/>
        </Wrapper>
    );
};

export default NewPostScreen;
