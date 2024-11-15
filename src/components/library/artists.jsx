import { TouchableOpacity, View, SafeAreaView } from "react-native";
import LeftIcon from "../icon/searchIconTemplate";

export default function Artists() {
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.headerTop}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <LeftIcon/>
                </TouchableOpacity>
                <SearchIconTemplate/>
            </View>
        </SafeAreaView>
    )
}