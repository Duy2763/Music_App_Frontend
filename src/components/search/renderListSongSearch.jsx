import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import CircleIcon from "../icon/circleIcon";
import IconAndSoOn from "../icon/iconAndSoOn";
import { API_URL } from '@env';
import { AppContext } from "../contextAPI/appContext";
import { useContext } from "react";
import PlayButtonTemplate from "../icon/playIconTemplate";
import colors from "../../colors";

export default function RenderListSongSearch({ data }) {
    const { currentSong, currentTime, setCurrentTime, duration, setDuration, setCurrentSong } = useContext(AppContext);

    return (
        <View>
            {data.map(item => (
                <TouchableOpacity 
                    key={`${item._id}`}
                    style={styles.flatItem}
                    onPress={() => setCurrentSong(item)}
                >
                    <View style={styles.flatContent}>
                        <View style={styles.flatContentLeft}>
                            <Image
                                source={{uri: `${API_URL}/assets/images/song/${item.image}`}}
                                style={{width: 70, height: 70, borderRadius: 4}}
                            />
                            <View style={styles.flatContentCenter}>
                                <Text style={styles.textBig}>{item.name}</Text>
                                <Text style={styles.textSmall}>{item.artist.name}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                    <PlayButtonTemplate color={colors.thirdColor} size={12}/>
                                    <Text style={styles.textSmall}>{item.listens}</Text>
                                    <CircleIcon />
                                    {/* <Text style={styles.textSmall}>{item.duaration}</Text> */}
                                    <Text style={styles.textSmall}>3:12</Text>
                                </View>
                            </View>
                        </View>
                        <IconAndSoOn />
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
