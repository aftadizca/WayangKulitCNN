import React, { Component } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import Text from 'react-native-text';
import {
	Container,
	Header,
	Tab,
	Tabs,
	ScrollableTab,
	Button,
} from 'native-base';
import { COLORS, FONTS } from '../config';
import {
	heightPercentageToDP,
	widthPercentageToDP,
} from 'react-native-responsive-screen';

export default class Detail extends Component {
	tabProps = {
		tabStyle: { ...styles.tabStyle },
		textStyle: { ...styles.tabTextStyle },
		activeTabStyle: { ...styles.activeTabStyle },
		style: { ...styles.tabContent },
		activeTextStyle: { ...styles.activeTabTextStyle },
	};

	render() {
		return (
			<Container>
				<Header
					hasTabs
					span
					androidStatusBarColor={COLORS.PRIMARY_DARK}
					style={{ backgroundColor: COLORS.PRIMARY_DARK }}>
					<TouchableWithoutFeedback>
						<View style={styles.headerContainer}>
							<Text style={styles.headerText}>ARJUNA</Text>
						</View>
					</TouchableWithoutFeedback>
				</Header>
				<Tabs
					tabBarUnderlineStyle={{ backgroundColor: 'transparent' }}
					renderTabBar={() => (
						<ScrollableTab backgroundColor={COLORS.PRIMARY_DARK} />
					)}>
					<Tab heading={'BENTUK WAYANG'} {...this.tabProps}>
						<View>
							<Text>BENTUK WAYANG</Text>
						</View>
					</Tab>
					<Tab heading='NAMA' {...this.tabProps}>
						<View>
							<Text>Tab 1</Text>
						</View>
					</Tab>
					<Tab heading={'SILSILAH'} {...this.tabProps}>
						<View>
							<Text>Tab 1</Text>
						</View>
					</Tab>
					<Tab heading='SIFAT' {...this.tabProps}>
						<View>
							<Text>Tab 1</Text>
						</View>
					</Tab>
					<Tab heading='KESAKTIAN' {...this.tabProps}>
						<View>
							<Text>Tab 1</Text>
						</View>
					</Tab>
					<Tab heading='SEJARAH' {...this.tabProps}>
						<View>
							<Text>Tab 1</Text>
						</View>
					</Tab>
				</Tabs>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	headerContainer: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	headerImage: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'flex-end',
		width: '100%',
	},
	headerText: {
		color: COLORS.PRIMARY_LIGHT,
		fontFamily: FONTS.BOLD,
		fontSize: 30,
	},
	tabStyle: {
		backgroundColor: COLORS.PRIMARY_DARK,
		overflow: 'hidden',
	},
	activeTabTextStyle: {
		fontFamily: FONTS.BOLD,
		color: COLORS.PRIMARY_DARK,
		backgroundColor: COLORS.PRIMARY_LIGHT,
		padding: widthPercentageToDP('1.5%'),
		borderRadius: widthPercentageToDP('10%'),
		overflow: 'hidden',
	},
	tabTextStyle: { fontFamily: FONTS.BOLD, color: COLORS.PRIMARY_LIGHT },
	activeTabStyle: {
		backgroundColor: COLORS.PRIMARY_DARK,
	},
	tabContent: {
		backgroundColor: COLORS.PRIMARY_LIGHT,
	},
});
