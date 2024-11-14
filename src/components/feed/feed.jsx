import { Animated, Dimensions, Image, ImageBackground, ScrollView, StatusBar, StyleSheet, TouchableOpacity } from "react-native"
import { SafeAreaView, Text, View } from "react-native"
import CastIcon from "../icon/castIcon"
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
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');


export default function FeedScreen() {
    const [isActiveHeart, setActiveHeart] = useState(false);
    const [isOpenComment, setOpenComment] = useState(false);
    const [isBlurVisible, setIsBlurVisible] = useState(false);
    const translateY = useRef(new Animated.Value(height)).current;

    const arrArtists = [
        {id: '1', name: 'Jennifer Wilson', hinhAnh: require('../../../assets/home/Image39.png'), followers: 65.1, about: {hinhAnh: require('../../../assets/home/Image73.png'), description: 'Do in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor' }},
        {id: '2', name: 'Elizabeth Hall', hinhAnh: require('../../../assets/home/Image40.png'), followers: 63.1, about: {hinhAnh: require('../../../assets/home/Image73.png'), description: 'Do in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor' }},
        {id: '3', name: 'Anthony Martial', hinhAnh: require('../../../assets/home/Image41.png'), followers: 69.1, about: {hinhAnh: require('../../../assets/home/Image73.png'), description: 'Do in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor' }},
    ]

    const arrSongs = [
        {id: '1', name: 'Reflection', artist: 'Christina Aguilera', hinhAnh: require('../../../assets/home/Container26.png')},
        {id: '2', name: 'In the starts', artist: 'Benson Boone', hinhAnh: require('../../../assets/home/Container27.png')},
    ]
    const arrFeeds = [
        {
            id: '1',
            timestamp: '2024-11-12T11:14:18.000Z',
            artist: {
                id: '1', 
                name: 'Jennifer Wilson', 
                hinhAnh: require('../../../assets/home/Image39.png'), 
                followers: 65.1, 
                about: {
                    hinhAnh: require('../../../assets/home/Image73.png'), 
                    description: 'Do in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor' 
                }
            },
            track: {
                id: '2', 
                name: 'In the starts', 
                artist: 'Benson Boone', 
                hinhAnh: require('../../../assets/home/Image45.png'),
                listens: 125,
                likeCounts: 100,
                retweetCounts: 2,
                comments: [
                    {
                        id: '1',
                        text: 'Hay quá đi',
                        timestamp: '2024-11-12T11:15:00.000Z',
                        likeCounts: 20,
                        user: {
                            id: '1',
                            name: 'duy',
                            hinhAnh: require('../../../assets/home/Image39.png')
                        },
                        replies: [
                            {
                                id: '1',
                                text: 'Hay thiệt!!!',
                                timestamp: '2024-11-12T11:16:00.000Z',
                                likeCounts: 20,
                                user: {
                                    id: '1',
                                    name: 'duy',
                                    hinhAnh: require('../../../assets/home/Image41.png')
                                },

                            },
                            {
                                id: '2',
                                text: 'Cảm ơn bạn!!!',
                                timestamp: '2024-11-12T11:17:00.000Z',
                                likeCounts: 20,
                                user: {
                                    id: '2',
                                    name: 'Jennifer Wilson',
                                    hinhAnh: require('../../../assets/home/Image39.png')
                                },

                            }
                        ]

                    },
                    {
                        id: '2',
                        text: 'Tuyệt vời',
                        timestamp: '2024-11-12T11:16:00.000Z',
                        likeCounts: 10,
                        user: {
                            id: '4',
                            name: 'hehehe',
                            hinhAnh: require('../../../assets/home/Image40.png')
                        },
                        replies: [
                            {
                                id: '1',
                                text: 'Cảm ơn bạn!!!',
                                timestamp: '2024-11-12T11:17:00.000Z',
                                likeCounts: 20,
                                user: {
                                    id: '2',
                                    name: 'Jennifer Wilson',
                                    hinhAnh: require('../../../assets/home/Image39.png')
                                },

                            }
                        ]

                    }
                ]
            },
        }
    ]

    const toggleModal = () => {
        setOpenComment(!isOpenComment)
        if (!isOpenComment) {
            Animated.timing(translateY, {
                toValue: height / 3,
                duration: 300,
                useNativeDriver: true,
            }).start(() => setIsBlurVisible(true));
        } else {
            setIsBlurVisible(false);
            Animated.timing(translateY, {
                toValue: height,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    };

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: colors.secondaryColor}}>
             <StatusBar backgroundColor={colors.secondaryColor} barStyle="dark-content" />
            <View style={styles.container}>
                <View style={styles.headerTop}>
                    <Text style={styles.headerTopText}>Feed</Text>
                    <CastIcon/>
                </View>
                <ScrollView>
                    {
                        arrFeeds.map(feed => (
                            <View key={feed.id} style={styles.feedContainer}>
                                <View style={styles.feedTitle}>
                                    <Image
                                        style={styles.feedAvatar}
                                        source={feed.artist.hinhAnh}
                                    />
                                    <View>
                                        <View style={styles.feedName}>
                                            <Text style={styles.feedNameText}>{feed.artist.name}</Text>
                                            <TickBlueIcon/>
                                        </View>
                                        <View style={styles.feedTime}> 
                                            <Text style={styles.feedTimeText}>Posted a track</Text>
                                            <CircleIcon/>
                                            <Text>{getTimeDifference(feed.timestamp)}</Text>
                                        </View>
                                    </View>
                                </View>
                                <ImageBackground
                                    style={styles.feedimageBackgroundContainer}
                                    source={feed.track.hinhAnh}
                                >
                                    <View style={styles.feedimageBackground}>
                                        <View>
                                            <Text style={styles.feedimageBackgroundTitleBig}>{feed.track.name}</Text>    
                                        </View>   
                                        <View style={styles.feedimageBackgroundSub}>
                                            <Text style={styles.feedimageBackgroundTitleSmall}>{feed.track.artist}</Text>  
                                            <View style={styles.feedimageBackgroundSubSub}>
                                                <View>
                                                    <PlayButtonTemplate size={12} color={colors.secondaryColor}/> 
                                                </View>
                                                <Text style={styles.feedimageBackgroundTitleSmall}>{feed.track.listens}</Text>
                                                    <CircleIconTemplate size={7} color={colors.secondaryColor}/> 
                                                <Text style={styles.feedimageBackgroundTitleSmall}>05:15</Text>
                                            </View>
                                        </View>
                                    </View>
                                </ImageBackground>
                                <View style={styles.feedSocial}>
                                    <View style={styles.feedSocialLeft}>
                                        <View style={styles.feedSocialLeftItem}>
                                            <TouchableOpacity onPress={() => setActiveHeart(!isActiveHeart)}>
                                                { isActiveHeart 
                                                ? 
                                                    <HeartIconTemplate size={16} color='red'/>
                                                : 
                                                    <HeartIconTemplate size={16} color={colors.thirdColor}/>
                                                }
                                            </TouchableOpacity>
                                            <Text  style={styles.feedSocialLeftItemCount}>{feed.track.likeCounts}</Text>
                                        </View>
                                        <TouchableOpacity onPress={toggleModal}>
                                            <View style={styles.feedSocialLeftItem}>
                                                
                                                    <Icon name="comment" size={16} color={colors.thirdColor} />
                                                <Text  style={styles.feedSocialLeftItemCount}>{feed.track.comments.length}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={styles.feedSocialLeftItem}>
                                            <Icon name="retweet" size={16} color={colors.thirdColor} />
                                            <Text  style={styles.feedSocialLeftItemCount}>{feed.track.retweetCounts}</Text>
                                        </View>
                                        <Modal
                                            visible={isOpenComment}
                                            transparent={true}
                                            animationType="slide"
                                            onRequestClose={toggleModal}
                                        >
                                            <View style={styles.modalContainer}>
                                                <View style={styles.modalContent}>
                                                    <View style={styles.modalHeader}>
                                                        <Text style={{fontSize: 18}}>{feed.track.comments.length} comments</Text>
                                                        <TouchableOpacity onPress={toggleModal}>
                                                            <DownIconTemplate size={24} color={colors.thirdColor}/>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <ScrollView>
                                                        {
                                                            feed.track.comments.map(comment => (
                                                                <View key={comment.id}>
                                                                    <View style={styles.commentItem}>
                                                                        <View style={styles.commentItemLeftContainer}>
                                                                            <Image
                                                                                style={styles.avatarComment}
                                                                                source={comment.user.hinhAnh}
                                                                            />
                                                                            <View style={styles.commentItemLeft}>
                                                                                <View style={styles.commentItemLeftTop}>
                                                                                    <Text style={styles.commentItemLeftTopName}>{comment.user.name}</Text>
                                                                                    <Text style={styles.commentItemLeftTopComment}>{comment.text}</Text>
                                                                                </View>
                                                                                <View style={styles.commentItemLeftBottom}>
                                                                                    <Text style={styles.commentItemLeftBottomName}>{getTimeDifference(comment.timestamp)}</Text>
                                                                                    <Text style={styles.commentItemLeftBottomName}>{comment.likeCounts} like</Text>
                                                                                    <TouchableOpacity>
                                                                                        <Text style={styles.commentItemLeftBottomName}>Reply</Text>
                                                                                    </TouchableOpacity>
                                                                                </View>
                                                                            </View>
                                                                        </View>
                                                                        <View>
                                                                            <HeartIconTemplate size={15} color={colors.thirdColor}/>
                                                                        </View>
                                                                    </View>
                                                                    <View>
                                                                        {
                                                                            comment.replies.map(reply => {
                                                                                <View style={styles.commentItem} key={reply.id}>
                                                                                    <View style={styles.commentItemLeftContainer}>
                                                                                        <Image
                                                                                            style={styles.avatarComment}
                                                                                            source={comment.user.hinhAnh}
                                                                                        />
                                                                                        <View style={styles.commentItemLeft}>
                                                                                            <View style={styles.commentItemLeftTop}>
                                                                                                <Text style={styles.commentItemLeftTopName}>{reply.user.name}</Text>
                                                                                                <Text style={styles.commentItemLeftTopComment}>{reply.text}</Text>
                                                                                            </View>
                                                                                            <View style={styles.commentItemLeftBottom}>
                                                                                                <Text style={styles.commentItemLeftBottomName}>{getTimeDifference(reply.timestamp)}</Text>
                                                                                                <Text style={styles.commentItemLeftBottomName}>{reply.likeCounts} like</Text>
                                                                                                <TouchableOpacity>
                                                                                                    <Text style={styles.commentItemLeftBottomName}>Reply</Text>
                                                                                                </TouchableOpacity>
                                                                                            </View>
                                                                                        </View>
                                                                                    </View>
                                                                                    <View>
                                                                                        <HeartIconTemplate size={15} color={colors.thirdColor}/>
                                                                                    </View>
                                                                                </View>
                                                                            })
                                                                        }
                                                                    </View>
                                                                </View>
                                                            ))
                                                        }
                                                    </ScrollView>
                                                </View>
                                            </View>
                                        </Modal>
                                    </View>
                                    <IconAndSoOn/>
                                </View>
                            </View>
                        ))
                    }
                </ScrollView>
            </View>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    commentItemLeftContainer: {
        flexDirection: 'row',
        gap: 6,
    },
    avatarComment: {
        width: 37,
        height: 37
    },
    commentItemLeft: {
        gap: 4
    },
    commentItemLeftTop: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4
    },
    commentItemLeftTopName: {
        fontWeight: 'bold',
        fontSize: 16
    },
    commentItemLeftTopComment: {
    },
    commentItemLeftBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    commentItemLeftBottomName: {
        fontSize: 12
    },
    commentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },


    container: {
        backgroundColor: colors.secondaryColor,
        paddingHorizontal: 24
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerTopText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    feedContainer: {
        marginVertical: 24
    },
    feedTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    feedAvatar: {
        width: 40,
        height: 40
    },
    feedName: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    feedNameText: {
        fontWeight: 'bold',
        fontSize: 15
    },
    feedTime: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    feedTimeText: {
        fontSize: 13
    },
    feedimageBackgroundContainer: {
        width: '100%',
        height: width - 32,
        justifyContent: 'flex-end',
        marginTop: 16
    },
    feedimageBackground: {
        padding: 22,
        gap: 4,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
      
     },
    feedimageBackgroundSub: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    feedimageBackgroundSubSub: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    feedimageBackgroundTitleBig: {
        fontSize: 22,
        color: colors.secondaryColor,
        fontWeight: 'bold'
    },
    feedimageBackgroundTitleSmall: {
        color: colors.secondaryColor,
        fontWeight: 'bold'
    },
    feedSocial: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8
    },  
    feedSocialLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16
    },
    feedSocialLeftItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6
    },
    feedSocialLeftItemCount: {
        color: colors.thirdColor,
        fontSize: 16
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        height: height * 2 / 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    closeButton: {
        marginTop: 20,
        color: 'blue',
    },
    blurBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: height * 2 / 3,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'space-between'
    }
})