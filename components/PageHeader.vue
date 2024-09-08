<template>
    <div class="header">
        <NuxtImg src="/header/vdnh-logo.svg" />
        <NuxtImg src="/header/russia-logo.svg" />
    </div>
    <div :class="['second-header', showHeader ? '' : 'fixed-header']">
        <div class="menuElement" v-for="(item, index) in menuElements" :key="index" >
            {{ item.label }}
        </div>
        
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
    setup() {   
        const menuElements = [
            {
                label: 'Афиша',
            },
            {
                label: 'Участники',
            },
            {
                label: 'Информация',
            },
            {
                label: 'Карта форума',
            },
        ];

        const showHeader = ref(true);

        const goScroll = () => {
            if (scrollY > 120) {
                if (showHeader.value === true) {
                    showHeader.value = false;
                }
            } else {
                if (showHeader.value === false) {
                    showHeader.value = true;
                }
            }
        };

        onMounted(() => {
            window.addEventListener('scroll', goScroll);
        })
        
        return {
            menuElements,
            showHeader,
        }
    },
}
</script>

<style lang="scss" scoped>
.header {
    display: flex;
    gap: 10px;
    margin-top: 25px;
    margin-bottom: 120px;
    padding-left: 40px;
}

.second-header {
    background: white;
    border-radius: 18px;
    z-index: 10;
    box-shadow: 0px 4px 35px 0px rgba(34, 60, 80, 0.09);
    gap: 45px;
    display: flex;
    position: absolute;
    top: 135px;
    width: 1440px;
    padding: 28px 45px;

    @media screen and (max-width: 1440px) {
        width: 1280px;
    }
}

.menuElement {
    font-size: 18px;
    color: #E22C38;
    font-weight: 500;
    line-height: 24px;
}

.fixed-header {
    position: fixed;
    top: 16px;
}
</style>