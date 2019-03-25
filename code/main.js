function DivisbleByThree(id) {
    return id % 3 === 0;
}

function DivisibleByFive(id) {
    return id % 5 === 0;
}

$(document).ready(() => {
    const column3 = $("#column3");
    const column5 = $("#column5");
    const column15 = $("#column15");
    const columnOther = $("#columnOther");
    $.get('/api', (data) => {
        data.map(camera => {
            const {
                id,
                name,
                latitude,
                longitude
            } = camera;

            const row = `<tr><td>${id}</td><td>${name}</td><td>${latitude}</td><td>${longitude}</td></tr>`;
            if (DivisbleByThree(id) && !DivisibleByFive(id)) {
                $(row).appendTo(column3);
            } else if (DivisibleByFive(id) && !DivisbleByThree(id)) {
                $(row).appendTo(column5);
            } else if (DivisbleByThree(id) && DivisibleByFive(id)) {
                $(row).appendTo(column15);
            } else {
                $(row).appendTo(columnOther);
            }
        })
    });
});