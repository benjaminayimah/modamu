<template>
    <section class="section-main">
        <div class="title-row flx gap-24 ai-c">
            <a class="flx gap-8 ai-c" href="#" @click.prevent="$router.go(-1)">
                <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 8.414 14.828">
                    <path d="M7,1,1,7l6,6" transform="translate(0 0.414)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                </svg>
                Back
            </a>
            <h3 class="title">
                Event info
            </h3>
        </div>
        <div class="flx gap-60 row-column">
            <div class="main-content-card details">
                <div class="relative mb-16">
                    <div v-if="is_village" class="absolute actions-container br-32">
                        <ul class="flx gap-8 ai-c jc-c">
                            <button title="Add more photos" @click="setID" class="no-width gap-4 fw-500" :class="{ 'button-disabled2' : images.length == 4 }" :disabled="images.length == 4 ? true : false">
                                <svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 15.132 15.132">
                                    <path d="M-1983.684,13.883V8.816h-5.066a1.25,1.25,0,0,1-1.25-1.25,1.25,1.25,0,0,1,1.25-1.25h5.066V1.25a1.25,1.25,0,0,1,1.25-1.25,1.25,1.25,0,0,1,1.249,1.25V6.316h5.066a1.25,1.25,0,0,1,1.25,1.25,1.25,1.25,0,0,1-1.25,1.25h-5.066v5.066a1.249,1.249,0,0,1-1.249,1.249A1.249,1.249,0,0,1-1983.684,13.883Z" transform="translate(1990)" fill="#000"/>
                                </svg>
                                <div class="wrap-text wrap-line-1">
                                    Add more photos to gallery
                                </div>
                            </button>
                            <span></span>
                            <div class="flx">
                                <button @click="doEdit" title="Edit this event">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 16.919 16.166">
                                        <path d="M-3593.823-882.342a.749.749,0,0,1-.2-.713l.857-3.427a.75.75,0,0,1,.2-.348l10.708-10.708a2.555,2.555,0,0,1,1.816-.751,2.55,2.55,0,0,1,1.815.751,2.57,2.57,0,0,1,0,3.631l-10.708,10.708a.749.749,0,0,1-.348.2l-3.427.857a.753.753,0,0,1-.181.022A.751.751,0,0,1-3593.823-882.342Zm12.624-14.134-10.561,10.561-.5,2.012,2.012-.5,10.561-10.561a1.067,1.067,0,0,0,0-1.509,1.059,1.059,0,0,0-.754-.312A1.063,1.063,0,0,0-3581.2-896.476Zm-4.385,14.353a.75.75,0,0,1-.75-.75.75.75,0,0,1,.75-.75h7.709a.75.75,0,0,1,.75.75.75.75,0,0,1-.75.75Z" transform="translate(3594.043 898.288)" fill="#000000"/>
                                    </svg>
                                </button>
                                <!-- <button title="Cancel event">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 16 16">
                                        <path d="M-1990,8a8,8,0,0,1,8-8,8,8,0,0,1,8,8,8,8,0,0,1-8,8A8,8,0,0,1-1990,8Zm1.6,0a6.407,6.407,0,0,0,6.4,6.4,6.407,6.407,0,0,0,6.4-6.4,6.407,6.407,0,0,0-6.4-6.4A6.407,6.407,0,0,0-1988.4,8Zm8.643,3.233L-1982,8.99l-2.243,2.243a.7.7,0,0,1-.99,0,.7.7,0,0,1,0-.99L-1982.99,8l-2.243-2.243a.7.7,0,0,1,0-.99.7.7,0,0,1,.99,0L-1982,7.01l2.243-2.243a.7.7,0,0,1,.99,0,.7.7,0,0,1,0,.99L-1981.01,8l2.243,2.243a.7.7,0,0,1,0,.99.7.7,0,0,1-.5.205A.7.7,0,0,1-1979.757,11.233Z" transform="translate(1990)" fill="#EA1515"/>
                                    </svg>
                                </button> -->
                                <!-- <button title="Delete event">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 17.5 21">
                                        <path id="Path_44" data-name="Path 44" d="M-3568.023-836.575a6.145,6.145,0,0,1-1.2-2.411c-.266-.878-.493-1.9-.78-3.2l-.152-.686c-.69-3.1-.346-5.1,1.082-6.3a6.375,6.375,0,0,1,2.894-1.23,22.93,22.93,0,0,1,4.43-.345,22.933,22.933,0,0,1,4.431.345,6.39,6.39,0,0,1,2.894,1.23c1.427,1.2,1.771,3.2,1.082,6.3l-.151.684c-.287,1.3-.514,2.326-.78,3.2a6.145,6.145,0,0,1-1.2,2.411c-1.031,1.148-2.731,1.575-6.273,1.575S-3566.992-835.427-3568.023-836.575Zm2.189-12.115a4.815,4.815,0,0,0-2.116.857c-1.145.958-.832,3.072-.5,4.578q.08.355.152.686c.279,1.264.5,2.262.745,3.075a4.667,4.667,0,0,0,.829,1.75c.463.517,1.387.995,4.971.995s4.508-.478,4.971-.995a4.672,4.672,0,0,0,.828-1.75c.247-.815.467-1.812.746-3.074q.073-.332.152-.687c.7-3.146.051-4.119-.5-4.578a4.82,4.82,0,0,0-2.116-.857,21.307,21.307,0,0,0-4.085-.31A21.3,21.3,0,0,0-3565.834-848.69Zm6.709,8.44v-5.25a.875.875,0,0,1,.875-.876.875.875,0,0,1,.875.876v5.25a.874.874,0,0,1-.875.875A.874.874,0,0,1-3559.125-840.25Zm-3.5,0v-5.25a.876.876,0,0,1,.875-.876.876.876,0,0,1,.876.876v5.25a.875.875,0,0,1-.876.875A.875.875,0,0,1-3562.625-840.25Zm-3.517,0v-5.25a.875.875,0,0,1,.875-.876.875.875,0,0,1,.875.876v5.25a.874.874,0,0,1-.875.875A.875.875,0,0,1-3566.142-840.25Zm11.816-10.625a14.576,14.576,0,0,0-7.424-1.625c-3.911,0-6.362.943-7.4,1.611a.876.876,0,0,1-1.21-.264.875.875,0,0,1,.264-1.209,14.509,14.509,0,0,1,6.6-1.827v-.937a.875.875,0,0,1,.875-.875h1.751a.875.875,0,0,1,.875.875v.937a14.935,14.935,0,0,1,6.576,1.814.874.874,0,0,1,.3,1.2.875.875,0,0,1-.75.424A.869.869,0,0,1-3554.326-850.875Z" transform="translate(3570.5 856)" fill="#EA1515"/>
                                    </svg>
                                </button> -->
                            </div>
                        </ul>
                    </div>
                    <div class="grid gallery gap-16">
                        <gallery-image-list v-for="image in images" :key="image.id" :image="image" :is_village="is_village"/>
                        <div v-for="empty in computeEmptyGal" :key="empty.id" class="bg-img grid-item br-16"></div>
                    </div>
                </div>
                <div class="flx column gap-24 relative">
                    <div class="flx jc-sb ai-c first-row">
                        <div class="flx gap-8 ai-c avatar-wrapper">
                            <profile-avatar :id="event.user_id" :image="event.image"/>
                            <h1>{{ event.event_name }}</h1>
                            <span class="event-status br-24 capitalize" :class="computeStatus">{{ computeStatus }}</span>
                        </div>
                        <div class="flx gap-8 ai-c">
                            <div>Price per child</div>
                            <span class="price fw-600 br-24">${{ event.amount }}</span>
                        </div>
                    </div>
                    <div v-if="event.description">
                        <label for="about" class="gray">Event info</label>
                        <p id="about" class="mb-0">
                            {{ event.description }}
                        </p>
                    </div>
                    <div class="flx gap-8 ai-c">
                        <div class="title flx gap-8 ai-c">
                            <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 20.101 19.821">
                                <path d="M-3280.074-712.862a22.722,22.722,0,0,1-4.877-3.317,11.435,11.435,0,0,1-3.8-6.158,8.244,8.244,0,0,1,1.584-6.6c1.235-1.576,3.682-3.454,8.318-3.454s7.083,1.878,8.319,3.454a8.245,8.245,0,0,1,1.584,6.6,11.436,11.436,0,0,1-3.8,6.158,22.725,22.725,0,0,1-4.878,3.317,2.694,2.694,0,0,1-1.222.3A2.7,2.7,0,0,1-3280.074-712.862Zm-5.778-15.036a6.543,6.543,0,0,0-1.258,5.237,9.809,9.809,0,0,0,3.287,5.243,21.039,21.039,0,0,0,4.511,3.065,1.013,1.013,0,0,0,.461.112,1.015,1.015,0,0,0,.462-.112,21.039,21.039,0,0,0,4.511-3.065,9.818,9.818,0,0,0,3.287-5.243,6.547,6.547,0,0,0-1.258-5.237c-1.443-1.84-3.864-2.813-7-2.813S-3284.41-729.739-3285.852-727.9Zm3.651,3.886a3.353,3.353,0,0,1,3.349-3.35,3.353,3.353,0,0,1,3.35,3.35,3.353,3.353,0,0,1-3.35,3.349A3.352,3.352,0,0,1-3282.2-724.012Zm1.675,0a1.676,1.676,0,0,0,1.674,1.675,1.676,1.676,0,0,0,1.675-1.675,1.677,1.677,0,0,0-1.675-1.675A1.676,1.676,0,0,0-3280.526-724.012Z" transform="translate(3288.902 732.387)" fill="#000"/>
                            </svg>
                            <span>Address</span>
                        </div>
                        <div class="value">
                            {{ event.address }}
                        </div>
                    </div>
                    <div class="flx gap-8 ai-c">
                        <div class="title flx gap-8 ai-c">
                            <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 14.206 15.515">
                                <path d="M-3581.85-457.886a.637.637,0,0,1-.218-.873l2.629-4.382-4.9-2.83.419-.572a6.52,6.52,0,0,1,1.288-1.317,6.474,6.474,0,0,1,2.276-1.122,6.484,6.484,0,0,1,1.684-.222,6.539,6.539,0,0,1,.849.056q.216.029.428.071a4.167,4.167,0,0,1-.434-1.035,4.154,4.154,0,0,1-.106-1.623,4.244,4.244,0,0,1,.206-.856l.256-.719,7.339,4.237-.495.581a4.156,4.156,0,0,1-.637.607,4.147,4.147,0,0,1-1.458.719,4.178,4.178,0,0,1-1.089.142q.157.176.3.365a6.47,6.47,0,0,1,1.122,2.277,6.477,6.477,0,0,1,.167,2.533,6.5,6.5,0,0,1-.5,1.773l-.285.65-5.331-3.078-2.64,4.4a.637.637,0,0,1-.546.309A.631.631,0,0,1-3581.85-457.886Zm1.823-9.867a5.205,5.205,0,0,0-1.832.9,5.34,5.34,0,0,0-.573.511l8.79,5.075a5.2,5.2,0,0,0,.157-.752,5.2,5.2,0,0,0-.134-2.037,5.2,5.2,0,0,0-.9-1.832,5.215,5.215,0,0,0-1.534-1.346,5.222,5.222,0,0,0-1.933-.656,5.225,5.225,0,0,0-.679-.044A5.253,5.253,0,0,0-3580.027-467.753Zm3.427-2.689a2.891,2.891,0,0,0,.5,1.013,2.892,2.892,0,0,0,.85.745,2.877,2.877,0,0,0,1.069.363,2.905,2.905,0,0,0,1.128-.074,2.882,2.882,0,0,0,.866-.394l-4.5-2.6A2.912,2.912,0,0,0-3576.6-470.442Z" transform="translate(3584.34 473.31)" fill="#212135"/>
                            </svg>
                            <span>Village</span>
                        </div>
                        <div class="value">
                            {{ event.name }}
                        </div>
                    </div>
                    <div class="flx gap-8 ai-c">
                        <div class="title flx gap-8 ai-c">
                            <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 26">
                                <path d="M-3300-660c0-.707.011-1.372.035-2q.019-.516.051-1,.034-.518.083-1c.5-4.965,2.267-7.018,6.832-7.707V-673a1,1,0,0,1,1-1,1,1,0,0,1,1,1v1.085c.911-.059,1.908-.086,3-.086s2.09.026,3,.086V-673a1,1,0,0,1,1-1,1,1,0,0,1,1,1v1.293c4.566.688,6.327,2.741,6.832,7.707.033.321.06.654.083,1,.022.322.038.655.052,1,.023.629.034,1.3.034,2,0,9.882-2.118,12-12,12S-3300-650.118-3300-660Zm2,0a26.907,26.907,0,0,0,.438,5.61,5.206,5.206,0,0,0,1.271,2.681,5.214,5.214,0,0,0,2.681,1.271A26.852,26.852,0,0,0-3288-650a26.842,26.842,0,0,0,5.61-.438,5.214,5.214,0,0,0,2.682-1.271,5.214,5.214,0,0,0,1.27-2.681A26.831,26.831,0,0,0-3278-660c0-.716-.011-1.381-.036-2h-19.928C-3297.989-661.38-3298-660.715-3298-660Zm2.108-8.634c-.944.692-1.625,1.908-1.929,4.633h19.642c-.3-2.725-.985-3.941-1.93-4.633a6.7,6.7,0,0,0-2.892-1.048V-669a1,1,0,0,1-1,1,1,1,0,0,1-1-1v-.909c-.869-.061-1.861-.091-3-.091s-2.132.03-3,.091V-669a1,1,0,0,1-1,1,1,1,0,0,1-1-1v-.681A6.7,6.7,0,0,0-3295.892-668.633Zm13.185,15.341-1.293-1.293-1.292,1.293a1,1,0,0,1-1.415,0,1,1,0,0,1,0-1.414l1.293-1.293-1.293-1.292a1,1,0,0,1,0-1.415,1,1,0,0,1,1.415,0l1.292,1.293,1.293-1.293a1,1,0,0,1,1.414,0,1,1,0,0,1,0,1.415l-1.292,1.292,1.292,1.293a1,1,0,0,1,0,1.414A1,1,0,0,1-3282-653,1,1,0,0,1-3282.707-653.293ZM-3294-653a1,1,0,0,1-1-1,1,1,0,0,1,1-1h3a1,1,0,0,1,1,1,1,1,0,0,1-1,1Zm0-4a1,1,0,0,1-1-1,1,1,0,0,1,1-1h3a1,1,0,0,1,1,1,1,1,0,0,1-1,1Z" transform="translate(3300 674)"/>
                            </svg>
                            <span>Date</span>
                        </div>
                        <div class="value">
                            {{ format_date(event.date) }}
                        </div>
                    </div>
                    <div class="flx gap-8 ai-c">
                        <div class="title flx gap-8 ai-c">
                            <svg id="Watch" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 17.692 23">
                                <path d="M4.993,2.782a1.9,1.9,0,0,0-.527,1.064,23.932,23.932,0,0,1,4.38-.307,23.932,23.932,0,0,1,4.38.307A1.9,1.9,0,0,0,12.7,2.782c-.482-.482-1.53-1.013-3.853-1.013S5.475,2.3,4.993,2.782ZM3.742,1.531A3.936,3.936,0,0,0,2.654,4.418C.575,5.44,0,7.522,0,11.5s.575,6.06,2.654,7.082a3.936,3.936,0,0,0,1.088,2.888C4.7,22.425,6.3,23,8.846,23s4.148-.575,5.1-1.531a3.936,3.936,0,0,0,1.089-2.888c2.079-1.022,2.654-3.1,2.654-7.082s-.575-6.06-2.654-7.082A3.936,3.936,0,0,0,13.95,1.531C12.994.575,11.389,0,8.846,0S4.7.575,3.742,1.531Zm9.484,17.624a23.939,23.939,0,0,1-4.38.307,23.939,23.939,0,0,1-4.38-.307,1.9,1.9,0,0,0,.527,1.064c.482.482,1.53,1.013,3.853,1.013s3.371-.531,3.853-1.013A1.9,1.9,0,0,0,13.226,19.154ZM2.875,16.624c-.658-.592-1.106-1.8-1.106-5.124s.448-4.532,1.106-5.124A3.815,3.815,0,0,1,4.738,5.6a21.859,21.859,0,0,1,4.108-.288,21.859,21.859,0,0,1,4.108.288,3.816,3.816,0,0,1,1.863.78c.658.592,1.106,1.8,1.106,5.124s-.448,4.532-1.106,5.124a3.816,3.816,0,0,1-1.863.78,21.863,21.863,0,0,1-4.108.288A21.864,21.864,0,0,1,4.738,17.4,3.816,3.816,0,0,1,2.875,16.624Z" fill-rule="evenodd"/>
                                <path d="M13.269,12.384H9.731a1.776,1.776,0,0,1-1.4-.37,1.776,1.776,0,0,1-.37-1.4V7.961a.885.885,0,1,1,1.769,0v2.654h3.538a.885.885,0,1,1,0,1.769Z"/>
                            </svg>
                            <span>Event starts</span>
                        </div>
                        <div class="value">
                            {{ format_time(event.start_time) }}
                        </div>
                    </div>
                    <div class="flx gap-8 ai-c">
                        <div class="title flx gap-8 ai-c">
                            <svg id="Watch" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 17.692 23">
                                <path d="M4.993,2.782a1.9,1.9,0,0,0-.527,1.064,23.932,23.932,0,0,1,4.38-.307,23.932,23.932,0,0,1,4.38.307A1.9,1.9,0,0,0,12.7,2.782c-.482-.482-1.53-1.013-3.853-1.013S5.475,2.3,4.993,2.782ZM3.742,1.531A3.936,3.936,0,0,0,2.654,4.418C.575,5.44,0,7.522,0,11.5s.575,6.06,2.654,7.082a3.936,3.936,0,0,0,1.088,2.888C4.7,22.425,6.3,23,8.846,23s4.148-.575,5.1-1.531a3.936,3.936,0,0,0,1.089-2.888c2.079-1.022,2.654-3.1,2.654-7.082s-.575-6.06-2.654-7.082A3.936,3.936,0,0,0,13.95,1.531C12.994.575,11.389,0,8.846,0S4.7.575,3.742,1.531Zm9.484,17.624a23.939,23.939,0,0,1-4.38.307,23.939,23.939,0,0,1-4.38-.307,1.9,1.9,0,0,0,.527,1.064c.482.482,1.53,1.013,3.853,1.013s3.371-.531,3.853-1.013A1.9,1.9,0,0,0,13.226,19.154ZM2.875,16.624c-.658-.592-1.106-1.8-1.106-5.124s.448-4.532,1.106-5.124A3.815,3.815,0,0,1,4.738,5.6a21.859,21.859,0,0,1,4.108-.288,21.859,21.859,0,0,1,4.108.288,3.816,3.816,0,0,1,1.863.78c.658.592,1.106,1.8,1.106,5.124s-.448,4.532-1.106,5.124a3.816,3.816,0,0,1-1.863.78,21.863,21.863,0,0,1-4.108.288A21.864,21.864,0,0,1,4.738,17.4,3.816,3.816,0,0,1,2.875,16.624Z" fill-rule="evenodd"/>
                                <path d="M13.269,12.384H9.731a1.776,1.776,0,0,1-1.4-.37,1.776,1.776,0,0,1-.37-1.4V7.961a.885.885,0,1,1,1.769,0v2.654h3.538a.885.885,0,1,1,0,1.769Z"/>
                            </svg>
                            <span>Event ends</span>
                        </div>
                        <div class="value">
                            {{ format_time(event.end_time) }}
                        </div>
                    </div>
                    <div v-if="is_parent" class="absolute book-wrapper text-center">
                        <div class="mb-4 fs-09" :class="computedLimit.state === 'full' ? 'in-active' : 'active'">{{ computedLimit.text }}</div>
                        <button @click="bookNow" class="button-primary gap-8 btn-md book-now" :class="{ 'button-disabled' : computeStatus === 'past' || computedLimit.state === 'full' }" :disabled="computeStatus === 'past' || computedLimit.state === 'full' ? true : false">
                            Book now
                        </button>
                    </div>
                </div>
            </div>
            <div v-if="is_village || is_admin" class="main-content-card flx-grow-1">
                <h4 class="mb-16">
                    In attendance
                </h4>
                <div class="input-wrapper">
                    <i>
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 13.974 13.974">
                            <path d="M-3384.438-704.614l-1.494-1.5c-1.017.746-2.525,1.083-4.788,1.083-2.569,0-4.164-.435-5.174-1.408-1.052-1.015-1.521-2.646-1.521-5.288s.469-4.273,1.521-5.288c1.01-.974,2.605-1.408,5.174-1.408s4.164.434,5.174,1.408c1.053,1.014,1.522,2.645,1.522,5.288,0,2.244-.338,3.759-1.085,4.786l1.5,1.5a.583.583,0,0,1,0,.824.58.58,0,0,1-.412.171A.582.582,0,0,1-3384.438-704.614Zm-10.647-11.556c-.795.766-1.165,2.18-1.165,4.448s.37,3.682,1.165,4.449c.775.747,2.121,1.08,4.364,1.08s3.589-.333,4.364-1.08c.795-.767,1.165-2.181,1.165-4.449s-.37-3.682-1.165-4.448c-.775-.748-2.12-1.081-4.364-1.081S-3394.311-716.918-3395.085-716.17Z" transform="translate(3397.417 718.417)" fill="#212135"/>
                        </svg>
                    </i>
                    <input class="form-control" type="search" data-type="icon" placeholder="Search Kids by name...">
                </div>
                <div class="kids-view">
                    <div class="empty centered" v-if="!computedAttendees.length">
                        No kids attending yet
                    </div>
                    <div v-else class="kids">
                        <div class="kid-row">
                            <kids-row v-for="attendee in computedAttendees" :key="attendee.id" :attendee="attendee"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import { postApi } from '@/api';
