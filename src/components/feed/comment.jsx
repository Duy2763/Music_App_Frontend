import { Image, ScrollView, TouchableOpacity } from "react-native"
import { Text, View } from "react-native"
import colors from "../../colors"
import getTimeDifference from "../../getTimeDifference"
import HeartIconTemplate from "../icon/heartIconTemplate"
import feedStyle from "../../styles/feed/feedStyle.js"
import { useContext, useEffect, useState } from "react"
import { API_URL } from '@env';
import { AppContext } from "../contextAPI/appContext.js"
import { getAllSongs } from "../../../api.js"

export default function Comments({ comments }) {
    const [likedComments, setLikedComments] = useState({});
    const [likedReplies, setLikedReplies] = useState({});
    const { setCommentIdCurrent, commentIdCurrent } = useContext(AppContext);
   

    const toggleLikeComment = (commentId) => {
        setLikedComments(prevState => ({
            ...prevState,
            [commentId]: !prevState[commentId], // Toggle like for this comment
        }));
    };

    const toggleLikeReply = (commentId, replyId) => {
        setLikedReplies(prevState => ({
            ...prevState,
            [commentId]: {
                ...prevState[commentId],
                [replyId]: !prevState[commentId]?.[replyId], // Toggle like for this reply
            },
        }));
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {
                comments.map(comment => (
                    <View key={`${comment._id}`} style={feedStyle.commentContainer}>
                        <View style={feedStyle.commentItem}>
                            <View style={feedStyle.commentItemLeftContainer}>
                                <Image
                                    style={feedStyle.avatarComment}
                                    source={{uri: `${API_URL}/assets/images/artist/${comment.user.image}`}}
                                />
                                <View style={feedStyle.commentItemLeft}>
                                    <View style={feedStyle.commentItemLeftTop}>
                                        <Text style={feedStyle.commentItemLeftTopName}>{comment.user.name}</Text>
                                    </View>
                                    <Text style={feedStyle.commentItemLeftTopComment}>{comment.text}</Text>
                                    <View style={feedStyle.commentItemLeftBottom}>
                                        <Text style={feedStyle.commentItemLeftBottomName}>{getTimeDifference(comment.timestamp)}</Text>
                                        <Text style={feedStyle.commentItemLeftBottomName}>{comment.likes} like</Text>
                                        <TouchableOpacity>
                                            <TouchableOpacity onPress={() => {
                                                setCommentIdCurrent(comment._id)
                                                console.log(commentIdCurrent);
                                                
                                            }}>
                                                <Text style={feedStyle.commentItemLeftBottomName}>Reply</Text>
                                            </TouchableOpacity>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => toggleLikeComment(comment.id)}>
                                    <HeartIconTemplate
                                        size={15}
                                        color={likedComments[comment.id] ? 'red' : colors.thirdColor}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Replies 
                            comment={comment} 
                            toggleLikeReply={toggleLikeReply}
                            commentId={comment.id}
                            likedReplies={likedReplies}
                        />
                    </View>
                ))
            }
        </ScrollView>
    );
}

function Replies({ comment, toggleLikeReply, commentId, likedReplies }) {
    return (
        <View>
            {comment.replies.map(reply => (
                <View style={[feedStyle.commentItem, feedStyle.replyItem]} key={`${reply._id}`}>
                    <View style={feedStyle.commentItemLeftContainer}>
                        <Image
                            style={feedStyle.avatarReply}
                            source={{uri: `${API_URL}/assets/images/artist/${reply.user.image}`}}
                        />
                        <View style={feedStyle.commentItemLeft}>
                            <View style={feedStyle.commentItemLeftTop}>
                                <Text style={feedStyle.replyItemLeftTopName}>{reply.user.name}</Text>
                                <Text style={{fontSize: 13, color: 'blue'}}>@{comment.user.name}</Text>
                                
                            </View>
                            <Text style={[feedStyle.replyItemLeftTopComment, {maxWidth: '85%'}]}>{reply.text}</Text>
                            <View style={feedStyle.commentItemLeftBottom}>
                                <Text style={feedStyle.commentItemLeftBottomName}>{getTimeDifference(reply.timestamp)}</Text>
                                <Text style={feedStyle.commentItemLeftBottomName}>{reply.likes} like</Text>
                                <TouchableOpacity>
                                    <Text style={feedStyle.commentItemLeftBottomName}>Reply</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => toggleLikeReply(commentId, reply.id)}>
                            <HeartIconTemplate
                                size={15}
                                color={likedReplies[commentId]?.[reply.id] ? 'red' : colors.thirdColor}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </View>
    );
}


