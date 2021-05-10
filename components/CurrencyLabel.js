import React from 'react';
import { Image, Text, View } from 'react-native';
import { COLORS, SIZES } from '../constants';

export default CurrencyLabel = ({ code, currency, icon }) => {
    return (
        <View style={{ flexDirection: 'row' }}>
            <Image 
                source={icon}
                resizeMode="cover"
                style={{
                    width: 25,
                    height: 25,
                    marginTop: 5
                }}
            />
            <View style={{ marginLeft: SIZES.base }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{currency}</Text>
                <Text style={{ color: COLORS.gray, fontSize: 14 }}>{code}</Text>
            </View>
        </View>
    )
}