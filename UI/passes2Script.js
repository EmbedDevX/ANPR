let chartContainer1 = document.getElementById('allPasses').getContext('2d');
let chartContainer2 = document.getElementById('onetimePasses').getContext('2d');
let chartContainer3 = document.getElementById('multitimePasses').getContext('2d');
let chartContainer4 = document.getElementById('multidayPasses').getContext('2d');
let chartContainer5 = document.getElementById('alltimePasses').getContext('2d');
let chartContainer6 = document.getElementById('blacklistedVehicles').getContext('2d');

let data1 = [40, 88, 60, 40, 75, 5, 14,];
let data2 = [40, 55, 25, 80, 75, 20, 17];
let data3 = [30, 20, 20, 50, 65, 40, 70];
let data4 = [35, 55, 20, 50, 40, 30, 70];
let data5 = [35, 55, 20, 70, 20, 30, 10];
let data6 = [10, 10, 5, 8, 12, 10, 2];


let config1 = {
    type : 'bar',
    data : {
        labels : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets : [{
            borderColor : '#1c8149',
            backgroundColor : '#1c8149',
            data : data1,
            borderWidth : 0,
            borderRadius : 12,
            barThickness : 38
        }]
    },
    options : {
        plugins : {
            legend : {display : false}
        },
        maintainAspectRatio : false,
        scales: {
            y: {
                max: 100,
                min: 0,
                ticks: {
                    stepSize: 1
                }
            }
        }
    }
}

let config2 = {
    type : 'bar',
    data : {
        labels : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets : [{
            borderColor : '#1c8149',
            backgroundColor : '#1c8149',
            data : data2,
            borderWidth : 0,
            borderRadius : 12,
            barThickness : 38
        }]
    },
    options : {
        plugins : {
            legend : {display : false}
        },
        maintainAspectRatio : false,
        scales: {
            y: {
                max: 100,
                min: 0,
                ticks: {
                    stepSize: 1
                }
            }
        }
    }
}

let config3 = {
    type : 'bar',
    data : {
        labels : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets : [{
            borderColor : '#1c8149',
            backgroundColor : '#1c8149',
            data : data3,
            borderWidth : 0,
            borderRadius : 12,
            barThickness : 38
        }]
    },
    options : {
        plugins : {
            legend : {display : false}
        },
        maintainAspectRatio : false,
        scales: {
            y: {
                max: 100,
                min: 0,
                ticks: {
                    stepSize: 1
                }
            }
        }
    }
}

let config4 = {
    type : 'bar',
    data : {
        labels : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets : [{
            borderColor : '#1c8149',
            backgroundColor : '#1c8149',
            data : data4,
            borderWidth : 0,
            borderRadius : 12,
            barThickness : 38
        }]
    },
    options : {
        plugins : {
            legend : {display : false}
        },
        maintainAspectRatio : false,
        scales: {
            y: {
                max: 100,
                min: 0,
                ticks: {
                    stepSize: 1
                }
            }
        }
    }
}

let config5 = {
    type : 'bar',
    data : {
        labels : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets : [{
            borderColor : '#1c8149',
            backgroundColor : '#1c8149',
            data : data5,
            borderWidth : 0,
            borderRadius : 12,
            barThickness : 38
        }]
    },
    options : {
        plugins : {
            legend : {display : false}
        },
        maintainAspectRatio : false,
        scales: {
            y: {
                max: 100,
                min: 0,
                ticks: {
                    stepSize: 1
                }
            }
        }
    }
}

let config6 = {
    type : 'bar',
    data : {
        labels : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets : [{
            borderColor : '#1c8149',
            backgroundColor : '#1c8149',
            data : data6,
            borderWidth : 0,
            borderRadius : 12,
            barThickness : 38
        }]
    },
    options : {
        plugins : {
            legend : {display : false}
        },
        maintainAspectRatio : false,
        scales: {
            y: {
                max: 100,
                min: 0,
                ticks: {
                    stepSize: 1
                }
            }
        }
    }
}



let chart1 = new Chart(chartContainer1, config1);
let chart2 = new Chart(chartContainer2, config2);
let chart3 = new Chart(chartContainer3, config3);
let chart4 = new Chart(chartContainer4, config4);
let chart5 = new Chart(chartContainer5, config5);
let chart6 = new Chart(chartContainer6, config6);