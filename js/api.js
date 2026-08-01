const API_URL = "https://movie-api.babeleoghie.workers.dev";


async function apiGet(endpoint){

    try {

        const response = await fetch(API_URL + endpoint);

        if(!response.ok){

            throw new Error("API Error");

        }


        return await response.json();


    } catch(error){

        console.error("API ERROR:", error);

        return null;

    }

}