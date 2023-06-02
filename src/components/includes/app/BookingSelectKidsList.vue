<template>
    <a @click.prevent="select" href="#" class="flx gap-24 relative ai-c a-btn" :class="{'selected': computeSelection }">
        <button class="jc-c ai-c flx-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" height="10" viewBox="0 0 15.141 11.595">
                <path d="M25.5,13.563l-1.237-1.273a.266.266,0,0,0-.2-.084h0a.255.255,0,0,0-.2.084l-8.578,8.641L12.164,17.81a.272.272,0,0,0-.394,0l-1.252,1.252a.28.28,0,0,0,0,.4L14.456,23.4a1.245,1.245,0,0,0,.823.4,1.3,1.3,0,0,0,.816-.387H16.1l9.4-9.45A.3.3,0,0,0,25.5,13.563Z" transform="translate(-10.434 -12.206)" fill="#ffffff"/>
            </svg>
        </button>
        <div class="flx flx-grow-1 column ai-c gap-8 br-24 kids-card bg-white">
            <profile-avatar :image="kid.photo" :id="kid.user_id"/>
            <div class="flx column ai-c">
                <div class="name wrap-text wrap-line-1 text-center">{{ kid.name }}</div>
                <div class="flx gap-4 gray age"><span>{{ calculateAge(kid.dob)}}</span><span>years old</span></div>
            </div>
        </div>
    </a>
</template>

<script>
import formatDateTime from '@/mixins/formatDateTime'
import ProfileAvatar from './ProfileAvatar.vue'
export default {
  components: { ProfileAvatar },
    name: 'BookingSelectKidsList',
    props: ['kid', 'selected'],
    mixins: [formatDateTime],
    computed: {
        computeSelection() {
            const result = this.selected.filter(id => id == this.kid.id)
            if (result.length)
            return true
            else
            return false
        },
    },
    methods: {
        select() {
            this.$emit('emmitSelect', this.kid.id)
        }
    }
}
</script>

<style lang="scss" scoped>
a {
    &:hover {
        button {
            border-color: var(--primary-color);
        }
    }
}
.kids-card{
    padding: 20px;
}
.bg-img{
    height: 80px;
    width: 80px;
}
.age{
    margin-top: 3px;
    font-size: 0.9rem;
}
button {
    height: 30px;
    width: 30px;
    padding: unset;
    border: 1px solid #000;
    background-color: transparent;
    svg {
        visibility: hidden;
    }
}
.selected{
    button {
        background-color: var(--primary-color);
        border-color: var(--primary-color);
        svg {
            visibility: visible;
        }
    }
}
</style>