import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import LeftIcon from "../icon/leftIcon";
import CastIcon from "../icon/castIcon";
import HeartIconSmall from "../icon/heartIconSmall";
import { StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import CircleIcon from "../icon/circleIcon";
import Icon from 'react-native-vector-icons/FontAwesome';
import IconAndSoOn from "../icon/iconAndSoOn";
import SuffleIcon from "../icon/suffleIcon";
import { useState } from "react";
import RenderListSongs from "./renderListSongs";
import HeartIconActive from "../icon/heartIconActive";
import SuffleIconActive from "../icon/suffleIconActive";
import { StatusBar } from "expo-status-bar";



export default function ChartScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const { chart } = route.params;
    const [ songCurrent, setSongCurrent ] = useState('');
    const [ isActiveHeart, setActiveHeart ] = useState(false);
    const [ isActiveSuffle, setActiveSuffle ] = useState(false);
    const arrSongs = [
        {id: '1', name: 'Reflection', artist: 'Christina Aguilera', hinhAnh: require('../../../assets/home/Image101.png'), plays: 2.1, duaration: '3:36'},
        {id: '2', name: 'In the starts', artist: 'Benson Boone', hinhAnh: require('../../../assets/home/Image102.png'), plays: 2.1, duaration: '3:36'},
        {id: '3', name: 'In the starts 2', artist: 'Benson Boone 2', hinhAnh: require('../../../assets/home/Image103.png'), plays: 2.1, duaration: '3:36'},
    ]

    

    return (
        <SafeAreaView style={{flex: 1}}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <View style={styles.container}>
                <View style={styles.headerTop}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <LeftIcon/>
                    </TouchableOpacity>
                    <CastIcon/>
                </View>
                <View style={styles.headerContent}>
                    <Image
                        source={chart.hinhAnh}
                    />
                    <View>
                        <Text style={styles.headerContentTitleBig}>{chart.name}</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                            <HeartIconSmall/>
                            <Text style={styles.headerContentTitleSmall}>1,234</Text>
                            <CircleIcon/>
                            <Text style={styles.headerContentTitleSmall}>05:10:18</Text>
                        </View>
                        <Text style={styles.headerContentTitleSmall}>Daily chart-toppers update</Text>
                    </View>
                </View>
                <View style={styles.headerBottom}>
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 32}}>
                        <TouchableOpacity onPress={() => setActiveHeart(!isActiveHeart)}>
                            {isActiveHeart ?  <HeartIconActive/> : <Icon name="heart" size={25} color="gray" />}
                        </TouchableOpacity>
                        <IconAndSoOn/>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 32}}>
                        <TouchableOpacity onPress={() => setActiveSuffle(!isActiveSuffle)}>
                            {isActiveSuffle ?  <SuffleIconActive/> : <SuffleIcon/>}
                        </TouchableOpacity>
                        
                        <View style={styles.playButton}>
                            <Icon name="play" size={25} color="#fff" />
                        </View>
                    </View>
                </View>
                <RenderListSongs data={arrSongs}/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    headerContentTitleBig: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    headerContentTitleSmall: {
        color: 'gray'
    },
    headerBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16
    },
    playButton: {
        flexDirection: 'row',
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        paddingHorizontal: 17,
        borderRadius: '50%'
    }
})