let search = document.getElementById('search');
let houses = document.getElementById('houses');
let find = document.getElementById('find');



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
            elem.setAttribute('id', response[i].id);
            elem.classList.add('box');
            div.classList.add('image-box', 'box-space');

            div.appendChild(elem);
            div.appendChild(name);
            div.appendChild(price);
            div.appendChild(loc);

            content.appendChild(div);
        }

        content.addEventListener('click', function(e) {
            let target = e.target;
            
            if (e.target.classList.contains('box')) {
                let content = document.getElementById('content');

                content.innerHTML = '';

                for (let res of response) {
                    if (target.id === res.id) {
                        
                        
                        let image = document.createElement('img');
                        image.setAttribute('src', res.src);
                        image.classList.add('big-image');
                        content.appendChild(image);
                        
                        let info = document.createElement('div');
                        info.classList.add('display');
                        for (let item in res) {
                            console.log(res[item]);
                            if (item !== 'src' && item !== 'id') {

                                let detail = document.createElement('p');
                                detail.classList.add('bigger-text');
                                detail.textContent = `${item}: ${res[item]} `;
                                info.appendChild(detail);
                                content.appendChild(info);
                            }
                        }

                        let back = document.createElement('button');

                        back.textContent = 'Go Back';
                        back.classList.add('back');

                        content.appendChild(back);

                        back.addEventListener('click', function() {
                            content.innerHTML = '';
                            init('gallery.json');
                        });
                    }
                }

            }
        });

        // Search by school
        function searchByArea(e) {
            e.preventDefault();
            let arr = [];
            if (e.target.classList.contains('skul')) {
                let mySearch = e.target.textContent;
                console.log({mySearch});

                for (let res of response) {
                    if (res.school === mySearch) {
                        arr.push(res);
                        content.innerHTML = '';
                    }
                    console.log(res.school)
                }
            }
            

            let skulDiv = document.createElement('div');
            skulDiv.classList.add('skul-div');
            for (let itm of arr) {
                let ownDiv = document.createElement('div');
                let textDiv = document.createElement('div');
                let ddd = document.createElement('img');
                ddd.setAttribute('src', itm["src"]);
                ddd.setAttribute('id', itm["id"]);

                // Add box as a class
                ddd.classList.add('box');
                textDiv.classList.add('text-div');

                for (let idx in itm) {
                    if (idx !== 'src' && idx !== 'description' && idx !== 'id') {
                        console.log(itm[idx]);
                        let text = document.createElement('h4');
                        text.textContent = itm[idx];
                        textDiv.appendChild(text);
                    }
                }

                ownDiv.appendChild(ddd);
                ownDiv.appendChild(textDiv);
                ownDiv.classList.add('own-div');
                skulDiv.appendChild(ownDiv);
            }
            content.appendChild(skulDiv);
        }

        let schools = document.getElementById('skul');
        schools.addEventListener('click', searchByArea);

    });
}

init('gallery.json');


find.addEventListener('click', function(e) {
    e.preventDefault();
    content.innerHTML = '';

    init('gallery.json');
});