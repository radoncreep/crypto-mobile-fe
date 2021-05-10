import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { COLORS, icons, SIZES } from "../constants";



export default PriceAlert = ({ customContainerStyle }) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: SIZES.padding * 4,
                marginHorizontal: SIZES.padding,
                paddingVertical: SIZES.padding,
                paddingHorizontal: SIZES.radius,
                backgroundColor: COLORS.white,
                borderRadius: SIZES.radius,
                ...customContainerStyle,
                ...styles.shadow
            }}
        >
            <Image 
                source={icons.notification_color}
                style={{
                    width: 30,
                    height: 30
                }}
            />
            <View style={{ flex: 1, marginLeft: SIZES.radius }}>
                <Text style={{ fontSize: 16}}>Set Price Alert</Text>
                <Text style={{ fontSize: 14}}>Get notified when your coins are moving</Text>
            </View>

            <View>
                <Image 
                    source={icons.right_arrow}
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: COLORS.gray
                    }}
                />
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8
    }
})