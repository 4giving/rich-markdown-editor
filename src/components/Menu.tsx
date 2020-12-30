import { EditorView } from 'prosemirror-view';
import * as React from 'react';
import { withTheme } from 'styled-components';

import theme from '../theme';
import { MenuItem } from '../types';
import ToolbarButton from './ToolbarButton';
import ToolbarSeparator from './ToolbarSeparator';

type Props = {
	tooltip: typeof React.Component | React.FC<any>;
	commands: Record<string, any>;
	view: EditorView;
	theme: typeof theme;
	items: MenuItem[];
};

class Menu extends React.Component<Props> {
	render() {
		const { view, items } = this.props;
		const { state } = view;
		const Tooltip = this.props.tooltip;

		return (
			<>
				{items.map((item, index) => {
					if (item.name === 'separator' && item.visible !== false) {
						return <ToolbarSeparator key={index} />;
					}
					if (!item.icon) {
						return null;
					}
					const Icon = item.icon;
					const isActive = item.active ? item.active(state) : false;

					return (
						<ToolbarButton
							disabled={Boolean(item.visible === false)}
							key={index}
							onClick={() => item.name && this.props.commands[item.name](item.attrs)}
							active={isActive}
						>
							<Tooltip tooltip={item.tooltip} placement="top">
								<Icon color={isActive ? '#5FAF85' : this.props.theme.toolbarItem} />
							</Tooltip>
						</ToolbarButton>
					);
				})}
			</>
		);
	}
}

export default withTheme(Menu);
