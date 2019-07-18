(function() {
    

    // based on prepared DOM, initialize echarts instance
    const accidentsConModGraph = echarts.init(document.getElementById('accidents-conmod'));

    // specify chart configuration item and data
    let option = {
        title: {
            text: '',
        },
        legend : {
            type: 'plain'
        },
        tooltip: {
            trigger: 'item'
        },
        grid: {
            show: true,
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: [],
        color: ['rgba(219, 139, 0, 0.8)', 'rgba(0, 111, 214, 0.8)']
    };

    fetch('http://localhost:8080/api/accidents/type_of_contract')
    .then(function(response) {
        return response.json();
    }).then(function(json) {
        const indefiniteSerie = {
            name: 'Contrato indefinido',
            type:'line',
            areaStyle: {},
            lineStyle: {
                width: 4
            },
            symbolSize: 10,
            data: []
        }

        const indefiniteContractData = json.filter((data) => {
            return data.modality.id === 1;
        }).forEach((indefiniteData) => {
            indefiniteSerie['data'].push(indefiniteData.total);
        });

        const partTimeSerie = {
            name: 'Contrato temporal',
            type:'line',
            areaStyle: {},
            lineStyle: {
                width: 4
            },
            symbolSize: 10,
            data: []
        }

        const partTimeContractData = json.filter((data) => {
            return data.modality.id === 2;
        }).forEach((partTimeData) => {
            partTimeSerie['data'].push(partTimeData.total);
        });

        let years = [];
        json.forEach((data) => {
            if (!years.includes(data.year.toString())) years.push(data.year.toString()); 
        });

        option.title.text = 'Accidentes por contrato';
        option.xAxis.data = years;
        option.series.push(indefiniteSerie);
        option.series.push(partTimeSerie);

        accidentsConModGraph.setOption(option);
    });

})();