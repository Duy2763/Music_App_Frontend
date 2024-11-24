import { useContext, useEffect, useState } from "react"
import { FlatList, ScrollView, StatusBar, StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native"
import { TextInput } from "react-native"
import { Image } from "react-native"
import { SafeAreaView, Text, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import RenderListAlbume from "./renderListAlbume"
import RenderListArtist from './renderListArtist'
import { getAllAlbums, getAllArtists, getAllSongs, getFirstThreeSongs } from "../../../api"
import { API_URL } from '@env';
import { AppContext } from "../contextAPI/appContext"


export default function HomeScreen() {
    const navigation = useNavigation();
    const [songs, setSongs] = useState([]);
    const [albums, setAlbums] = useState([]); 
    const [artists, setArtists] = useState([]); 
    const { currentSong, setCurrentSong, userCurrent, playlist, setPlaylist, currentIndex, playNextSong } = useContext(AppContext);
    
    useEffect(() => {
        if (userCurrent) {
          console.log('User current:', userCurrent); // Log userCurrent để kiểm tra
        }
    }, [userCurrent]);

    const fetchSongs = async () => {
        try {
          const data = await getFirstThreeSongs();
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

    const fetchArtists = async () => {
        try {
          const data = await getAllArtists();
          setArtists(data);
        } catch (error) {
          console.error('Error fetching songs:', error);
        } 
    };

    useEffect(() => {
       
        fetchSongs();
        fetchAlbums();
        fetchArtists();
    }, []);

    const arrCharts = [
        {id: '1', name: 'Top 10 Most Played Songs', image: `topplayed.jpg`},
        {id: '2', name: 'Top 10 Most Liked Songs', image: `topliked.jpg`},
        {id: '3', name: 'Top 10 Most Shared Songs', image: `topshared.jpg`},
    ]

    const RenderSong = () => {
        return (
            <ScrollView 
                horizontal={true} 
                showsHorizontalScrollIndicator={false}
                style={{ flexDirection: 'row' }}
            >
                {songs.map((item) => (
                    <TouchableOpacity 
                        key={`${item._id}`}
                        style={styles.flatItem}
                        onPress={() => {
                            setCurrentSong(item);
                            console.log(songs);
                            
                            setPlaylist(songs)
                        }}
                    >
                        <Image
                            source={{uri: `${API_URL}/assets/images/song/${item.image}`}}
                            style={{width: 170, height: 250, borderRadius: 8}}
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        );
    };
    
    const RenderCharts = () => {
        return (
            <ScrollView 
                horizontal={true} 
                showsHorizontalScrollIndicator={false}
                style={{ flexDirection: 'row' }}
            >
                {arrCharts.map((item) => (
                    <TouchableOpacity 
                        key={item.id}
                        onPress={() => navigation.navigate('Chart', { chart: item })}
                    >
                        <View style={styles.flatItem}>
                            <Image
                                source={{uri: `${API_URL}/assets/images/chart/${item.image}`}}
                                style={{width: 150, height: 150, borderRadius: 4, marginBottom: 4}}
                            />
                            <Text style={styles.flatTitleSmall}>Daily chart-toppers</Text>
                            <Text style={styles.flatTitleSmall}>update</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        );
    };
    




    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <View style={[styles.container, {marginBottom: currentSong ? 78 : 0}]}>
                {/* Header */}
                <View style={styles.header}>
                    <Image
                        source={require('../../../assets/home/Image36.png')}
                    />
                    <View style={styles.headerRight}>
                        <Image
                            // source={{uri: `${API_URL}/assets/images/artist/${userCurrent.image}`}}
                            style={{width: 40, height: 40, borderRadius: 32}}
                        />
                    </View>
                </View>
                <View style={{ marginVertical: 24 }}>
                    <Text style={{ color: 'darkgray', fontSize: 16, marginBottom: 4 }}>Good morning,</Text>
                    {/* <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>{userCurrent.name}</Text> */}
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
                        <RenderListAlbume data={albums} />
                    </View>
                    <View>
                        <View style={styles.flatTitle}>
                            <Text style={styles.flatTitleBig}>Popular artists</Text>
                            <Text style={styles.flatTitleSmall}>See all</Text>
                        </View>
                        <RenderListArtist data={artists} />
                    </View>
                </ScrollView>
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
        borderRadius: 32,
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