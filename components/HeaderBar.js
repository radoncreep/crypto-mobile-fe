import React from 'react';
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { COLORS, icons, SIZES } from '../constants';

export default HeaderBar = ({ right=false }) => {

    const navigation = useNavigation();

    return (
        <View style={{
            paddingHorizontal: Platform.OS === "ios" ? SIZES.padding : 15,
            flexDirection: 'row'
        }}>
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Image 
                        source={icons.back_arrow}
                        resizeMode="contain"
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.gray
                        }}
                    />
                    <Text style={{ marginLeft: SIZES.base, fontSize: 18, fontWeight: 'bold' }}>
                        Back
                    </Text>
                </TouchableOpacity>
            </View>

            { right && 
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <TouchableOpacity
                        style={{}}
                    > 
                        <Image 
                            source={icons.star}
                            style={{ width: 30, height: 30 }}
                        />
                    </TouchableOpacity>
                </View>
            }
        </View>
    )   
};