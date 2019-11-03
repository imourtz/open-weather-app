export const showMean = (array) => {
    const sum = array.reduce(function(total, item){
        return total + item.main.temp;
    }, 0)
    console.log(sum)
    return Math.round(sum / array.length);
}