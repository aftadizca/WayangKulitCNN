import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
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

export default class Detail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			index: WayangId.ARJUNA,
			data: null,
			loading: true,
			img: null,
		};
	}

	componentDidMount() {
		this.getData(this.state.index);
	}

	//get url from Cloud Storage Firebase
	getImgUrl = (ref) => {
		return Promise.all(ref.items.map((x) => x.getDownloadURL()));
	};

	getData = (index) => {
		this.setState({ loading: true }, () => {
			this.props.db
				.doc(index.toString())
				.get()
				.then((dbData) => {
					this.props.store
						.ref('wayang' + index)
						.listAll()
						.then((resultList) => {
							this.getImgUrl(resultList).then((url) => {
								this.setState({
									data: dbData.data(),
									index: index,
									img: url,
									loading: false,
								});
							});
						});
				});
		});
	};

	prevIndex = () => {
		this.getData(WayangId.NAKULA);
	};
	nextIndex = () => {
		this.getData(WayangId.SADEWA);
	};

	tabProps = {
		tabStyle: { ...styles.tabStyle },
		textStyle: { ...styles.tabTextStyle },
		activeTabStyle: { ...styles.activeTabStyle },
		style: { ...styles.tabContent },
		activeTextStyle: { ...styles.activeTabTextStyle },
	};

	render() {
		if (this.state.loading) {
			return (
				<Container
					style={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: COLORS.PRIMARY_LIGHT,
					}}>
					<Spinner color={COLORS.PRIMARY_DARK} />
				</Container>
			);
		} else {
			return (
				<>
					<Header
						hasTabs
						span
						androidStatusBarColor={COLORS.PRIMARY_DARK}
						style={{ backgroundColor: COLORS.PRIMARY_DARK }}>
						{this.state.index > WayangId.YUDISTIRA ? (
							<View style={styles.headerContainer}>
								<Button
									rounded
									disabled={this.state.index === WayangId.NAKULA}
									transparent
									onPress={this.prevIndex}
									style={{ backgroundColor: COLORS.PRIMARY_DARK }}>
									<Icon
										style={{
											color: COLORS.PRIMARY_LIGHT,
											opacity: this.state.index === WayangId.NAKULA ? 0.3 : 1,
										}}
										{...ICONS.ARROW_LEFT_CYCLE}
									/>
								</Button>
								<Text style={styles.headerText}>{this.state.data.nama}</Text>
								<Button
									rounded
									disabled={this.state.index === WayangId.SADEWA}
									transparent
									onPress={this.nextIndex}
									style={{ backgroundColor: COLORS.PRIMARY_DARK }}>
									<Icon
										style={{
											color: COLORS.PRIMARY_LIGHT,
											opacity: this.state.index === WayangId.SADEWA ? 0.3 : 1,
										}}
										{...ICONS.ARROW_RIGHT_CYCLE}
									/>
								</Button>
							</View>
						) : (
								<View style={styles.headerContainer}>
									<Text style={styles.headerText}>{this.state.data.nama}</Text>
								</View>
							)}
					</Header>
					<Tabs
						tabBarUnderlineStyle={{ backgroundColor: 'transparent' }}
						initialPage={0}
						renderTabBar={() => (
							<ScrollableTab backgroundColor={COLORS.PRIMARY_DARK} />
						)}>
						<Tab heading={'BENTUK WAYANG'} {...this.tabProps}>
							<ScrollView contentContainerStyle={styles.scrollView}>
								{this.state.img &&
									this.state.img.map((x) => (
										<Card key={shortid.generate()}>
											<CardItem cardBody style={styles.cardItem}>
												<Image
													style={{
														width: null,
														height: heightPercentageToDP('62%'),
														flex: 1,
													}}
													resizeMode='stretch'
													source={{
														uri: x,
													}}
												/>
											</CardItem>
										</Card>
									))}
							</ScrollView>
						</Tab>
						<Tab heading='NAMA LAIN' {...this.tabProps}>
							<NamaTab data={this.state.data} />
						</Tab>

						<Tab heading={'SILSILAH'} {...this.tabProps}>
							<SilsilahTab data={this.state.data} />
						</Tab>
						<Tab heading='SIFAT' {...this.tabProps}>
							<SifatTab data={this.state.data} />
						</Tab>
						<Tab heading='KESAKTIAN' {...this.tabProps}>
							<KesaktianTab data={this.state.data} />
						</Tab>
						<Tab heading='KISAH' {...this.tabProps}>
							<KisahTab data={this.state.data} />
						</Tab>
					</Tabs>
				</>
			);
		}
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
			{props.data.kisah.map((x) => (
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
						style={{ ...styles.listTextPrimary, marginRight: 5 }}
					/>
					<Body>
						<Text style={styles.listTextPrimary}>{orangTua.Ibu}</Text>
						<Text style={styles.listTextSecondary}>Ibu</Text>
					</Body>
				</ListItem>
				<ListItem noIndent style={styles.listItem}>
					<Icon
						{...ICONS.BULLET}
						style={{ ...styles.listTextPrimary, marginRight: 5 }}
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
					istri.map((x) => (
						<ListItem key={shortid.generate()} noIndent style={styles.listItem}>
							<Icon
								{...ICONS.BULLET}
								style={{ ...styles.listTextPrimary, marginRight: 5 }}
							/>
							<Text style={styles.listTextPrimary}>{x}</Text>
						</ListItem>
					))}
				{putra.length > 0 && (
					<ListItem
						key={shortid.generate()}
						itemDivider
						first
						style={styles.listDivider}>
						<Text style={styles.listTextHeader}>PUTRA</Text>
					</ListItem>
				)}
				{putra.length > 0 &&
					putra.map((x) => (
						<ListItem key={shortid.generate()} noIndent style={styles.listItem}>
							<Icon
								{...ICONS.BULLET}
								style={{ ...styles.listTextPrimary, marginRight: 5 }}
							/>
							<Text style={styles.listTextPrimary}>{x}</Text>
						</ListItem>
					))}
				{putri.length > 0 && (
					<ListItem
						key={shortid.generate()}
						itemDivider
						first
						style={styles.listDivider}>
						<Text style={styles.listTextHeader}>PUTRI</Text>
					</ListItem>
				)}
				{putri.length > 0 &&
					putri.map((x) => (
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

function NamaTab(props) {
	return (
		<ScrollView style={styles.scrollView}>
			<List>
				{props.data.namaLain.map((x) => (
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
						style={styles.listDivider}>
						<Text style={styles.listTextHeader}>AJI</Text>
					</ListItem>
				)}
				{kesaktian.length > 0 &&
					kesaktian.map((x) => (
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
						style={styles.listDivider}>
						<Text style={styles.listTextHeader}>PUSAKA</Text>
					</ListItem>
				)}
				{pusaka.length > 0 &&
					pusaka.map((x) => (
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
		paddingLeft: widthPercentageToDP('5%'),
		paddingRight: widthPercentageToDP('5%'),
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
	cardHeader: {
		backgroundColor: COLORS.PRIMARY_DARK,
	},
	cardItem: {
		backgroundColor: COLORS.PRIMARY_LIGHT,
	},
	textBody: {
		fontFamily: FONTS.REGULAR,
		fontSize: 18,
		textAlign: 'justify',
	},
	scrollView: {
		padding: widthPercentageToDP('7%'),
	},
	listItem: { borderBottomColor: COLORS.PRIMARY_DARK },
	listDivider: {
		backgroundColor: COLORS.PRIMARY_DARK,
		borderRadius: widthPercentageToDP('10%'),
		marginTop: heightPercentageToDP('3%'),
	},
	listTextHeader: {
		fontFamily: FONTS.BOLD,
		color: COLORS.PRIMARY_LIGHT,
	},
	listTextPrimary: {
		fontFamily: FONTS.BOLD,
		color: COLORS.PRIMARY_DARK,
		fontSize: 16,
	},
	listTextSecondary: {
		fontFamily: FONTS.REGULAR,
		color: COLORS.PRIMARY_DARK,
		fontSize: 16,
		opacity: 0.7,
	},
});
