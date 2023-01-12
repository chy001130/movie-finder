import { API_KEY } from "../key";
import axios from 'axios';

export async function retrieveTopMovieList() {
    try {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`);

        return data;

    } catch (error) {
        console.log(error);
    }
}

export async function retrieveSearchResult(query, page) {
    try {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
        )
        return data;
    } catch (error) {
        console.log(error);
    }
}




