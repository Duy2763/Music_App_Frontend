import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function RenderListAlbume({ data }) {
    const navigation = useNavigation();
    return (
        <ScrollView 
            horizontal={true} 
            showsHorizontalScrollIndicator={false}
        >
            {data.map(item => (
                <TouchableOpacity 
                    key={item.id} 
                    onPress={() => { navigation.navigate('Albume', { albume: item }) }}
                >
                    <View style={styles.flatItem}>
                        <Image
                            source={item.hinhAnh}
                        />
                        <Text style={[styles.flatTitleSmall, { color: 'black', marginTop: 4 }]}>{item.name}</Text>
                        <Text style={styles.flatTitleSmall}>{item.artist}</Text>
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
    flatTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
        marginTop: 32,
    },
    flatTitleSmall: {
        color: 'gray',
    },
});
