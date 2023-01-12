import React, { useState, useEffect } from 'react';
import { retrieveTopMovieList } from '../../services/retrieveMovieData';
import { Card, CardContent, Typography } from "@mui/material";
import { Grid } from '@mui/material';

const TopRatedMovieCardList = () => {

    let [topMovie, setTopMovie] = useState([]);

    useEffect(() => {
        retrieveTopMovieList().then(response => {
            setTopMovie(response.results);
        })
    }, [])

    return (
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>
                <Typography variant='h4' color='common.white' style={{marginLeft: '20px'}}><strong>Welcome.</strong></Typography>
                <Typography variant='h4' color='common.white' style={{marginLeft: '20px'}}><strong>Millions of movies, TV shows and people to discover. Explore now.</strong></Typography>
            </Grid>
            {topMovie.map((movie) => (
                <Grid item lg={3} md={4} sm={6} xs={12}>
                    <Card key={movie.id} style={{ backgroundColor: "#282D2F" }}>
                        <CardContent>
                            <img src={`https://image.tmdb.org/t/p/w300` + movie.poster_path} alt='movie poster'/>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>

    )
}

export default TopRatedMovieCardList;