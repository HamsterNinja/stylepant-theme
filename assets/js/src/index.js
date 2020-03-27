import 'babel-polyfill';
import Vue from 'vue';
import Vuex from 'vuex';
import { mapState, mapGetters } from 'vuex';
Vue.use(Vuex);
Vue.use(mapState);
Vue.use(mapGetters);
import store from './store';
import Vuetify from 'vuetify';
Vue.use(Vuetify);

import ProductList from './components/ProductList.vue';
Vue.component('product-list', ProductList);

import ProductItem from './components/ProductItem.vue';
Vue.component('product-item', ProductItem);

import ProductFavorite from './components/ProductFavorite.vue';
Vue.component('product-favorite', ProductFavorite);

import Paginate from 'vuejs-paginate';
Vue.component('paginate', Paginate);

import vuezoomer from './components/vue-zoomer.vue';
Vue.component('v-zoomer', vuezoomer);

import QuantityButton from './components/QuantityButton.vue';
Vue.component('quantity-button', QuantityButton);

import addCart from './components/addCart.vue';
Vue.component('addcart', addCart);

import numeral from 'numeral';
numeral.register('locale', 'ru', {
    delimiters: {
        thousands: ' ',
        decimal: ','
    },
    abbreviations: {
        thousand: 'тыс.',
        million: 'млн.',
        billion: 'млрд.',
        trillion: 'трлн.'
    },
    ordinal: function () {
        return '.';
    },
    currency: {
        symbol: 'руб.'
    }
});

numeral.locale('ru');

document.addEventListener('DOMContentLoaded', () => {
    let elVue = "#app";
    let elVueQuery = document.querySelector(elVue);

    if (elVueQuery) {
        const app = new Vue({
            el: '#app',
            vuetify: new Vuetify(),
            store,
            delimiters: ["((", "))"],
            data() {
                return {
                    sortItems: [
                        { label: 'По умолчанию', value: 'date_desc' },
                        { label: 'По убыванию цены', value: 'price_desc' },
                        { label: 'По возрастанию цены', value: 'price_asc' },
                    ],
                    sort: 'date_desc',
                    price: [100, 15000],
                    chips: [],
                    items: SITEDATA.sizes,
                    loading: true,
                    adding: false,
                    favorite_products: [],
                    productVariations: [],

                    is_product: SITEDATA.is_product == 'true',
                    productID: SITEDATA.product_id,
                    selectedProductSize: '',
                }
            },
            computed: {
                ...mapState([
                    'category_count_page',
                    'category_count',
                    'pageNum',
                    'productCount',
                    'max_price_per_product_cat',
                    'min_price_per_product_cat',
                ]),
                currentProductVariation() {
                    if(this.productVariations.length !== 0){
                        let object = this.productVariations.find(x => x.value === this.productType);
                        this.productID = object.id;
                        this.currentProductSize = object.attribute_razmer;
                        return object;
                    }
                },
                uniqueProductVariations(){
                    let array = this.productVariations.filter(variation => variation.label !== 'образец');
                    return array.filter(variation => variation.stock_quantity > 0 );
                },
            },
            methods: {
                remove(item) {
                    this.chips.splice(this.chips.indexOf(item), 1)
                    this.chips = [...this.chips]
                },
                selectPage(pageNum){
                    this.pageNum = pageNum;
                    this.$store.commit('updatePageNum', pageNum);
                    store.dispatch('allProducts');
                },
                applyFilter(storevalue, value){
                    let methodName = 'update' + storevalue.charAt(0).toUpperCase() + storevalue.slice(1);
                    this.$store.commit(methodName, value);
                    store.dispatch('allProducts');
                },
                async addCart(ID) {
                    this.adding = true;
                    let formProduct = new FormData();
                    formProduct.append('action', 'add_one_product');
                    formProduct.append('product_id', ID);
                    formProduct.append('quantity', 1);

                    this.$refs.button_cart.innerText = "Товар добавляется"

                    // extra options
                    formProduct.append('size', this.selectedProductSize);

                    let fetchData = {
                        method: "POST",
                        body: formProduct
                    };
                    let response = await fetch(wc_add_to_cart_params.ajax_url, fetchData);
                    let jsonResponse = await response.json();
                    if (jsonResponse.error != 'undefined' && jsonResponse.error) {
                        console.error('ошибка добавления товара');
                    } else if (jsonResponse.success) {
                        this.$refs.button_cart.innerText = "Товар добавлен"
                        this.updateFragment();
                    }
                    this.adding = false;
                },
                async updateFragment(){
                    let response = await fetch(
                        wc_cart_fragments_params.wc_ajax_url.toString().replace( '%%endpoint%%', 'get_refreshed_fragments' ), 
                        {
                            method: 'POST',
                        }
                    );
                    let data = await response.json();
                    if ( data && data.fragments ) {
                        $.each( data.fragments, function( key, value ) {
                            $( key ).replaceWith( value );                            
                        }); 
                        $( document.body ).trigger( 'wc_fragments_refreshed' );
                    }
                },
                selectSize(){
                    this.$refs.button_cart.innerText = "Добавить в корзину"
                }

            },
            async mounted() {
                if (this.is_product) {
                    const requestDataProductVariations = {
                        url: SITEDATA.url + '/wp-json/amadreh/v1/get-variations/?post_parent=' + SITEDATA.product_id,
                        method: 'GET'
                    };
                    const urlProduct = requestDataProductVariations.url;
                    const responseProductVariations = await fetch(urlProduct);
                    const dataProductVariations = await responseProductVariations.json();
                    this.productVariations = dataProductVariations.data;        
                    if(dataProductVariations.data){
                        this.productType = dataProductVariations.data[0].value;
                    }       
                }
            }
        })

    }



});

