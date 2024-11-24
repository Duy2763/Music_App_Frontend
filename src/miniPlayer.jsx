import React, { useContext, useEffect, useState, useRef } from 'react';
import { Image, ImageBackground, StyleSheet, Text, View, TouchableOpacity, Modal, SafeAreaView, Animated, Easing } from 'react-native';
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
import colors from './colors';

export default function MiniPlayer({ song }) {
    const [isActiveHeart, setActiveHeart] = useState(false);
    const [isPlaying, setPlaying] = useState(false);
    const [isFullScreen, setFullScreen] = useState(false);
    const [sound, setSound] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const { currentSong, setCurrentSong, userCurrent, playlist, setPlaylist, currentIndex, playNextSong } = useContext(AppContext);
    const intervalId = useRef(null);

    const rotateAnim = useRef(new Animated.Value(0)).current; // Animation state for rotation

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
            sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
            if (isPlaying) {
                await sound.playAsync();
            }
        } catch (error) {
            console.error('Error loading sound:', error); 
        }
    };

    const onPlaybackStatusUpdate = (status) => {
        if (status.didJustFinish) {
            playNextSong();
        }
    };

    const startRotation = () => {
        Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 4000, // Xoay hết 1 vòng trong 4 giây
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    };
    
    const stopRotation = () => {
        Animated.timing(rotateAnim, {
            toValue: rotateAnim.__getValue(), // Giữ nguyên giá trị xoay hiện tại
            duration: 1000, // Dừng chậm trong 1 giây
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    };
    
    const handlePlayPause = async () => {
        if (isPlaying) {
            await sound.pauseAsync();
            stopRotation();
        } else {
            await sound.playAsync();
            startRotation();
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

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

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
                                <Text style={styles.headerModalText}>Play</Text>
                                <TouchableOpacity onPress={() => setFullScreen(false)}>
                                    <DownIcon />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Animated.Image
                            source={require('../assets/diathan.png')}
                            style={[
                                { width: 300, height: 300 },
                                {
                                    transform: [
                                        {
                                            rotate: rotateAnim.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: ['0deg', '360deg'],
                                            }),
                                        },
                                    ],
                                },
                            ]}
                        />
                        <View style={styles.modalBottom}>
                            <View style={styles.songInfo}>
                                <Text style={styles.songTitle}>{currentSong.name}</Text>
                                <Text style={styles.artistName}>{currentSong.artist.name}</Text>
                            </View>
                            <View style={styles.sliderContainer}>
                                <View style={styles.timeContainer}>
                                    <Text style={styles.timeText}>
                                        {formatTime(currentTime)} {/* Thời gian hiện tại */}
                                    </Text>
                                    <Text style={styles.timeText}>
                                        {formatTime(duration)} {/* Tổng thời gian */}
                                    </Text>
                                </View>
                                <Slider
                                    style={styles.slider}
                                    value={currentTime} 
                                    minimumValue={0}
                                    maximumValue={duration}
                                    onValueChange={(value) => setCurrentTime(value)} 
                                    onSlidingComplete={(value) => sound.setPositionAsync(value * 1000)} 
                                    minimumTrackTintColor={colors.primaryColor} // Màu thanh đã chạy
                                    maximumTrackTintColor="#E0E0E0" // Màu thanh chưa chạy
                                    thumbTintColor={colors.primaryColor} // Màu nút
                                    thumbStyle={styles.thumbStyle} // Style nút
                                />
                            </View>

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
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
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
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    modalTop: {
    },
    modalBottom: {
        alignItems: 'center',
        width: '100%',
        paddingBottom: '20%',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    headerModal: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        width: '100%',
    },
    headerModalText: {
        fontSize: 20,
        color: '#fff'
    },
    songInfo: {
        alignItems: 'center',
        marginVertical: 20,
    },
    songTitle: {
        fontSize: 25,
        color: '#fff',
        fontWeight: 'bold',
    },
    artistName: {
        fontSize: 16,
        color: '#fff',
    },
    slider: {
        width: '100%',
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
    },
    sliderContainer: {
        width: '80%',
        alignItems: 'center',
        marginVertical: 10,
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    timeText: {
        color: '#FFFFFF',
        fontSize: 12,
    },
    slider: {
        width: '100%',
        height: 40,
    },
    thumbStyle: {
        width: 25,   // Chiều rộng của thumb
        height: 10,  // Chiều cao của thumb
        backgroundColor: '#FF5722', // Màu sắc của thumb
        borderRadius: 5, // Làm cho thumb có các góc bo tròn, bạn có thể điều chỉnh nếu muốn
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5, // Ánh sáng shadow trên Android
    },
});