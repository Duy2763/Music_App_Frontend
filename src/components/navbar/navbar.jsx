import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 

const Navbar = ({ state, descriptors, navigation }) => {
  const icons = {
    Home: 'home-outline',
    Search: 'search-outline',
    Feed: 'list-outline',
    Library: 'library-outline',
  };

  return (
    <View style={styles.navbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={styles.tab}
          >
            <Icon name={icons[route.name]} size={24} color={isFocused ? '#25C3D9' : 'gray'} />
            <Text style={[styles.tabText, { color: isFocused ? '#25C3D9' : 'gray' }]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: 'lightgray'
  },
  tab: {
    alignItems: 'center',
    padding: 10,
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
});

export default Navbar;
