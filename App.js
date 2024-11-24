import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import Navbar from './src/components/navbar/navbar.jsx';
import HomeScreen from './src/components/home/home.jsx';
import SearchScreen from './src/components/search/search.jsx';
import FeedScreen from './src/components/feed/feedScreen.jsx';
import LibraryScreen from './src/components/library/library.jsx';
import ChartScreen from './src/components/home/chart.jsx';
import AlbumeScreen from './src/components/home/album.jsx';
import ArtistScreen from './src/components/home/artist.jsx';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Songs from './src/components/library/songs.jsx';
import Albums from './src/components/library/albums.jsx';
import Artists from './src/components/library/artists.jsx';
import WelcomePremium from './src/components/end/welcomePremium.jsx';
import OptionPremium from './src/components/end/optionPremium.jsx';
import { AppProvider } from './src/components/contextAPI/appContext.js';
import MiniPlayer from './src/miniPlayer.jsx';
import Begin from './src/components/launch/begin.jsx';
import SignIn from './src/components/launch/signIn.jsx';
import SignUp from './src/components/launch/signUp.jsx';

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

const LibraryStack = () => (
  <Stack.Navigator>
    <Stack.Screen name='LibraryMain' component={LibraryScreen} options={{headerShown: false}}/>
    <Stack.Screen name='Songs' component={Songs} options={{headerShown: false}}/>
    <Stack.Screen name='Albums' component={Albums} options={{headerShown: false}}/>
    <Stack.Screen name='Artists' component={Artists} options={{headerShown: false}}/>
    <Stack.Screen name='WelcomePremium' component={WelcomePremium} options={{headerShown: false}}/>
    <Stack.Screen name='OptionPremium' component={OptionPremium} options={{headerShown: false}}/>
  </Stack.Navigator>
)

const SeedStack = () => (
  <Stack.Navigator>
    <Stack.Screen name='FeedMain' component={FeedScreen} options={{headerShown: false}}/>
    <Stack.Screen name='Artist' component={ArtistScreen} options={{headerShown: false}}/>
  </Stack.Navigator>
)

const MainStack = () => (
  <Tab.Navigator tabBar={(props) => <Navbar {...props}/>}>
    <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
    <Tab.Screen name="Search" component={SearchScreen}  options={{ headerShown: false }} />
    <Tab.Screen name="Feed" component={SeedStack} options={{ headerShown: false }} />
    <Tab.Screen name="Library" component={LibraryStack} options={{ headerShown: false }} />
  </Tab.Navigator>
)

export default function App() {
  return (
    <AppProvider>
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='Begin' component={Begin} options={{headerShown: false}}/>
            <Stack.Screen name='SignUp' component={SignUp} options={{headerShown: false}}/>
            <Stack.Screen name='SignIn' component={SignIn} options={{headerShown: false}}/>
            <Stack.Screen name='MainStack' component={MainStack} options={{headerShown: false}}/>
          </Stack.Navigator>
        </NavigationContainer>
        <MiniPlayer/>
      </View>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  
});
