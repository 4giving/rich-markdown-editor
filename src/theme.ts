const colors = {
	almostBlack: '#181A1B',
	lightBlack: '#2F3336',
	almostWhite: '#E6E6E6',
	white: '#FFF',
	white10: 'rgba(255, 255, 255, 0.1)',
	black: '#000',
	black10: 'rgba(0, 0, 0, 0.1)',
	primary: '#5FAF85',
	greyLight: '#F4F7FA',
	grey: '#E8EBED',
	greyMid: '#C5CCD3',
	greyDark: '#DAE1E9'
};

export const base = {
	...colors,
	fontFamily:
		"-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen, Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif",
	fontFamilyMono: "'SFMono-Regular',Consolas,'Liberation Mono', Menlo, Courier,monospace",
	fontWeight: 400,
	zIndex: 1400,
	link: colors.primary,
	placeholder: '#B1BECC',
	textSecondary: '#4E5C6E',
	textLight: colors.white,
	textHighlight: '#b3e7ff',
	selected: colors.primary,

	blockToolbarBackground: colors.white,
	blockToolbarTrigger: colors.greyMid,
	blockToolbarTriggerIcon: colors.white,
	blockToolbarItem: colors.almostBlack,
	blockToolbarText: colors.almostBlack,
	blockToolbarHoverBackground: colors.greyLight,
	blockToolbarDivider: colors.greyMid
};

export const light = {
	...base,
	background: colors.white,
	text: colors.almostBlack,
	code: colors.lightBlack,
	cursor: colors.black,
	divider: colors.greyMid,

	toolbarBackground: colors.white,
	toolbarHoverBackground: colors.black,
	toolbarInput: colors.white10,
	toolbarItem: '#A9A59C',

	quote: colors.greyDark,
	codeBackground: colors.greyLight,
	codeBorder: colors.grey,
	horizontalRule: colors.greyMid,
	imageErrorBackground: colors.greyLight,

	scrollbarBackground: colors.greyLight,
	scrollbarThumb: colors.greyMid
};

export const dark = {
	...base,
	background: colors.almostBlack,
	text: colors.almostWhite,
	code: colors.almostWhite,
	cursor: colors.white,
	divider: '#4E5C6E',
	placeholder: '#52657A',

	toolbarBackground: colors.white,
	toolbarHoverBackground: colors.greyMid,
	toolbarInput: colors.black10,
	toolbarItem: colors.lightBlack,

	quote: colors.greyDark,
	codeBackground: colors.black,
	codeBorder: colors.lightBlack,
	codeString: '#3d8fd1',
	horizontalRule: colors.lightBlack,
	imageErrorBackground: 'rgba(0, 0, 0, 0.5)',

	scrollbarBackground: colors.black,
	scrollbarThumb: colors.lightBlack
};

export default light;
