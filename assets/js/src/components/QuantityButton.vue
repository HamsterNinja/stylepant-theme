<template>

        <div class="add-card-quantity">
            <button type="button" class="btn-quant btn-minus" @click.prevent="decrementProduct">
                <svg width="10" height="2" viewBox="0 0 15 4" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 1h13.5" stroke="#000"/></svg>
            </button>
            <input 
                :ref="'count_' + refhash"
                class="quantity-value"
                name="order[]"
              
                placeholder="0"
                v-model="productCountComponent"
                :max="maxCount"
                @change="setValue"
            />
            <button type="button" class="btn-quant btn-plus" @click.prevent="incrementProduct">
                <svg width="10" height="10" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 7h13.5M7 0v13.5" stroke="#000"/></svg>
            </button>
        </div>
</template>

<script>
export default {
    props: {
        product_id: {
            type: [Number, String],
            default: 1
        },
        productCount: {
            type: [Number, String],
            default: 1,
        },
        maxCount: {
            type: [Number, String],
            default: 100000
        }
    },
    data() {
        return {
            productCountComponent: this.productCount,
            showWarning: false,
            refhash: Math.floor(Math.random() * Math.floor(1000))
        };
    },
    methods: {
        incrementProduct: function() {
            if (this.maxCount > this.productCountComponent) {
                this.productCountComponent++;
                this.$emit('input', this.productCountComponent);
            }

        },
        decrementProduct: function() {
            if (this.productCountComponent > 0) {
                this.productCountComponent--;
                this.$emit('input', this.productCountComponent);
            }
        },
        setValue($event){
            let value = parseInt($event.target.value) || 0;
            if (value > this.maxCount) {
                this.productCountComponent = this.maxCount;   
            }
            else if (value < 0) {
                this.productCountComponent = 0;
            }
            else{
                this.productCountComponent = value;
            }
            this.$emit('input', this.productCountComponent);
        }
    },
};
</script>