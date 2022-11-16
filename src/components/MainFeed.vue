<template>
    <div class="feed">
        <SideBar></SideBar>
        
    </div>
        
    
    
</template>

<script>
import SideBar from './SideBar.vue';

export default {
        name: 'MainFeed',
        path: "/mainFeed",
        components: {
            SideBar,
            
        },
    };

</script>


<style>
.feed{
    display: flex;
}
</style>