import formatDateTime from '../../mixins/formatDateTime';
import usersLevelMixin from '../../mixins/usersLevelMixin';
import { mapState } from 'vuex';
import KidsRow from '../../components/includes/app/KidsRow.vue';
import ProfileAvatar from '../../components/includes/app/ProfileAvatar.vue';
import GalleryImageList from '@/components/layouts/GalleryImageList.vue';
export default {
    components: { KidsRow, ProfileAvatar,/* Spinner,*/ GalleryImageList },
    name: 'DetailedEvent',
    mixins: [usersLevelMixin, formatDateTime],
    computed: {
        ...mapState({
            hostname: (state) => state.hostname,
            token: (state) => state.token,
            forms: (state) => state.forms
        }),
        computedAttendees() {
            return this.attendees.length ? this.attendees.filter(data => data.event_id == this.$route.params.id) : ''
        },
        computeStatus() {
            const currentDateTime = new Date()
            const startDate = new Date(this.event.date+'T'+this.event.start_time)
            const endDate = new Date(this.event.date+'T'+this.event.end_time)
            if(currentDateTime > startDate &&  currentDateTime < endDate)
            return 'ongoing'
            else if (currentDateTime < startDate)
            return 'upcoming'
            else
            return 'past'
        },
        computeEmptyGal() {
            return 4 - this.images.length
        },
        computedLimit() {
            let payload = { state: '', text: ''}
            let limit = this.event.limit
            let count = this.event.limit_count
            if(limit == count) {
                payload.state = 'full'
                payload.text = 'All spots are booked'
            }else {
                payload.text = 'Only ' + Number(limit - count) + ' spots left'
            }
            return payload
        }
    },
    data () {
        return {
            event: {},
            attendees: [],
            images: [],
            deleting: false
        }
    },
    methods: {
        bookNow() {
            this.computeStatus === 'past' ? '' : this.$router.push({ name: 'BookingSelectKids', params: { event_id: this.event.id, village: this.event.user_id, event_name: this.event.event_name, event_price: this.event.amount }})
        },
        async setID(){
            await this.$store.commit('setTempID', this.event.id)
            this.$store.commit('openModal', 'add-to-gallery')
        },
        async fetchThisEvent() {
            try {
                const res = await postApi(this.hostname+'/api/fetch-this-event/'+this.$route.params.id + '?token='+this.token)
                this.event = res.data.event
                this.attendees = res.data.attendees
                this.images = res.data.images
            } catch (e) {
                if(e.response.status == 400) {
                    this.$store.commit('setExpSession')
                }
            }
        },
        doEdit() {
            this.$router.push({ name: 'EventEdit', params: { id: this.event.id, name: this.event.event_name }, replace: true})
        }
    },
    created() {
        this.fetchThisEvent()
    }
}
</script>
<style lang="scss" scoped>
section {
    padding: $profileSecPadding 0;
}
.details{
    flex-basis: 55%;
    container-type: inline-size;
}
@container( inline-size <= 540px) {
    .gallery{
        height: 200px;
    }
    .first-row{
        flex-direction: column;
        align-items: flex-start;
    }
    .book-wrapper{
        position: relative;
    }
    .button-primary {
        width: 100%
    }
    h1 {
        font-size: 1.1rem
    }
    .avatar-wrapper{
        .bg-img {
            height: 40px;
            width: 40px
        }
    }
}

