import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { Text, View } from "react-native";
import colors from "../../colors";
import TickBlueIcon from "../icon/tickBlueIcon";
import CircleIcon from "../icon/circleIcon";
import PlayButtonTemplate from "../icon/playIconTemplate";
import CircleIconTemplate from "../icon/circleIconTemplate";
import HeartIconTemplate from "../icon/heartIconTemplate";
import Icon from 'react-native-vector-icons/FontAwesome';
import IconAndSoOn from "../icon/iconAndSoOn";
import { useState, useEffect, useContext } from "react";
import { Modal } from "react-native";
import DownIconTemplate from "../icon/downIconTemplate";
import Comment from "./comment";
import feedStyle from "../../styles/feed/feedStyle.js";
import { API_URL } from '@env';
import { AppContext } from "../contextAPI/appContext.js";
import { Audio } from "expo-av";
import getTimeDifference from "../../getTimeDifference.js";
import { addCommentToSong, addReplyToComment, getAllSongs } from "../../../api.js";

const { height } = Dimensions.get('window');

export default function Feed() {
    const [input, setInput] = useState('');
    const [openComments, setOpenComments] = useState(null);
    const [likedPosts, setLikedPosts] = useState({});
    const { setCurrentSong, commentIdCurrent, optionAddComment, setOptionAddComment, songs,  setSongs} = useContext(AppContext);
    
    const handleAddComment = async (songId) => {
        const comment = {
            text: input,
            userId: '673a2a5f420d40f7a0504dbc', // Thay thế bằng ID người dùng thực tế
            userName: 'Nguyen Van A', // Thay thế bằng tên người dùng thực tế
            userImage: 'trinhthangbinh.jpg' // Thay thế bằng ảnh người dùng thực tế
        };
    
        // const commentFormat = {
        //     user: {
        //         id: comment.userId, // Thay thế bằng ID người dùng thực tế
        //         name: comment.userName, // Thay thế bằng tên người dùng thực tế
        //         image: comment.userImage // Thay thế bằng ảnh người dùng thực tế
        //     },
        //     text: input,
        //     timestamp: new Date().toISOString(), // Thêm timestamp hiện tại
        //     likes: 0, // Hoặc lấy giá trị thích ban đầu (có thể là 0)
        //     _id: '673a2a5f420d40f7a0504dzb' // Tạo một _id mới cho reply (hoặc lấy từ backend)
        // };
    
        try {
            // Thực hiện gọi API để thêm comment vào backend
            await addCommentToSong(songId, comment);
            fetchSongs();
            
            // Đặt lại input và thay đổi trạng thái liên quan
            setOptionAddComment('add-comment');
            setInput('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const fetchSongs = async () => {
        try {
          const data = await getAllSongs();
          setSongs(data);
        } catch (error) {
          console.error('Error fetching songs:', error);
        } 
    };

    useEffect(() => {
        fetchSongs();
    }, []);

    const countCommentsAndReplies = (song) => {
        let totalComments = 0;
        let totalReplies = 0;
    
        // Duyệt qua tất cả comment trong bài hát
        song.comments.forEach(comment => {
            totalComments++; // Tăng số lượng comment
            totalReplies += (comment.replies?.length || 0); // Kiểm tra replies trước khi lấy length
        });
    
        // Trả về tổng số comment và reply
        return totalComments + totalReplies;
    };

    const handleAddReply = async (songId, commentIdCurrent) => {
        console.log(commentIdCurrent);
        
        const reply = {
          text: input,
          userId: '673a2a5f420d40f7a0504dbc', // Thay thế bằng ID người dùng thực tế
          userName: 'Trần Vũ Duy', // Thay thế bằng tên người dùng thực tế
          userImage: 'trinhthangbinh.jpg' // Thay thế bằng ảnh người dùng thực tế
        };
       
        
        // const replyFormat = {
        //     user: {
        //         id: reply.userId, // Thay thế bằng ID người dùng thực tế
        //         name: reply.userName, // Thay thế bằng tên người dùng thực tế
        //         image: reply.userImage // Thay thế bằng ảnh người dùng thực tế
        //     },
        //     text: input,
        //     timestamp: new Date().toISOString(), // Thêm timestamp hiện tại
        //     likes: 0, // Hoặc lấy giá trị thích ban đầu (có thể là 0)
        //     _id: '673a2a5f420d40f7a0504dbc' // Tạo một _id mới cho reply (hoặc lấy từ backend)
        // };
        
        try {
            const data = await addReplyToComment(songId, commentIdCurrent, reply);
            fetchSongs();
            setOptionAddComment('add-comment');  
            setInput('');
        } catch (error) {
          console.error('Error adding reply:', error);
        }
      };

      const toggleModal = (id) => {
        setOpenComments((prev) => {
            const newState = prev === id ? null : id;
            if (newState === id) {
                setInput(''); // reset input khi mở modal
            }
            return newState;
        });
    };

    const toggleLike = (id) => {
        setLikedPosts((prevLikedPosts) => ({
            ...prevLikedPosts,
            [id]: !prevLikedPosts[id],
        }));
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {songs.map(song => (
                <View key={song._id} style={feedStyle.feedContainer}>
                    {/* Feed content */}
                    <View style={feedStyle.feedTitle}>
                        <Image 
                            style={feedStyle.feedAvatar} 
                            source={{uri: `${API_URL}/assets/images/artist/${song.artist.image}`}}
                        />
                        <View>
                            <View style={feedStyle.feedName}>
                                <Text style={feedStyle.feedNameText}>{song.artist.name}</Text>
                                <TickBlueIcon />
                            </View>
                            <View style={feedStyle.feedTime}>
                                <Text style={feedStyle.feedTimeText}>Posted a track</Text>
                                <CircleIcon />
                                <Text style={feedStyle.feedTimeText}>{getTimeDifference(song.timestamp)}</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => setCurrentSong(song)}>
                        <ImageBackground
                            style={feedStyle.feedimageBackgroundContainer}
                            source={{uri: `${API_URL}/assets/images/song/${song.image}`}}
                        >
                            <View style={feedStyle.feedimageBackground}>
                                <View>
                                    <Text style={feedStyle.feedimageBackgroundTitleBig}>{song.name}</Text>    
                                </View>   
                                <View style={feedStyle.feedimageBackgroundSub}>
                                    <Text style={feedStyle.feedimageBackgroundTitleSmall}>{song.artist.name}</Text>  
                                    <View style={feedStyle.feedimageBackgroundSubSub}>
                                        <View>
                                            <PlayButtonTemplate size={12} color={colors.secondaryColor}/> 
                                        </View>
                                        <Text style={feedStyle.feedimageBackgroundTitleSmall}>{song.listens}</Text>
                                            <CircleIconTemplate size={7} color={colors.secondaryColor}/> 
                                        <Text style={feedStyle.feedimageBackgroundTitleSmall}>4:10</Text>
                                    </View>
                                </View>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                    
                    {/* Social buttons */}
                    <View style={feedStyle.feedSocial}>
                        <View style={feedStyle.feedSocialLeft}>
                            <View style={feedStyle.feedSocialLeftItem}>
                                <TouchableOpacity onPress={() => toggleLike(song._id)}>
                                    <HeartIconTemplate size={16} color={likedPosts[song._id] ? 'red' : colors.thirdColor} />
                                </TouchableOpacity>
                                <Text style={feedStyle.feedSocialLeftItemCount}>{song.likes}</Text>
                            </View>
                            <TouchableOpacity onPress={() => toggleModal(song._id)}>
                                <View style={feedStyle.feedSocialLeftItem}>
                                    <Icon name="comment" size={16} color={colors.thirdColor} />
                                    <Text style={feedStyle.feedSocialLeftItemCount}>{countCommentsAndReplies(song)}</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={feedStyle.feedSocialLeftItem}>
                                <Icon name="retweet" size={16} color={colors.thirdColor} />
                                <Text style={feedStyle.feedSocialLeftItemCount}>{song.shares}</Text>
                            </View>
                        </View>
                        <IconAndSoOn />
                    </View>

                    {/* Modal for comments */}
                    <Modal
                        visible={openComments === song._id}
                        transparent={true}
                        animationType="slide"
                        onRequestClose={() => toggleModal(song._id)}
                    >
                        <View style={feedStyle.modalContainer}>
                            <KeyboardAvoidingView
                                behavior={Platform.OS === "ios" ? "padding" : "height"}
                                style={styles.modalContent}
                            >
                                <View style={feedStyle.modalHeader}>
                                    <Text style={{ fontSize: 18 }}>{countCommentsAndReplies(song)} comments</Text>
                                    <TouchableOpacity onPress={() => toggleModal(song._id)}>
                                        <DownIconTemplate size={24} color={colors.thirdColor} />
                                    </TouchableOpacity>
                                </View>
                                <Comment comments={song.comments || []} />
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
                                            value={input}
                                        />
                                        <Icon name="smile-o" size={25} color={colors.thirdColor}/>
                                    </View>
                                    {
                                        input.length > 0 && 
                                        <TouchableOpacity onPress={() => {
                                            optionAddComment === "add-comment" 
                                            ? handleAddComment(song._id)
                                            : handleAddReply(song._id ,commentIdCurrent)
                                        
                                        }}>
                                            <Icon name="send" size={24} color={colors.primaryColor} />
                                        </TouchableOpacity>
                                        
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
        borderRadius: 25
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
        marginTop: height / 3,
    }
});
