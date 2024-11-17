import React, { useEffect, useRef } from "react";
import { FlatList, Text, View, StyleSheet, ImageBackground, Image, SafeAreaView, StatusBar, Platform, Animated, TouchableOpacity } from "react-native";
import IconAndSoOnTemplate from "../icon/iconAndSoOnTemplate";
import colors from "../../colors";
import { useNavigation } from "@react-navigation/native";
import LeftIconTemplate from "../icon/leftIconTemplate";

export default function OptionPremium() {
    const navigation = useNavigation();
    
    useEffect(() => {
        StatusBar.setHidden(false, 'fade');
        StatusBar.setBarStyle('light-content'); // Đổi màu chữ trên status bar để phù hợp
        if (Platform.OS === 'android') {
            StatusBar.setTranslucent(true); // Giúp status bar trong suốt
        }
    }, []);

    const images = [
        require("../../../assets/library/Container110.png"),
        require("../../../assets/library/Container112.png"),
        require("../../../assets/library/Container110.png"),
        require("../../../assets/library/Container112.png"),
    ];

    const scrollX = useRef(new Animated.Value(0)).current;

    const goToHome = () => {
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}> {/* Sử dụng View thay vì SafeAreaView */}
            <ImageBackground
                source={require("../../../assets/library/Image116.png")}
                style={StyleSheet.absoluteFillObject} // Giúp ảnh nền tràn toàn bộ màn hình
                resizeMode="cover"
            >
                    <TouchableOpacity style={{ marginTop: 56, marginLeft: 16 }} onPress={() => navigation.goBack()}>
                        <LeftIconTemplate color="#fff" size={25} />
                    </TouchableOpacity>
                    <View style={styles.content}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.headerText}>Unlimited</Text>
                            <Text style={styles.headerText}>music selections</Text>
                        </View>
                        <Animated.FlatList
                            data={images}
                            horizontal
                            keyExtractor={(item, index) => index.toString()}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.flatlistContainer}
                            onScroll={Animated.event(
                                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                                { useNativeDriver: true }
                            )}
                            renderItem={({ item, index }) => {
                                const inputRange = [
                                    (index - 1) * 200,
                                    index * 200,
                                    (index + 1) * 200,
                                ];
                                const scale = scrollX.interpolate({
                                    inputRange,
                                    outputRange: [0.8, 1, 0.8],
                                    extrapolate: 'clamp',
                                });
                                return (
                                    <Animated.View style={[styles.imageWrapper, { transform: [{ scale }] }]}>
                                        <Image source={item} style={styles.image} />
                                    </Animated.View>
                                );
                            }}
                        />
                        <IconAndSoOnTemplate color="#fff" size={25} />
                    </View>
                    <TouchableOpacity style={{ alignItems: 'center', padding: 16 }} onPress={goToHome}>
                        <Text style={{ fontSize: 18, color: 'lightgray' }}>Back home</Text>
                    </TouchableOpacity>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 70,
        gap: 16,
    },
    headerText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
    },
    flatlistContainer: {
        paddingHorizontal: 30,
        paddingTop: 20,
    },
    imageWrapper: {},
    image: {
        resizeMode: 'contain',
    },
});
