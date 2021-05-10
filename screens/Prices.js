import React from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '../constants';

export default Prices = (props) => {
    return (
        <View style={styles.container}>
            <Text>Prices</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.lightGray1,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});