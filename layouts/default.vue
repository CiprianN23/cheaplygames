<script>
import '~/assets/css/reset.css'
import '~/assets/css/variables.css'
import '~/assets/css/global.css'
</script>

<template>
    <div>
        <AppHeader />
        <slot />
        <LazyAppFooter hydrate-never/>
    </div>

</template>