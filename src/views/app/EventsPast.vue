<template>
    <div class="mb-24">
        <h3 class="mb-8">Past events</h3>
        <div class="gray">View and track all past events here.</div>
    </div>
    <table-body-past :events="displayedItems" />
    <pagination-controls v-if="totalItems > itemsPerPage" :currentPage="currentPage" :totalPages="totalPages" @previous="previousPage" @next="nextPage" />
</template>
<script>
import PaginationControls from '@/components/includes/app/PaginationControls.vue';
import { mapGetters } from 'vuex';
import TableBodyPast from '../../components/layouts/TableBodyPast.vue';
export default {
    components: { TableBodyPast, PaginationControls },
    name: 'PastEvents',
    computed: {
        ...mapGetters(['getPastEvents']),
        totalItems() {
            return this.getPastEvents.length
        },
        totalPages() {
            return Math.ceil(this.totalItems / this.itemsPerPage);
        },
        displayedItems() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.getPastEvents.slice(startIndex, endIndex);
        }
    },
    data() {
        return {
            currentPage: 1,
            itemsPerPage: 10,
        }
    },
    methods: {
        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        }
    }
}
</script>