$(document).ready(function () {
 $('.btn-hamburger').click(function (e) {
     $(this).parent().toggleClass('active');
     $('.hidden-menu_block').toggleClass('active');
     $('.overlay').toggleClass('active');

 });
 $('.overlay,.btn-hamburger.active').click(function (e) {
     $('.overlay').removeClass('active');
     $('.hidden-menu_block').removeClass('active');
 });


  $('.main-banner-slick').slick({
     infinite: true,
     slidesToShow: 1,
     slidesToScroll: 1,
     arrows: true,
     dots: false,
 });
  $('.partners-slick').slick({
     infinite: true,
     slidesToShow: 7,
     slidesToScroll: 7,
     arrows: true,
     dots: false,
     responsive: [
    {
      breakpoint: 1340,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 6,
        infinite: true,
        dots: false
      }
    },{
      breakpoint: 840,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: true,
        dots: false
      }
    },{
      breakpoint: 640,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: false
      }
    },{
      breakpoint: 420,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: false
      }
    }
  ]
 });
  $('.products-slick').slick({
     infinite: true,
     slidesToShow: 5,
     slidesToScroll: 5,
     arrows: true,
     dots: false,
     responsive: [
    {
      breakpoint: 1340,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: true,
        dots: false
      }
    },{
      breakpoint: 840,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: false
      }
    },{
      breakpoint: 640,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: false
      }
    },{
      breakpoint: 420,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: false
      }
    }
  ]
 });
    $('.popular-slick').slick({
     infinite: true,
     slidesToShow: 4,
     slidesToScroll: 4,
     arrows: true,
     dots: false,
     responsive: [
    {
      breakpoint: 1340,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: false
      }
    },{
      breakpoint: 840,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: false
      }
    },{
      breakpoint: 640,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: false
      }
    },{
      breakpoint: 420,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: false
      }
    }
  ]
 });
   $('.choice-button').click(function (event) {
     event.preventDefault();
     $('.choice-button').removeClass('active');
     $(this).addClass('active');

     var id = $(this).attr('data-id');
     if (id) {
         
         $('.main-page-products-content-inner:visible').removeClass('visible');
         $('.main-page-products-content').find('#' + id).addClass('visible');
     }
 });
});