import { Image, ImageBackground, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import colors from "../../colors";
import { useNavigation } from "@react-navigation/native";


export default function Begin() {
    const navigation = useNavigation();
    return (
        <ImageBackground 
            source={require('../../../assets/home/Image30.png')} 
            style={{flex: 1}}
        >
               <SafeAreaView style={{flex: 1}}>
                    <View style={{paddingHorizontal: 24, paddingVertical : 48, justifyContent: 'space-between', flex: 1}}>
                        <View style={{alignItems: 'center'}}>
                            <Image
                                style={{marginBottom: 180}}
                                source={require('../../../assets/home/Image33.png')} 
                            />
                            <View style={{alignItems: 'center'}}>
                                <Text style={{fontSize: 48, fontWeight: 'bold', color: '#fff'}}>Your music</Text>
                                <Text style={{fontSize: 48, fontWeight: 'bold', color: '#fff'}}>Your</Text>
                                <Text style={{fontSize: 48, fontWeight: 'bold', color: '#fff'}}>artists</Text>
                            </View>
                        </View>
                        <View style={{gap: 24}}>
                            <TouchableOpacity 
                                style={{width: '100%', padding: 16, backgroundColor: 'black', alignItems: 'center', borderRadius: 32, }}
                                onPress={() => navigation.navigate('SignUp')}
                            >
                                <Text style={{fontSize: 20, color: '#fff'}}>Create an account</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={{width: '100%', padding: 16, backgroundColor: '#fff', alignItems: 'center', borderRadius: 32, }}
                                onPress={() => navigation.navigate('SignIn')}
                            >
                                <Text style={{fontSize: 20, color: colors.primaryColor}}>I already have an account</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
               </SafeAreaView>
        </ImageBackground>
    )
}
