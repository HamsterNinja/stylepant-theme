<template>
	<div class="add-to-cart-column">
		<quantity-button class="product-quantity" count='1' :max-count="maxCount" v-on:input="inputChange"></quantity-button>
		<a class="add-to-cart" href=""  v-on:click.prevent="addCart">В корзину</a>
	</div>
</template>

<script>

export default {
    props: {
        product_id: {
            type: [Number, String],
            default: 1
        },

        maxCount: {
            type: [Number, String],
            default: 100000
        }
    },
    data() {
        return {
        	productQuantity: 1
        };
    },
    methods: {
    	async addCart() {
            // TODO: убрать jquery
            let targetButton = event.target;
            var cart = $('.main-header-cart');
            let imgtodrag = $(event.target).parents('.single-product-top').find(".product-image img").eq(0);
            if (imgtodrag.length !== 0) {
                var imgclone = imgtodrag.clone()
                    .offset({
                    top: imgtodrag.offset().top,
                    left: imgtodrag.offset().left
                })
                    .css({
                    'opacity': '0.5',
                        'position': 'absolute',
                        'height': 'auto',
                        'width': '300px',
                        'z-index': '100',
                })
                    .appendTo($('body'))
                    .animate({
                        'top': cart.offset().top,
                        'left': cart.offset().left + 10,
                        'width': 75,
                        'height': 75
                }, 1000);

                
                imgclone.animate({
                    'width': 0,
                        'height': 0
                }, function () {
                    $(this).detach()
                });
            }


            this.adding = true;
            let formProduct = new FormData();
            formProduct.append('action', 'add_one_product');
            formProduct.append('product_id', this.product_id);
            formProduct.append('quantity', this.productQuantity ?  this.productQuantity : 1);
                        
            let fetchData = {
                method: "POST",
                body: formProduct
            };
            let response = await fetch(wc_add_to_cart_params.ajax_url, fetchData);
            let jsonResponse = await response.json();
            if (jsonResponse.error != 'undefined' && jsonResponse.error) {
                console.log(jsonResponse.error);
            } else if (jsonResponse.success) {
                // location = SITEDATA.url + "/cart/";
            }
                console.log(jsonResponse)
            if ( jsonResponse.fragments ) {
                // TODO: переписать
                Array.from(jsonResponse.fragments).forEach(element => {
                    element.classList.add('updating');
                });

                $.each( jsonResponse.fragments, function( key, value ) {
                    $( key ).replaceWith( value );
                    $( key ).stop( true ).css( 'opacity', '1' );
                });
            }
            this.adding = false;
        },

        inputChange(value){
            this.productQuantity = value
        }
    },
};
</script>