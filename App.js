import React, {useRef, useEffect} from 'react';
import {Animated, Text, StyleSheet, SafeAreaView} from 'react-native';

const App = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 5,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          delay: 2000,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.fadingContainer,
          {
            borderWidth: fadeAnim,
          },
        ]}>
        <Text style={styles.text}>Fading View!</Text>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fadingContainer: {
    padding: 20,
    backgroundColor: 'powderblue',
  },
  text: {
    fontSize: 50,
  },
});

export default App;
