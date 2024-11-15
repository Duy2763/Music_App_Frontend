import { Image } from "react-native"
import { TouchableOpacity } from "react-native"
import { TextInput } from "react-native"
import { StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import colors from "../../colors"
import CloseCircleTemplate from "../icon/closeCircleTemplate"
import { useState } from "react"

export default function SearchScreen() {
    const [search, setSearch] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [ activeOption, setActiveOption ] = useState('All');
    const arrOptions = [
        {id: 1, option: 'All'},
        {id: 2, option: 'Tracks'},
        {id: 3, option: 'Albums'},
        {id: 4, option: 'Artists'},
    ]
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: colors.secondaryColor}}>
            <View style={styles.container}>
                <View style={[styles.input, isFocused && styles.inputFocused, styles.search]}>
                    <View style={{flexDirection: 'row'}}>
                        <Image
                            style={styles.searchIcon}
                            source={require('../../../assets/home/findicon.png')}
                        />
                        <TextInput
                            style={[styles.searchInput]}
                            placeholder="What you want to listen to"
                            onChangeText={text => setSearch(text)}
                            value={search}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                    </View>
                    <TouchableOpacity onPress={() => setSearch('')}>
                        <CloseCircleTemplate color='black' size={22}/>
                    </TouchableOpacity>
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
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 32,
        gap: 8,
        justifyContent: 'space-between'
        
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
    },
    input: {
        borderWidth: 1,
        borderColor: colors.primaryColor,
        padding: 10,
        borderRadius: 5,
    },
    inputFocused: {
        borderColor: colors.primaryColor,
        boxShadow: `0 0 8px ${colors.primaryColor}`,
    },
    
})