import { TouchableOpacity, View, SafeAreaView } from "react-native";
import LeftIcon from "../icon/searchIconTemplate";

export default function Albums() {
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