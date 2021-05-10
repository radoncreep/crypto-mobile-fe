import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Platform,
    ScrollView,
    Animated
} from 'react-native';
import { VictoryScatter, VictoryLine, VictoryChart, VictoryAxis } from "victory-native";
import { VictoryCustomTheme } from "../styles"

import { CurrencyLabel, HeaderBar, TextButton } from '../components';
import { COLORS, dummyData, SIZES } from '../constants';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const CryptoDetail = ({ navigation, route }) => {

    const scrollX = new Animated.Value(0);
    const numberOfCharts = [1, 2, 3];

    const [ selectedCurrency, setSelectedCurrency ] = useState(null);
    const [ chartOptions, setChartOptions ] = useState(dummyData.chartOptions);
    const [ selectedOption, setSelectedOption ] = useState(chartOptions[0]);

    useEffect(() => {
        const { currency } = route.params;
        setSelectedCurrency(currency);
    }, []);

    const optionOnClickHandler = (option) => {
        setSelectedOption(option);
    };

    function renderDots() {
        const dotPosition = Animated.divide(scrollX, SIZES.width);

        return (
            <View style={{ height: 30, marginTop: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    { numberOfCharts.map((item, index) => {
                        const opacity = dotPosition.interpolate({
                            inputRange: [index -1, index, index + 1],
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: 'clamp'
                        });
                        
                        const dotSize = dotPosition.interpolate({
                            inputRange: [index -1, index, index + 1],
                            outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
                            extrapolate: 'clamp'
                        });

                        const dotColor = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [COLORS.gray, COLORS.primary, COLORS.gray],
                            extrapolate: 'clamp'
                        });

                        return (
                            <Animated.View
                                key={`dot-${index}`}
                                opacity={opacity}
                                style={{
                                    borderRadius: SIZES.radius,
                                    marginHorizontal: 6,
                                    width: dotSize,
                                    height: dotSize,
                                    backgroundColor: dotColor
                                }}
                            />
                        )
                    })}
                </View>
            </View>
        )
    }

    function renderChart() {
        return (
            <View 
                style={{
                    marginTop: SIZES.padding,
                    marginHorizontal: SIZES.radius,
                    alignItems: 'center',
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.white,
                    paddingVertical: 10,
                    ...styles.shadow
                }}
            >
                {/* Header */}
                <View style={{
                    flexDirection: 'row',
                    paddingHorizontal: SIZES.padding
                }}>
                    {/* currency label */}
                    <View style={{ flex: 1 }}>
                        <CurrencyLabel 
                            icon={selectedCurrency?.image}
                            currency={selectedCurrency?.currency}
                            code={selectedCurrency?.code}
                        />
                    </View>

                    {/* currency amount */}
                    <View>
                        <Text style={{ fontSize: 16, fontWeight: '500' }}>{selectedCurrency?.amount}</Text>
                        <Text style={{ 
                            color: selectedCurrency?.type === "I" ? COLORS.green : COLORS.red, 
                            fontSize: 16,
                            fontWeight: '400'
                            }}>
                                {selectedCurrency?.changes}
                        </Text>
                    </View>
                </View>

                {/* Chart */}
                <Animated.ScrollView
                    horizontal
                    pagingEnabled
                    scrollEventThrottle={16}
                    snapToAlignment="center"
                    snapToInterval={SIZES.width - 40}
                    showsHorizontalScrollIndicator={false}
                    decelerationRate={0}
                    // the code below gets the position of the scrollView and assign it to the scroll position
                    onScroll={Animated.event([
                        { nativeEvent: { contentOffset: { x: scrollX } }}
                    ], { useNativeDriver: false })}
                >
                    {
                        numberOfCharts.map((item, index) => (
                            <View
                                key={`chart-${index}`}
                                style={{
                                    marginLeft: index === 0 ? SIZES.base : 0
                                }}
                            >
                                <View style={{ marginTop: -25 }}>
                                    <VictoryChart theme={VictoryCustomTheme} height={220} width={SIZES.width - 40}>
                                        <VictoryLine 
                                            style={{ 
                                                data: {
                                                    stroke: COLORS.secondary
                                                },
                                                parent: {
                                                    border: "1px solid #ccc"
                                                }
                                            }}
                                            data={selectedCurrency?.chartData}
                                            categories={{
                                                x: ["15 MIN", "30 MIN", "45 MIN", "50 MIN"],
                                                y: ["15", "30", "45"]
                                            }}
                                        />
                                        <VictoryScatter 
                                            data={selectedCurrency?.chartData}
                                            size={7}
                                            style={{
                                                data: {
                                                    fill: COLORS.secondary
                                                }
                                            }}
                                        />
                                        <VictoryAxis 
                                            style={{
                                                grid: {
                                                    stroke: "transparent"
                                                }
                                            }}
                                        />
                                        <VictoryAxis 
                                            dependentAxis
                                            style={{
                                                axis: {
                                                    stroke: "transparent"
                                                },
                                                grid: {
                                                    stroke: "gray"
                                                }
                                            }}
                                        />
                                    </VictoryChart>
                                </View>
                            </View>
                        ))
                    }
                </Animated.ScrollView>

                {/* Options */}
                <View style={{ 
                    width: "100%", 
                    paddingHorizontal: SIZES.padding, 
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                    }}>
                        {
                            chartOptions.map((option) => {
                                return (
                                    <TextButton 
                                        key={`options-${option.id}`}
                                        label={option.label}
                                        customContainerStyle={{
                                            height: 30,
                                            width: 60,
                                            borderRadius: 15,
                                            backgroundColor: selectedOption.id === option.id ? COLORS.primary : COLORS.lightGray
                                        }}
                                        customLabelStyle={{
                                            color: selectedOption.id === option.id ? COLORS.white : COLORS.gray,
                                            fontSize: 12
                                        }}
                                        onPress={() => optionOnClickHandler(option)}
                                    />
                                )
                            })
                        }
                </View>

                {/* Dots */}
                {renderDots()}
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightGray1, ...styles.safeView }}>
            <HeaderBar right={true} />
            
            <ScrollView>
                <View style={{ flex: 1, paddingBottom: SIZES.padding }}>
                    {renderChart()}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

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
    },
    safeView: {
        marginTop: Platform.OS === "android" ? 30 : 0,
    }
})

export default CryptoDetail;