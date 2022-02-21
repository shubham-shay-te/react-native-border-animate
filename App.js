/* eslint-disable prettier/prettier */
import React, { useRef, useEffect } from 'react';
import { Animated, Text, StyleSheet, SafeAreaView } from 'react-native';
import BorderAnimation from './components/BorderAnimate';

const App = () => {

	return (
		<SafeAreaView style={styles.container}>
			<BorderAnimation>
				<Text style={styles.text}>Fading View!</Text>
			</BorderAnimation>
			<Text style={styles.text}>Fading View!</Text>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 3,
		borderColor: 'green',
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
