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
            return moment(time, 'h:mm:ss').format('LT'); 
        },
        format_date_time(date) {
          return moment(date).format('lll'); 
        },
        format_distance(distance) {
            if (distance < 1000) {
              return `${distance.toFixed(1)}m`;
            } else {
              const km = distance / 1000;
              return `${km.toFixed(1)}km`;
            }
        },
        ago_time(date) {
          const ago = moment(date).fromNow();
          // if(ago == '12 hours ago')
          // return this.format_date_time(date)
          // else
          return ago
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