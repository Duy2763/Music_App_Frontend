import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../colors";
import CastIcon from "../icon/castIcon";
import { useNavigation } from "@react-navigation/native";
import PlusIcon from "../icon/plusIcon";

export default function LibraryScreen() {
    const navigation = useNavigation();
    const arrOptions = [
        { id: 1, option: "Songs", navigate: "Songs" },
        { id: 2, option: "Albums", navigate: "Albums" },
        { id: 3, option: "Artists", navigate: "Artists" },
    ];
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.secondaryColor }}>
            <StatusBar backgroundColor={colors.secondaryColor} barStyle="dark-content" />
            <View style={styles.container}>
                <View style={styles.headerTop}>
                    <Text style={styles.headerTopText}>Your Library</Text>
                    <CastIcon />
                </View>
                <View style={styles.optionSearch}>
                    <TouchableOpacity style={[styles.optionSearchTitleTouch, styles.optionSearchAll]}>
                        <Text style={styles.optionSearchTitle}>All</Text>
                    </TouchableOpacity>
                    {arrOptions.map((option) => (
                        <TouchableOpacity
                            key={option.id}
                            style={styles.optionSearchTitleTouch}
                            onPress={() => navigation.navigate(`${option.navigate}`)}
                        >
                            <Text style={styles.optionSearchTitle}>{option.option}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <View style={styles.plusIconContainer}>
                <PlusIcon color='#fff' size={20}/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.secondaryColor,
        paddingHorizontal: 24,
        marginBottom: 32,
    },
    headerTop: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 8,
    },
    headerTopText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    optionSearch: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 16,
    },
    optionSearchTitleTouch: {
        width: 80,
        alignItems: "center",
        paddingVertical: 12,
        borderColor: colors.thirdColor,
        borderRadius: 32,
        justifyContent: "center",
        backgroundColor: "#F5F5F5",
        borderWidth: 1,
        borderColor: "#DCDCDC",
    },
    optionSearchTitle: {
        fontSize: 16,
        color: "gray",
    },
    optionSearchAll: {
        borderLeftWidth: 8,
        borderRightWidth: 8,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.primaryColor,
    },
    plusIconContainer: {
        position: "absolute", // Cố định vị trí
        bottom: 16, // Cách mép dưới 16px
        right: 16, // Cách mép phải 16px
        zIndex: 10, // Đảm bảo nó hiển thị phía trên các phần khác
        backgroundColor: colors.primaryColor, // Màu nền cho dấu cộng (nếu cần)
        borderRadius: 50, // Bo tròn (nếu dấu cộng là button)
        padding: 12, // Padding (nếu cần)
    },
});
