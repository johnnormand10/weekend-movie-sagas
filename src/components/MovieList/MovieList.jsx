import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MovieList.css'
//material ui
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

function MovieList() {

    const history = useHistory();
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    const handleClick = (id) => {
        //check what the id is 
        console.log('id in MovieList.jsx click is:', id);
        //giving the id a variable
        const selectedMovie = id;
        dispatch({
            type: 'GET_DETAILS',
            payload: selectedMovie
        })
        //pushing to the details page
        history.push('/details');
    }

    return (
        <div>
            <h1>MovieList</h1>
            <section className="movies">
                <Grid>
                {movies.map(movie => {
                    return (
                        <Grid item sm={3}>
                            <Paper>
                                <Card key={movie.id} onClick={() => handleClick(movie.id)}>
                                    <CardActionArea>
                                        <Typography gutterButton variant="h4" component="h2">{movie.title}</Typography>
                                        <img src={movie.poster} alt={movie.title} />
                                    </CardActionArea>
                                </Card>
                            </Paper>
                        </Grid>
                    );
                })}
                </Grid>
            </section>
        </div>

    );
}

export default MovieList;