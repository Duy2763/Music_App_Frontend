import { Image, TouchableOpacity } from "react-native"
import { Text, View } from "react-native"
import colors from "../../colors"
import getTimeDifference from "../../getTimeDifference"
import HeartIconTemplate from "../icon/heartIconTemplate"
import feedStyle from "../../styles/feed/feedStyle.js"


const Replies = ({ replies }) => (
    <View>
        {
            replies.map(reply => (
                <View style={[feedStyle.commentItem, feedStyle.replyItem]} key={reply.id}>
                    <View style={feedStyle.commentItemLeftContainer}>
                        <Image
                            style={feedStyle.avatarReply}
                            source={reply.user.hinhAnh}
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
                    <TouchableOpacity>
                        <HeartIconTemplate size={15} color={colors.thirdColor}/>
                    </TouchableOpacity>
                    </View>
                </View>
            ))
        }
    </View>
);


export default Replies;