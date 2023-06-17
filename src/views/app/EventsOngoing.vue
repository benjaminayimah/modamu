<template>
    <div class="mb-24">
        <h3 class="mb-8">Ongoing events</h3>
        <div class="gray">View and track all on going events here.</div>
    </div>
    <table-body-ongoing :events="displayedItems" />
    <pagination-controls v-if="totalItems > 10" :currentPage="currentPage" :totalPages="totalPages" @previous="previousPage" @next="nextPage" />
</template>
<script>
import PaginationControls from '@/components/includes/app/PaginationControls.vue';
import { mapGetters } from 'vuex';
import TableBodyOngoing from '../../components/layouts/TableBodyOngoing.vue';
export default {
    components: { TableBodyOngoing, PaginationControls },
    name: 'OngoingEvents',
    computed: {
        ...mapGetters(['getOngoingEvents']),
        totalItems() {
            return this.getOngoingEvents.length
        },
        totalPages() {
            return Math.ceil(this.totalItems / this.itemsPerPage);
        },
        displayedItems() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.getOngoingEvents.slice(startIndex, endIndex);
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