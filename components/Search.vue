<script>


    export default {
        data() {
            return {
                query: '',
            };
        },
        methods: {
            submit() {
                let query = this.query.replace(/\s/g, '');
                if (!query.length) {
                    return;
                }

                if (query.slice(0, 2) === 'Mx') {
                    this.$router.push('/address/' + query);
                } else if (query.slice(0, 2) === 'Mp') {
                    this.$router.push('/validators/' + query);
                } else if (query.slice(0, 2) === 'Mt') {
                    this.$router.push('/transactions/' + query);
                } else if (/^\d+$/.test(query)) {
                    this.$router.push('/blocks/' + query);
                } else {
                    this.$router.push('/coins/' + query.toUpperCase());
                }
                this.query = '';
            },
            inputFocus() {
                this.$emit('input-focus');
            },
            inputBlur() {
                this.$emit('input-blur');
            },
        },
    };
</script>

<template>
    <form class="header__search" @submit.prevent="submit">
        <img class="header__search-icon" src="/img/icon-search.svg" alt="" role="presentation">
        <div class="header__search-input-wrap">
            <input class="header__search-input" type="text" placeholder="Address / Txhash / Block / Public key"
                   v-model="query"
                   @focus="inputFocus"
                   @blur="inputBlur"
            >
        </div>
        <transition name="v-transition-fade">
            <button class="header__search-button button button--main button--small" :disabled="!query.trim().length">Go</button>
        </transition>
    </form>
</template>
