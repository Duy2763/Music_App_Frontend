import React, { useContext, useEffect, useState, useRef } from 'react';
import { Image, ImageBackground, StyleSheet, Text, View, TouchableOpacity, Modal, SafeAreaView } from 'react-native';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HeartIcon from './components/icon/heartIcon';
import HeartIconActive from './components/icon/heartIconActive';
import PlayButton from './components/icon/playIcon';
import PauseButton from './components/icon/pauseIcon';
import DownIcon from './components/icon/downIcon';
import { API_URL } from '@env';
import { AppContext } from './components/contextAPI/appContext';

export default function MiniPlayer({ song }) {
    const [isActiveHeart, setActiveHeart] = useState(false);
    const [isPlaying, setPlaying] = useState(false);
    const [isFullScreen, setFullScreen] = useState(false);
    const [sound, setSound] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const { currentSong } = useContext(AppContext);
    const intervalId = useRef(null);

    useEffect(() => {
        if (currentSong) {
            loadSound();
        }
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
            if (intervalId.current) {
                clearInterval(intervalId.current);
            }
        };
    }, [currentSong]);

    const loadSound = async () => {
        try {
            console.log('API_URL:', API_URL); 
            const { sound } = await Audio.Sound.createAsync(
                { uri: `${API_URL}/assets/audios/${currentSong.linkAudio}` },
                { shouldPlay: false }
            );
            setSound(sound);
            const status = await sound.getStatusAsync();
            console.log('Sound status:', status); 
            setDuration(status.durationMillis / 1000);
        } catch (error) {
            console.error('Error loading sound:', error); 
        }
    };

    const handlePlayPause = async () => {
        if (isPlaying) {
            await sound.pauseAsync();
        } else {
            await sound.playAsync();
        }
        setPlaying(!isPlaying);
    };

    useEffect(() => {
        if (sound) {
            intervalId.current = setInterval(() => {
                sound.getStatusAsync().then(status => {
                    if (status.isLoaded) {
                        setCurrentTime(status.positionMillis / 1000);
                    }
                });
            }, 500); 
        }
        return () => {
            if (intervalId.current) {
                clearInterval(intervalId.current);
            }
        };
    }, [sound]);

    if (!currentSong) return null;

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setFullScreen(!isFullScreen)}>
                <View style={styles.content}>
                    <View style={styles.contentLeft}>
                        <Image source={{ uri: `${API_URL}/assets/images/song/${currentSong.image}` }} style={styles.image} />
                        <View style={styles.contentLeftCenter}>
                            <Text style={styles.text}>{currentSong.name}</Text>
                            <Text style={styles.text}>{currentSong.artist.name}</Text>
                        </View>
                    </View>
                    <View style={styles.contentRight}>
                        <TouchableOpacity onPress={() => setActiveHeart(!isActiveHeart)}>
                            {isActiveHeart ? <HeartIconActive /> : <HeartIcon />}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handlePlayPause}>
                            {isPlaying ? <PauseButton /> : <PlayButton />}
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
            <Modal visible={isFullScreen} transparent={true}>
                <ImageBackground source={{ uri: `${API_URL}/assets/images/song/${currentSong.image}` }} style={styles.imageBackground}>
                    <SafeAreaView style={styles.modalContainer}>
                        <View style={styles.modalTop}>
                            <View style={styles.headerModal}>
                                <TouchableOpacity onPress={() => setFullScreen(false)}>
                                    <DownIcon />
                                </TouchableOpacity>
                                <Text style={styles.headerModalText}>Play</Text>
                            </View>
                        </View>
                        <Image
                            source={require('../assets/diathan.png')}
                            style={{width: 300, height: 300}}
                        />
                        <View style={styles.modalBottom}>
                            <View style={styles.songInfo}>
                                <Text style={styles.songTitle}>{currentSong.name}</Text>
                                <Text style={styles.artistName}>{currentSong.artist.name}</Text>
                            </View>
                            <Slider
                                style={styles.slider}
                                value={currentTime}
                                minimumValue={0}
                                maximumValue={duration}
                                onValueChange={value => sound.setPositionAsync(value * 1000)}
                            />
                            <View style={styles.controls}>
                                <TouchableOpacity>
                                    <Icon name="shuffle" size={30} color="#fff" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => sound.setPositionAsync(Math.max(currentTime - 10, 0) * 1000)}>
                                    <Icon name="skip-previous" size={30} color="#fff" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handlePlayPause}>
                                    {isPlaying ? <PauseButton /> : <PlayButton />}
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => sound.setPositionAsync(Math.min(currentTime + 10, duration) * 1000)}>
                                    <Icon name="skip-next" size={30} color="#fff" />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Icon name="more-vert" size={30} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </SafeAreaView>
                </ImageBackground>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 14,
        position: 'absolute',
        bottom: 75,
        width: '100%',
        zIndex: 1,
    },
    image: {
        width: 50,
        height: 50
    },
    content: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    contentLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    contentLeftCenter: {
        gap: 4
    },
    text: {
        color: 'lightgray',
        fontWeight: 'bold',
    },
    contentRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 32,
        marginRight: 16
    },
    imageBackground: {
        flex: 1,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    modalTop: {
    },
    modalBottom: {
        alignItems: 'center',
        width: '100%',
        marginBottom: '20%'
    },
    headerModal: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        width: '100%',
    },
    headerModalText: {
        fontSize: 16,
        color: '#fff'
    },
    songInfo: {
        alignItems: 'center',
        marginVertical: 20,
    },
    songTitle: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    artistName: {
        fontSize: 16,
        color: '#fff',
    },
    slider: {
        width: '80%',
        height: 40,
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
    },
    controlIcon: {
        fontSize: 24,
        color: '#fff',
    }
});