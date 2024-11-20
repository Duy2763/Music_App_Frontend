import { Image, ImageBackground, StyleSheet, Text, View } from "react-native"
import HeartIcon from "./components/icon/heartIcon"
import PauseButton from "./components/icon/pauseIcon"
import { useContext, useEffect, useState } from "react"
import { TouchableOpacity } from "react-native";
import HeartIconActive from "./components/icon/heartIconActive";
import PlayButton from "./components/icon/playIcon";
import { Modal } from "react-native";
import { SafeAreaView } from "react-native";
import DownIcon from "./components/icon/downIcon";
import { API_URL } from '@env';
import { AppContext } from "./components/contextAPI/appContext";

export default function MiniPlayer({song}) {
    const [isActiveHeart, setActiveHeart] = useState(false);
    const [isPlaying, setPlaying] = useState(false);
    const [isFullScreen, setFullScreen] = useState(false);
    const { currentSong, currentTime, setCurrentTime, duration, setDuration } = useContext(AppContext);



    if (!currentSong) return null;

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setFullScreen(!isFullScreen)}>
                <View style={styles.content}>
                    <View style={styles.contentLeft}>
                        <Image
                            style={styles.image}
                            source={{uri: `${API_URL}/assets/images/song/${currentSong.image}`}}
                        />
                        <View style={styles.contentLeftCenter}>
                            <Text style={[styles.text, { fontSize: 16}]}>{currentSong.name}</Text>
                            <Text style={[styles.text, {color: 'gray'}]}>{currentSong.artist.name}</Text>
                        </View>
                    </View>
                    <View style={styles.contentRight}>
                        <TouchableOpacity onPress={() => setActiveHeart(!isActiveHeart)}>
                            {isActiveHeart ? <HeartIconActive/> : <HeartIcon/>}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setPlaying(!isPlaying)}>
                            {isPlaying ? <PauseButton/> : <PlayButton/>}
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
            <Modal visible={isFullScreen} animationType="slide">
                <SafeAreaView style={{flex: 1}}> 
                    <ImageBackground 
                        style={styles.imageBackground}
                        source={{uri: `${API_URL}/assets/images/song/${currentSong.image}`}}
                    >
                        <View style={styles.headerModal}>
                            <Text style={styles.headerModalText}>Play</Text>
                            <TouchableOpacity onPress={() => setFullScreen(!isFullScreen)}>
                                <DownIcon/>
                            </TouchableOpacity>
                        </View> 
                    </ImageBackground>
                </SafeAreaView>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 14,
        position: 'absolute', // Đặt MiniPlayer cố định
        bottom: 75, // Đẩy MiniPlayer lên trên Navbar (chiều cao Navbar ~75px)
        width: '100%', // Chiếm toàn bộ chiều ngang màn hình
        zIndex: 1, // Đảm bảo MiniPlayer ở trên Navbar
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
    headerModal: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16
    },
    headerModalText: {
        fontSize: 16,
        color: '#fff'
    }


})