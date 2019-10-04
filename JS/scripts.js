//JQuery function to make sure no code is run until the HTML is fully loaded
$(function () {
    //When the page loads, the pokemon info card should be hidden by default
    $("#pokemonInfoCard").hide();

    // set up the event handler for when the search button is clicked
    $("#search").click(function () {
        // Get the input from the search bar
        let pokemonNamerOrID = $("#pokemonInput").val().toLowerCase();

        //remove old info from pokemon information list
        $("#pokemonInformationList").html("");

        $("#pokemonInput").val("");

        getPokemonInfo(pokemonNamerOrID);

    });


    function determineBackgroundColor(type) {
        switch (type) {
            case "bug":
                return "#A6B51D";
            case "dark":
                return "#4D392C";
            case "dragon":
                return "#735CDB";
            case "electric":
                return "#FCBB17";
            case "fairy":
                return "#EFA8EF";
            case "fighting":
                return "#7E321B";
            case "fire":
                return "#EA3E0D";
            case "flying":
                return "#9DAEF7";
            case "ghost":
                return "#5F5FB2";
            case "grass":
                return "#72C235";
            case "ground":
                return "#D1B055";
            case "ice":
                return "#6DD3F5";
            case "normal":
                return "#B8B1A6";
            case "poison":
                return "#924593";
            case "psychic":
                return "#EA457E";
            case "rock":
                return "#A68E44";
            case "steel":
                return "#B3B3C2";
            case "water":
                return "#2079D2";
            default:
                return "#000";
        }
    }
    // function to retrieve information about a Pokemon from the API
    function getPokemonInfo(namerOrID) {
        // we need a way to asynchronously handle making the API call and doing stuff when we get a response since we dont know how long it will take to get a response.

        //if we tried to write synchronous code (code that runs one line after another) this could cause problems if we try to pull information from the API response before we get it back

        $.ajax({
            // the url we're making our request to
            url: "https://pokeapi.co/api/v2/pokemon/" + namerOrID,
            // The type of our request
            type: "GET",
            // The function we pass in here will be called if our request is successful
            success: function (result) {
                // pulling the pokmemon's name from the JSON result we get
                let name = result.name;

                let spriteLink = result.sprites.front_default;

                // get pokemons ID
                let id = result.id;

                // Get pokemons weight
                let weight = result.weight;

                // get the types the pokemon has
                let types = result.types;

                $("#pokemonImage").attr("src", spriteLink);
                $("#pokemonName").html(name.toUpperCase());
                $("#pokemonInformationList").append("<li class='list-group-item'>ID: " + id + "</li>");
                $("#pokemonInformationList").append("<li class='list-group-item'>weight: " + weight + "</li>");

                for (type of types) {
                    // for each tpye, we need to create a new list item, configure it, and append it to our list of Pokemon information
                    let li = document.createElement("li");
                    li.classList.add("list-group-item");
                    li.classList.add("text-capitalize");
                    li.innerHTML = type.type.name;
                    li.style.backgroundColor = determineBackgroundColor(type.type.name);

                    $("#pokemonInformationList").append(li);

                }

                // make the card reappear once we're done setting it up
                $("#pokemonInfoCard").show();
            },
            // The function we pass in here will be called if our request fails
            error: function (error) {
                console.log(error);
            },
        });

    }
});