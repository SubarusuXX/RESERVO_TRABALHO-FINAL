export default{

    hourToMinutes: (hour) => {
        const [hours, minutes] = hour.split(':');
        return parseInt(hours) * 60 + parseInt(minutes);
    },

}