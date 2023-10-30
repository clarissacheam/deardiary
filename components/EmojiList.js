import { useState } from 'react';
import { StyleSheet, FlatList, Image, Platform, Pressable } from 'react-native';
import { StickerList } from './StickerList';



export default function EmojiList({onSelect, onCloseModal, handleEmoji}) {
    return (
        <FlatList
        horizontal showsHorizontalScrollIndicator={Platform.OS==='web'}
        data={StickerList}
        contentContainerStyle={styles.listContainer}
        renderItem={({item, index}) => {
            console.log('item =', item);
            console.log('index =',index);
            return (
                <Pressable onPress={() => {
                    console.log('onPress index =', index);
                    console.log('onPress item= ', item);
                    onSelect(item);
                    onCloseModal();
                    handleEmoji();
                }}>
                    <Image source={item} key={index} style={styles.image}/>
                </Pressable>
            );
        }}
        />
    );
}

const styles = StyleSheet.create({
    listContainer: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 10,
    },
});
