import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Animated, Easing, StatusBar } from "react-native";
import LeftIcon from "../icon/leftIcon";
import { useRoute, useNavigation } from "@react-navigation/native";
import IconAndSoOn from "../icon/iconAndSoOn";
import { useState, useRef } from "react";
import SuffleIcon from "../icon/suffleIcon";
import SuffleIconActive from "../icon/suffleIconActive";
import Icon from 'react-native-vector-icons/FontAwesome';
import RenderListSongs from "./renderListSongs";
import RenderListAlbume from "./renderListAlbume";

export default function ArtistScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { artist } = route.params;
    const [isActiveSuffle, setActiveSuffle] = useState(false);
    const [isActiveViewMore, setActiveViewMore] = useState(false);
    const [isRotating, setIsRotating] = useState(false);
    const rotation = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(1)).current;

    const arrSongs = [
        { id: '1', name: 'Reflection', artist: 'Christina Aguilera', hinhAnh: require('../../../assets/home/Image101.png'), plays: 2.1, duaration: '3:36' },
        { id: '2', name: 'In the starts', artist: 'Benson Boone', hinhAnh: require('../../../assets/home/Image102.png'), plays: 2.1, duaration: '3:36' },
        { id: '3', name: 'In the starts 2', artist: 'Benson Boone 2', hinhAnh: require('../../../assets/home/Image103.png'), plays: 2.1, duaration: '3:36' },
    ];

    const arrAlbums = [
        { id: '1', name: 'ME', artist: 'Jessica Gonzalez', hinhAnh: require('../../../assets/home/Image45.png'), followers: 65.1, about: { hinhAnh: require('../../../assets/home/Image73.png'), description: 'Do in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor' } },
        { id: '2', name: 'Magna nost', artist: 'Brian Thomas', hinhAnh: require('../../../assets/home/Image46.png'), followers: 63.1, about: { hinhAnh: require('../../../assets/home/Image73.png'), description: 'Do in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor' } },
        { id: '3', name: 'Meaaa', artist: 'Christopher Jenn', hinhAnh: require('../../../assets/home/Image47.png'), followers: 69.1, about: { hinhAnh: require('../../../assets/home/Image73.png'), description: 'Do in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor' } },
    ];

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

    const handleScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const newScale = Math.max(1 - offsetY / 200, 0.5);
        scale.setValue(newScale);
    };

    const rotationInterpolate = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <SafeAreaView style={{ flex: 1 , backgroundColor: '#fff'}}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 16 }}>
                <LeftIcon />
            </TouchableOpacity>
            <Animated.ScrollView onScroll={handleScroll} scrollEventThrottle={16}  showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={{ alignItems: 'center', gap: 8 }}>
                        <Animated.Image
                            style={[styles.image, { transform: [{ rotate: rotationInterpolate }, { scale }] }]}
                            source={artist.hinhAnh}
                        />
                        <Text style={styles.titleBig}>{artist.name}</Text>
                        <Text style={styles.titleSmall}>{artist.followers}K Followers</Text>
                    </View>
                    <View style={styles.headerBottom}>
                        <View style={styles.headerBottomLeft}>
                            <View style={styles.headerBottomLeftFollow}>
                                <Text style={{ fontSize: 16, color: 'gray', fontWeight: 'bold' }}>Follow</Text>
                            </View>
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
                    <View>
                        <Text style={styles.title}>
                            Popular
                        </Text>
                        <RenderListSongs data={arrSongs} />
                    </View>
                    <View>
                        <Text style={styles.title}>
                            Albums
                        </Text>
                        <RenderListAlbume data={arrAlbums} />
                    </View>
                    <View>
                        <Text style={styles.title}>
                            About
                        </Text>
                        <Image
                            source={artist.about.hinhAnh}
                        />
                        <Text style={styles.textAbout}>{getDisplayText(artist.about.description)}</Text>
                        <TouchableOpacity>
                            {isActiveViewMore
                                ?
                                <TouchableOpacity style={styles.viewMoreBtn} onPress={() => setActiveViewMore(!isActiveViewMore)}>
                                    <Text style={styles.viewMoreText}>View less</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={styles.viewMoreBtn} onPress={() => setActiveViewMore(!isActiveViewMore)}>
                                    <Text style={styles.viewMoreText}>View more</Text>
                                </TouchableOpacity>
                            }
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.title}>
                            Fans also like
                        </Text>
                        <RenderListAlbume data={arrAlbums} />
                    </View>
                </View>
            </Animated.ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingBottom: 32, 
        backgroundColor: '#fff'
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: '100%'
    },
    titleBig: {
        fontSize: 32,
        fontWeight: 'bold'
    },
    titleSmall: {
        color: 'gray',
        fontWeight: 'bold'
    },
    headerBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 16
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
        borderRadius: '50%'
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
        borderRadius: '100%'
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
})