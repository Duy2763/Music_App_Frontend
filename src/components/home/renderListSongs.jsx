import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import CircleIcon from "../icon/circleIcon";
import IconAndSoOn from "../icon/iconAndSoOn";

export default function RenderListSongs({ data }) {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {data.map(item => (
                <TouchableOpacity 
                    key={item.id}
                    style={styles.flatItem}
                    onPress={() => setSongCurrent(item)}
                >
                    <View style={styles.flatContent}>
                        <View style={styles.flatContentLeft}>
                            <Image
                                source={item.hinhAnh}
                            />
                            <View style={styles.flatContentCenter}>
                                <Text style={styles.textBig}>{item.name}</Text>
                                <Text style={styles.textSmall}>{item.artist}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                    <Text style={styles.textSmall}>{item.plays}M</Text>
                                    <CircleIcon />
                                    <Text style={styles.textSmall}>{item.duaration}</Text>
                                </View>
                            </View>
                        </View>
                        <IconAndSoOn />
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
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
