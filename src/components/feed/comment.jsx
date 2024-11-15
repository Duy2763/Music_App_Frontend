import { Image, ScrollView, TouchableOpacity } from "react-native"
import { Text, View } from "react-native"
import colors from "../../colors"
import getTimeDifference from "../../getTimeDifference"
import HeartIconTemplate from "../icon/heartIconTemplate"
import Replies from './replies';
import feedStyle from "../../styles/feed/feedStyle.js"

const Comment = ({ comments }) => (
    <ScrollView>
        {
            comments.map(comment => (
                <View key={comment.id} style={feedStyle.commentContainer}>
                    <View style={feedStyle.commentItem}>
                        <View style={feedStyle.commentItemLeftContainer}>
                            <Image
                                style={feedStyle.avatarComment}
                                source={comment.user.hinhAnh}
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
                            <TouchableOpacity>
                                <HeartIconTemplate size={15} color={colors.thirdColor}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Replies replies={comment.replies}/>
                </View>
            ))
        }
    </ScrollView>
);

export default Comment;