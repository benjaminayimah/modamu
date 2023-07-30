<template>
    <div class="mb-24">
        <h3 class="mb-8">Upcoming events</h3>
        <div class="gray">View and track all upcoming events here.</div>
    </div>
    <table-body-upcoming :events="displayedItems" />
    <pagination-controls v-if="totalItems > itemsPerPage" :currentPage="currentPage" :totalPages="totalPages" @previous="previousPage" @next="nextPage" />
</template>
<script>
import PaginationControls from '@/components/includes/app/PaginationControls.vue';
import { mapGetters } from 'vuex';
import TableBodyUpcoming from '../../components/layouts/TableBodyUpcoming.vue';
export default {
    components: { TableBodyUpcoming, PaginationControls },
    name: 'UpcomingEvents',
    computed: {
        ...mapGetters(['getUpcomingEvents']),
        totalItems() {
            return this.getUpcomingEvents.length
        },
        totalPages() {
            return Math.ceil(this.totalItems / this.itemsPerPage);
        },
        displayedItems() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.getUpcomingEvents.slice(startIndex, endIndex);
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