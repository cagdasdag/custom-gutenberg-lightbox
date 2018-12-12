/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var __ = wp.i18n.__;
var el = wp.element.createElement;
var registerBlockType = wp.blocks.registerBlockType;
var _wp$editor = wp.editor,
    RichText = _wp$editor.RichText,
    MediaUpload = _wp$editor.MediaUpload,
    PlainText = _wp$editor.PlainText,
    MediaUploadCheck = _wp$editor.MediaUploadCheck,
    BlockControls = _wp$editor.BlockControls,
    BlockAlignmentToolbar = _wp$editor.BlockAlignmentToolbar;
var _wp$components = wp.components,
    Button = _wp$components.Button,
    IconButton = _wp$components.IconButton,
    ResizableBox = _wp$components.ResizableBox,
    Toolbar = _wp$components.Toolbar;
var Fragment = wp.element.Fragment;


registerBlockType('custom-gutenberg/lightbox-image', {
	title: __('Lightbox Image', 'custom-gutenberg-lightbox'),
	description: __('The picture you added will be displayed with Lightbox', 'custom-gutenberg-lightbox'),
	icon: 'format-image',
	category: 'custom-gutenberg',
	keywords: [__('image', 'custom-gutenberg-lightbox'), __('photo', 'custom-gutenberg-lightbox'), __('pics', 'custom-gutenberg-lightbox')],
	attributes: {
		title: {
			type: 'string'
		},
		imageAlt: {
			attribute: 'alt'
		},
		imageUrl: {
			attribute: 'src'
		},
		height: {
			type: 'number'
		},
		width: {
			type: 'number'
		},
		alignItems: {
			type: 'string'
		}
	},

	edit: function edit(_ref) {
		var attributes = _ref.attributes,
		    setAttributes = _ref.setAttributes,
		    toggleSelection = _ref.toggleSelection;

		var height = attributes.height;
		var width = attributes.width;
		var toolbarEditButton = void 0;

		var getImageButton = function getImageButton(openEvent) {
			if (attributes.imageUrl) {

				// Add Edit Button to Toolbar
				toolbarEditButton = wp.element.createElement(
					MediaUploadCheck,
					null,
					wp.element.createElement(
						Toolbar,
						null,
						wp.element.createElement(MediaUpload, {
							onSelect: function onSelect(media) {
								setAttributes({ imageAlt: media.alt, imageUrl: media.url, height: media.height, width: media.width });
							},
							render: function render(_ref2) {
								var open = _ref2.open;
								return wp.element.createElement(IconButton, {
									className: 'components-toolbar__control',
									label: __('Edit image', 'custom-gutenberg-lightbox'),
									icon: 'edit',
									onClick: open
								});
							}
						})
					)
				);

				return wp.element.createElement(
					Fragment,
					null,
					wp.element.createElement(
						'figure',
						{ 'class': 'wp-block-image' },
						wp.element.createElement(
							ResizableBox,
							{
								className: 'is-selected',
								size: width && height ? {
									width: width,
									height: height
								} : undefined,
								minHeight: '20',
								lockAspectRatio: true,
								enable: {
									top: false,
									right: true,
									bottom: true,
									left: false
								},
								onResizeStop: function onResizeStop(event, direction, elt, delta) {
									setAttributes({
										height: parseInt(height + delta.height, 10),
										width: parseInt(width + delta.width, 10)
									});
									toggleSelection(true);
								},
								onResizeStart: function onResizeStart() {
									toggleSelection(false);
								}
							},
							wp.element.createElement(
								Fragment,
								null,
								wp.element.createElement('img', {
									src: attributes.imageUrl
								})
							)
						)
					)
				);
			} else {
				return wp.element.createElement(
					'div',
					{ 'class': 'button-container' },
					wp.element.createElement(
						Button,
						{
							onClick: openEvent,
							className: 'button button-large'
						},
						__('Select Image', 'custom-gutenberg-lightbox')
					)
				);
			}
		};

		// Set Toolbar Items
		var controls = wp.element.createElement(
			BlockControls,
			null,
			wp.element.createElement(BlockAlignmentToolbar, {
				value: attributes.alignItems,
				onChange: function onChange(value) {
					return setAttributes({ alignItems: value });
				}
			}),
			toolbarEditButton
		);

		return wp.element.createElement(
			Fragment,
			null,
			controls,
			wp.element.createElement(MediaUpload, {
				onSelect: function onSelect(media) {
					setAttributes({ imageAlt: media.alt, imageUrl: media.url, height: media.height, width: media.width });
				},
				type: 'image',
				render: function render(_ref3) {
					var open = _ref3.open;
					return getImageButton(open);
				}
			}),
			wp.element.createElement(PlainText, {
				onChange: function onChange(content) {
					return setAttributes({ title: content });
				},
				value: attributes.title,
				placeholder: __('Your image title', 'custom-gutenberg-lightbox'),
				className: 'heading'
			})
		);
	},
	save: function save(_ref4) {
		var attributes = _ref4.attributes;

		return wp.element.createElement(
			'div',
			null,
			wp.element.createElement(
				'div',
				{ 'class': 'cg_lightbox', style: { textAlign: attributes.alignItems } },
				wp.element.createElement(
					'a',
					{ 'class': 'cg_lightbox_image', href: attributes.imageUrl, 'data-lightbox': 'cg_lightbox', 'data-title': attributes.title },
					wp.element.createElement('img', {
						src: attributes.imageUrl,
						alt: attributes.imageAlt,
						height: attributes.height,
						width: attributes.width
					})
				)
			)
		);
	}
});

/***/ })
/******/ ]);