import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, icons, SIZES } from '../constants';

export default TransactionHistory = ({ customContainerStyle, history }) => {

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={{ 
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: SIZES.base
            }}
            onPress={() => console.log(item)}
        >
            <Image 
                source={icons.transaction}
                style={{
                    width: 30,
                    height: 30,
                    tintColor: COLORS.primary
                }}
            />

            <View style={{ flex: 1, marginLeft: SIZES.radius }}>
                <Text style={{ fontSize: 16 }}>{item.description}</Text>
                <Text style={{ color: COLORS.gray, fontSize: 14 }}>{item.date}</Text>
            </View>

            <View style={{ flexDirection: 'row', height: '100%', alignItems: 'center' }}>
                <Text style={{ 
                    color: item.type === "B" ? COLORS.green : COLORS.black,
                    fontSize: 14,
                    fontWeight: 'bold'
                    }}>
                        {item.amount} {item.currency}
                </Text>

                <Image
                    source={icons.right_arrow}
                    style={{
                        width: 15,
                        height: 15,
                        tintColor: COLORS.gray
                    }}
                />
            </View>
        </TouchableOpacity>
    )

    return (
        <View
            style={{
                marginTop: SIZES.padding,
                marginHorizontal: SIZES.padding,
                padding: 20,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.white,
                ...customContainerStyle
            }}
        >
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Transaction history</Text>
            <FlatList 
                contentContainerStyle={{ marginTop: SIZES.radius }}
                scrollEnabled={false}
                data={history}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => {
                    return (
                        <View 
                            style={{
                                width: '100%',
                                height: 1,
                                backgroundColor: COLORS.lightGray
                            }}
                        />
                    )
                }}
            />
        </View>
    )
};