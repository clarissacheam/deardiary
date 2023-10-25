import React, { useState } from "react";
import { View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { Canvas, Path } from "@shopify/react-native-skia";

export default function Drawing() {
  const Lines = () => {
    const path = Skia.Path.Make();
    path.moveTo(300,200);
    path.lineTo(200,300);

    return (
      <>
        <View style={{flex:1}}>
          <Canvas style={{flex:1}}>
            <Path path={path} strokeWidth={2} color="black" style="stroke"/>
          </Canvas>
        </View>
      </>
    );
  };
}