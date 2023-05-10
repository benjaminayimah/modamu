<template>
    <section>
        <div class="title-row">
            <h1 class="title">Add New Event</h1>
        </div>
        <div class="flx jc-c">
            <div v-if="completed" class="main-content-card completed-card gap-24 flx column ai-c">
                <svg xmlns="http://www.w3.org/2000/svg" height="120" viewBox="0 0 100 100">
                    <path d="M53.375,3.375a50,50,0,1,0,50,50A49.992,49.992,0,0,0,53.375,3.375Zm25.6,36.178L46.837,71.837h-.024a4.341,4.341,0,0,1-2.788,1.322,4.208,4.208,0,0,1-2.812-1.37L27.75,58.327a.958.958,0,0,1,0-1.37l4.279-4.279a.929.929,0,0,1,1.346,0L44.048,63.351,73.375,33.808a.949.949,0,0,1,.673-.288h0a.873.873,0,0,1,.673.288l4.207,4.351A.948.948,0,0,1,78.976,39.553Z" transform="translate(-3.375 -3.375)" fill="#0173ff"/>
                </svg>
                <h2>Successful</h2>
                <div class="text-center comp-text">
                    Your event has been added successfully and you can easily track and monitor attendance and reports.
                </div>
                <button @click="goToEvent" class="button-primary w-100">Track</button>
            </div>
            <div v-else class="main-content-card add-event-card">
                <div class="flx jc-c">
                    <div class="flx ai-c column gap-16 mb-24">
                        <avatar v-bind:status="status" v-bind:hostname="getHostname" :id="user.id" @deleteTemp="deltmp"/>
                        <span class="input-error" v-if="imageStatus.active">{{ imageStatus.msg }}</span>
                        <span class="input-error" v-if="validation.error && validation.errors.tempImage">
                            The image field is required.
                            </span>
                        <button @click.prevent="uploadClick('avatar_img')" class="button-outline rounded-outl gap-8">
                            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 28 28">
                                <path d="M-3279.885-497.309a8.8,8.8,0,0,1-4.272-1.81c-1.926-1.663-2.677-4.44-2.677-9.9,0-3.357,0-6.254.656-8.382a4.95,4.95,0,0,1,1.559-2.511,4.667,4.667,0,0,1,3.035-.917,3.69,3.69,0,0,0,2.462-.625,2.116,2.116,0,0,0,.6-1.375c.013-.088.023-.164.032-.23.024-.178.046-.332.084-.5a1.685,1.685,0,0,1,.266-.64l.012-.016a1.206,1.206,0,0,1,.243-.241,1.5,1.5,0,0,1,.368-.2,3.359,3.359,0,0,1,1.183-.172h7a3.359,3.359,0,0,1,1.182.172,1.5,1.5,0,0,1,.366.2,1.192,1.192,0,0,1,.246.244l.009.012a1.672,1.672,0,0,1,.268.643c.038.17.059.322.084.5v0c.01.068.02.144.032.232a2.113,2.113,0,0,0,.6,1.374,3.684,3.684,0,0,0,2.46.625,4.616,4.616,0,0,1,3.035.935,5.05,5.05,0,0,1,1.559,2.542c.656,2.143.656,5.011.656,8.332,0,5.418-.75,8.183-2.677,9.859a8.816,8.816,0,0,1-4.272,1.838,38.156,38.156,0,0,1-7.051.493A39.3,39.3,0,0,1-3279.885-497.309Zm3.673-25.187a4.391,4.391,0,0,1-1.355,2.777,5.722,5.722,0,0,1-4.017,1.219,2.486,2.486,0,0,0-1.576.4,2.793,2.793,0,0,0-.787,1.379c-.553,1.79-.553,4.658-.553,7.692,0,4.636.541,6.994,1.868,8.14a6.723,6.723,0,0,0,3.179,1.283,37.235,37.235,0,0,0,6.619.436,36.138,36.138,0,0,0,6.608-.45,6.757,6.757,0,0,0,3.183-1.307c1.332-1.16,1.876-3.506,1.876-8.1,0-3,0-5.84-.554-7.649a2.9,2.9,0,0,0-.8-1.417,2.429,2.429,0,0,0-1.562-.41,5.722,5.722,0,0,1-4.017-1.219,4.389,4.389,0,0,1-1.354-2.777s0,0,0,0h-6.756Zm-2.455,12.83a5.84,5.84,0,0,1,5.833-5.834,5.841,5.841,0,0,1,5.834,5.834,5.84,5.84,0,0,1-5.834,5.833A5.839,5.839,0,0,1-3278.667-509.666Zm2.334,0a3.5,3.5,0,0,0,3.5,3.5,3.5,3.5,0,0,0,3.5-3.5,3.5,3.5,0,0,0-3.5-3.5A3.5,3.5,0,0,0-3276.333-509.666ZM-3267-515.5a1.167,1.167,0,0,1,1.167-1.166,1.167,1.167,0,0,1,1.167,1.166,1.167,1.167,0,0,1-1.167,1.167A1.167,1.167,0,0,1-3267-515.5Z" transform="translate(3286.833 524.833)"/>
                            </svg>
                            Tap to add photo
                        </button>
                    </div>
                </div>
                <form @submit.prevent="" class="flx column gap-24">
                    <div class="grid col-2 gap-24">
                        <div class="form-col">
                            <label for="event_name">Event name</label>
                            <div class="input-wrapper">
                                <i>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 20.743 20.776">
                                        <path d="M-3303.746-680c-2.764,0-4.338-.251-5.435-.866a5.415,5.415,0,0,1-2.535-3.063,9.037,9.037,0,0,1-.451-2.773,3.423,3.423,0,0,1,0-.742,1.767,1.767,0,0,1,1.346-1.41,3.862,3.862,0,0,1,.8-.038c.7,0,1.027-.752,1.027-1.261s-.327-1.26-1.027-1.26a3.873,3.873,0,0,1-.811-.039,1.748,1.748,0,0,1-1.34-1.381,3.606,3.606,0,0,1-.015-.772,9.982,9.982,0,0,1,.469-3.243,5.42,5.42,0,0,1,2.535-3.064c1.1-.615,2.671-.865,5.435-.865h3.846c2.763,0,4.338.25,5.435.865a5.419,5.419,0,0,1,2.534,3.064,9.976,9.976,0,0,1,.469,3.243,3.6,3.6,0,0,1-.015.771,1.746,1.746,0,0,1-1.34,1.382,3.861,3.861,0,0,1-.811.039c-.7,0-1.027.752-1.027,1.26s.327,1.261,1.027,1.261a3.868,3.868,0,0,1,.8.038,1.768,1.768,0,0,1,1.346,1.41,3.449,3.449,0,0,1,0,.742,9.071,9.071,0,0,1-.45,2.773,5.422,5.422,0,0,1-2.535,3.063c-1.1.615-2.672.866-5.435.866Zm-4.588-18.4a3.7,3.7,0,0,0-1.76,2.156,8.721,8.721,0,0,0-.361,2.692c0,.081-.009.3-.008.4.109,0,.354,0,.444,0a2.61,2.61,0,0,1,2.075,1.015,3.235,3.235,0,0,1,.683,1.976,3.231,3.231,0,0,1-.683,1.976,2.608,2.608,0,0,1-2.075,1.015c-.085,0-.319,0-.428,0l0,.005c0,.1.011.3.014.371a7.528,7.528,0,0,0,.344,2.248,3.7,3.7,0,0,0,1.76,2.156c.795.446,2.209.644,4.588.644h3.846c2.378,0,3.793-.2,4.588-.644a3.706,3.706,0,0,0,1.759-2.156,7.55,7.55,0,0,0,.344-2.248c0-.074.012-.275.013-.371l0-.005c-.108,0-.342,0-.428,0a2.6,2.6,0,0,1-2.074-1.015,3.225,3.225,0,0,1-.683-1.976,3.229,3.229,0,0,1,.683-1.976,2.607,2.607,0,0,1,2.074-1.015c.089,0,.335,0,.445,0,0-.1-.006-.323-.009-.4a8.688,8.688,0,0,0-.36-2.692,3.7,3.7,0,0,0-1.759-2.156c-.8-.446-2.21-.645-4.588-.645h-3.846C-3306.124-699.044-3307.54-698.845-3308.334-698.4Zm8.243,10.626v-.923a.865.865,0,0,1,.865-.865.865.865,0,0,1,.865.865v.923a.865.865,0,0,1-.865.865A.865.865,0,0,1-3300.091-687.772Zm-4.94.594a.864.864,0,0,1,0-1.223l5.194-5.194a.863.863,0,0,1,1.223,0,.865.865,0,0,1,0,1.223l-5.194,5.194a.863.863,0,0,1-.612.254A.86.86,0,0,1-3305.031-687.178Zm-.254-4.935v-.868a.865.865,0,0,1,.865-.866.865.865,0,0,1,.865.866v.868a.865.865,0,0,1-.865.865A.865.865,0,0,1-3305.285-692.113Z" transform="translate(3312.195 700.774)"/>
                                    </svg>
                                </i>
                                <input v-model="form.event_name" class="form-control" type="text" name="event_name" id="event_name" data-color="dark" data-type="icon" placeholder="eg. Open house for kids">
                            </div>
                            <span class="input-error" v-if="validation.error && validation.errors.event_name">
                                {{ validation.errors.event_name[0] }}
                            </span>
                        </div>
                        <div class="form-col">
                            <label for="address">Your default address</label>
                            <!-- <div class="input-wrapper">
                                <i>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="19" viewBox="0 0 20.101 19.821">
                                        <path d="M-3280.074-712.862a22.722,22.722,0,0,1-4.877-3.317,11.435,11.435,0,0,1-3.8-6.158,8.244,8.244,0,0,1,1.584-6.6c1.235-1.576,3.682-3.454,8.318-3.454s7.083,1.878,8.319,3.454a8.245,8.245,0,0,1,1.584,6.6,11.436,11.436,0,0,1-3.8,6.158,22.725,22.725,0,0,1-4.878,3.317,2.694,2.694,0,0,1-1.222.3A2.7,2.7,0,0,1-3280.074-712.862Zm-5.778-15.036a6.543,6.543,0,0,0-1.258,5.237,9.809,9.809,0,0,0,3.287,5.243,21.039,21.039,0,0,0,4.511,3.065,1.013,1.013,0,0,0,.461.112,1.015,1.015,0,0,0,.462-.112,21.039,21.039,0,0,0,4.511-3.065,9.818,9.818,0,0,0,3.287-5.243,6.547,6.547,0,0,0-1.258-5.237c-1.443-1.84-3.864-2.813-7-2.813S-3284.41-729.739-3285.852-727.9Zm3.651,3.886a3.353,3.353,0,0,1,3.349-3.35,3.353,3.353,0,0,1,3.35,3.35,3.353,3.353,0,0,1-3.35,3.349A3.352,3.352,0,0,1-3282.2-724.012Zm1.675,0a1.676,1.676,0,0,0,1.674,1.675,1.676,1.676,0,0,0,1.675-1.675,1.677,1.677,0,0,0-1.675-1.675A1.676,1.676,0,0,0-3280.526-724.012Z" transform="translate(3288.902 732.387)"/>
                                    </svg>
                                </i>
                                <input class="form-control" type="text" name="address" id="address" data-color="dark" data-type="icon" ref="address" placeholder="Start typing, then pick from the dropdown list">
                            </div> -->
                            <div id="location_preloaded" class="flx jc-sb">
                                <div class="flx gap-8 ai-c">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="19" viewBox="0 0 20.101 19.821">
                                        <path d="M-3280.074-712.862a22.722,22.722,0,0,1-4.877-3.317,11.435,11.435,0,0,1-3.8-6.158,8.244,8.244,0,0,1,1.584-6.6c1.235-1.576,3.682-3.454,8.318-3.454s7.083,1.878,8.319,3.454a8.245,8.245,0,0,1,1.584,6.6,11.436,11.436,0,0,1-3.8,6.158,22.725,22.725,0,0,1-4.878,3.317,2.694,2.694,0,0,1-1.222.3A2.7,2.7,0,0,1-3280.074-712.862Zm-5.778-15.036a6.543,6.543,0,0,0-1.258,5.237,9.809,9.809,0,0,0,3.287,5.243,21.039,21.039,0,0,0,4.511,3.065,1.013,1.013,0,0,0,.461.112,1.015,1.015,0,0,0,.462-.112,21.039,21.039,0,0,0,4.511-3.065,9.818,9.818,0,0,0,3.287-5.243,6.547,6.547,0,0,0-1.258-5.237c-1.443-1.84-3.864-2.813-7-2.813S-3284.41-729.739-3285.852-727.9Zm3.651,3.886a3.353,3.353,0,0,1,3.349-3.35,3.353,3.353,0,0,1,3.35,3.35,3.353,3.353,0,0,1-3.35,3.349A3.352,3.352,0,0,1-3282.2-724.012Zm1.675,0a1.676,1.676,0,0,0,1.674,1.675,1.676,1.676,0,0,0,1.675-1.675,1.677,1.677,0,0,0-1.675-1.675A1.676,1.676,0,0,0-3280.526-724.012Z" transform="translate(3288.902 732.387)"/>
                                    </svg>
                                    <span>{{ user.address }}</span>
                                </div>
                                <button>Set a different address</button>
                            </div>
                            <span class="input-error" v-if="validation.error && validation.errors.address">
                                {{ validation.errors.address[0] }}
                            </span>
                        </div>
                    </div>
                    <div class="grid col-3 gap-24">
                        <div class="form-col">
                            <label for="date">Event date</label>
                            <div class="input-wrapper">
                                <i>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 26">
                                        <path d="M-3300-660c0-.707.011-1.372.035-2q.019-.516.051-1,.034-.518.083-1c.5-4.965,2.267-7.018,6.832-7.707V-673a1,1,0,0,1,1-1,1,1,0,0,1,1,1v1.085c.911-.059,1.908-.086,3-.086s2.09.026,3,.086V-673a1,1,0,0,1,1-1,1,1,0,0,1,1,1v1.293c4.566.688,6.327,2.741,6.832,7.707.033.321.06.654.083,1,.022.322.038.655.052,1,.023.629.034,1.3.034,2,0,9.882-2.118,12-12,12S-3300-650.118-3300-660Zm2,0a26.907,26.907,0,0,0,.438,5.61,5.206,5.206,0,0,0,1.271,2.681,5.214,5.214,0,0,0,2.681,1.271A26.852,26.852,0,0,0-3288-650a26.842,26.842,0,0,0,5.61-.438,5.214,5.214,0,0,0,2.682-1.271,5.214,5.214,0,0,0,1.27-2.681A26.831,26.831,0,0,0-3278-660c0-.716-.011-1.381-.036-2h-19.928C-3297.989-661.38-3298-660.715-3298-660Zm2.108-8.634c-.944.692-1.625,1.908-1.929,4.633h19.642c-.3-2.725-.985-3.941-1.93-4.633a6.7,6.7,0,0,0-2.892-1.048V-669a1,1,0,0,1-1,1,1,1,0,0,1-1-1v-.909c-.869-.061-1.861-.091-3-.091s-2.132.03-3,.091V-669a1,1,0,0,1-1,1,1,1,0,0,1-1-1v-.681A6.7,6.7,0,0,0-3295.892-668.633Zm13.185,15.341-1.293-1.293-1.292,1.293a1,1,0,0,1-1.415,0,1,1,0,0,1,0-1.414l1.293-1.293-1.293-1.292a1,1,0,0,1,0-1.415,1,1,0,0,1,1.415,0l1.292,1.293,1.293-1.293a1,1,0,0,1,1.414,0,1,1,0,0,1,0,1.415l-1.292,1.292,1.292,1.293a1,1,0,0,1,0,1.414A1,1,0,0,1-3282-653,1,1,0,0,1-3282.707-653.293ZM-3294-653a1,1,0,0,1-1-1,1,1,0,0,1,1-1h3a1,1,0,0,1,1,1,1,1,0,0,1-1,1Zm0-4a1,1,0,0,1-1-1,1,1,0,0,1,1-1h3a1,1,0,0,1,1,1,1,1,0,0,1-1,1Z" transform="translate(3300 674)"/>
                                    </svg>
                                </i>
                                <input v-model="form.date" class="form-control" type="date" name="date" id="date" data-type="icon" data-color="dark">
                            </div>
                            <span class="input-error" v-if="validation.error && validation.errors.date">
                                {{ validation.errors.date[0] }}
                            </span>
                        </div>
                        <div class="form-col">
                            <label for="start_time">Event starts</label>
                            <div class="input-wrapper">
                                <i>
                                    <svg id="Watch" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 17.692 23">
                                        <path d="M4.993,2.782a1.9,1.9,0,0,0-.527,1.064,23.932,23.932,0,0,1,4.38-.307,23.932,23.932,0,0,1,4.38.307A1.9,1.9,0,0,0,12.7,2.782c-.482-.482-1.53-1.013-3.853-1.013S5.475,2.3,4.993,2.782ZM3.742,1.531A3.936,3.936,0,0,0,2.654,4.418C.575,5.44,0,7.522,0,11.5s.575,6.06,2.654,7.082a3.936,3.936,0,0,0,1.088,2.888C4.7,22.425,6.3,23,8.846,23s4.148-.575,5.1-1.531a3.936,3.936,0,0,0,1.089-2.888c2.079-1.022,2.654-3.1,2.654-7.082s-.575-6.06-2.654-7.082A3.936,3.936,0,0,0,13.95,1.531C12.994.575,11.389,0,8.846,0S4.7.575,3.742,1.531Zm9.484,17.624a23.939,23.939,0,0,1-4.38.307,23.939,23.939,0,0,1-4.38-.307,1.9,1.9,0,0,0,.527,1.064c.482.482,1.53,1.013,3.853,1.013s3.371-.531,3.853-1.013A1.9,1.9,0,0,0,13.226,19.154ZM2.875,16.624c-.658-.592-1.106-1.8-1.106-5.124s.448-4.532,1.106-5.124A3.815,3.815,0,0,1,4.738,5.6a21.859,21.859,0,0,1,4.108-.288,21.859,21.859,0,0,1,4.108.288,3.816,3.816,0,0,1,1.863.78c.658.592,1.106,1.8,1.106,5.124s-.448,4.532-1.106,5.124a3.816,3.816,0,0,1-1.863.78,21.863,21.863,0,0,1-4.108.288A21.864,21.864,0,0,1,4.738,17.4,3.816,3.816,0,0,1,2.875,16.624Z" fill-rule="evenodd"/>
                                        <path d="M13.269,12.384H9.731a1.776,1.776,0,0,1-1.4-.37,1.776,1.776,0,0,1-.37-1.4V7.961a.885.885,0,1,1,1.769,0v2.654h3.538a.885.885,0,1,1,0,1.769Z"/>
                                    </svg>
                                </i>
                                <input v-model="form.start_time" class="form-control" type="time" name="start_time" id="start_time" data-type="icon" data-color="dark">
                            </div>
                            <span class="input-error" v-if="validation.error && validation.errors.start_time">
                                {{ validation.errors.start_time[0] }}
                            </span>
                        </div>
                        <div class="form-col">
                            <label for="end_time">Event ends</label>
                            <div class="input-wrapper">
                                <i>
                                    <svg id="Watch" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 17.692 23">
                                        <path d="M4.993,2.782a1.9,1.9,0,0,0-.527,1.064,23.932,23.932,0,0,1,4.38-.307,23.932,23.932,0,0,1,4.38.307A1.9,1.9,0,0,0,12.7,2.782c-.482-.482-1.53-1.013-3.853-1.013S5.475,2.3,4.993,2.782ZM3.742,1.531A3.936,3.936,0,0,0,2.654,4.418C.575,5.44,0,7.522,0,11.5s.575,6.06,2.654,7.082a3.936,3.936,0,0,0,1.088,2.888C4.7,22.425,6.3,23,8.846,23s4.148-.575,5.1-1.531a3.936,3.936,0,0,0,1.089-2.888c2.079-1.022,2.654-3.1,2.654-7.082s-.575-6.06-2.654-7.082A3.936,3.936,0,0,0,13.95,1.531C12.994.575,11.389,0,8.846,0S4.7.575,3.742,1.531Zm9.484,17.624a23.939,23.939,0,0,1-4.38.307,23.939,23.939,0,0,1-4.38-.307,1.9,1.9,0,0,0,.527,1.064c.482.482,1.53,1.013,3.853,1.013s3.371-.531,3.853-1.013A1.9,1.9,0,0,0,13.226,19.154ZM2.875,16.624c-.658-.592-1.106-1.8-1.106-5.124s.448-4.532,1.106-5.124A3.815,3.815,0,0,1,4.738,5.6a21.859,21.859,0,0,1,4.108-.288,21.859,21.859,0,0,1,4.108.288,3.816,3.816,0,0,1,1.863.78c.658.592,1.106,1.8,1.106,5.124s-.448,4.532-1.106,5.124a3.816,3.816,0,0,1-1.863.78,21.863,21.863,0,0,1-4.108.288A21.864,21.864,0,0,1,4.738,17.4,3.816,3.816,0,0,1,2.875,16.624Z" fill-rule="evenodd"/>
                                        <path d="M13.269,12.384H9.731a1.776,1.776,0,0,1-1.4-.37,1.776,1.776,0,0,1-.37-1.4V7.961a.885.885,0,1,1,1.769,0v2.654h3.538a.885.885,0,1,1,0,1.769Z"/>
                                    </svg>
                                </i>
                                <input v-model="form.end_time" class="form-control" type="time" name="end_time" id="end_time" data-type="icon" data-color="dark">
                            </div>
                            <span class="input-error" v-if="validation.error && validation.errors.end_time">
                                {{ validation.errors.end_time[0] }}
                            </span>
                        </div>
                    </div>
                    <div class="grid col-2 gap-24">
                        <div class="form-col">
                            <label for="amount">Amount per child</label>
                            <div class="input-wrapper">
                                <i>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 10.56 18.44">
                                        <path d="M5.2,18.9V.46H6.74V18.9ZM.78,6.46A3.95,3.95,0,0,1,1.44,4.2,4.352,4.352,0,0,1,3.26,2.68a6.275,6.275,0,0,1,2.72-.56,5.847,5.847,0,0,1,2.56.52,3.929,3.929,0,0,1,1.7,1.48A4.363,4.363,0,0,1,10.9,6.4H8.42a1.986,1.986,0,0,0-.7-1.54,2.678,2.678,0,0,0-1.78-.54A3.079,3.079,0,0,0,4,4.88a1.769,1.769,0,0,0-.72,1.5,1.792,1.792,0,0,0,.44,1.26,2.661,2.661,0,0,0,1.4.7l2.3.52a5.338,5.338,0,0,1,2.82,1.38,3.52,3.52,0,0,1,.9,2.54,4.247,4.247,0,0,1-.66,2.36A4.318,4.318,0,0,1,8.6,16.72a6.821,6.821,0,0,1-2.82.54,6.546,6.546,0,0,1-2.7-.52,4.409,4.409,0,0,1-1.82-1.5,4.221,4.221,0,0,1-.68-2.26H3.14a1.86,1.86,0,0,0,.72,1.52,3.107,3.107,0,0,0,1.94.54,3.534,3.534,0,0,0,2.08-.54,1.738,1.738,0,0,0,.78-1.48q0-1.52-1.78-1.92l-2.32-.5A5.227,5.227,0,0,1,1.72,9.16,3.918,3.918,0,0,1,.78,6.46Z" transform="translate(-0.58 -0.46)"/>
                                    </svg>
                                </i>
                                <input v-model="form.amount" class="form-control" type="number" name="amount" id="amount" data-color="dark" data-type="icon">
                            </div>
                            <span class="input-error" v-if="validation.error && validation.errors.amount">
                                {{ validation.errors.amount[0] }}
                            </span>
                        </div>
                        <div class="form-col">
                            <label for="attendance_limit">Input attendance limit</label>
                            <div class="input-wrapper">
                                <i>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 17.75 21.584">
                                        <path d="M-1984.3,21.358a7.135,7.135,0,0,1-4.881-3.812,16.11,16.11,0,0,1-.643-7.424,2.206,2.206,0,0,1,1.05-1.589,3.4,3.4,0,0,1,1.132-.409,3.459,3.459,0,0,1,.9-.013V2.93a.811.811,0,0,1,.023-.186,2.427,2.427,0,0,1,2.269-1.913h.014a2.507,2.507,0,0,1,1.337.391,2.5,2.5,0,0,1,.4-.558A2.169,2.169,0,0,1-1981.1,0h.013a2.181,2.181,0,0,1,1.7.718,2.165,2.165,0,0,1,.236.326,2.168,2.168,0,0,1,1.032-.253c.076,0,.152,0,.231.011a2.148,2.148,0,0,1,1.866,1.058,3.43,3.43,0,0,1,.348,1.223,2.228,2.228,0,0,1,.829-.165c.049,0,.1,0,.148.005a2.3,2.3,0,0,1,2.389,2.091c.115.967.017,10.132.005,11.174a.664.664,0,0,1-.005.084,6.375,6.375,0,0,1-4.057,4.7,12.581,12.581,0,0,1-4.159.6c-.171,0-.343,0-.514,0A19.223,19.223,0,0,1-1984.3,21.358Zm-3.025-11.665c-.635.129-.859.293-.919.677a14.178,14.178,0,0,0,.546,6.575,5.574,5.574,0,0,0,3.722,2.846c1.206.251,5.572.337,6.971-.281a4.889,4.889,0,0,0,3.108-3.4c.045-4.052.083-10.26.005-10.912-.04-.329-.139-.629-.914-.684h-.031a1.22,1.22,0,0,0-.715.373V11a.8.8,0,0,1-.173.5.8.8,0,0,1-.664.354.8.8,0,0,1-.8-.8V4.729a6.516,6.516,0,0,0-.236-2.109c-.049-.092-.1-.178-.6-.225a.635.635,0,0,0-.581.237,1.211,1.211,0,0,0-.156.228v7.448a.8.8,0,0,1-.8.8.8.8,0,0,1-.8-.8V2.761h0v.005c0-.016,0-.033,0-.052V2.693q0-.036,0-.072a1.39,1.39,0,0,0-.223-.849.608.608,0,0,0-.5-.172h-.005a.567.567,0,0,0-.451.169A2.113,2.113,0,0,0-1981.932,3v8.361a.8.8,0,0,1-.8.8.8.8,0,0,1-.8-.8V3.317c0-.009,0-.018,0-.028,0-.038-.005-.141,0-.289a1.145,1.145,0,0,0-.914-.57h0c-.431,0-.627.429-.692.616V8.671a.8.8,0,0,1,.092.372v4.785a.8.8,0,0,1-.8.8.8.8,0,0,1-.8-.8v-4.1a5.282,5.282,0,0,0-.567-.044A.73.73,0,0,0-1987.329,9.693Z" transform="translate(1990)"/>
                                    </svg>
                                </i>
                                <input v-model="form.attendance_limit" class="form-control" type="number" name="attendance_limit" id="attendance_limit" data-color="dark" data-type="icon">
                            </div>
                            <span class="input-error" v-if="validation.error && validation.errors.attendance_limit">
                                {{ validation.errors.attendance_limit[0] }}
                            </span>
                        </div>
                    </div>
                    <div class="form-row column">
                        <label for="description">Description</label>
                        <div class="input-wrapper">
                            <textarea v-model="form.description" class="form-control" name="description" id="description" rows="3" data-color="dark" placeholder="A brief description about your event"></textarea>
                        </div>
                        <span class="input-error" v-if="validation.error && validation.errors.description">
                            {{ validation.errors.description[0] }}
                        </span>
                    </div>
                    <input class="hide" @change="uploadTemp" name="image" id="avatar_img" type="file" ref="img">
                    <button @click="doSubmit" class="button-primary w-100 gap-8" :class="{ 'button-disabled' : creating }" :disabled="creating ? true : false">
                        <spinner v-if="creating" v-bind:size="20" v-bind:white="true" />
                        <span>{{ creating ? 'Creating...' : 'Create event'}}</span>
                    </button> 
                </form>
            </div>
        </div>
    </section>
