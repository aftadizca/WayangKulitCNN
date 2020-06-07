import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { Navigation } from '../components';
import LinearGradient from 'react-native-linear-gradient';
import Text from 'react-native-text';
import {
	Container,
	Header,
	Tab,
	Tabs,
	ScrollableTab,
	Card,
	CardItem,
	Body,
	List,
	Button,
	ListItem,
	Spinner,
	Icon,
} from 'native-base';
import { COLORS, FONTS, ICONS, WayangId } from '../config';
import {
	heightPercentageToDP,
	widthPercentageToDP,
} from 'react-native-responsive-screen';
import shortid from 'shortid';

//this.props.route.params.wayangId
export default function Detail(props) {
	const [index, setIndex] = useState(props.route.params.wayangId);
	const [data, setData] = useState();
	const [img, setImg] = useState();
	const [loading, setLoading] = useState(true);

	//get url from Cloud Storage Firebase
	getImgUrl = ref => {
		return Promise.all(ref.items.map(x => x.getDownloadURL()));
	};

	getData = index => {
		setLoading(true);
		props.db
			.doc(index.toString())
			.get()
			.then(dbData => {
				props.store
					.ref('wayang' + index)
					.listAll()
					.then(resultList => {
						getImgUrl(resultList)
							.then(url => {
								setData(dbData.data());
								setIndex(index);
								setImg(url);
								setLoading(false);
							})
							.catch(err => console.warn(err));
					});
			});
	};

	prevIndex = () => {
		getData(WayangId.NAKULA);
	};
	nextIndex = () => {
		getData(WayangId.SADEWA);
	};

	tabProps = {
		tabStyle: { ...styles.tabStyle },
		textStyle: { ...styles.tabTextStyle },
		activeTabStyle: { ...styles.activeTabStyle },
		style: { ...styles.tabContent },
		activeTextStyle: { ...styles.activeTabTextStyle },
	};

	//get data
	useEffect(() => {
		getData(index);
	}, []);

	if (loading) {
		return (
			<Container
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: COLORS.BG,
				}}
			>
				<Spinner color={COLORS.PRIMARY_DARK} />
			</Container>
		);
	} else {
		return (
			<>
				<LinearGradient
					//hasTabs
					//span
					//translucent
					//androidStatusBarColor={COLORS.BG}
					colors={COLORS.GRADIENT}
					useAngle={true}
					angle={10}
					start={{ x: 0.0, y: 0.0 }}
					end={{ x: 0.5, y: 0.5 }}
					angleCenter={{ x: 0.7, y: 0.7 }}
					style={{ flex: 1 }}
				>
					<Navigation {...props.navigation} back />
					{index > WayangId.YUDISTIRA ? (
						<View style={styles.headerContainer}>
							<Button
								rounded
								disabled={index === WayangId.NAKULA}
								transparent
								onPress={prevIndex}
								style={{
									backgroundColor: COLORS.TRANSPARENT,
									alignSelf: 'center',
								}}
							>
								<Icon
									style={{
										color: COLORS.PRIMARY_DARK,
										opacity: index === WayangId.NAKULA ? 0 : 1,
									}}
									{...ICONS.ARROW_LEFT_CYCLE}
								/>
							</Button>
							<View>
								<Text style={styles.headerText}>{data.nama}</Text>
							</View>
							<Button
								rounded
								disabled={index === WayangId.SADEWA}
								transparent
								onPress={nextIndex}
								style={{
									backgroundColor: COLORS.TRANSPARENT,
									alignSelf: 'center',
								}}
							>
								<Icon
									style={{
										color: COLORS.PRIMARY_DARK,
										opacity: index === WayangId.SADEWA ? 0 : 1,
									}}
									{...ICONS.ARROW_RIGHT_CYCLE}
								/>
							</Button>
						</View>
					) : (
						<View style={styles.headerContainer}>
							<Text style={styles.headerText}>{data.nama}</Text>
						</View>
					)}
				</LinearGradient>
				<Tabs
					style={{ flex: 5 }}
					tabBarUnderlineStyle={{ backgroundColor: 'transparent' }}
					initialPage={0}
					renderTabBar={() => <ScrollableTab />}
				>
					<Tab heading={'BENTUK WAYANG'} {...tabProps}>
						<ScrollView contentContainerStyle={styles.scrollView}>
							{img &&
								img.map(x => (
									<Card key={shortid.generate()}>
										<CardItem cardBody style={styles.cardItem}>
											<Image
												style={{
													width: '100%',
													height: undefined,
													aspectRatio: 9 / 16,
												}}
												resizeMode="stretch"
												source={{
													uri: x,
												}}
											/>
										</CardItem>
									</Card>
								))}
						</ScrollView>
					</Tab>
					<Tab heading="NAMA LAIN" {...tabProps}>
						<NamaTab data={data} />
					</Tab>

					<Tab heading={'SILSILAH'} {...tabProps}>
						<SilsilahTab data={data} />
					</Tab>
					<Tab heading="SIFAT" {...tabProps}>
						<SifatTab data={data} />
					</Tab>
					<Tab heading="KESAKTIAN" {...tabProps}>
						<KesaktianTab data={data} />
					</Tab>
					<Tab heading="KISAH" {...tabProps}>
						<KisahTab data={data} />
					</Tab>
				</Tabs>
			</>
		);
	}
}

