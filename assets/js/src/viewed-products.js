import store from './store'
const viewedProducts = {
    htmlProducts: [],
    init: () => {
        const currentItems = JSON.parse(localStorage.getItem('productsViewed'));
        if (currentItems) {
            viewedProducts.cart = new viewedProducts.CartItems(currentItems);
        } else {
            viewedProducts.cart = new viewedProducts.CartItems([]);
        }

        const productForRecord = document.querySelector('.product-for-record');
        if (productForRecord) {
            const idProductViewed = productForRecord.getAttribute('id-product');
            if (idProductViewed) {
                viewedProducts.cart.addToCart(idProductViewed);
            }
        }
        viewedProducts.cart.render();
    },
    CartItems(items) {
        this.items = items;
        this.addToCart = (productID) => {
            if (!(this.items.includes(productID))) {
                if (this.items.length == 6) {
                    this.items.shift();
                }
                this.items.push(productID);
            }
            localStorage.setItem('productsViewed', JSON.stringify(this.items));
        };

        this.render = () => {
            const createProductTemplate = async (productIDs) => {
                const requestData = {
                    url: SITEDATA.url + '/wp-json/wc/v3/products/',
                    method: 'GET'
                };

                const postGet = requestData.url + '?include=' + productIDs;
                const response = await fetch(postGet);
                try {
                    const json = await response.json();
                    return json;
                } catch (e) {
                    console.log(`Failed to retrieve product informations: (${e.message})`);
                };
            }

            createProductTemplate(this.items.join()).then(products => {
                store.commit('updateViewedProducts', products);
            }).then(() => {
                const settingsViewedViewed = {
                    infinite: true,
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    arrows: true,
                    dots: false,
                    responsive: [{
                        breakpoint: 1340,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 4,
                            infinite: true,
                            dots: false
                        }
                    }, {
                        breakpoint: 840,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: true,
                            dots: false
                        }
                    }, {
                        breakpoint: 640,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            infinite: true,
                            dots: false
                        }
                    }, {
                        breakpoint: 420,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            infinite: true,
                            dots: false
                        }
                    }]
                };
                $('.viewed-slick').slick(settingsViewedViewed);
            });
        };

        this.clearCart = function() {
            localStorage.removeItem('productsViewed');
        };
    }
}

export default viewedProducts;