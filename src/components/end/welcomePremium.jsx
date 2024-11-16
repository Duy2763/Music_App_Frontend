import React, { useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import { StyleSheet, ImageBackground, StatusBar, View, Image, SafeAreaView } from "react-native";
import { Platform } from "react-native";
import IconAndSoOnTemplate from "../icon/iconAndSoOnTemplate";
import { useNavigation } from "@react-navigation/native";
import LeftIconTemplate from "../icon/leftIconTemplate";

export default function WelcomePremium() {
    const navigation = useNavigation();
    useEffect(() => {
        StatusBar.setHidden(false, 'fade');
        StatusBar.setBarStyle('dark-content');
        if (Platform.OS === 'android') {
            StatusBar.setTranslucent(true);
        }
    }, []);

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../../../assets/library/Image112.png")}
                style={styles.backgroundImage}
            >
                <SafeAreaView style={styles.safeArea}>
                    <TouchableOpacity style={{marginLeft: 8}} onPress={() => navigation.goBack()}>
                        <LeftIconTemplate color='#fff' size={25}/>
                    </TouchableOpacity>
                    <View style={styles.content}>
                        <Image source={require("../../../assets/library/Image113.png")} style={styles.image} />
                        <View style={{width: '100%', alignItems: 'center', gap: 32}}>
                            <View style={styles.textContainer}>
                                <Text style={styles.headerText}>Welcome to</Text>
                                <Text style={styles.headerText}>Premium</Text>
                            </View>
                            <IconAndSoOnTemplate color='#fff' size={25}/>
                            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('OptionPremium')}>
                                <Text style={styles.buttonText}>Start listening</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
    },
    safeArea: {
        flex: 1,
    },
    content: {
        paddingVertical: 48,
        paddingHorizontal: 24,
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
    },
    image: {
        marginBottom: 24,
    },
    textContainer: {
        alignItems: 'center',
    },
    headerText: {
        fontSize: 38,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    button: {
        backgroundColor: 'black',
        paddingVertical: 16,
        width: '100%',
        alignItems: 'center',
        borderRadius: 32,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
});
