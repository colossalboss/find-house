let search = document.getElementById('search');
let houses = document.getElementById('houses');
let nameDiv = document.getElementById('name');


function init(path) {
    $.get(path, function(response) {

        console.log(response.length);

        for (let i = 0; i < 6; i++) {

            let div = document.createElement('div');
            let name = document.createElement('h2')
            let price = document.createElement('h3');
            let loc = document.createElement('h3');

            name.textContent = response[i].name;
            price.textContent = response[i].price;
            loc.textContent = response[i].location;

            let elem = document.createElement('img');
            elem.setAttribute('src', response[i].src);
            elem.classList.add('box');

            div.appendChild(elem);
            div.appendChild(name);
            div.appendChild(price);
            div.appendChild(loc);

            houses.appendChild(div);
        }

    });
}

init('gallery.json');
