(function() {
    // based on prepared DOM, initialize echarts instance
    const accidentsSexSectGraph = echarts.init(document.getElementById('accidents-sexsect'));
    
    const sectorSelector = document.getElementById('sector-selector');

    fetch('http://localhost:8080/api/sectors')
    .then(function(response) {
        return response.json();
    }).then(function(sectors) {
        sectors.forEach((sector) => {
            let option = document.createElement('option');
            option.value = sector.id;
            option.innerHTML = sector.name;
            sectorSelector.appendChild(option);
        })
    });

    
    const getData = (url) => {
        fetch(url)
        .then(function(response) {
            return response.json();
        }).then(function(json) {

            // specify chart configuration item and data
            let option = {
                title: {
                    text: ''
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
                color: ['rgba(0, 111, 214, 0.9)', 'rgba(219, 44, 102, 0.9)']
            };

            const femaleSerie = {
                name: 'mujeres',
                type:'line',
                lineStyle: {
                    width: 4
                },
                areaStyle: {},
                symbolSize: 10,
                data: []
            }
    
            const femaleSexData = json.filter((data) => {
                return data.sex.name === "mujeres";
            }).forEach((womenData) => {
                femaleSerie['data'].push(womenData.total);
            });
    
            const maleSerie = {
                name: 'hombres',
                type:'line',
                lineStyle: {
                    width: 4
                },
                areaStyle: {},
                symbolSize: 10,
                data: []
            }
    
            const maleSexData = json.filter((data) => {
                return data.sex.name === "varones";
            }).forEach((menData) => {
                maleSerie['data'].push(menData.total);
            });
    
            let years = [];
            json.forEach((data) => {
                if (!years.includes(data.year.toString())) years.push(data.year.toString()); 
            });
    
            option.title.text = 'Accidentes por sexo y sector';
            option.xAxis.data = years;
            option.series.push(femaleSerie);
            option.series.push(maleSerie);
    
            accidentsSexSectGraph.setOption(option, true);
        });
    }

    sectorSelector.addEventListener('change', (event) => {
        url = `http://localhost:8080/api/accidents/sex?sector=${event.target.value}`;
        getData(url)
    })

    let url = 'http://localhost:8080/api/accidents/sex?sector=1';
    getData(url)

})();