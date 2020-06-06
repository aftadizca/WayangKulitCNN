import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { COLORS } from '../config';

export default function BG() {
	return (
		<View
			style={[
				StyleSheet.absoluteFill,
				{ alignItems: 'center', justifyContent: 'center' },
			]}
		>
			<Svg
				width="100%"
				height="100%"
				viewBox="0 0 297 138.15"
				version="1.1"
				id="svg8"
				preserveAspectRatio="none"
			>
				<G id="layer1" transform="translate(0,-128.623)">
					<Path
						opacity="1"
						fill={COLORS.BG}
						fillOpacity="1"
						stroke="none"
						strokeWidth="21.16496468"
						strokeLinejoin="miter"
						strokeMiterlimit="4"
						strokeDasharray="none"
						strokeOpacity="1"
						d="m 0,128.631 296.99906,-0.008 v 94.50613 c 0,0 -54.67293,43.61162 -148.38546,43.58299 C 54.901069,266.6838 2.805e-4,223.12913 2.805e-4,223.12913 Z"
					/>
					<Path
						opacity="1"
						fill={COLORS.PRIMARY_DARK}
						fillOpacity="0.45098039"
						stroke="none"
						strokeWidth="17.25894928"
						strokeLinejoin="miter"
						strokeMiterlimit="4"
						strokeDasharray="none"
						strokeOpacity="1"
						d="m 2.805e-4,136.04886 c 0,0 34.2393695,24.66302 58.0135495,31.16067 41.40892,11.31737 87.69307,-17.38409 131.1874,-30.61069 57.93819,-17.61899 107.79783,-0.54998 107.79783,-0.54998 l 0.0521,87.18695 c 0,0 -56.39567,43.55436 -148.75006,43.57899 C 55.946713,266.83942 2.805e-4,223.23581 2.805e-4,223.23581 Z"
					/>
					<Path
						opacity="1"
						fill={COLORS.PRIMARY_DARK}
						fillOpacity="0.45098039"
						stroke="none"
						strokeWidth="17.25894928"
						strokeLinejoin="miter"
						strokeMiterlimit="4"
						strokeDasharray="none"
						strokeOpacity="1"
						d="m 296.99906,136.04873 c 0,0 -34.18727,24.66259 -57.96145,31.16015 -41.40892,11.31716 -87.69307,-17.3838 -131.1874,-30.61018 C 49.912021,118.98002 2.768e-4,136.04873 2.768e-4,136.04873 v 87.18545 c 0,0 56.4304892,43.45967 148.7848832,43.4843 92.35439,0.0246 148.266,-43.4843 148.266,-43.4843 z"
					/>
				</G>
			</Svg>
		</View>
	);
}
