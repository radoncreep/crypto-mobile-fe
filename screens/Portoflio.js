import React from 'react';
import { Settings, StyleSheet, View } from 'react-native';
import { COLORS } from '../constants';

export default Portfolio = (props) => {
    return (
        <View style={styles.container}>
            <Text>Portfolio</Text>
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