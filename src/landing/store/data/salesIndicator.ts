export const dataLineChart = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August' ],
    datasets: [
        {
            data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
            ],
        },
    ],
};

export const dataBarChart = {
    labels: ['Camisetas', 'Gorras', 'Jeans'],
    datasets: [
        {
            data: [20, 45, 28],
        },
    ],
};

export const dataPieChart = [
    {
        name: 'Efectivo',
        population: 21500000,
        color: 'rgba(131, 167, 234, 1)',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
    },
    {
        name: 'Tarjeta',
        population: 2800000,
        color: '#F00',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
    },
    {
        name: 'Transferencia',
        population: 11920000,
        color: 'rgb(0, 0, 255)',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
    },
];
