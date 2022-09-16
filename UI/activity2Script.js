let chartContainer = document.getElementById('activityChart').getContext('2d');

let config = {
    type : 'line',
    data : {
        labels : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Midholiday', 'Saturday', 'Sunday', 'Holiday'],
        datasets : [{
            borderColor : '#3f9dec',
            backgroundColor : 'rgba(207, 235, 255, 0.6)',
            data : [45, 30, 100, 102, 150, 145, 180, 45, 90],
            tension : 0.5,
            fill : true,
            borderWidth : 1
        }]
    },
    options : {
        plugins : {
            legend : {display : false}
        },
        maintainAspectRatio : false
    }
}

let chart = new Chart(chartContainer, config);