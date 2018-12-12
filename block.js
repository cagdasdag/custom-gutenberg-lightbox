var __ = wp.i18n.__;
var el = wp.element.createElement;
var registerBlockType = wp.blocks.registerBlockType;
const { RichText, MediaUpload, PlainText, MediaUploadCheck, BlockControls, BlockAlignmentToolbar} = wp.editor;
const { Button, IconButton, ResizableBox, Toolbar } = wp.components;
const { Fragment } = wp.element;

registerBlockType( 'custom-gutenberg/lightbox-image', {
	title: __( 'Lightbox Image', 'custom-gutenberg-lightbox' ),
	description: __( 'The picture you added will be displayed with Lightbox', 'custom-gutenberg-lightbox' ),
	icon: 'format-image',
	category: 'custom-gutenberg',
	keywords: [ __( 'image', 'custom-gutenberg-lightbox'), __( 'photo', 'custom-gutenberg-lightbox' ), __( 'pics', 'custom-gutenberg-lightbox') ],
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

	edit({ attributes, setAttributes, toggleSelection }) {
		const height = attributes.height;
		const width = attributes.width;
		let toolbarEditButton;

		const getImageButton = (openEvent) => {
			if(attributes.imageUrl) {

				// Add Edit Button to Toolbar
				toolbarEditButton = (
					<MediaUploadCheck>
						<Toolbar>
							<MediaUpload
								onSelect={ media => { setAttributes({ imageAlt: media.alt, imageUrl: media.url, height:media.height, width:media.width }); } }
								render={ ( { open } ) => (
								<IconButton
									className="components-toolbar__control"
									label={ __( 'Edit image', 'custom-gutenberg-lightbox') }
									icon="edit"
									onClick={ open }
								/>
							) }
							/>
						</Toolbar>
					</MediaUploadCheck>
				);

				return (
					<Fragment>
						<figure class="wp-block-image">
							<ResizableBox
								className= 'is-selected'
								size={
									width && height ? {
										width,
										height,
									} : undefined
								}
									minHeight="20"
									lockAspectRatio
									enable={ {
									top: false,
									right: true,
									bottom: true,
									left: false,
								} }
									onResizeStop={ ( event, direction, elt, delta ) => {
									setAttributes( {
										height: parseInt( height + delta.height, 10 ),
										width: parseInt( width + delta.width, 10 ),
									} );
									toggleSelection( true );
								} }
									onResizeStart={ () => {
									toggleSelection( false );
								} }
								>
								<Fragment>
									<img
										src={ attributes.imageUrl }
									/>
								</Fragment>
							</ResizableBox>
						</figure>
					</Fragment>
				);
			} else {
				return (
					<div class="button-container">
						<Button
							onClick={ openEvent }
							className="button button-large"
						>
							{ __( 'Select Image', 'custom-gutenberg-lightbox') }
						</Button>
					</div>
				);
			}
		};

		// Set Toolbar Items
		const controls = (
			<BlockControls>
				<BlockAlignmentToolbar
					value={ attributes.alignItems }
					onChange={ value => setAttributes( { alignItems: value } ) }
				/>
				{ toolbarEditButton }
			</BlockControls>
		);

		return (
			<Fragment>
				{ controls }
				<MediaUpload
					onSelect={ media => { setAttributes({ imageAlt: media.alt, imageUrl: media.url, height:media.height, width:media.width }); } }
					type="image"
					render={ ({ open }) => getImageButton(open) }
				/>
				<PlainText
					onChange={ ( content ) => setAttributes( { title:content } ) }
					value={ attributes.title }
					placeholder={ __( 'Your image title', 'custom-gutenberg-lightbox') }
					className="heading"
				/>
			</Fragment>
		);
	},

	save({ attributes }) {
		return (
			<div>
				<div class="cg_lightbox" style={ {textAlign: attributes.alignItems} }>
					<a class="cg_lightbox_image" href={ attributes.imageUrl } data-lightbox="cg_lightbox" data-title={ attributes.title }>
						<img
							src={ attributes.imageUrl }
							alt={ attributes.imageAlt }
							height= { attributes.height }
							width= { attributes.width }
						/>
					</a>
				</div>
			</div>
		);
	}
} );