import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useCallback, useContext, useState } from "react";
import Toast from "react-native-toast-message";
import colors from "../../colors";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import LeftIconTemplate from "../icon/leftIconTemplate";
import { AppContext } from "../contextAPI/appContext";
import { getAllUsers, getUserByNameAndPassword } from "../../../api";

const toastConfig = {
    error: ({ text1, text2, props }) => (
        <View style={{
            height: 60,
            width: '90%',
            backgroundColor: 'white', 
            borderColor: '#25C3D9', 
            borderWidth: 2, 
            borderLeftWidth: 5, 
            borderLeftColor: '#25C3D9', 
            borderRadius: 10, 
            justifyContent: 'center',
            paddingHorizontal: 15,
            alignSelf: 'center',
            zIndex: 999, 
        }}>
            <Text style={{ color: '#25C3D9', fontSize: 18, fontWeight: 'bold' }}>{text1}</Text>
            <Text style={{ color: 'gray', fontSize: 16 }}>{text2}</Text>
        </View>
    ),
};

export default function SignIn() {
    const navigation = useNavigation();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [users, setUsers] = useState([]);
    const {userCurrent, setUserCurrent} = useContext(AppContext);
  
    useFocusEffect(
        useCallback(() => {
            fetchUser();
        }, [])
    );

    const handleLogin = async () => {
        try {
          const userData = await getUserByNameAndPassword(name, password);
          setUserCurrent(userData);
          navigation.navigate("MainStack")

          
          setMessage('Login successful');
        } catch (error) {
          setMessage('Invalid credentials');
        }
      };

    const fetchUser = async () => {
        const data = await getAllUsers();
        setUsers(data);
    }

     function checkUser(name, password) {
        return users.some(user => user.name === name && user.password === password);
    }

    return (
        <ImageBackground 
            source={require('../../../assets/library/Image112.png')} 
            style={{flex: 1}}
        >
            <SafeAreaView style={{flex: 1}}>
                <TouchableOpacity style={{marginTop: 16, marginLeft: 16}} onPress={() => navigation.goBack()}>
                    <LeftIconTemplate color='#fff' size={24}/>
                </TouchableOpacity>
                <View style={styles.container}>
                    <View style={{alignItems: "center", gap: 10, marginBottom: 64}}>
                        <Image 
                            source={require('../../../assets/home/Image33.png')}
                            style={{width: 80, height: 80}}
                        />
                        <Text style={{fontSize: 48, color: '#fff', fontWeight: 'bold'}}>Sign In</Text>
                    </View>
                    
                    <View style={{gap: 28}}>
                        <View style={styles.groupInput}>
                            <Image style={{width: 22, height: 22}} source={require('../../../assets/home/codicon_account.png')} />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your name"
                                onChangeText={text => setName(text)}
                                value={name}
                            />
                        </View>
                        
                        <View style={styles.groupInput}>
                            <Image style={{width: 26, height: 26}} source={require('../../../assets/home/lock.png')} />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your password"
                                secureTextEntry={!showPassword}
                                onChangeText={text => setPassword(text)}
                                value={password}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}> 
                                <Image
                                    style={{width: 20, height: 20}}
                                    source={showPassword ? require('../../../assets/home/eye.png') : require('../../../assets/home/eyeLock.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    
                    <TouchableOpacity 
                        style={styles.signUpButton}
                        onPress={() => {
                            if (!name) {
                                Toast.show({
                                    type: 'error',
                                    text1: 'Warning',
                                    text2: 'Name field cannot be empty',
                                    position: 'top',
                                    visibilityTime: 2000,
                                });
                            } else if (!password) {
                                Toast.show({
                                    type: 'error',
                                    text1: 'Warning',
                                    text2: 'Password field cannot be empty',
                                    position: 'top',
                                    visibilityTime: 2000,
                                });
                            } else if (!checkUser(name, password)) {
                                Toast.show({
                                    type: 'error',
                                    text1: 'Warning',
                                    text2: 'Username and password is not correct!',
                                    position: 'top',
                                    visibilityTime: 2000,
                                });
                                
                            } else {
                                handleLogin();
                                Toast.show({
                                    type: 'success',
                                    text1: 'Success',
                                    text2: 'Username and password is correct',
                                    position: 'top',
                                    visibilityTime: 2000,
                                });
                                
                            }
                        }}
                    >
                        <Text style={styles.signUpText}>Sign In</Text>
                    </TouchableOpacity>
                    
                   
                    
                    <Toast config={toastConfig} />
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 50
    },
    groupInput: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderWidth: 1,
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        gap: 8,
    },
    input: {
        fontSize: 20,
        flex: 1,
    },
    signUpButton: {
        backgroundColor: '#00BDD6',
        alignItems: 'center',
        borderRadius: 16,
        padding: 16,
        marginTop: 48
    },
    signUpText: {
        color: '#fff',
        fontSize: 20
    },
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        width: "100%",
        justifyContent: 'center',
        marginTop: 25,
        marginBottom: 20
    },
    separator: {
        width: "40%",
        height: 1,
        backgroundColor: 'lightgray'
    },
    orText: {
        fontSize: 20,
        color: 'gray'
    },
    signInButton: {
        alignItems: 'center',
        borderRadius: 16,
        padding: 14,
    },
    signInText: {
        color: 'gray',
        fontSize: 20,
        textDecorationLine: 'underline'
    }
});
