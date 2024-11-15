import { Animated, Dimensions, Image, ImageBackground, ScrollView, TouchableOpacity } from "react-native"
import { Text, View } from "react-native"
import colors from "../../colors"
import getTimeDifference from "../../getTimeDifference"
import TickBlueIcon from "../icon/tickBlueIcon"
import CircleIcon from "../icon/circleIcon"
import PlayButtonTemplate from "../icon/playIconTemplate"
import CircleIconTemplate from "../icon/circleIconTemplate"
import HeartIconTemplate from "../icon/heartIconTemplate"
import Icon from 'react-native-vector-icons/FontAwesome';
import IconAndSoOn from "../icon/iconAndSoOn"
import { useRef, useState } from "react"
import { Modal } from "react-native"
import DownIconTemplate from "../icon/downIconTemplate";
const { height } = Dimensions.get('window');
import Comment from "./comment"
import feedStyle from "../../styles/feed/feedStyle.js"



export default function Feed({ arrFeeds }) {
    const [openComments, setOpenComments] = useState(null); // Track the ID of the open modal
    const [isBlurVisible, setIsBlurVisible] = useState(false);
    const translateY = useRef(new Animated.Value(height)).current;
    const [likedPosts, setLikedPosts] = useState({});

    const toggleModal = (id) => {
        const isCurrentlyOpen = openComments === id; // Check if the clicked modal is already open
        if (isCurrentlyOpen) {
            // Close the modal if it was already open
            setOpenComments(null);
            setIsBlurVisible(false);
            Animated.timing(translateY, {
                toValue: height,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            // Open the new modal
            setOpenComments(id);
            Animated.timing(translateY, {
                toValue: height / 3,
                duration: 300,
                useNativeDriver: true,
            }).start(() => setIsBlurVisible(true));
        }
    };

    const toggleLike = (id) => {
        setLikedPosts((prevLikedPosts) => ({
            ...prevLikedPosts,
            [id]: !prevLikedPosts[id], // Toggle like state
        }));
    };

    return (
        <ScrollView>
            {
                arrFeeds.map(feed => (
                    <View key={feed.id} style={feedStyle.feedContainer}>
                        <View style={feedStyle.feedTitle}>
                            <Image
                                style={feedStyle.feedAvatar}
                                source={feed.artist.hinhAnh}
                            />
                            <View>
                                <View style={feedStyle.feedName}>
                                    <Text style={feedStyle.feedNameText}>{feed.artist.name}</Text>
                                    <TickBlueIcon/>
                                </View>
                                <View style={feedStyle.feedTime}> 
                                    <Text style={feedStyle.feedTimeText}>Posted a track</Text>
                                    <CircleIcon/>
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
                        <View style={feedStyle.feedSocial}>
                            <View style={feedStyle.feedSocialLeft}>
                                <View style={feedStyle.feedSocialLeftItem}>
                                    <TouchableOpacity onPress={() => toggleLike(feed.id)}>
                                        <HeartIconTemplate 
                                            size={16} 
                                            color={likedPosts[feed.id] ? 'red' : colors.thirdColor} 
                                        />
                                    </TouchableOpacity>
                                    <Text  style={feedStyle.feedSocialLeftItemCount}>{feed.track.likeCounts}</Text>
                                </View>
                                <TouchableOpacity onPress={() => toggleModal(feed.id)}>
                                    <View style={feedStyle.feedSocialLeftItem}>
                                        <Icon name="comment" size={16} color={colors.thirdColor} />
                                    <Text  style={feedStyle.feedSocialLeftItemCount}>{feed.track.comments.length}</Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={feedStyle.feedSocialLeftItem}>
                                    <Icon name="retweet" size={16} color={colors.thirdColor} />
                                    <Text  style={feedStyle.feedSocialLeftItemCount}>{feed.track.retweetCounts}</Text>
                                </View>
                            </View>
                            <IconAndSoOn/>
                        </View>

                        {/* Modal for comments */}
                        <Modal
                            visible={openComments === feed.id} // Show modal only if this feed's id matches the open id
                            transparent={true}
                            animationType="slide"
                            onRequestClose={() => toggleModal(feed.id)}
                        >
                            <View style={feedStyle.modalContainer}>
                                <View style={feedStyle.modalContent}>
                                    <View style={feedStyle.modalHeader}>
                                        <Text style={{fontSize: 18}}>{feed.track.comments.length} comments</Text>
                                        <TouchableOpacity onPress={() => toggleModal(feed.id)}>
                                            <DownIconTemplate size={24} color={colors.thirdColor}/>
                                        </TouchableOpacity>
                                    </View>
                                    <Comment comments={feed.track.comments}/>
                                </View>
                            </View>
                        </Modal>
                    </View>
                ))
            }
        </ScrollView>
    );
}
