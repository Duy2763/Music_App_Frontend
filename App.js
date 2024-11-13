import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import Navbar from './src/components/navbar/navbar.jsx';
import HomeScreen from './src/components/home/home.jsx';
import SearchScreen from './src/components/search/search.jsx';
import FeedScreen from './src/components/feed/feed.jsx';
import LibraryScreen from './src/components/library/library.jsx';
import ChartScreen from './src/components/home/chart.jsx';
import AlbumeScreen from './src/components/home/album.jsx';
import ArtistScreen from './src/components/home/artist.jsx';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import store from './src/redux/store.js';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name='HomeMain' component={HomeScreen} options={{headerShown: false}}/>
    <Stack.Screen name='Chart' component={ChartScreen} options={{headerShown: false}}/>
    <Stack.Screen name='Albume' component={AlbumeScreen} options={{headerShown: false}}/>
    <Stack.Screen name='Artist' component={ArtistScreen} options={{headerShown: false}}/>
  </Stack.Navigator>
)

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator tabBar={(props) => <Navbar {...props} />}>
          {/* <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
          <Tab.Screen name="Search" component={SearchScreen}  options={{ headerShown: false }} /> */}
          <Tab.Screen name="Feed" component={FeedScreen} options={{ headerShown: false }} />
          <Tab.Screen name="Library" component={LibraryScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}


const styles = StyleSheet.create({
  
});
