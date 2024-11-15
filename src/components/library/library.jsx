import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import colors from "../../colors"
import CastIcon from "../icon/castIcon"
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";


export default function LibraryScreen() {
    const navigation = useNavigation();
    const arrOptions = [
        {id: 1, option: 'Songs', navigate: 'Songs'},
        {id: 2, option: 'Albums', navigate: 'Albums'},
        {id: 3, option: 'Artists', navigate: 'Artists'},
    ]
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: colors.secondaryColor}}>
            <StatusBar backgroundColor={colors.secondaryColor} barStyle="dark-content" />
            <View style={styles.container}>
                <View style={styles.headerTop}>
                    <Text style={styles.headerTopText}>Your Library</Text>
                    <CastIcon/>
                </View>
                <View style={styles.optionSearch}>
                    { arrOptions.map(option => (
                        <TouchableOpacity 
                            key={option.id} 
                            style={styles.optionSearchTitleTouch} 
                            onPress={() => navigation.navigate(`${option.navigate}`)}
                        >
                            <Text style={styles.optionSearchTitle}>{option.option}</Text>
                        </TouchableOpacity>
                    )) }
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.secondaryColor,
        paddingHorizontal: 24,
        marginBottom: 32
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 8
    },
    headerTopText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    optionSearch: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginTop: 16
    },
    optionSearchTitleTouch: {
        width: 90,
        alignItems: 'center',
        paddingVertical: 12,
        borderColor: colors.thirdColor,
        borderRadius: 32,
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
        borderWidth: 1,
        borderColor: '#DCDCDC'
    },
    optionSearchTitle: {
        fontSize: 16,
        color: 'gray',
    },
})