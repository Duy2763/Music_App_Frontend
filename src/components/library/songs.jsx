import { TouchableOpacity, View, SafeAreaView, StyleSheet, Text } from "react-native";
import LeftIcon from "../icon/leftIcon";
import SearchIconTemplate from "../icon/searchIconTemplate";
import colors from "../../colors";
import { useNavigation } from "@react-navigation/native";

export default function Songs() {
    const navigation = useNavigation();
    
    const SearchInput = () => (
        <View>

        </View>
    )

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                <View style={styles.headerTop}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <LeftIcon/>
                    </TouchableOpacity>
                    <Text style={styles.headerTopText}>Library</Text>
                    <SearchIconTemplate color={colors.thirdColor} size={20}/>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16
    },
    headerTopText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
})