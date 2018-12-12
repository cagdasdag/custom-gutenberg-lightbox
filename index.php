<?php
/*
Plugin Name: Custom Gutenberg Lightbox
Plugin URI: 
Description: The picture you added will be displayed with Lightbox. This is a custom block plugin for Gutenberg
Version: 1.0.0
Text Domain: custom-gutenberg-lightbox
Author: Çağdaş Dağ
Author URI: http://www.cagdasdag.com/
*/

function custom_gutenberg_lightbox() {
    wp_register_script(
        'custom-gutenberg-lightbox',
        plugins_url( 'block.build.js', __FILE__ ),
        array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-components')
    );

    register_block_type( 'custom-gutenberg-lightbox/lightbox', array(
        'editor_script' => 'custom-gutenberg-lightbox',
    ) );
}
add_action( 'init', 'custom_gutenberg_lightbox' );

// Load Lightbox Assets
function lightbox_assets() {
    wp_enqueue_style( 'lightbox-style', plugins_url( 'dist/lightbox/css/lightbox.min.css', __FILE__ ), '', '1.0' );
    wp_enqueue_script( 'lightbox-script', plugins_url( 'dist/lightbox/js/lightbox.min.js', __FILE__ ), array ( 'jquery' ), 1.0, true);
}
add_action( 'wp_enqueue_scripts', 'lightbox_assets' );

// Add Custom Gutenberg Category
add_filter( 'block_categories', function( $categories, $post ) {
    return array_merge(
    $categories,
        array(
            array(
                'slug' => 'custom-gutenberg',
                'title' => __( 'Custom Gutenberg', 'custom-gutenberg-lightbox' ),
            ),
        )
    );
}, 10, 2 );

// Load Language File
load_plugin_textdomain('custom-gutenberg-lightbox', false, basename( dirname( __FILE__ ) ) . '/languages' );