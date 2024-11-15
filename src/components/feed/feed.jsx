import { Animated, Dimensions, Image, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, TextInput, Keyboard } from "react-native";
import { Text, View } from "react-native";
import colors from "../../colors";
import getTimeDifference from "../../getTimeDifference";
import TickBlueIcon from "../icon/tickBlueIcon";
import CircleIcon from "../icon/circleIcon";
import PlayButtonTemplate from "../icon/playIconTemplate";
import CircleIconTemplate from "../icon/circleIconTemplate";
import HeartIconTemplate from "../icon/heartIconTemplate";
import Icon from 'react-native-vector-icons/FontAwesome';
import IconAndSoOn from "../icon/iconAndSoOn";
import { useRef, useState, useEffect } from "react";
import { Modal } from "react-native";
import DownIconTemplate from "../icon/downIconTemplate";
import Comment from "./comment";
import feedStyle from "../../styles/feed/feedStyle.js";
const { height } = Dimensions.get('window');

export default function Feed({ arrFeeds }) {
    const [input, setInput] = useState('');
    const [openComments, setOpenComments] = useState(null);
    const [isBlurVisible, setIsBlurVisible] = useState(false);
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const translateY = useRef(new Animated.Value(height)).current;
    const [likedPosts, setLikedPosts] = useState({});

    // Listen for keyboard events to adjust the modal position
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
            setKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardVisible(false);
        });
        
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const toggleModal = (id) => {
        const isCurrentlyOpen = openComments === id; // Check if the clicked modal is already open
        if (isCurrentlyOpen) {
            setOpenComments(null);
            setIsBlurVisible(false);
            Animated.timing(translateY, {
                toValue: height,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            setOpenComments(id);
            Animated.timing(translateY, {
                toValue: keyboardVisible ? height / 2 : height / 3, // Adjust based on keyboard visibility
                duration: 300,
                useNativeDriver: true,
            }).start(() => setIsBlurVisible(true));
        }
    };

    const toggleLike = (id) => {
        setLikedPosts((prevLikedPosts) => ({
            ...prevLikedPosts,
            [id]: !prevLikedPosts[id],
        }));
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {arrFeeds.map(feed => (
                <View key={feed.id} style={feedStyle.feedContainer}>
                    {/* Feed content */}
                    <View style={feedStyle.feedTitle}>
                        <Image style={feedStyle.feedAvatar} source={feed.artist.hinhAnh} />
                        <View>
                            <View style={feedStyle.feedName}>
                                <Text style={feedStyle.feedNameText}>{feed.artist.name}</Text>
                                <TickBlueIcon />
                            </View>
                            <View style={feedStyle.feedTime}>
                                <Text style={feedStyle.feedTimeText}>Posted a track</Text>
                                <CircleIcon />
                                <Text>{getTimeDifference(feed.timestamp)}</Text>
                            </View>
                        </View>
                    </View>
                    <ImageBackground
                        style={feedStyle.feedimageBackgroundContainer}
                        source={feed.track.hinhAnh}
                    >
                        <View style={feedStyle.feedimageBackground}>
                            <View>
                                <Text style={feedStyle.feedimageBackgroundTitleBig}>{feed.track.name}</Text>    
                            </View>   
                            <View style={feedStyle.feedimageBackgroundSub}>
                                <Text style={feedStyle.feedimageBackgroundTitleSmall}>{feed.track.artist}</Text>  
                                <View style={feedStyle.feedimageBackgroundSubSub}>
                                    <View>
                                        <PlayButtonTemplate size={12} color={colors.secondaryColor}/> 
                                    </View>
                                    <Text style={feedStyle.feedimageBackgroundTitleSmall}>{feed.track.listens}</Text>
                                        <CircleIconTemplate size={7} color={colors.secondaryColor}/> 
                                    <Text style={feedStyle.feedimageBackgroundTitleSmall}>05:15</Text>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                    {/* Social buttons */}
                    <View style={feedStyle.feedSocial}>
                        <View style={feedStyle.feedSocialLeft}>
                            <View style={feedStyle.feedSocialLeftItem}>
                                <TouchableOpacity onPress={() => toggleLike(feed.id)}>
                                    <HeartIconTemplate size={16} color={likedPosts[feed.id] ? 'red' : colors.thirdColor} />
                                </TouchableOpacity>
                                <Text style={feedStyle.feedSocialLeftItemCount}>{feed.track.likeCounts}</Text>
                            </View>
                            <TouchableOpacity onPress={() => toggleModal(feed.id)}>
                                <View style={feedStyle.feedSocialLeftItem}>
                                    <Icon name="comment" size={16} color={colors.thirdColor} />
                                    <Text style={feedStyle.feedSocialLeftItemCount}>{feed.track.comments.length}</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={feedStyle.feedSocialLeftItem}>
                                <Icon name="retweet" size={16} color={colors.thirdColor} />
                                <Text style={feedStyle.feedSocialLeftItemCount}>{feed.track.retweetCounts}</Text>
                            </View>
                        </View>
                        <IconAndSoOn />
                    </View>

                    {/* Modal for comments */}
                    <Modal
                        visible={openComments === feed.id}
                        transparent={true}
                        animationType="slide"
                        onRequestClose={() => toggleModal(feed.id)}
                    >
                        <View style={feedStyle.modalContainer}>
                            <KeyboardAvoidingView
                                behavior={Platform.OS === "ios" ? "padding" : "height"}
                                style={styles.modalContent}
                            >
                                <View style={feedStyle.modalHeader}>
                                    <Text style={{ fontSize: 18 }}>{feed.track.comments.length} comments</Text>
                                    <TouchableOpacity onPress={() => toggleModal(feed.id)}>
                                        <DownIconTemplate size={24} color={colors.thirdColor} />
                                    </TouchableOpacity>
                                </View>
                                <Comment comments={feed.track.comments} />
                                <View style={styles.inputInputImage}>
                                    <Image
                                        style={styles.image}
                                        source={require('../../../assets/home/Image45.png')}
                                    />
                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            style={{ fontSize: 18 }}
                                            placeholder="Write a comment..."
                                            placeholderTextColor={colors.thirdColor}
                                            onChangeText={text => setInput(text)}
                                        />
                                        <Icon name="smile-o" size={25} color={colors.thirdColor} />
                                    </View>
                                    {
                                        input && <Icon name="send" size={24} color={colors.primaryColor} />
                                    }
                                </View>
                            </KeyboardAvoidingView>
                        </View>
                    </Modal>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    inputInputImage: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingTop: 16,
        marginBottom: 24
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: '50%'
    },
    inputContainer: {
        flex: 1,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        justifyContent: 'space-between',
        borderRadius: 32,
        borderColor: colors.thirdColor
    },
    modalContent: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 16,
        marginTop: height / 3, // Add padding to make room for the modal
    }
});
