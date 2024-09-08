<template>
    <div class="app">
        <div class="wrapper">
            <page-header />
            <div class="body">
                <slot />
            </div>
            <div class="footer"></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.app {
    background: #f7f7fc;
    display: flex;
    align-items: center;
    flex-direction: column;
    min-height: 100vh;
}

.wrapper {
    width: 1440px;

    @media screen and (max-width: 1440px) {
        width: 1280px;
    }
}

.footer {
    width: 100%;
    height: 100px;
    background: #b4b7e0;
}

.column {
    display: flex;
    flex-direction: column;
}

.row {
    display: flex;
    flex-direction: row;
}
</style>