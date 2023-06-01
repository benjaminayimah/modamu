import moment from "moment"
export default {
    methods: {
        format_date(date) {
            return moment(date).format('ddd, MMMM Do YYYY'); 
        },
        format_date_short(date) {
          return moment(date).format("MMM Do YY");  

        },
        format_time(time) {
            return moment(time).format('LT'); 
        },
        format_distance(distance) {
            if (distance < 1000) {
              return `${distance.toFixed(1)}m`;
            } else {
              const km = distance / 1000;
              return `${km.toFixed(1)}km`;
            }
        },
        ago_time(time) {
          moment(time).fromNow(); 
        },
        format_minutes(time) {
          moment(time).format('LT'); 
        },
        calculateAge(dateOfBirth) {
            const dob = new Date(dateOfBirth);
            const now = new Date();
            let age = now.getFullYear() - dob.getFullYear();
            const monthDiff = now.getMonth() - dob.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < dob.getDate())) {
              age--;
            }
            return age;
          }
          
    }
}