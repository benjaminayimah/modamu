<template>
    <router-link :to="{ name: 'Attendee', params: { id: kid.id, name: kid.name, event:event } }" class="grid-item table-row">
        <div class="table-cell flx ai-c gap-8">
            <div class="bg-img br-50"></div>
            <span>Name of child</span>
        </div>
        <div class="table-cell flx ai-c">Age</div>
        <div class="table-cell flx jc-sb ai-c">
            <span class="gender-pill" data-type="male">Male</span>
        </div>
        <div class="flx jc-c">
            <button class="button-primary">Request code</button>
        </div>
    </router-link>
</template>
<script>
export default {
    name: 'RequestListRow',
    props: ['kid', 'event']
}
</script>
<style lang="scss" scoped>
$radius: 30px;
.table-row{
    .table-cell {
        background-color: var(--bg-white);
        &:first-child{
            border-top-left-radius: $radius;
            border-bottom-left-radius: $radius;
        }
        &:nth-child(3){
            border-top-right-radius: $radius;
            border-bottom-right-radius: $radius;
        }
    }
}
.button-primary {
    height: 55px;
    padding: 8px 50px;
}
</style>