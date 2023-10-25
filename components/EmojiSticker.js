import {View, Image, Dimensions} from 'react-native';
import Animated, { withTiming } from 'react-native-reanimated';
import React from 'react';
import { TapGestureHandler, PinchGestureHandlerGestureEvent, Gesture, GestureDetector } from 'react-native-gesture-handler';
import {
    useAnimatedStyle,
    useSharedValue,
    useAnimatedGestureHandler,
    withSpring,
} from 'react-native-reanimated';
import { GestureHandlerRootView, PanGestureHandler, PinchGestureHandler, RotationGestureHandler } from 'react-native-gesture-handler';

const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedView = Animated.createAnimatedComponent(View);

export default function EmojiSticker({imageSize, stickerSource}) {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const scaleImage = useSharedValue(imageSize);
    const scale = useSharedValue(1);
    const savedScale = useSharedValue(1);
    const rotation = useSharedValue(1);
    const savedRotation = useSharedValue(1);

    const rotationGesture = Gesture.Rotation()
       .onUpdate((e) => {
        rotation.value = savedRotation.value * e.rotation;
       })
       .onEnd(() => {
        savedRotation.value = rotation.value;
       });

    const pinchGesture = Gesture.Pinch()
       .onUpdate((e) => {
        scale.value  = savedScale.value * e.scale;
       })
       .onEnd(() => {
        savedScale.value = scale.value;
       });

    const imageStyle = useAnimatedStyle(() => {
        return {
            transform: [{rotateZ: `${(rotation.value / Math.PI) * 180}deg`},
            {scale: scale.value}],
        };
    });      

    
    const onDrag = useAnimatedGestureHandler({
        onStart: (event, context) => {
            context.translateX = translateX.value;
            context.translateY = translateY.value;
        },
        onActive: (event, context) => {
            translateX.value = event.translationX + context.translateX;
            translateY.value = event.translationY + context.translateY;
        },
    });
// look up how this works? this returns an array of transforms
    const containerStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: translateX.value,
                },
                {
                    translateY: translateY.value,
                },
            ],
        };
    });
    
    const composed = Gesture.Simultaneous(pinchGesture, rotationGesture);

    return(
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler onGestureEvent={onDrag}>
        <AnimatedView style={[containerStyle, {top: -350}]}>
            <GestureDetector gesture={composed}>
              <AnimatedImage source={stickerSource} resizeMode="contain"
              style={[imageStyle, {width: imageSize * 3, height: imageSize * 3}]} />
            </GestureDetector>
        </AnimatedView>
      </PanGestureHandler>
    </GestureHandlerRootView>
    )
}