</template>
<script>
import axios from 'axios';
import { mapGetters, mapState } from 'vuex';
import inputValMixin from '../../../mixins/inputValMixin';
import tempImageUploadMixin from '../../../mixins/tempImageUpload';
import Spinner from '../../../components/includes/Spinner.vue';
import Avatar from '../../../components/includes/Avatar';
import autoCompleMixin from '../../../mixins/autoCompleMixin';
export default {
  components: { Spinner, Avatar },
    name: 'AddEventPage',
    mixins: [ inputValMixin, tempImageUploadMixin, autoCompleMixin ],
    computed: {
        ...mapGetters(['getHostname', 'getToken']),
        ...mapState({
            user: (state) => state.user
        })
    },
    data() {
        return {
            form: {
                event_name: '',
                address: '',
                date: new Date().toISOString().slice(0, 10),
                start_time: '',
                end_time: '',
                amount: '',
                attendance_limit: '',
                description: '',
                tempImage: null,
            },
            creating: false,
            completed: false
        }
    },
    methods: {
        doSubmit() {
            this.startSubmit()
            axios.post(this.getHostname+'/api/event?token=' + this.getToken, this.form)
            .then((res) => {
                this.submitSuccess(res.data)
            }).catch((e) => {
                this.endSubmit()
                if(e.response.status == 422){
                    this.validation.error = true
                    this.validation.errors = e.response.data.errors
                }
            })
        },
        startSubmit() {
            this.creating = true
        },
        endSubmit() {
            this.creating = false
        },
        submitSuccess(data) {
            this.endSubmit()
            this.completed = true
            this.$store.commit('upadateEvents', data)
        },
        deltmp() {
            this.startLoader()
            axios.delete(this.getHostname + "/api/del-temp-upload/" + this.user.id)
            .then(() => {
                this.afterDeletion()
            }).catch(() => {
                this.stopLoader()
            });
        },
        goToEvent() {
            this.$router.push({ name: 'OngoingEvents', params: { name: 'ongoing-events'} })
        }
    }
}
</script>
<style lang="scss" scoped>
$completionWidth: 440px;
section {
    padding: $profileSecPadding 0;
}
.add-event-card{
    width: 80%
}
.completed-card{
    width: $completionWidth;
    padding: 50px;
}
.comp-text{
    width: calc($completionWidth - 120px);
}
.input-error{
    font-size: 0.9rem;
}
button.button-outline{
    height: 46px;
    padding: 8px 17px;
}
#location_preloaded{
    padding: 8px 20px;
    background-color: var(--input-hover);
    border-radius: 18px;
    height: 62px;
    button {
        background-color: transparent;
        color: var(--primary-color);
        padding-right: 0;
    }
}
</style>