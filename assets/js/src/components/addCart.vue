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