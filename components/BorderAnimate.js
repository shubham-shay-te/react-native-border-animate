/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useRef, useEffect, useState } from 'react';
import { Animated, View, StyleSheet, Dimensions } from 'react-native';

const BorderAnimation = (props) => {

	const [parentDimensions, setParentDimensions] = useState();

	const borderAnim = useRef(new Animated.Value(0)).current;
	const paddingAnim = useRef(new Animated.Value(0)).current;
	const xAnim = useRef(new Animated.Value(0)).current;
	const yAnim = useRef(new Animated.Value(0)).current;
	const widthAnim = useRef(new Animated.Value(0)).current;
	const heightAnim = useRef(new Animated.Value(0)).current;

	const refChildrenWrap = useRef();

	useEffect(() => {
		if (parentDimensions) {
			console.log('width from', parentDimensions.width + props.paddingFrom * 2);
			console.log('width to', parentDimensions.width + props.paddingTo * 2);
			console.log('x from', parentDimensions.x - props.paddingFrom);
			console.log('x to', parentDimensions.x - props.paddingTo);
			borderAnim.setValue(props.borderWidthFrom);
			paddingAnim.setValue(props.paddingFrom);
			xAnim.setValue(parentDimensions.x - props.paddingFrom);
			yAnim.setValue(parentDimensions.y - props.paddingFrom);
			widthAnim.setValue(parentDimensions.width + props.paddingFrom * 2);
			heightAnim.setValue(parentDimensions.height + props.paddingFrom * 2);
			Animated.loop([
				Animated.parallel([
					Animated.sequence([
						Animated.timing(borderAnim, {
							toValue: props.borderWidthTo,
							duration: props.animationTime,
							useNativeDriver: false,
						}),
						Animated.timing(borderAnim, {
							toValue: props.borderWidthTo,
							duration: props.animationTime,
							useNativeDriver: false,
						}),
					]),
					Animated.sequence([
						Animated.timing(paddingAnim, {
							toValue: props.paddingTo,
							duration: props.animationTime + 10,
							delay: props.animationDelay,
							useNativeDriver: false,
						}),
						Animated.timing(paddingAnim, {
							toValue: props.paddingTo,
							duration: props.animationTime + 10,
							delay: props.animationDelay,
							useNativeDriver: false,
						}),
					]),
					Animated.sequence([
						Animated.timing(xAnim, {
							toValue: parentDimensions.x - props.paddingTo,
							duration: props.animationTime,
							useNativeDriver: false,
						}),
						Animated.timing(xAnim, {
							toValue: parentDimensions.x - props.paddingTo,
							duration: props.animationTime,
							useNativeDriver: false,
						}),
					]),
					Animated.sequence([
						Animated.timing(yAnim, {
							toValue: parentDimensions.y - props.paddingTo,
							duration: props.animationTime,
							useNativeDriver: false,
						}),
						Animated.timing(yAnim, {
							toValue: parentDimensions.y - props.paddingTo,
							duration: props.animationTime,
							useNativeDriver: false,
						}),
					]),
					Animated.sequence([
						Animated.timing(widthAnim, {
							toValue: parentDimensions.width + props.paddingTo * 2,
							duration: props.animationTime,
							useNativeDriver: false,
						}),
						Animated.timing(widthAnim, {
							toValue: parentDimensions.width + props.paddingTo * 2,
							duration: props.animationTime,
							useNativeDriver: false,
						}),
					]),
					Animated.sequence([
						Animated.timing(heightAnim, {
							toValue: parentDimensions.height + props.paddingTo * 2,
							duration: props.animationTime,
							useNativeDriver: false,
						}),
					]),
				])
			]).start();
		}
	}, [parentDimensions]);

	const opacityInterpolation = paddingAnim.interpolate({
		inputRange: [0, props.paddingTo],
		outputRange: ['rgba(0, 0, 0, ' + props.opacityFrom + ')', 'rgba(0, 0, 0, ' + props.opacityTo + ')'],
	});

	const setPosition = e => {
		const layoutWidth = e.nativeEvent.layout.width;
		const layoutHeight = e.nativeEvent.layout.height;
		refChildrenWrap.current.measure((width, height, px, py, fx, fy) => {
			console.log('setPosition', { width: layoutWidth, height: layoutHeight, x: fx, y: fy });
			setParentDimensions({ width: layoutWidth, height: layoutHeight, x: fx, y: fy });
		});
	};

	return (
		<>
			<View style={
				{
					position: 'relative',
					zIndex: 10,
					overflow: 'visible',
					padding: 20,
					alignItems: 'center',
					justifyContent: 'center',
				}
			}>
				<View ref = {refChildrenWrap} onLayout={(e) => setPosition(e)} style={[styles.borderContainer]}>{props.children}</View>
				<Animated.View
					style={[
						{
							borderWidth: borderAnim,
							padding: paddingAnim,
							borderColor: opacityInterpolation,
							borderRadius: props.borderRadius,
							position: 'absolute',
							x: xAnim,
							y: yAnim,
							width: widthAnim,
							height: heightAnim,
						},
					]} />
			</View>
		</>
	);
};

BorderAnimation.defaultProps = {
	color: 'red',
	borderRadius: 0,
	animSteps: [{ 'speed': 100, 'padding': 0, 'borderWidthFrom': 0, borderWidthTo: 5 }],
	animate: true,
	paddingFrom: 0,
	paddingTo: 10,
	opacityFrom: 1,
	opacityTo: 0,
	borderWidthFrom: 0,
	borderWidthTo: 5,
	animationTime: 1000,
	animationDelay: 3000,
};

const styles = StyleSheet.create({
	absoluteContainer: {
	},
	borderContainer: {
		borderColor: 'red',
		borderWidth: 3,
	},
});

export default BorderAnimation;
