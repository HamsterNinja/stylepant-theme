<?php
/**
 * Email Addresses
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/emails/email-addresses.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce/Templates/Emails
 * @version 3.5.4
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$text_align = is_rtl() ? 'right' : 'left';
$address    = $order->get_formatted_billing_address();
$shipping   = $order->get_formatted_shipping_address();

?><table id="addresses" cellspacing="0" cellpadding="0" style="width: 100%; vertical-align: top; margin-bottom: 40px; padding:0;" border="0">
	<tr>
		<td style="text-align:<?php echo esc_attr( $text_align ); ?>; font-family: 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif; border:0; padding:12px;" valign="top" width="50%">
			<h2>Ваши данные:</h2>
			<address class="address">
				<p style="font-weight: bold; margin: 10px 0 5px;">Имя:</p>
				<?php echo esc_html( $order->get_billing_first_name() ); ?> <?php echo esc_html( $order->get_billing_last_name() ); ?>
				<p style="font-weight: bold; margin: 10px 0 5px;">Адрес:</p>
				<?php echo esc_html( $order->get_billing_country() ); ?>,
				<?php echo esc_html( $order->get_shipping_postcode() ); ?>,
				<?php echo esc_html( $order->get_shipping_state() ); ?>,
				<?php echo esc_html( $order->get_billing_city() ); ?>,
				<?php echo esc_html( $order->get_billing_address_1() ); ?>

				<p style="font-weight: bold; margin: 10px 0 5px;">Контактные данные:</p>
				<?php if ( $order->get_billing_phone() ) : ?>
					<?php echo esc_html( $order->get_billing_phone() ); ?>
				<?php endif; ?>
				<?php if ( $order->get_billing_email() ) : ?>
					<br/><?php echo esc_html( $order->get_billing_email() ); ?>
				<?php endif; ?>
			</address>
		</td>
		<?php if ( ! wc_ship_to_billing_address_only() && $order->needs_shipping_address() && $shipping ) : ?>
			<td style="text-align:<?php echo esc_attr( $text_align ); ?>; font-family: 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif; padding:12px;" valign="top" width="50%">
				<h2><?php esc_html_e( 'Shipping address', 'woocommerce' ); ?></h2>

				<address class="address"><?php echo wp_kses_post( $shipping ); ?></address>
			</td>
		<?php endif; ?>
	</tr>
</table>
