import { useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';


SplashScreen.preventAutoHideAsync();

export default function Page() {
    const [fontsLoaded, fontsError] = useFonts({
        'NotoSerifDisplay-Italic': require('../assets/fonts/NotoSerifDisplay-Italic-VariableFont.ttf'),
        'CreamySugar': require('../assets/fonts/CreamySugar.ttf')
    });

    if (!fontsLoaded && !fontsError) {
        return null;
      }
    
    return (
      <View style={styles.titleContainer}>
        <Text style={styles.title}> dear diary,</Text>
        <Link href="/coverdeco" asChild>
        <Pressable>
        <Text style={{fontFamily: 'NotoSerifDisplay-Italic'}}>what happened today?</Text>
        </Pressable>
        </Link>
        <Link href="/canvas" asChild>
            <Pressable>
                <Text style={{fontFamily: 'CreamySugar'}}>go to draw</Text>
            </Pressable>
        </Link>
      </View>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'plum',
    },
    title: {
        fontSize: 30,
        fontFamily: 'CreamySugar',
    }
})