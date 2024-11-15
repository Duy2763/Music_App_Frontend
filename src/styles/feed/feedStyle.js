import { StyleSheet } from "react-native";
import colors from "../../colors";
import { Dimensions } from "react-native";
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');


export default feedStyle = StyleSheet.create({
    container: {
        backgroundColor: colors.secondaryColor,
        paddingHorizontal: 24
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 8
    },
    headerTopText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    feedContainer: {
        marginVertical: 16
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
    },
    commentContainer: {
        marginTop: 24
    },
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
        justifyContent: 'space-between',
        marginBottom: 16
    },
    replyItem: {
        marginLeft: 32,
        marginBottom: 16
    },
    avatarReply: {
        width: 30,
        height: 30
    },
    replyItemLeftTopName: {
        fontWeight: 'bold',
        fontSize: 14
    },
    replyItemLeftTopComment: {
        fontSize: 12
    },

})