import { useState } from "react"
import { FlatList, ScrollView, StatusBar, StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native"
import { TextInput } from "react-native"
import { Image } from "react-native"
import { SafeAreaView, Text, View } from "react-native"
import MiniPlayer from "./miniPlayer"
import { useNavigation } from "@react-navigation/native"
import RenderListAlbume from "./renderListAlbume"
import RenderListArtist from './renderListArtist'


export default function HomeScreen() {
    const navigation = useNavigation();
    const [songCurrent, setSongCurrent] = useState(null);
    const arrSongs = [
        {id: '1', name: 'Reflection', artist: 'Christina Aguilera', hinhAnh: require('../../../assets/home/Container26.png')},
        {id: '2', name: 'In the starts', artist: 'Benson Boone', hinhAnh: require('../../../assets/home/Container27.png')},
    ]

    const arrCharts = [
        {id: '1', name: 'Top 50 canada', hinhAnh: require('../../../assets/home/Container31.png')},
        {id: '2', name: 'Top 50 global', hinhAnh: require('../../../assets/home/Container32.png')},
        {id: '3', name: 'Top 50 trending', hinhAnh: require('../../../assets/home/Container33.png')},
    ]
    
    const arrAlbums = [
        {id: '1', name: 'ME', artist: 'Jessica Gonzalez', hinhAnh: require('../../../assets/home/Image45.png'), followers: 65.1},
        {id: '2', name: 'Magna nost', artist: 'Brian Thomas', hinhAnh: require('../../../assets/home/Image46.png'), followers: 63.1},
        {id: '3', name: 'Meaaa', artist: 'Christopher Jenn', hinhAnh: require('../../../assets/home/Image47.png'), followers: 69.1},
    ]

    const arrArtists = [
        {id: '1', name: 'Jennifer Wilson', hinhAnh: require('../../../assets/home/Image39.png'), followers: 65.1, about: {hinhAnh: require('../../../assets/home/Image73.png'), description: 'Do in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor' }},
        {id: '2', name: 'Elizabeth Hall', hinhAnh: require('../../../assets/home/Image40.png'), followers: 63.1, about: {hinhAnh: require('../../../assets/home/Image73.png'), description: 'Do in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor' }},
        {id: '3', name: 'Anthony Martial', hinhAnh: require('../../../assets/home/Image41.png'), followers: 69.1, about: {hinhAnh: require('../../../assets/home/Image73.png'), description: 'Do in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor' }},
    ]

    const RenderSong = () => {
        return (
            <FlatList
                data={arrSongs}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <TouchableOpacity 
                        style={styles.flatItem}
                        onPress={() => setSongCurrent(item)}
                    >
                        <Image
                            source={item.hinhAnh}
                        />
                    </TouchableOpacity>
                )}
                horizontal={true} 
                showsHorizontalScrollIndicator={false}
            />
        )
    }

    const RenderCharts = () => {
        return (
            <FlatList
                data={arrCharts}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => {navigation.navigate('Chart', {chart: item})}}>
                        <View style={styles.flatItem}>
                            <Image
                                source={item.hinhAnh}
                            />
                            <Text style={styles.flatTitleSmall}>Daily chart-toppers</Text>
                            <Text style={styles.flatTitleSmall}>update</Text>
                        </View>
                    </TouchableOpacity>
                )}
                horizontal={true} 
                showsHorizontalScrollIndicator={false}
            />
        )
    }




    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Image
                        source={require('../../../assets/home/Image36.png')}
                    />
                    <View style={styles.headerRight}>
                        <Image
                            source={require('../../../assets/home/Avatar3.png')}
                        />
                    </View>
                </View>
                <View style={{ marginVertical: 24 }}>
                    <Text style={{ color: 'darkgray', fontSize: 16, marginBottom: 4 }}>Good morning,</Text>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Ashley Scott</Text>
                    <View style={styles.search}>
                        <Image
                            style={styles.searchIcon}
                            source={require('../../../assets/home/findicon.png')}
                        />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="What you want to listen to"
                        />
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <Text style={[styles.flatTitleBig, { marginTop: 8, marginBottom: 16 }]}>Suggestion for you</Text>
                        <RenderSong />
                    </View>
                    <View>
                        <View style={styles.flatTitle}>
                            <Text style={styles.flatTitleBig}>Charts</Text>
                            <Text style={styles.flatTitleSmall}>See all</Text>
                        </View>
                        <RenderCharts />
                    </View>
                    <View>
                        <View style={styles.flatTitle}>
                            <Text style={styles.flatTitleBig}>Trending albums</Text>
                            <Text style={styles.flatTitleSmall}>See all</Text>
                        </View>
                        <RenderListAlbume data={arrAlbums} />
                    </View>
                    <View>
                        <View style={styles.flatTitle}>
                            <Text style={styles.flatTitleBig}>Popular artists</Text>
                            <Text style={styles.flatTitleSmall}>See all</Text>
                        </View>
                        <RenderListArtist data={arrArtists} />
                    </View>
                </ScrollView>
            </View>
            {songCurrent && <MiniPlayer song={songCurrent} />}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: '#fff'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerRight: {
    },
    search: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'lightgray',
        padding: 10,
        borderRadius: '50%',
        gap: 8
    },
    searchIcon: {
        width: 20,
        height: 20
    },
    searchInput: {
        fontSize: 16,
        
    },
    flatItem: {
        marginRight: 16
    },
    flatTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
        marginTop: 32,
       
    },
    flatTitleBig: {
        fontSize: 20,
        fontWeight: 'bold',
        
    },
    flatTitleSmall: {
        color: 'gray',
    },
    followButton: {
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: '50%'
    },
    followButtonText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    flatItemArtits: {
        alignItems: 'center', 
        gap: 8,
        marginBottom: 24
    }

})