import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import CircleIcon from "../icon/circleIcon";
import IconAndSoOn from "../icon/iconAndSoOn";
import { API_URL } from '@env';
import { AppContext } from "../contextAPI/appContext";
import { useContext } from "react";
import colors from "../../colors";
import UserIconTemplate from "../icon/userIconTemplate";

export default function RenderListAlbumSearch({ data }) {
    const { currentSong, currentTime, setCurrentTime, duration, setDuration, setCurrentSong } = useContext(AppContext);

    return (
        <View>
            {data.map(item => (
                <TouchableOpacity 
                    key={`${item._id}`}
                    style={styles.flatItem}
                    // onPress={() => setCurrentSong(item)}
                >
                    <View style={styles.flatContent}>
                        <View style={styles.flatContentLeft}>
                            <Image
                                source={{uri: `${API_URL}/assets/images/album/${item.image}`}}
                                style={{width: 70, height: 70, borderRadius: 4}}
                            />
                            <View style={styles.flatContentCenter}>
                                <Text style={styles.textBig}>{item.name}</Text>
                                <Text style={styles.textSmall}>{item.artist.name}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                    <UserIconTemplate color={colors.thirdColor} size={12}/>
                                    <Text style={styles.textSmall}>{item.followers} Followers</Text>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity style={{borderWidth: 1, borderColor: colors.thirdColor, paddingVertical: 8, paddingHorizontal: 16, borderRadius: 16}}>
                            <Text style={{color: colors.thirdColor}}>Follow</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    flatItem: {
        paddingBottom: 16
    },
    flatContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    flatContentLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    flatContentCenter: {
        
    },
    textBig: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    textSmall: {
        color: 'gray'
    }
});
