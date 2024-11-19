

import { Image, ImageBackground, StyleSheet, Text, View } from "react-native"
import HeartIcon from "../icon/heartIcon"
import PauseButton from "../icon/pauseIcon"
import { useState } from "react"
import { TouchableOpacity } from "react-native";
import HeartIconActive from "../icon/heartIconActive";
import PlayButton from "../icon/playIcon";
import { Modal } from "react-native";
import { SafeAreaView } from "react-native";
import { BlurView } from "expo-blur";
import DownIcon from "../icon/downIcon";
import { API_URL } from '@env';


export default function MiniPlayer({song}) {
    const [isActiveHeart, setActiveHeart] = useState(false);
    const [isPlaying, setPlaying] = useState(false);
    const [isFullScreen, setFullScreen] = useState(false);
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setFullScreen(!isFullScreen)}>
                <View style={styles.content}>
                    <View style={styles.contentLeft}>
                        <Image
                            style={styles.image}
                            source={{uri: `${API_URL}/assets/images/song/${song.image}`}}
                        />
                        <View style={styles.contentLeftCenter}>
                            <Text style={[styles.text, { fontSize: 16}]}>{song.name}</Text>
                            <Text style={[styles.text, {color: 'gray'}]}>{song.artist.name}</Text>
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
                        source={{uri: `${API_URL}/assets/images/song/${song.image}`}}
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
        padding: 14
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