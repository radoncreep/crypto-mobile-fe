import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
    Image,
    FlatList,
    LogBox
} from 'react-native';
import * as Font from 'expo-font';
// import { useFonts } from 'expo-font';

import { COLORS, dummyData, FONTS, icons, images, SIZES } from '../constants';
import { PriceAlert, TransactionHistory } from '../components';

const Home = ({ navigation }) => {
    // const [ fontsLoaded, setFontsLoaded ] = useState(false);
    const [ trending, setTrending ] = useState(dummyData.trendingCurrencies);
    const [ transactionHistory, setTransactionHistory ] = useState(dummyData.transactionHistory);

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, []);

    // useEffect(() => {
    //     const handleFont = async () => {
    //         await Font.loadAsync({
    //             // Load a font `Montserrat` from a static resource
    //             Roboto: require('../assets/fonts/'),
          
    //             // Any string can be used as the fontFamily name. Here we use an object to provide more control
    //             // 'Montserrat-SemiBold': {
    //             //   uri: require('./assets/fonts/Montserrat-SemiBold.ttf'),
    //             //   display: Font.FontDisplay.FALLBACK,
    //             // },
    //           });
    //           setFontsLoaded(true);
    //         Font.loadAsync()
    //     };

    //     handleFont();
    // }, []);

    function renderHeader() {
        // Flatlist function for renderItem
        const renderItem = ({ item, index }) => (
            <TouchableOpacity
                style={{
                    width: 180,
                    paddingVertical: SIZES.padding,
                    paddingHorizontal: SIZES.padding,
                    marginLeft: index == 0 ? SIZES.padding : 0,
                    marginRight: SIZES.radius,
                    borderRadius: 10,
                    backgroundColor: COLORS.white,
                    ...styles.shadow
                }}
                onPress={() => navigation.navigate('CryptoDetail', { currency: item })}
            >
                {/* Currency */}
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Image 
                            source={item.image} 
                            resizeMode="cover"
                            style={{
                                marginTop: 5,
                                width: 25,
                                height: 25
                            }}
                        />
                    </View>
                    <View style={{ marginLeft: SIZES.base }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', textTransform: 'capitalize' }} >{item.currency}</Text>
                        <Text style={{ color: COLORS.gray, fontSize: 12 }} >{item.code}</Text>
                    </View>
                </View>

                {/* Value */}
                <View style={{ marginTop: SIZES.radius }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>${item.amount}</Text>
                    <Text style={{ color: item.type === "I" ? 'green' : COLORS.red, fontSize: 14 }}>${item.changes}</Text>
                </View>
            </TouchableOpacity>
        );

        return (
            <View
                style={{
                    width: '100%',
                    height: 250,
                    ...styles.shadow
                }}
            >
                <ImageBackground 
                    source={images.banner}
                    resizeMode="cover"
                    style={{
                        flex: 1,
                        alignItems: 'center'
                    }}
                >
                    {/* Header Bar  */}
                    <View 
                        style={{
                            marginTop: SIZES.padding + 2,
                            width: "100%",
                            alignItems: 'flex-end',
                            paddingHorizontal: SIZES.padding
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: 35,
                                height: 35,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onPress={() => console.log("Notification on pressed")}
                        >
                            <Image 
                                source={icons.notification_white}
                                resizeMode="contain"
                                style={{ flex: 1 }}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Balance */}
                    <View
                        style={{ alignItems: 'center', justifyContent: 'center'}}
                    >
                        {/* add font later */}
                        <Text style={{ color: COLORS.white }}>Your Portfolio Balance</Text>
                        <Text style={{ color: COLORS.white, fontSize: 26, fontWeight: 'bold' }}>$ {dummyData.portfolio.balance}</Text>
                        <Text style={{ color: COLORS.white, fontSize: 16 }}>{dummyData.portfolio.changes} Last 24 hours </Text>
                    </View>

                    {/* Trending */}
                    <View style={{
                        position: 'absolute',
                        bottom: '-30%',
                    }}>
                        <Text style={{ marginLeft: SIZES.padding, color: COLORS.white, fontSize: 18 }}>Trending</Text>
                        <FlatList 
                            contentContainerStyle={{ marginTop: SIZES.base }}
                            data={trending}
                            renderItem={renderItem}
                            keyExtractor={(item) => `${item.id}`}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </ImageBackground>
            </View>
        )
    };

    const renderAlert = () => {
        return (
            <PriceAlert />
        );
    };

    const renderNotice = () => {
        return (
            <View style={{
                marginTop: SIZES.padding,
                marginHorizontal: SIZES.padding,
                padding: 20,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.secondary,
                ...styles.shadow
            }}>
                <Text style={{ color: COLORS.white, fontSize: 14, fontWeight: 'bold' }}>Investing Safety</Text>
                <Text style={{ color: COLORS.white, fontSize: 13, lineHeight: 18 }}>It's very difficult to time an investment,
                    especially when the market is volatile. Learn how to use 
                    dollar cost averaging to your advantage.
                </Text>

                <TouchableOpacity
                    style={{ 
                        marginTop: SIZES.base
                    }}
                    onPress={() => console.log("Learn More")}
                >
                    <Text style={{ 
                            textDecorationLine: 'underline',
                            color: COLORS.green,
                            fontSize: 16
                        }}>
                            Learn More
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    const renderTransactionHistory = () => {
        return (
            <TransactionHistory 
                customContainerStyle={{ ...styles.shadow }}
                history={transactionHistory}
            />
        )
    }

    return (
        <ScrollView>
            <View style={{
                flex: 1,
                paddingBottom: 130
            }}>
                {renderHeader()}
                {renderAlert()}
                {renderNotice()}
                {renderTransactionHistory()}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    }
})

export default Home;