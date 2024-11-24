import { StatusBar } from "react-native"
import { SafeAreaView, Text, View } from "react-native"
import CastIcon from "../icon/castIcon"
import colors from "../../colors"
import Feed from "./feed"
import feedStyle from "../../styles/feed/feedStyle.js"
import { API_URL } from '@env';
import { getAllSongs } from "../../../api.js"
import { useEffect, useState } from "react"


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


   
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: colors.secondaryColor}}>
            <StatusBar backgroundColor={colors.secondaryColor} barStyle="dark-content" />
            <View style={[feedStyle.container, {marginBottom: currentSong ? 112 : 0}]}>
                <View style={feedStyle.headerTop}>
                    <Text style={feedStyle.headerTopText}>Feed</Text>
                    <CastIcon/>
                </View>
                <Feed/>
            </View>
        </SafeAreaView>
    )
}

