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
						d="m 0,128.631 296.99906,-0.008 v 94.50613 c 0,0 -97.65373,43.73951 -149.59748,43.63561 C 96.160196,266.66224 2.805e-4,223.12913 2.805e-4,223.12913 Z"
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
						d="m 2.805e-4,136.04886 c 0,0 34.2393695,24.66302 58.0135495,31.16067 41.40892,11.31737 87.69307,-17.38409 131.1874,-30.61069 57.93819,-17.61899 107.79783,-0.54998 107.79783,-0.54998 v 87.08123 c 0,0 -97.65382,43.73855 -149.59748,43.63465 C 96.160287,266.66225 2.805e-4,223.13009 2.805e-4,223.13009 Z"
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
						d="m 296.99906,136.04873 c 0,0 -34.18727,24.66259 -57.96145,31.16015 -41.40892,11.31716 -87.69307,-17.3838 -131.1874,-30.61018 C 49.912021,118.98002 2.768e-4,136.04873 2.768e-4,136.04873 v 87.08136 c 0,0 96.1600092,43.53216 147.4013032,43.63465 51.94366,0.1039 149.59748,-43.63465 149.59748,-43.63465 z"
					/>
				</G>
			</Svg>
		</View>
	);
}
