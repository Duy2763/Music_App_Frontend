import { TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function PlusIcon({size, color}) {
    return (
        <Icon name="plus" size={size} color={color} />
    )
}