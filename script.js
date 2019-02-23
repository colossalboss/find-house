let search = document.getElementById('search');
let houses = document.getElementById('houses');
let nameDiv = document.getElementById('name');

let result;

function init(path) {
    $.get(path, function(response) {

        console.log(response.length);

        for (let i = 0; i < 6; i++) {
            let elem = document.createElement('img');
            elem.setAttribute('src', response[i].src);
            elem.classList.add('box');
            houses.appendChild(elem);
        }

    });
}

init('gallery.json');
