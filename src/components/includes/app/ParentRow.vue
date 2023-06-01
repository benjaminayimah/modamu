<template>
    <router-link :to="{ name: 'ViewParentProfile', params: { parent_id: this.parent.id, parent: this.parent.name } }" class="table-row grid-item row-hover grid-col-parents">
        <div class="table-cell gap-8">
            <profile-avatar :id="parent.id" :image="parent.image"/>
            <span class="wrap-text wrap-line-1">{{ parent.name }}</span>
        </div>
        <div class="table-cell gap-4"><span>{{ computedKids }}</span><span>kids</span></div>
        <div class="table-cell gap-4"><span :data-type="parent.relationship" class="gender-pill capitalize">{{ parent.relationship }}</span></div>
        <div class="table-cell jc-sb">
            <div class="flx ai-c">
                <span class="wrap-text wrap-line-1">{{ parent.phone }}</span>
            </div>
            <span class="ft-primary pd-0-20 see-details">
                See details
                <svg xmlns="http://www.w3.org/2000/svg" height="10" viewBox="0 0 5.715 10">
                    <path d="M1.533,10a.715.715,0,0,1-.505-1.22L4.808,5,1.028,1.22A.715.715,0,1,1,2.038.21L6.324,4.495a.715.715,0,0,1,0,1.011L2.038,9.791A.712.712,0,0,1,1.533,10Z" transform="translate(-0.818 0)" fill="#87a5ff"/>
                </svg>
            </span>
        </div>
    </router-link>
</template>

<script>
import { mapState } from 'vuex';
import ProfileAvatar from './ProfileAvatar.vue';
export default {
  components: { ProfileAvatar },
    name: 'ParentRow',
    props: ['parent'],
    computed: {
        ...mapState({
            kids: (state) => state.kids
        }),
        computedKids() {
            return this.kids.filter(kid => kid.user_id == this.parent.id).length
        }
    }
}
</script>

<style lang="scss" scoped>
.bg-img{
    height: 42px;
    width: 42px;
}
a{
    container-type: inline-size
}
@container( inline-size <= 720px) {
    .see-details{
        display: none
    }

}
</style>