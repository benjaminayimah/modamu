import moment from "moment"
export default {
    methods: {
        format_date(date) {
            return moment(date).format('ddd, MMMM Do YYYY'); 
        },
        format_time(time) {
            return moment(time+' :00').format('LT'); 
        },
        format_distance(distance) {
            if (distance < 1000) {
              return `${distance.toFixed(1)}m`;
            } else {
              const km = distance / 1000;
              return `${km.toFixed(1)}km`;
            }
        }
          
    }
}