$(document).ready(function() {

    async function getCSV() {
        const response = await fetch('CSV/Daily.csv', {mode: 'no-cors'});
        const data = await response.text();

        const table = data.split('\n');
        table.forEach(row => {
            const columns = row.split(",");
            const day = columns[0];
            const earning = columns[1];
            console.log(day, earning);
        })

    }

    getCSV();

})