import './App.css';
import TopRatedMovieCardList from './components/TopRatedMovies/TopRatedMovies';
import Search from './components/Search/Search';
import { createTheme, ThemeProvider } from '@mui/material';
import { Routes, Route } from "react-router-dom";



function App() {

  const theme = createTheme({
    typography: {
      fontFamily: [
        'Josefin Sans',
        'sans-serif',
      ].join(','),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div classNAme="App">
        <Search />
        <Routes>
          <Route path='/' element= {<TopRatedMovieCardList/>} />
        </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App;
