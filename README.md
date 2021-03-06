[![npm version](https://badge.fury.io/js/%404giving%2Fr-m-e.svg)](https://badge.fury.io/js/%404giving%2Fr-m-e) [![Formatted with Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier) [![TypeScript](https://camo.githubusercontent.com/21132e0838961fbecb75077042aa9b15bc0bf6f9/68747470733a2f2f62616467656e2e6e65742f62616467652f4275696c74253230576974682f547970655363726970742f626c7565)](https://www.typescriptlang.org/)

# @4giving/r-m-e

This is a modified clone of [Rich Markdown Editor](https://github.com/outline/rich-markdown-editor).

## Usage

### Install

```bash
yarn add @4giving/r-m-e
```

or

```bash
npm install @4giving/r-m-e
```

Note that `react`, `react-dom`, and `styled-components` are _required_ peer dependencies.

### Import

```javascript
import Editor from '@4giving/r-m-e';

<Editor defaultValue="Hello world!" />;
```

See a working example in the [example directory](/example) with many example props.

### Props

#### `id`

A unique id for this editor, used to persist settings such as collapsed headings. If no `id` is passed then the editor will default to using the location pathname.

#### `defaultValue`

A markdown string that represents the initial value of the editor. Use this to prop to restore
previously saved content for the user to continue editing.

#### `value`

A markdown string that represents the value of the editor. Use this prop to change the value of the editor once mounted, **this will re-render the entire editor** and as such is only suitable when also in `readOnly` mode. Do not pipe the value of `onChange` back into `value`, the editor keeps it's own internal state and this will result in unexpected side effects.

#### `placeholder`

Allows overriding of the placeholder. The default is "Write something nice…".

#### `readOnly`

With `readOnly` set to `false` the editor is optimized for composition. When `true` the editor can be used to display previously written content – headings gain anchors and links become clickable.

#### `readOnlyWriteCheckboxes`

With `readOnlyWriteCheckboxes` set to `true` checkboxes can still be checked or unchecked as a special case while `readOnly` is set to `true` and the editor is otherwise unable to be edited.

#### `autoFocus`

When set `true` together with `readOnly` set to `false`, focus at the end of the
document automatically.

#### `extensions`

Allows additional [Prosemirror plugins](https://prosemirror.net/docs/ref/#state.Plugin_System) to be passed to the underlying Prosemirror instance.

#### `theme`

Allows overriding the inbuilt theme to brand the editor, for example use your own font face and brand colors to have the editor fit within your application. See the [inbuilt theme](/src/theme.ts) for an example of the keys that should be provided.

#### `dictionary`

Allows overriding the inbuilt copy dictionary, for example to internationalize the editor. See the [inbuilt dictionary](/src/dictionary.ts) for an example of the keys that should be provided.

#### `dark`

With `dark` set to `true` the editor will use a default dark theme that's included. See the [source here](/src/theme.ts).

#### `tooltip`

A React component that will be wrapped around items that have an optional tooltip. You can use this to inject your own tooltip library into the editor – the component will be passed the following props:

-   `tooltip`: A React node with the tooltip content
-   `placement`: Enum `top`, `bottom`, `left`, `right`
-   `children`: The component that the tooltip wraps, must be rendered

#### `headingsOffset`

A number that will offset the document headings by a number of levels. For example, if you already nest the editor under a main `h1` title you might want the user to only be able to create `h2` headings and below, in this case you would set the prop to `1`.

#### `scrollTo`

A string representing a heading anchor – the document will smooth scroll so that the heading is visible
in the viewport.

#### `embeds`

Optionally define embeds which will be inserted in place of links when the `matcher` function returns a truthy value. The matcher method's return value will be available on the component under `props.attrs.matches`. If `title` and `icon` are provided then the embed will also appear in the block menu.

```javascript
<Editor
	embeds={[
		{
			title: 'Google Doc',
			keywords: 'google docs gdocs',
			icon: <GoogleDocIcon />,
			matcher: href => href.matches(/docs.google.com/i),
			component: GoogleDocEmbed
		}
	]}
/>
```

### Callbacks

#### `onSave({ done: boolean }): void`

This callback is triggered when the user explicitly requests to save using a keyboard shortcut, `Cmd+S` or `Cmd+Enter`. You can use this as a signal to save the document to a remote server.

#### `onCancel(): void`

This callback is triggered when the `Cmd+Escape` is hit within the editor. You may use it to cancel editing.

#### `onChange(() => value): void`

This callback is triggered when the contents of the editor changes, usually due to user input such as a keystroke or using formatting options. You may use this to locally persist the editors state, see the [inbuilt example](/example/src/index.js).

It returns a function which when called returns the current text value of the document. This optimization is made to avoid serializing the state of the document to text on every change event, allowing the host app to choose when it needs the serialized value.

#### `onClickLink(href: string, event: MouseEvent): void`

This callback allows overriding of link handling. It's often the case that you want to have external links open a new window and have internal links use something like `react-router` to navigate. If no callback is provided then default behavior of opening a new tab will apply to all links. eg:

```javascript
import { history } from 'react-router';

<Editor
	onClickLink={(href, event) => {
		if (isInternalLink(href)) {
			history.push(href);
		} else {
			window.location.href = href;
		}
	}}
/>;
```

#### `onHoverLink(event: MouseEvent): boolean`

This callback allows detecting when the user hovers over a link in the document.

```javascript
<Editor
	onHoverLink={event => {
		console.log(`Hovered link ${event.target.href}`);
	}}
/>
```

#### `handleDOMEvents: {[name: string]: (view: EditorView, event: Event) => boolean;}`

This object maps [event](https://developer.mozilla.org/en-US/docs/Web/Events) names (`focus`, `paste`, `touchstart`, etc.) to callback functions.

```javascript
<Editor
	handleDOMEvents={{
		focus: () => console.log('FOCUS'),
		blur: () => console.log('BLUR'),
		paste: () => console.log('PASTE'),
		touchstart: () => console.log('TOUCH START')
	}}
/>
```

#### `insertImageHandler: () => (imageUrl: string);`

This allows you to get a method that will insert an image url string for you, removing the reliance of image uploading through this tool.

```javascript
<Editor
	insertImageHandler={handler => {
		handler('https://picsum.photos/600/600');
	}}
/>
```

### Interface

The Editor component exposes a few methods for interacting with the mounted editor.

#### `focusAtStart(): void`

Place the cursor at the start of the document and focus it.

#### `focusAtEnd(): void`

Place the cursor at the end of the document and focus it.

#### `getHeadings(): { title: string, level: number, id: string }[]`

Returns an array of objects with the text content of all the headings in the document,
their level in the hierarchy, and the anchor id. This is useful to construct your own table of contents since the `toc` option was removed in v10.

## Contributing

This project uses [yarn](https://yarnpkg.com) to manage dependencies. You can use npm however it will not respect the yarn lock file and may install slightly different versions.

```
yarn install
```

When running in development [webpack-serve](https://github.com/webpack-contrib/webpack-serve) is included to serve an example editor with hot reloading. After installing dependencies run `yarn start` to get going.

## License

This project is [BSD licensed](/LICENSE).
