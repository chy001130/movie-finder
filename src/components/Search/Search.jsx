import React, { Fragment, useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { retrieveSearchResult } from '../../services/retrieveMovieData';
import { Button, Card, CardContent, Typography, Box, TextField, Grid, Paper, AppBar, IconButton } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import notfound from '../../assets/no_image.jpeg'

const SearchBar = () => {

    let [query, setQuery] = useState('');
    let [results, setResults] = useState([]);
    let [notFound, setNotFound] = useState(false);
    let [totalPages, setTotalPages] = useState(1);
    let [expanded, setExpanded] = useState({});
    let [page, setPage] = useState(1);


    const centerStyle = {
        justifyContent: "center", display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        width: "50%"
    }

    const navigate = useNavigate();

    const handleExpandClick = (id) => {
        setExpanded(expanded => ({
            ...expanded,
            [id]: !expanded[id],
        }));
    };

    const handleNextPageClick = () => {
        if (page === totalPages) {
            alert("No more pages!");
            return;
        }
        setPage(page + 1)
        retrieveSearchResult(query, page).then(response => {
            setResults(response.results);
        })
    }

    const handlePrevPageClick = () => {
        if (page === 1) {
            alert('This is the first page!')
            return;
        }
        setPage(page - 1);
        retrieveSearchResult(query, page).then(response => {
            setResults(response.results);
        })
    }

    const onKeyPress = (e) => {
        if (e.key === "Enter") {
            console.log('Input value', e.target.value);
            setQuery(e.target.value);
            e.preventDefault();
            navigate("/search")
        }
    }

    useEffect(() => {
        if (query !== "") {
            retrieveSearchResult(query, page).then(response => {
                setResults(response.results);
                if (response.results.length === 0) {
                    setNotFound(true);
                }
                setTotalPages(response.total_pages);
                setPage(response.page);
            })
        }
    }, [page, query])

    return (
        <Fragment>
            <AppBar position='static'>
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
                >
                    <Box m={1}>
                        <button class="button-27" onClick={() => navigate("/")}>Home</button>
                    </Box>

                    <Grid container display='flex' justifyContent='center'>
                        <TextField
                            sx={{ width: { sm: 200, md: 300 }, display: 'flex', alignContent: 'center' }}
                            placeholder="Search for movies"
                            onKeyPress={onKeyPress}

                        />
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" >
                            <SearchIcon />
                        </IconButton>
                    </Grid>

                </Paper>

            </AppBar>

            {results &&
                <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {query && <Grid item xs={12}>
                        <Typography variant='h4' style={{ justifyContent: "center", display: "flex", color: "white" }}>Search Result: {query}</Typography>
                    </Grid>}
                    {results.map((movie) => (
                        <Grid item lg={3} md={4} sm={6} xs={12} key={movie.id}>
                            <Card key={uuidv4()} style={{ backgroundColor: "#282D2F" }}>
                                <CardContent>
                                    <img src={movie.poster_path !== null ? `https://image.tmdb.org/t/p/w400` + movie.poster_path : notfound} style={centerStyle}  alt='movie'
                                    />
                                    <Typography variant='h6' style={{ justifyContent: "center", display: "flex", color: "white" }}>{movie.original_title}</Typography>
                                    <Button
                                        sx={centerStyle}
                                        variant='outlined'
                                        onClick={() => handleExpandClick(movie.id)}

                                    >Read {expanded[movie.id] ? "less" : "more"}</Button>
                                    {expanded[movie.id] &&
                                        <Box>
                                            <Typography variant='body1' color='common.white'>{movie.overview}</Typography>
                                            <br></br>
                                            <Typography color='common.white'>Release-Date: {movie.release_date}</Typography>
                                            <Typography color='common.white'>User Score: {movie.vote_average} / 10</Typography>
                                        </Box>}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                    }
                    <Grid item xs={6}>
                        {page > 1 && <Button sx={centerStyle} size='large' onClick={handlePrevPageClick}>Previos Page</Button>}
                    </Grid>
                    <Grid item xs={6}>
                        {page < totalPages && <Button sx={centerStyle} size='large' onClick={handleNextPageClick}>Next Page</Button>}
                    </Grid>
                </Grid >
            }
            {notFound && <Typography style={{ justifyContent: "center", display: "flex", color: "white" }} variant='h3' color='common.white'>There are no movies that matched your query.</Typography>}
        </Fragment>
    )
}

export default SearchBar;