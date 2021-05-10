import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../constants';

export default TextButton = ({ label, customContainerStyle, customLabelStyle, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                height: 45,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.green,
                ...customContainerStyle
            }}
            onPress={onPress}
        >
            <Text style={{
                color: COLORS.white,
                fontSize: 14,
                ...customLabelStyle
            }}>{label}</Text>
        </TouchableOpacity>
    );  
};