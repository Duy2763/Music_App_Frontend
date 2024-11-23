import { ImageBackground, Text, View } from "react-native";


export default function Begin() {
    return (
        <ImageBackground 
            source={require('../../../assets/home/Image30.png')} 
            style={styles.background}
        >
                <View style={styles.overlay}>
                    <Text style={styles.text}>Welcome to Begin Screen</Text>
                </View>
        </ImageBackground>
    )
}