import { Image } from "react-native"
import { TouchableOpacity } from "react-native"
import { TextInput } from "react-native"
import { StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import colors from "../../colors"
import { useState } from "react"

export default function SearchScreen() {
    const arrOptions = [
        {id: 1, option: 'All'},
        {id: 2, option: 'Tracks'},
        {id: 3, option: 'Albums'},
        {id: 4, option: 'Artists'},
    ]
    const [ activeOption, setActiveOption ] = useState('All');
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: colors.secondaryColor}}>
            <View style={styles.container}>
                <View style={styles.search}>
                    <Image
                        style={styles.searchIcon}
                        source={require('../../../assets/home/findicon.png')}
                    />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="What you want to listen to"
                    />
                </View>
                <View style={styles.optionSearch}>
                    { arrOptions.map(option => (
                        <TouchableOpacity 
                            key={option.id} 
                            style={[styles.optionSearchTitleTouch, {borderBottomWidth: option.option === activeOption ? 5 : 0}]} 
                            onPress={() => setActiveOption(option.option)}
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
        paddingHorizontal: 16,
        backgroundColor: colors.secondaryColor
    },
    search: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'lightgray',
        padding: 10,
        borderRadius: 32,
        gap: 8
    },
    searchIcon: {
        width: 20,
        height: 20
    },
    searchInput: {
        fontSize: 16,
        
    },
    optionSearch: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginTop: 24
    },
    optionSearchTitleTouch: {
        borderBottomColor: colors.primaryColor,
        width: 70,
        alignItems: 'center',
        paddingBottom: 8
    },
    optionSearchTitle: {
        fontSize: 16,
    }
    
})