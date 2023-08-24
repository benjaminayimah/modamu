export default {
    methods: {
        getGreetingMessage() {
            const currentTime = new Date();
            const currentHour = currentTime.getHours()
            if (currentHour >= 1 && currentHour < 12) {
              return "Good morning";
            } else if (currentHour >= 12 && currentHour < 18) {
              return "Good day";
            } else {
              return "Good evening";
            }
        }
    },
}