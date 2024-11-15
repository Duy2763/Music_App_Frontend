import { StatusBar } from "react-native"
import { SafeAreaView, Text, View } from "react-native"
import CastIcon from "../icon/castIcon"
import colors from "../../colors"
import Feed from "./feed"
import feedStyle from "../../styles/feed/feedStyle.js"


export default function FeedScreen() {
    // const arrArtists = [
    //     {id: '1', name: 'Jennifer Wilson', hinhAnh: require('../../../assets/home/Image39.png'), followers: 65.1, about: {hinhAnh: require('../../../assets/home/Image73.png'), description: 'Do in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor' }},
    //     {id: '2', name: 'Elizabeth Hall', hinhAnh: require('../../../assets/home/Image40.png'), followers: 63.1, about: {hinhAnh: require('../../../assets/home/Image73.png'), description: 'Do in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor' }},
    //     {id: '3', name: 'Anthony Martial', hinhAnh: require('../../../assets/home/Image41.png'), followers: 69.1, about: {hinhAnh: require('../../../assets/home/Image73.png'), description: 'Do in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor in cupidatat aute et in offcia aute laboris est Lorem est nisi dolor' }},
    // ]

    // const arrSongs = [
    //     {id: '1', name: 'Reflection', artist: 'Christina Aguilera', hinhAnh: require('../../../assets/home/Container26.png')},
    //     {id: '2', name: 'In the starts', artist: 'Benson Boone', hinhAnh: require('../../../assets/home/Container27.png')},
    // ]
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

                    },
                    {
                        id: '3',
                        text: 'Hay đấy chứ',
                        timestamp: '2024-11-12T11:16:00.000Z',
                        likeCounts: 10,
                        user: {
                            id: '4',
                            name: 'hehehe',
                            hinhAnh: require('../../../assets/home/Image40.png')
                        },
                        replies: [
                            
                        ]

                    }
                ]
            },
        },
        {
            id: '2',
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

                    },
                    {
                        id: '3',
                        text: 'Hay đấy chứ',
                        timestamp: '2024-11-12T11:16:00.000Z',
                        likeCounts: 10,
                        user: {
                            id: '4',
                            name: 'hehehe',
                            hinhAnh: require('../../../assets/home/Image40.png')
                        },
                        replies: [
                            
                        ]

                    }
                ]
            },
        }
    ]


    return (
        <SafeAreaView style={{flex: 1, backgroundColor: colors.secondaryColor}}>
            <StatusBar backgroundColor={colors.secondaryColor} barStyle="dark-content" />
            <View style={feedStyle.container}>
                <View style={feedStyle.headerTop}>
                    <Text style={feedStyle.headerTopText}>Feed</Text>
                    <CastIcon/>
                </View>
                <Feed arrFeeds={arrFeeds}/>
            </View>
        </SafeAreaView>
    )
}

