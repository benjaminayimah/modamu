<template>
    <section class="section-main">
        <div class="title-row flx gap-50 ai-c">
            <div class="flx gap-16 ai-c">
                <h1 class="title">Parents</h1>
                <span class="count-info count-secondary">{{ parents.length }}</span>
            </div>
            <div class="input-wrapper">
                <i>
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 13.974 13.974">
                        <path d="M-3384.438-704.614l-1.494-1.5c-1.017.746-2.525,1.083-4.788,1.083-2.569,0-4.164-.435-5.174-1.408-1.052-1.015-1.521-2.646-1.521-5.288s.469-4.273,1.521-5.288c1.01-.974,2.605-1.408,5.174-1.408s4.164.434,5.174,1.408c1.053,1.014,1.522,2.645,1.522,5.288,0,2.244-.338,3.759-1.085,4.786l1.5,1.5a.583.583,0,0,1,0,.824.58.58,0,0,1-.412.171A.582.582,0,0,1-3384.438-704.614Zm-10.647-11.556c-.795.766-1.165,2.18-1.165,4.448s.37,3.682,1.165,4.449c.775.747,2.121,1.08,4.364,1.08s3.589-.333,4.364-1.08c.795-.767,1.165-2.181,1.165-4.449s-.37-3.682-1.165-4.448c-.775-.748-2.12-1.081-4.364-1.081S-3394.311-716.918-3395.085-716.17Z" transform="translate(3397.417 718.417)" fill="#212135"/>
                    </svg>
                </i>
                <input class="form-control" v-model="search" @input="checkFilters" type="search" data-type="icon" placeholder="Search parents...">
            </div>
            <div class="flx jc-sb flx-grow-1 ai-c">
                <ul class="flx dropdown-toggle gap-8">
                    <sort-dropdown :id="'parent_sort'" @sortItem="doSort" />
                    <filter-dropdown :id="'parent_filter'" @filterItem="doFilter" />
                    <li>
                        <a v-if="filter != 'all' || sort != 'newest'" @click="clearFilters" class="resetFilter br-32 fs-095" data-type="reset" href="#">Reset filters</a>
                    </li>
                </ul>
                <ul class="dropdown-toggle">
                    <export-dropdown id="'parent_export'" @do-export="doParentExport" />
                </ul>
            </div>
        </div>
        <div id="grid_table">
            <div v-if="!parents.length" class="bg-white pd-24 br-16 centered">
                <div>There are no parents</div>
            </div>
            <div v-else-if="computedItem.length" class="grid table-body">
                <div class="grid-item table-head grid-col-parents">
                    <h4 class="table-cell wrap-text wrap-line-1">Name</h4>
                    <h4 class="table-cell wrap-text wrap-line-1">Kids</h4>
                    <h4 class="table-cell wrap-text wrap-line-1">Role</h4>
                    <h4 class="table-cell wrap-text wrap-line-1">Contact</h4>
                </div>
                <parent-row v-for="parent in sortProducts(computedItem)" :key="parent.id" :parent="parent" />
            </div>
            <div v-else><strong>No search result for:</strong> <i>{{ search || filter }}</i></div>
        </div>
    </section>
</template>
<script>
import ParentRow from '@/components/includes/app/ParentRow.vue'
import { mapState } from 'vuex'
import SortDropdown from '@/components/includes/dropdowns/SortDropdown.vue'
import FilterDropdown from '@/components/includes/dropdowns/FilterDropdown.vue'
import ExportDropdown from '@/components/includes/dropdowns/ExportDropdown.vue'
export default {
    components: { ParentRow, SortDropdown, FilterDropdown, ExportDropdown },
    name: 'ParentsPage',
    computed: {
        ...mapState({
            parents: (state) => state.parents,
            hostname: (state) => state.hostname,
            token: (state) => state.token,
        }),
        computedItem() {
            if(this.search !=='') {
                return this.parents.filter(item => {
                    return item.name.toLowerCase().match(this.search.replace(/[^\w\s]/gi, "").toLowerCase())
                })
            }
            if(this.filter !== 'all') {
                return this.parents.filter(item => {
                    return item.relationship.toLowerCase().match(this.filter.toLowerCase())
                })
            }
            else
            return this.parents
        }
    },
    data() {
        return {
            search: '',
            sort: 'newest',
            filter: 'all'
        }
    },
    methods: {
        sortProducts(items) {
            if(this.sort === 'newest')
            return items.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // newest
            else if(this.sort === 'oldest')
            return items.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)) // oldest
            else if(this.sort === 'a-z')
            return items.sort((a, b) => a.name.localeCompare(b.name)) //a-z
            else if(this.sort === 'z-a')
            return items.sort((a, b) => b.name.localeCompare(a.name))  //z-a
        },
        doSort(payload) {
            this.sort = payload
        },
        doFilter(payload) {
            this.search = ''
            this.filter = payload
        },
        doParentExport() {
            let mapForm = document.createElement("form");
                mapForm.id = "export_form";
                mapForm.target = "Map";
                mapForm.method = "POST"
                mapForm.action = this.hostname+'/api/parents-export?token='+this.token;
                const params = {
                    search: this.search,
                    filter: this.filter
                }
            let mapInput = document.createElement("input");
                mapInput.type = "hidden";
                mapInput.name = "data";
                mapInput.value = JSON.stringify(params);
                mapForm.appendChild(mapInput);
                document.body.appendChild(mapForm);
                const map = window.open("", "Map", "status=0,title=0,height=800,width=700,scrollbars=1");
            if (map) {
                mapForm.submit();
            } else {
                alert('You must allow popups for export to work.');
            }
        },
        checkFilters() {
            this.filter != 'all' ? this.filter = 'all' : ''
        },
        clearFilters() {
            // this.search = ''
            this.filter = 'all'
            this.sort = 'newest'
            this.$store.commit('resetParentFilter')
        }
    }
    
}
</script>
<style lang="scss" scoped>
section {
    padding: $profileSecPadding 0;
}
.grid-col-parents{
    grid-template-columns: 1.6fr .8fr .8fr 1.5fr;
}
.resetFilter{
    background-color: transparent;
    padding: 17px 18px;
    transition: var(--input-btn-transition);
    text-decoration: underline;
    &:hover {
        background-color: var(--input-hover);
    }
}
</style>