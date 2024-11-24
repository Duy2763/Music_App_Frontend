import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Animated, Easing, StatusBar } from "react-native";
import LeftIcon from "../icon/leftIcon";
import { useRoute, useNavigation } from "@react-navigation/native";
import IconAndSoOn from "../icon/iconAndSoOn";
import { useState, useRef, useEffect, useContext } from "react";
import SuffleIcon from "../icon/suffleIcon";
import SuffleIconActive from "../icon/suffleIconActive";
import Icon from 'react-native-vector-icons/FontAwesome';
import RenderListSongs from "./renderListSongs";
import RenderListAlbume from "./renderListAlbume";
import colors from "../../colors";
import { API_URL } from '@env';
import { getAlbumsByArtist, getAllAlbums, getSongsByArtist } from "../../../api";
import { AppContext } from "../contextAPI/appContext";


export default function ArtistScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { artist } = route.params;
    const [albums, setAlbums] = useState([]);
    const [albumsByArtist, setAlbumsByArtist] = useState([]);
    const [songs, setSongs] = useState([]);
    const [isActiveViewMore, setActiveViewMore] = useState(false);
    const [isRotating, setIsRotating] = useState(false);
    const rotation = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(1)).current;
    const { playlist, setPlaylist, setCurrentSong, currentSong, isShuffle, setIsShuffle, setPlaying } = useContext(AppContext);

    const fetchSongs = async () => {
        try {
          const data = await getSongsByArtist(artist._id);
          setSongs(data);
        } catch (error) {
          console.error('Error fetching songs:', error);
        } 
    };

    const fetchAlbums = async () => {
        try {
          const data = await getAllAlbums();
          setAlbums(data);
        } catch (error) {
          console.error('Error fetching songs:', error);
        } 
    };

    const fetchAlbumsByArtist = async () => {
        try {
          const data = await getAlbumsByArtist(artist._id);
          setAlbumsByArtist(data);
        } catch (error) {
          console.error('Error fetching songs:', error);
        } 
    };

    const shuffleArray = (array) => {
        let shuffledArray = array.slice();
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    const handleShuffle = () => {
        const shuffledSongs = shuffleArray(songs);
        setPlaylist(shuffledSongs);
        // setCurrentSong(shuffledSongs[0]);
        setIsShuffle(!isShuffle);
    };


    const handlePlayArtistAlbum = () => {
        setPlaylist(songs);
        setCurrentSong(songs[0]);
        setPlaying(true);
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
                duration: 4000,
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

    useEffect(() => {
        fetchSongs();
        fetchAlbums();
        fetchAlbumsByArtist();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 , backgroundColor: '#fff'}}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 16 }}>
                <LeftIcon />
            </TouchableOpacity>
            <Animated.ScrollView onScroll={handleScroll} scrollEventThrottle={16}  showsVerticalScrollIndicator={false}>
                <View style={[styles.container, {marginBottom: currentSong ? 78 : 0}]}>
                    <View style={{ alignItems: 'center', gap: 8 }}>
                        <Animated.Image
                            style={[
                                styles.image, { transform: [{ rotate: rotationInterpolate }, 
                                { scale }] }, 
                                {width: 150, height: 150, borderRadius: '50%'}
                        ]}
                            source={{uri: `${API_URL}/assets/images/artist/${artist.image}`}}
                            
                        />
                        <Text style={styles.titleBig}>{artist.name}</Text>
                        <Text style={styles.titleSmall}>{artist.followers} Followers</Text>
                    </View>
                    <View style={styles.headerBottom}>
                        <View style={styles.headerBottomLeft}>
                            <View style={styles.headerBottomLeftFollow}>
                                <Text style={{ fontSize: 16, color: 'gray', fontWeight: 'bold' }}>Follow</Text>
                            </View>
                            <IconAndSoOn />
                        </View>
                        <View style={styles.headerBottomRight}>
                            <TouchableOpacity onPress={() => {
                                setIsShuffle(!isShuffle);
                                handleShuffle();
                            }}>
                                {isShuffle ? <SuffleIconActive /> : <SuffleIcon />}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                handlePlayPress();
                                handlePlayArtistAlbum();
                            }}>
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
                        <RenderListSongs data={songs} />
                    </View>
                    <View>
                        <Text style={styles.title}>
                            Albums
                        </Text>
                        <RenderListAlbume data={albumsByArtist} />
                    </View>
                    <View>
                        <Text style={styles.title}>
                            About
                        </Text>
                        <Image
                            source={{uri: `${API_URL}/assets/images/banner/${artist.about.image}`}}
                            style={{width: '100%', height: 150, borderRadius: 4}}
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
                        <RenderListAlbume data={albums} />
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
        borderRadius: 32
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
        color: colors.primaryColor,
        fontSize: 16
    }
})