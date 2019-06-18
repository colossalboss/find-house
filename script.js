let search = document.getElementById('search');
let houses = document.getElementById('houses');
let find = document.getElementById('find');
let content = document.getElementById('houses-container');
let skulDiv = document.createElement('div');
let schools = document.getElementById('skul');
let complete = document.getElementById('complete');


skulDiv.classList.add('flexy')

const emptyContent = (container) => {
    container.innerHTML = ''
    document.getElementById('before').classList.add('hide');
};

const addDetails = (div, name, price, loc, i, elem, response) => {
    name.textContent = response[i].name;
    price.textContent = response[i].price;
    loc.textContent = response[i].location;

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

function init(path, num) {
    $.get(path, function(response) {

        console.log(response.length);

        for (let i = 0; i < num; i++) {

            let div = document.createElement('div');
            let name = document.createElement('h2')
            let price = document.createElement('h3');
            let loc = document.createElement('h3');
            let elem = document.createElement('img');

            // Add name, price, location details to small image
            addDetails(div, name, price, loc, i, elem, response);  
        }

        /* Make image bigger and display all necessary information */
        content.addEventListener('click', function(e) {
            let target = e.target;
            
            if (e.target.classList.contains('box')) {

                // content.innerHTML = '';
                emptyContent(content);

                // for (let res of response) {
                for (let {id: res, src: path} of response) {
                    console.log(res);
                    
                    // if (target.id === res.id) {
                    if (target.id === res) {
                        
                        
                        let image = document.createElement('img');
                        // image.setAttribute('src', res.src);
                        image.setAttribute('src', path);
                        image.classList.add('big-image');
                        content.appendChild(image);
                        
                        /* Display image informarion */
                        let info = document.createElement('div');
                        info.classList.add('display');
                        for (let obj of response) {
                            console.log(Object.keys(obj));
                            
                            let {name, price, description, id} = obj
                                console.log(name, 'id')
                                if (target.id === id) {
                                    for (let x in obj) {
                                        if (x !== 'src' && x !== 'id') {
                                            let detail = document.createElement('p');
                                            let propSpan = document.createElement('span');
                                            let valSpan = document.createElement('span');
                                            propSpan.classList.add('bold-text');
                                            valSpan.classList.add('prop-text')
                                            propSpan.textContent = `${x}: `;
                                            valSpan.textContent = obj[x];
                                            detail.appendChild(propSpan);
                                            detail.appendChild(valSpan);

                                            detail.classList.add('bigger-text');
                                            // detail.textContent = `${x}: ${obj[x]} `;
                                            info.appendChild(detail);
                                            content.appendChild(info);
                                        }
                                    }
                                }
                        }

                        let back = document.createElement('button');

                        back.textContent = 'Go Back';
                        back.classList.add('back');

                        content.appendChild(back);

                        back.addEventListener('click', function() {
                            content.innerHTML = '';
                            init('gallery.json', response.length);
                        });
                    }
                }

            }
        });

    });
}

// Display houses on page load
init('gallery.json', 4);

/* Function to load all images */
const loadAllImages = (event) => {
    event.preventDefault();
    emptyContent(content);

    $.get('gallery.json', function(res) {
        let numOfHouses = res.length;
        init('gallery.json', numOfHouses);
    });
}

/* Load all houses when find house or full gallery link is clicked */
find.addEventListener('click', loadAllImages);
complete.addEventListener('click', loadAllImages);

const build = (itm) => {
    let ownDiv = document.createElement('div');
    let textDiv = document.createElement('div');
    let ddd = document.createElement('img');
    ddd.setAttribute('src', itm["src"]);
    ddd.setAttribute('id', itm["id"]);

    // Add a CSS class of box
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

// Search by school
let arr = [];

schools.addEventListener('click', function(e) {
    e.preventDefault();
    if (e.target.classList.contains('skul')) {
        if (!content.innerHTML !== '') {
            emptyContent(content);
            emptyContent(skulDiv);
            e.target.classList.add('active');

            let mySearch = e.target.textContent;
            console.log(mySearch);
            


            postData(`gallery.json`, {answer: 42})
            .then(function(data) {
                data.forEach(element => {
                    if(element.school === mySearch) {
                        arr.push(element);
                    }
                });

                arr.forEach(element => {
                    build(element)
                });
                content.appendChild(skulDiv);

                console.log(arr, 'b');
                arr = [];
                console.log(arr, 'a');
                
                
            }) // JSON-string from `response.json()` call
            .catch(error => console.error(error));
        } else {
            content.innerHTML = '';
        }
    }
});

function postData(url = ``, data = {}) {
    // Default options are marked with *
      return fetch(url)
      .then(response => response.json()); // parses response to JSON
  }
  
  