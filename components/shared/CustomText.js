import React from 'react';
import { Text } from 'react-native';

const CustomText = ({
                      children,
                      style,
                      color = 'black',
                      size = 14,
                      fontFamily = 'Avenir Next Regular',
                      textDecorationLine = 'none',
                      fontWeight = 'normal',
                      ...props
                    }) => {
  return (
    <Text
      style={[
        style,
        { flexShrink: 1, color, fontSize: size, textDecorationLine, fontWeight, fontFamily } // preventing text to go outside of the parent component
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};


export default CustomText;
