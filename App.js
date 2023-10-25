import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Canvas, Path } from "@shopify/react-native-skia";

import Button from './components/Button';
import ImageViewer from './components/ImageViewer';
import CircleButton from './components/CircleButton';
import IconButton from './components/IconButton';
import EmojiPicker from './components/EmojiPicker';
import EmojiList from './components/EmojiList';
import react from 'react';
import EmojiSticker from './components/EmojiSticker';
import Drawing from './components/Drawing';
import TextInput from './components/TextInput';

const PlaceholderImage = require('./assets/goodjobcat.jpg');

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(null);
  // for resetting
  const onReset = () => {
    setShowAppOptions(false);
  };
  const onAddSticker = () => {
    setIsModalVisible(true);
  };
  const onModalClose = () => {
    setIsModalVisible(false);
  };
  const onSaveImageAsync = async () => {
    // to implement later
  };

  // picking image from gallery, need to figure out how to include presets!
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert ('You did not select any image.');
    }
  }
  return (
    <GestureHandlerRootView style={styles.container}>
    <View style={styles.container}>
      {/* image container, text and stickers will go on top? */}
      <View style={styles.imageContainer}>
        <ImageViewer placeholderImageSource={PlaceholderImage}
        selectedImage={selectedImage} />
        {pickedEmoji !== null ? <EmojiSticker imageSize={40} stickerSource={pickedEmoji} /> : null}
        {/* not sure why my drawing isn't showing up sob */}
        <Drawing/>
        <TextInput/>
      </View>
      {showAppOptions ? ( 
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset}/>
            <CircleButton onPress={onAddSticker}/>
            <IconButton icon='save-alt' label="Save" onPress={onSaveImageAsync}/>
          </View> 
        </View>
      ) : (
      <View style={styles.footerContainer}>
        <Button label="Choose a photo" onPress={pickImageAsync}/>
        <Button label="Use this photo" theme="plain" onPress={() => setShowAppOptions(true)}/>
      </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose}/>
      </EmojiPicker>
      <StatusBar style="auto" />
    </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'plum',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  footerContainer: {
    flex: 1/3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