@container( inline-size > 540px) {
    .gallery{
        height: 300px;
    }
    .avatar-wrapper{
        .bg-img{
            height: 50px;
            width: 50px;
        }
    }

}
@container( inline-size <= 380px) {
    #add::after{
        content: 'Add Pictures to gallery';
    }
    .gallery{
        height: 130px;
    }
    .grid {
        gap: 8px
    }
    .grid-item {
        border-radius: 8px
    }
}
@container( inline-size <= 220px) {
    #add::after{
        content: 'Add to gallery';
    }
}
@container( inline-size > 380px) {
    #add::after{
        content: 'Add more photos to galllery';
    }
}

.grid {
    grid-template-columns: 1.2fr 1.5fr 1fr;
}
.grid-item:nth-child(1){
    grid-row: span 2;
}
.grid-item:nth-child(4) {
    grid-column: span 2;
}
label {
    font-size: 0.9rem;
}
.title{
    flex-basis: 30%;
    min-width: 130px;
}
.value{
    font-weight: 600;
}
.book-wrapper{
    inset: auto 0 0 auto;
    .in-active{
        color: var(--error);
    }
    .active {
        color: var(--success-green);
    }
}
.button-primary {
    height: 52px;
}
.empty{
    height: calc(100vh - 418px);
}
.kids-view{
    padding: 24px 0;
}
.book-now{
    padding-right: 50px;
    padding-left: 50px;
}
.actions-container{
    padding: 4px;
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: saturate(180%) blur(20px);
    -webkit-backdrop-filter: saturate(180%) blur(20px);
    inset: auto auto 8px 50%;
    transform: translateX(-50%);
    z-index: 1;
    box-shadow: 0 1px 15px 0 rgba(14,20,44,.12);
    button {
        background-color: transparent;
        height: 40px;
        &:hover {
            background-color: rgba(255, 255, 255, 1);
        }
    }
    button:not(.no-width) {
        width: 40px;
    }
    .no-width{
        padding: 0 14px;
    }
    span {
        background-color: #c2c3c7;
        width: 1px;
        height: 16px;
    }
}
.button-disabled2{
    color: var(--gray);
    cursor: not-allowed;
    path {
        fill: var(--gray);
    }
}
</style>