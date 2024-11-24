import { Image, ScrollView } from "react-native"
import { TouchableOpacity } from "react-native"
import { TextInput } from "react-native"
import { StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import colors from "../../colors"
import CloseCircleTemplate from "../icon/closeCircleTemplate"
import { useContext, useEffect, useState } from "react"
import { getAllAlbums, getAllArtists, getAllSongs } from "../../../api"
import { API_URL } from '@env';
import { AppContext } from "../contextAPI/appContext"
import RenderListAlbumSearch from "./renderListAlbumSearch"
import RenderListArtistSearch from "./renderListArtistSearch"
import RenderListSongSearch from "./renderListSongSearch"


export default function SearchScreen() {
    const [search, setSearch] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [ activeOption, setActiveOption ] = useState('All');
    const [songs, setSongs] = useState([]);
    const [albums, setAlbums] = useState([]); 
    const [artists, setArtists] = useState([]); 
    const [filteredSongs, setFilteredSongs] = useState([]);
    const [filteredAlbums, setFilteredAlbums] = useState([]);
    const [filteredArtists, setFilteredArtists] = useState([]);
    const { currentSong, currentTime, setCurrentTime, duration, setDuration, setCurrentSong } = useContext(AppContext);

    const arrOptions = [
        {id: 1, option: 'All'},
        {id: 2, option: 'Songs'},
        {id: 3, option: 'Albums'},
        {id: 4, option: 'Artists'},
    ]

    const fetchSongs = async () => {
        try {
          const data = await getAllSongs();
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

    useEffect(() => {
        const lowercasedFilter = search.toLowerCase();
        if (activeOption === 'Songs' || activeOption === 'All') {
            const filteredSongs = songs.filter(song => song.name.toLowerCase().includes(lowercasedFilter));
            setFilteredSongs(filteredSongs);
        }
        if (activeOption === 'Albums' || activeOption === 'All') {
            const filteredAlbums = albums.filter(album => album.name.toLowerCase().includes(lowercasedFilter));
            setFilteredAlbums(filteredAlbums);
        }
        if (activeOption === 'Artists' || activeOption === 'All') {
            const filteredArtists = artists.filter(artist => artist.name.toLowerCase().includes(lowercasedFilter));
            setFilteredArtists(filteredArtists);
        }
    }, [search, activeOption, songs, albums, artists]);

    

    const RenderResults = () => {
        switch (activeOption) {
            case 'Songs':
                return <RenderListSongSearch data={filteredSongs} />;
            case 'Albums':
                return <RenderListAlbumSearch data={filteredAlbums} />;
            case 'Artists':
                return <RenderListArtistSearch data={filteredArtists} />;
            case 'All':
            default:
                return (
                    <>
                        <RenderListArtistSearch data={filteredArtists} />
                        <RenderListSongSearch data={filteredSongs} />
                        <RenderListAlbumSearch data={filteredAlbums} />
                    </>
                );
        }
    };
    

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: colors.secondaryColor}}>
            <View style={[styles.container, {marginBottom: currentSong ? 83 : 0}]}>
                <View style={[styles.input, isFocused && styles.inputFocused, styles.search]}>
                    <View style={{flexDirection: 'row'}}>
                        <Image
                            style={styles.searchIcon}
                            source={require('../../../assets/home/findicon.png')}
                        />
                        <TextInput
                            style={[styles.searchInput]}
                            placeholder="What you want to listen to"
                            onChangeText={text => setSearch(text)}
                            value={search}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                    </View>
                    <TouchableOpacity onPress={() => setSearch('')}>
                        <CloseCircleTemplate color='black' size={22}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.optionSearch}>
                    { arrOptions.map(option => (
                        <TouchableOpacity 
                            key={option.id} 
                            style={[styles.optionSearchTitleTouch, {borderBottomWidth: option.option === activeOption ? 5 : 0}]} 
                            onPress={() => setActiveOption(option.option)}
                        >
                            <Text style={styles.optionSearchTitle}>{option.option}</Text>
                        </TouchableOpacity>
                    )) }
                </View>
                <ScrollView showsVerticalScrollIndicator={false} style={{marginTop: 24, marginBottom: 64}}>
                    <RenderResults />
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        backgroundColor: colors.secondaryColor,
    },
    search: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'lightgray',
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 32,
        gap: 8,
        justifyContent: 'space-between'
        
    },
    searchIcon: {
        width: 20,
        height: 20
    },
    searchInput: {
        fontSize: 16,
        
    },
    optionSearch: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginTop: 24
    },
    optionSearchTitleTouch: {
        borderBottomColor: colors.primaryColor,
        width: 70,
        alignItems: 'center',
        paddingBottom: 8
    },
    optionSearchTitle: {
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.primaryColor,
        padding: 10,
        borderRadius: 5,
    },
    inputFocused: {
        borderColor: colors.primaryColor,
        boxShadow: `0 0 8px ${colors.primaryColor}`,
    },
    
})