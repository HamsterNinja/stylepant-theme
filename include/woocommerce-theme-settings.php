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

function price_array($price){
    $del = array('<span class="woocommerce-Price-amount amount">', '<span class="woocommerce-Price-currencySymbol">' ,'</span>','<del>','<ins>', '&#8381;', '&nbsp;');
    $price = str_replace($del, '', $price);
    $price = str_replace('</del>', '|', $price);
    $price = str_replace('</ins>', '|', $price);
    $price_arr = explode('|', $price);
    $price_arr = array_filter($price_arr);
    return $price_arr;
}

function product_render($post)
{
    setup_postdata($post);
    $product = wc_get_product($post->ID);

    $context['id'] = $product->get_id();
    $context['title'] = $product->get_title();;
    $context['link'] = $product->get_permalink();
    $context['thumbnail'] = get_the_post_thumbnail_url($product->get_id() , 'medium');
    $context['prices'] = price_array($product->get_price_html());
    $context['sitethemelink'] = get_template_directory_uri();

    Timber::render('partials/product-item.twig', $context);
}