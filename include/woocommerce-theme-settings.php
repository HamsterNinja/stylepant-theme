<?
//Корзина вверху
add_filter('woocommerce_add_to_cart_fragments', 'woocommerce_header_add_to_cart_fragment');
function woocommerce_header_add_to_cart_fragment( $fragments )
{
    global $woocommerce;
    ob_start();
    my_wc_cart_count();
    $fragments['.main-header-cart'] = ob_get_clean();
    return $fragments;
}
function my_wc_cart_count() {
    global $woocommerce; ?>
	<div class="main-header-cart"><a href="<?= get_site_url(); ?>/cart"><img src="<?php echo get_template_directory_uri();?>/assets/images/cart.png" alt=""><span class="cart-quant"><?php echo WC()->cart->get_cart_contents_count(); ?></span></a></div>
<?php
}
add_action('header_action', 'my_wc_cart_count');