function SifatTab(props) {
	return (
		<ScrollView contentContainerStyle={styles.scrollView}>
			<Text style={styles.textBody}>
				{'\t\t\t\t\t'}
				{props.data.sifat}
			</Text>
		</ScrollView>
	);
}

function KisahTab(props) {
	return (
		<ScrollView contentContainerStyle={styles.scrollView}>
			{props.data.kisah.map(x => (
				<Text key={shortid.generate()} style={styles.textBody}>
					{'\t\t\t\t\t'}
					{x}
				</Text>
			))}
		</ScrollView>
	);
}

function SilsilahTab(props) {
	const { orangTua, istri, putra, putri } = props.data;
	return (
		<ScrollView contentContainerStyle={styles.scrollView}>
			<List style={{ marginTop: -widthPercentageToDP('7%') }}>
				<ListItem itemDivider first style={styles.listDivider}>
					<Text style={styles.listTextHeader}>ORANG TUA</Text>
				</ListItem>
				<ListItem noIndent style={styles.listItem}>
					<Icon
						{...ICONS.BULLET}
						style={{ ...styles.listTextPrimary, marginRight: 10 }}
					/>
					<Body>
						<Text style={styles.listTextPrimary}>{orangTua.Ibu}</Text>
						<Text style={styles.listTextSecondary}>Ibu</Text>
					</Body>
				</ListItem>
				<ListItem noIndent style={styles.listItem}>
					<Icon
						{...ICONS.BULLET}
						style={{ ...styles.listTextPrimary, marginRight: 10 }}
					/>
					<Body>
						<Text style={styles.listTextPrimary}>{orangTua.Ayah}</Text>
						<Text style={styles.listTextSecondary}>Ayah</Text>
					</Body>
				</ListItem>
				<ListItem itemDivider first style={styles.listDivider}>
					<Text style={styles.listTextHeader}>ISTRI</Text>
				</ListItem>
				{istri &&
					istri.map(x => (
						<ListItem key={shortid.generate()} noIndent style={styles.listItem}>
							<Icon
								{...ICONS.BULLET}
								style={{ ...styles.listTextPrimary, marginRight: 10 }}
							/>
							<Text style={styles.listTextPrimary}>{x}</Text>
						</ListItem>
					))}
				{putra.length > 0 && (
					<ListItem
						key={shortid.generate()}
						itemDivider
						first
						style={styles.listDivider}
					>
						<Text style={styles.listTextHeader}>PUTRA</Text>
					</ListItem>
				)}
				{putra.length > 0 &&
					putra.map(x => (
						<ListItem key={shortid.generate()} noIndent style={styles.listItem}>
							<Icon
								{...ICONS.BULLET}
								style={{ ...styles.listTextPrimary, marginRight: 10 }}
							/>
							<Text style={styles.listTextPrimary}>{x}</Text>
						</ListItem>
					))}
				{putri.length > 0 && (
					<ListItem
						key={shortid.generate()}
						itemDivider
						first
						style={styles.listDivider}
					>
						<Text style={styles.listTextHeader}>PUTRI</Text>
					</ListItem>
				)}
				{putri.length > 0 &&
					putri.map(x => (
						<ListItem key={shortid.generate()} noIndent style={styles.listItem}>
							<Icon
								{...ICONS.BULLET}
								style={{ ...styles.listTextPrimary, marginRight: 10 }}
							/>
							<Text style={styles.listTextPrimary}>{x}</Text>
						</ListItem>
					))}
			</List>
		</ScrollView>
	);
}

