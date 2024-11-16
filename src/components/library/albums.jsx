import { TouchableOpacity, View, SafeAreaView, StyleSheet, Text, TextInput, Animated } from "react-native";
import LeftIcon from "../icon/leftIcon";
import SearchIconTemplate from "../icon/searchIconTemplate";
import colors from "../../colors";
import { useNavigation } from "@react-navigation/native";
import { useState, useRef, useEffect } from "react";
import CloseCircleTemplate from "../icon/closeCircleTemplate";

export default function Albums() {
    const navigation = useNavigation();
    const [isSearchActive, setSearchActive] = useState(false);
    const [textSearch, setTextSearch] = useState("");
    const fadeAnim = useRef(new Animated.Value(0)).current; // Giá trị ban đầu của opacity

    const toggleSearch = () => {
        if (isSearchActive) {
            Animated.timing(fadeAnim, {
                toValue: 0, // Mờ dần biến mất
                duration: 300, // Thời gian chuyển đổi (ms)
                useNativeDriver: true,
            }).start(() => {
                setSearchActive(false);
                setTextSearch(""); // Xóa input khi tắt search
            });
        } else {
            setSearchActive(true);
            Animated.timing(fadeAnim, {
                toValue: 1, // Hiện dần
                duration: 300, // Thời gian chuyển đổi (ms)
                useNativeDriver: true,
            }).start();
        }
    };

    const handleTextChange = (text) => {
        setTextSearch(text);
        if (text === "") {
            toggleSearch(); // Tự động tắt search khi xóa hết text
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View>
                    {isSearchActive ? (
                        <Animated.View style={[styles.searchInputContainer, { opacity: fadeAnim }]}>
                            <SearchIconTemplate color={colors.thirdColor} size={20} />
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search your albums..."
                                value={textSearch}
                                onChangeText={handleTextChange}
                                autoFocus
                            />
                            <TouchableOpacity onPress={() => {
                                setTextSearch('')
                                setSearchActive(false)
                            }}>
                                <CloseCircleTemplate color={colors.thirdColor} size={20}/>
                            </TouchableOpacity>
                        </Animated.View>
                    ) : (
                        <View style={styles.headerTop}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <LeftIcon />
                            </TouchableOpacity>
                            <Text style={styles.headerTopText}>Your Library</Text>
                            <TouchableOpacity onPress={toggleSearch}>
                                <SearchIconTemplate color={colors.thirdColor} size={20} />
                            </TouchableOpacity>
                        </View>
                        
                    )}
                </View>
                <View>
                    <Text style={styles.titleBig}>Your albums</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
    },
    headerTop: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    headerTopText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    titleBig: {
        fontWeight: "bold",
        fontSize: 24,
        marginVertical: 8
    },
    searchInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    searchInput: {
        fontSize: 16,
        borderBottomWidth: 2,
        padding: 8,
        borderColor: colors.primaryColor,
        flex: 1,
    },
});
