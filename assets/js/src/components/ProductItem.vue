<template v-if="product.stock_status == 'instock'">
    <a class="products-item-link" :href="product.permalink">
        <div class="products-item-image"> 
            
            <img v-if="product.images[0].woocommerce_single" :src="product.images[0].woocommerce_single" :alt="product.name"/>
            <img v-else :src="template_url + '/assets/images/placeholder-images.webp'" :alt="product.name">
        </div>
        <div class="product-item-name">
            <h4>{{ product.name }}</h4>
        </div>
        <div class="products-item-price">
            <template v-if="product.sale_price">
                    <div class="catalog_current-price">
                        <span v-html="product.sale_price"></span>
                        <span>₽</span>
                    </div>
                    <div class="catalog_old-price" v-if="product.regular_price">
                        <span v-html="product.price_html[0]"></span>
                        <span>₽</span>
                    </div>
                </template>
                <template v-else-if="product.regular_price">
                    <div class="catalog_current-price" v-if="product.regular_price">
                        <span v-html="product.price_html[0]"></span>
                        <span>₽</span>
                    </div>
                </template>

                <template v-else>
                    <div class="catalog_current-price" v-if="product.price">
                        <span v-html="product.price"></span>
                        <span>₽</span>
                    </div>
                </template>
        </div>
    </a>
</template>

<script>
export default {
    name: "product-item",
    props: {
        product: Object
    },
    mounted() {},
    data() {
        return {
            template_url: SITEDATA.themepath,
            is_home: SITEDATA.is_home == "true",
        };
    },
    computed: {},
    methods: {}
};
</script>