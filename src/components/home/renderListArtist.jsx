import { useNavigation } from "@react-navigation/native";
import { ScrollView, StyleSheet, TouchableOpacity, Image, Text, View } from "react-native";

export default function RenderListArtist({ data }) {
    const navigation = useNavigation();
    return (
        <ScrollView 
            horizontal={true} 
            showsHorizontalScrollIndicator={false}
        >
            {data.map(item => (
                <TouchableOpacity 
                    key={item.id} 
                    onPress={() => { navigation.navigate('Artist', { artist: item }) }}
                >
                    <View style={[styles.flatItem, styles.flatItemArtits]}>
                        <Image
                            source={item.hinhAnh}
                        />
                        <Text style={styles.flatTitleSmall}>{item.name}</Text>
                        <TouchableOpacity style={styles.followButton}>
                            <Text style={styles.followButtonText}>Follow</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    flatItem: {
        marginRight: 16
    },
    flatTitleSmall: {
        color: 'gray',
    },
    followButton: {
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 50
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
});
