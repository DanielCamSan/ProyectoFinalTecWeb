window.addEventListener('load', (event) => {
    const baseUrl = 'http://localhost:51740/api/Breeds/';
    var breeds = [];

    function fetchBreeds() {
        fetch(baseUrl)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    console.log("something wrong happened");
                    return response.json()
                }
            })
            .then((data) => {
                var BreedHTMLListMapped = data.map(p =>
                    `<div class="col-md-6">
                    <a href="${p.name === "Undeads" | p.name === "Orcs" | p.name === "Humans" | p.name === "NightElves" ? p.name : "Humans"}.html">
                        <div class="image">
                            <img src="images/${p.name === "Undeads" | p.name === "Orcs" | p.name === "Humans" | p.name === "NightElves" ? p.name : "Default"}.jpg" alt="${p.name}">                            
                        </div>
                        <div class="image-title" >
                            <span>${p.name}</span>
                        </div>
                        
                    </a>
                </div>
               `);
                var breedContent = `${BreedHTMLListMapped.join('')}`;
                document.getElementById("breed-list-content").innerHTML = breedContent;
            })

    }

    function fetchGetSingleBreed() {
        //let localid = window.location.pathname.split("/")[1].split(".")[0];
        let nameBreed = window.location.pathname.split('.')[0].split('/')[1];
        let localid;

        if (nameBreed === "NightElves") {
            localid = 4;
        }
        if (nameBreed === "Humans") {
            localid = 3;
        }
        if (nameBreed === "Undeads") {
            localid = 2;
        }
        if (nameBreed === "Orcs") {
            localid = 1;
        }

        /*
         debugger;
         fetch(baseUrl)
             .then(response => {
                 debugger;
                 if (response.status === 200) {
                     return response.json();
                 } else {
                     console.log("something wrong happened");
                     return response.json()
                 }
             })
             .then((data) => {
                 localid = data.map(p => {
                     if (p.name === nameBreed) {
                         return p.id
                     }
                 });
                 debugger;
             })*/
        fetch(`${baseUrl}${localid}`)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    console.log("something wrong happened");
                    return response.json()
                }
            })
            .then(data => {
                var SingleBreedHtmlMapped =
                    `<div class="col-md-6">
                        <thead>
                            <tr>
                                <th>Key</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Id</td>
                                <td>${data.id}</td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td>${data.name}</td>
                            </tr>
                            <tr>
                                <td>TypesOfUnity</td>
                                <td>${ parseInt(data.typesofUnity)}</td>
                            </tr>
                            <tr>
                                <td>DefaultColor</td>
                                <td>${data.defaultColor}</td>
                            </tr>
                            <tr>
                                <td>Reign</td>
                                <td>${data.reign}</td>
                            </tr>
                            <tr>
                                <td>ArmyName</td>
                                <td>${data.armyName}</td>
                            </tr>
                            <tr>
                                <td>Difficulty</td>
                                <td>${data.difficulty}</td>
                            </tr>
                            <tr>
                                <td>Rating</td>
                                <td>${ parseFloat(data.rating)}</td>
                            </tr>
                        </tbody>
                    </div>
            `;
                var SinglebreedContent = `<table class="table table-dark" style:"margin-left: 2px;>${SingleBreedHtmlMapped}</table>`;
                document.getElementById("Singlebreed-list-content").innerHTML = SinglebreedContent;
            });

    }

    function fetchPostBreed(event) {
        event.preventDefault();
        var data = {
            name: event.currentTarget.name.value,
            typesOfUnity: parseInt(event.currentTarget.typesOfUnity.value),
            defaultColor: event.currentTarget.defaultColor.value,
            reign: event.currentTarget.reign.value,
            armyName: event.currentTarget.armyName.value,
            difficulty: event.currentTarget.difficulty.value,
            rating: parseFloat(event.currentTarget.rating.value)
        }
        fetch(baseUrl, {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: 'POST',
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.status === 201) {
                console.log("Breed created successfuly");
            } else {
                response.text().then((data) => {
                    console.log(data);
                });
            }
        }).catch((response) => {
            console.log(data);
        });
    }

    function fetchCreateFromBreed(event) {
        let nameBreed = window.location.pathname.split('.')[0].split('/')[1];
        let localid;
        if (nameBreed === "NightElves") {
            localid = 4;
        }
        if (nameBreed === "Humans") {
            localid = 3;
        }
        if (nameBreed === "Undeads") {
            localid = 2;
        }
        if (nameBreed === "Orcs") {
            localid = 1;
        }
        fetch(`${baseUrl}${localid}`)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    console.log("something wrong happened");
                    return response.json()
                }
            })
            .then(data => {
                var FormCreated =
                    `<div class="col-md-3">
                    <label for="name">Name</label>
                </div>
                <div class="col-md-7">
                    <input type="text" name="name" id="form-name" value="${data.name}">
                </div>
                <div class="col-md-3">
                    <label for="typesOfUnity">Types Of Unitys</label>
                </div>
                <div class="col-md-7">
                    <input type="number" name="typesOfUnity" id="form-typesOfUnity" value=${parseInt(data.typesofUnity)}>
                </div>
                <div class="col-md-3">
                    <label for="defaultColor">Default Color</label>
                </div>
                <div class="col-md-7">
                    <input type="text" name="defaultColor" id="form-defaultColor" value="${data.defaultColor}">
                </div>
                <div class="col-md-3">
                    <label for="reign">Reign</label>
                </div>
                <div class="col-md-7">
                    <input type="text" name="reign" id="form-reign" value="${data.reign}">
                </div>
                <div class="col-md-3">
                    <label for="armyName">Army Name</label>
                </div>
                <div class="col-md-7">
                    <input type="text" name="armyName" id="form-armyName" value="${data.armyName}">
                </div>
                <div class="col-md-3">
                    <label for="difficulty">Difficulty</label>
                </div>
                <div class="col-md-7">
                    <input type="text" name="difficulty" id="form-difficulty" value="${data.difficulty}">
                </div>
                <div class="col-md-3">
                    <label for="rating">Rating</label>
                </div>

                <div class="col-md-7">
                    <input type="number" name="rating" id="form-rating" value=${parseFloat(data.rating)}>
                </div>
                <div class="col-md-6" style="text-align : center;">
                    <input type="submit" value="submit">
                </div>
        `;
                var listReady = `<form id="fetch-update-frm" class="row">${FormCreated}</form>`;
                document.getElementById("breed-listready-content").innerHTML = listReady;
                document.getElementById("fetch-update-frm").addEventListener("submit", fetchUpdateBreed);
            });

    }

    function fetchUpdateBreed(event) {
        let nameBreed = window.location.pathname.split('.')[0].split('/')[1];
        let localid;
        if (nameBreed === "NightElves") {
            localid = 4;
        }
        if (nameBreed === "Humans") {
            localid = 3;
        }
        if (nameBreed === "Undeads") {
            localid = 2;
        }
        if (nameBreed === "Orcs") {
            localid = 1;
        }
        event.preventDefault();
        debugger;
        var data = {
            name: event.currentTarget.name.value,
            typesOfUnity: parseInt(event.currentTarget.typesOfUnity.value),
            defaultColor: event.currentTarget.defaultColor.value,
            reign: event.currentTarget.reign.value,
            armyName: event.currentTarget.armyName.value,
            difficulty: event.currentTarget.difficulty.value,
            rating: parseFloat(event.currentTarget.rating.value)
        }
        debugger;
        fetch(`${baseUrl}${localid}`, {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: 'PUT',
            body: JSON.stringify(data)
        }).then((response) => {
            debugger;
            if (response.status === 200) {
                console.log("Breed updated successfuly");
            } else {
                response.text().then((data) => {
                    debugger;
                    console.log(data);
                });
            }
        }).catch((response) => {
            console.log(data);
        });
    }

    function fetchDeleteBreed(event) {

        let nameBreed = window.location.pathname.split('.')[0].split('/')[1];
        let idToDelete;
        if (nameBreed === "NightElves") {
            idToDelete = 4;
        }
        if (nameBreed === "Humans") {
            idToDelete = 3;
        }
        if (nameBreed === "Undeads") {
            idToDelete = 2;
        }
        if (nameBreed === "Orcs") {
            idToDelete = 1;
        }
        //var idToDelete = parseInt(event.currentTarget.id.value);
        debugger;
        fetch(`${baseUrl}${idToDelete}`, {
            method: "DELETE"
        });
    }

    function fetchDeleteDownRating(event) {
        debugger;
        event.preventDefault();
        var DataRating = {
            rating: parseFloat(event.currentTarget.rating.value)
        }
        fetch(baseUrl)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    console.log("something wrong happened");
                    return response.json()
                }
            })
            .then((data) => {
                data.forEach(p => {
                    if (parseFloat(p.rating) < parseFloat(DataRating.rating)) {
                        debugger;
                        fetch(`${baseUrl}${p.id}`, {
                            method: "DELETE"
                        });
                    }
                });
            })

    }
    if (document.getElementById("fetch-Btn") != null) {
        document.getElementById("fetch-Btn").addEventListener("click", fetchBreeds);
    }
    if (document.getElementById("fetch-frm") != null) {
        document.getElementById("fetch-frm").addEventListener("submit", fetchPostBreed);
    }

    if (document.getElementById("fetch-delete-Btn") != null) {
        document.getElementById("fetch-delete-Btn").addEventListener("click", fetchDeleteBreed);
    }
    if (document.getElementById("fetch-Single-Btn") != null) {
        document.getElementById("fetch-Single-Btn").addEventListener("click", fetchGetSingleBreed);
    }
    if (document.getElementById("fetch-CreateForm-Btn") != null) {
        document.getElementById("fetch-CreateForm-Btn").addEventListener("click", fetchCreateFromBreed);
    }
    if (document.getElementById("fetch-BL-form") != null) {
        document.getElementById("fetch-BL-form").addEventListener("submit", fetchDeleteDownRating);
    }

});