import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Animated, Easing, StatusBar } from "react-native";
import LeftIcon from "../icon/leftIcon";
import { useRoute, useNavigation } from "@react-navigation/native";
import IconAndSoOn from "../icon/iconAndSoOn";
import { useState, useRef, useEffect } from "react";
import SuffleIcon from "../icon/suffleIcon";
import SuffleIconActive from "../icon/suffleIconActive";
import Icon from 'react-native-vector-icons/FontAwesome';
import RenderListSongs from "./renderListSongs";
import HeartIconActive from "../icon/heartIconActive";
import { API_URL } from '@env';
import { getSongsByAlbum } from "../../../api";

export default function AlbumeScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { albume } = route.params;
    const [isActiveSuffle, setActiveSuffle] = useState(false);
    const [isActiveViewMore, setActiveViewMore] = useState(false);
    const [isRotating, setIsRotating] = useState(false);
    const rotation = useRef(new Animated.Value(0)).current;
    const [isActiveHeart, setActiveHeart] = useState(false);
    const [songs, setSongs] = useState([]);

    const arrSongs = [
        { id: '1', name: 'Reflection', artist: 'Christina Aguilera', hinhAnh: require('../../../assets/home/Image101.png'), plays: 2.1, duaration: '3:36' },
        { id: '2', name: 'In the starts', artist: 'Benson Boone', hinhAnh: require('../../../assets/home/Image102.png'), plays: 2.1, duaration: '3:36' },
        { id: '3', name: 'In the starts 2', artist: 'Benson Boone 2', hinhAnh: require('../../../assets/home/Image103.png'), plays: 2.1, duaration: '3:36' },
        { id: '4', name: 'Reflection', artist: 'Christina Aguilera', hinhAnh: require('../../../assets/home/Image101.png'), plays: 2.1, duaration: '3:36' },
        { id: '5', name: 'In the starts', artist: 'Benson Boone', hinhAnh: require('../../../assets/home/Image102.png'), plays: 2.1, duaration: '3:36' },
        { id: '6', name: 'In the starts 2', artist: 'Benson Boone 2', hinhAnh: require('../../../assets/home/Image103.png'), plays: 2.1, duaration: '3:36' },
        { id: '7', name: 'Reflection', artist: 'Christina Aguilera', hinhAnh: require('../../../assets/home/Image101.png'), plays: 2.1, duaration: '3:36' },
        { id: '8', name: 'In the starts', artist: 'Benson Boone', hinhAnh: require('../../../assets/home/Image102.png'), plays: 2.1, duaration: '3:36' },
    ];

    const fetchSongs = async () => {
        try {
          const data = await getSongsByAlbum(albume._id);
          setSongs(data);
        } catch (error) {
          console.error('Error fetching songs:', error);
        } 
    };

    const getDisplayText = (text) => {
        if (isActiveViewMore) {
            return text;
        }
        return text.length > 150 ? text.substring(0, 150) + '...' : text;
    };

    const startRotation = () => {
        Animated.loop(
            Animated.timing(rotation, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    };

    const stopRotation = () => {
        Animated.timing(rotation, {
            toValue: 0,
            duration: 2000, // Adjust the duration for a gradual stop
            easing: Easing.linear,
            useNativeDriver: true,
        }).start(() => {
            rotation.stopAnimation();
            rotation.setValue(0); // Reset rotation to initial state
        });
    };

    const handlePlayPress = () => {
        if (isRotating) {
            stopRotation();
        } else {
            startRotation();
        }
        setIsRotating(!isRotating);
    };

    const rotationInterpolate = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });


    useEffect(() => {
        fetchSongs();
    }, []);
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <View style={styles.container}>
                <View>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <LeftIcon />
                    </TouchableOpacity>
                    <View style={{ alignItems: 'center', gap: 4 }}>
                        <Animated.Image
                            style={[styles.image, { transform: [{ rotate: rotationInterpolate }] }]}
                            source={{uri: `${API_URL}/assets/images/album/${albume.image}`}}
                        />
                        <Text style={styles.titleBig}>{albume.name}</Text>
                        <Text style={styles.titleSmall}>{albume.artist.name}</Text>
                    </View>
                    <View style={styles.headerBottom}>
                        <View style={styles.headerBottomLeft}>
                            <TouchableOpacity onPress={() => setActiveHeart(!isActiveHeart)}>
                                {isActiveHeart ?  <HeartIconActive/> : <Icon name="heart" size={25} color="gray" />}
                            </TouchableOpacity>
                            <IconAndSoOn />
                        </View>
                        <View style={styles.headerBottomRight}>
                            <TouchableOpacity onPress={() => setActiveSuffle(!isActiveSuffle)}>
                                {isActiveSuffle ? <SuffleIconActive /> : <SuffleIcon />}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handlePlayPress}>
                                <View style={styles.playButton}>
                                    <Icon name="play" size={25} color="#fff" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <RenderListSongs data={songs} />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 100,
    },
    titleBig: {
        fontSize: 32,
        fontWeight: 'bold'
    },
    titleSmall: {
        fontSize: 20,
        color: 'gray',
        fontWeight: 'bold'
    },
    headerBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 8
    },
    headerBottomLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 24
    },
    headerBottomLeftFollow: {
        borderWidth: 2,
        paddingHorizontal: 24,
        paddingVertical: 12,
        alignItems: 'center',
        borderColor: 'gray',
        borderRadius: 50
    },
    headerBottomRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 24
    },
    playButton: {
        flexDirection: 'row',
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        paddingHorizontal: 17,
        borderRadius: 100
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8
    },
    textAbout: {
        color: 'gray',
        marginTop: 8
    },
    viewMoreBtn: {
       alignItems: 'center',
       marginVertical: 16
    },
    viewMoreText: {
        color: '#25C3D9',
        fontSize: 16
    }
});