function NamaTab(props) {
	return (
		<ScrollView contentContainerStyle={styles.scrollView}>
			<List>
				{props.data.namaLain.map(x => (
					<ListItem key={shortid.generate()} noIndent style={styles.listItem}>
						<Icon
							{...ICONS.BULLET}
							style={{ ...styles.listTextPrimary, marginRight: 5 }}
						/>
						<Text style={styles.listTextPrimary}>{x}</Text>
					</ListItem>
				))}
			</List>
		</ScrollView>
	);
}

function KesaktianTab(props) {
	const { pusaka, kesaktian } = props.data;

	return (
		<ScrollView contentContainerStyle={styles.scrollView}>
			<List style={{ marginTop: -widthPercentageToDP('7%') }}>
				{kesaktian.length > 0 && (
					<ListItem
						key={shortid.generate()}
						itemDivider
						first
						style={styles.listDivider}
					>
						<Text style={styles.listTextHeader}>AJI</Text>
					</ListItem>
				)}
				{kesaktian.length > 0 &&
					kesaktian.map(x => (
						<ListItem key={shortid.generate()} noIndent style={styles.listItem}>
							<Icon
								{...ICONS.BULLET}
								style={{ ...styles.listTextPrimary, marginRight: 5 }}
							/>
							<Text style={styles.listTextPrimary}>{x}</Text>
						</ListItem>
					))}
				{pusaka.length > 0 && (
					<ListItem
						key={shortid.generate()}
						itemDivider
						first
						style={styles.listDivider}
					>
						<Text style={styles.listTextHeader}>PUSAKA</Text>
					</ListItem>
				)}
				{pusaka.length > 0 &&
					pusaka.map(x => (
						<ListItem key={shortid.generate()} noIndent style={styles.listItem}>
							<Icon
								{...ICONS.BULLET}
								style={{ ...styles.listTextPrimary, marginRight: 5 }}
							/>
							<Text style={styles.listTextPrimary}>{x}</Text>
						</ListItem>
					))}
			</List>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	headerContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
	},
	headerImage: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'flex-end',
		width: '100%',
	},
	headerText: {
		color: COLORS.PRIMARY_DARK,
		fontFamily: FONTS.BOLD,
		fontSize: 30,
	},
	tabStyle: {
		backgroundColor: COLORS.BG,
		overflow: 'hidden',
	},
	activeTabTextStyle: {
		fontFamily: FONTS.BOLD,
		color: COLORS.PRIMARY_DARK,
		backgroundColor: COLORS.BG2,
		padding: widthPercentageToDP('1.5%'),
		paddingLeft: widthPercentageToDP('5%'),
		paddingRight: widthPercentageToDP('5%'),
		borderRadius: widthPercentageToDP('10%'),
		overflow: 'hidden',
	},
	tabTextStyle: { fontFamily: FONTS.BOLD, color: COLORS.PRIMARY_DARK },
	activeTabStyle: {
		backgroundColor: COLORS.BG,
	},
	tabContent: {
		backgroundColor: COLORS.PRIMARY_LIGHT,
	},
	cardHeader: {
		backgroundColor: COLORS.PRIMARY_DARK,
	},
	cardItem: {
		backgroundColor: COLORS.PRIMARY_LIGHT,
	},
	textBody: {
		fontFamily: FONTS.REGULAR,
		color: '#000',
		fontSize: 18,
		textAlign: 'justify',
	},
	scrollView: {
		padding: widthPercentageToDP('7%'),
	},
	listItem: { borderBottomColor: COLORS.PRIMARY_DARK },
	listDivider: {
		backgroundColor: COLORS.BG2,
		borderRadius: widthPercentageToDP('10%'),
		marginTop: heightPercentageToDP('3%'),
	},
	listTextHeader: {
		fontFamily: FONTS.BOLD,
		color: COLORS.PRIMARY_DARK,
	},
	listTextPrimary: {
		fontFamily: FONTS.REGULAR,
		color: '#000',
		fontSize: 16,
	},
	listTextSecondary: {
		fontFamily: FONTS.REGULAR,
		color: COLORS.PRIMARY_DARK,
		fontSize: 16,
		opacity: 0.7,
	},
});
