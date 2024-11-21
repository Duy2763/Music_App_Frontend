import { Image, ScrollView, TouchableOpacity } from "react-native"
import { Text, View } from "react-native"
import colors from "../../colors"
import getTimeDifference from "../../getTimeDifference"
import HeartIconTemplate from "../icon/heartIconTemplate"
import feedStyle from "../../styles/feed/feedStyle.js"
import { useState } from "react"
import { API_URL } from '@env';

export default function Comments({ comments }) {
    const [likedComments, setLikedComments] = useState({});
    const [likedReplies, setLikedReplies] = useState({});

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
                    <View key={comment.id} style={feedStyle.commentContainer}>
                        <View style={feedStyle.commentItem}>
                            <View style={feedStyle.commentItemLeftContainer}>
                                <Image
                                    style={feedStyle.avatarComment}
                                    source={{uri: `${API_URL}/assets/images/artist/${comment.user.image}`}}
                                />
                                <View style={feedStyle.commentItemLeft}>
                                    <View style={feedStyle.commentItemLeftTop}>
                                        <Text style={feedStyle.commentItemLeftTopName}>{comment.user.name}</Text>
                                        <Text style={feedStyle.commentItemLeftTopComment}>{comment.text}</Text>
                                    </View>
                                    <View style={feedStyle.commentItemLeftBottom}>
                                        <Text style={feedStyle.commentItemLeftBottomName}>{getTimeDifference(comment.timestamp)}</Text>
                                        <Text style={feedStyle.commentItemLeftBottomName}>{comment.likeCounts} like</Text>
                                        <TouchableOpacity>
                                            <Text style={feedStyle.commentItemLeftBottomName}>Reply</Text>
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
                            replies={comment.replies} 
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

function Replies({ replies, toggleLikeReply, commentId, likedReplies }) {
    return (
        <View>
            {replies.map(reply => (
                <View style={[feedStyle.commentItem, feedStyle.replyItem]} key={reply.id}>
                    <View style={feedStyle.commentItemLeftContainer}>
                        <Image
                            style={feedStyle.avatarReply}
                            source={{uri: `${API_URL}/assets/images/artist/${reply.user.image}`}}
                        />
                        <View style={feedStyle.commentItemLeft}>
                            <View style={feedStyle.commentItemLeftTop}>
                                <Text style={feedStyle.replyItemLeftTopName}>{reply.user.name}</Text>
                                <Text style={feedStyle.replyItemLeftTopComment}>{reply.text}</Text>
                            </View>
                            <View style={feedStyle.commentItemLeftBottom}>
                                <Text style={feedStyle.commentItemLeftBottomName}>{getTimeDifference(reply.timestamp)}</Text>
                                <Text style={feedStyle.commentItemLeftBottomName}>{reply.likeCounts} like</Text>
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
