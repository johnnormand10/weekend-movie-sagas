import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);

    yield takeEvery('GET_DETAILS', getDetails);

    yield takeEvery('ADD_MOVIE', addMovie);
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }
        
}

function* getDetails(action){
    try{
        const response = yield axios.get(`/api/movie/${action.payload}`);
        //checking if i'm getting data back
        console.log('response of index 0 in getDetails in index is:', response.data[0]);
        yield put({
            type: 'DISPLAY_MOVIE_DETAIL',
            payload: response.data[0]
        })
    }
    catch(err) {
        console.error('ERROR in getDetails in index.js', err);
    }
}

function* addMovie(action){
    try{
        const newMovie = action.payload;
        //checking if i'm getting the correct data
        console.log('newMovie in index.js is:', newMovie);
        yield axios.post('/api/movie', newMovie)

        yield put({
            type: 'FETCH_MOVIES'
        })
    }
    catch(err){
        console.error('ERROR in addMovie in index', err);
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

//Used to store movies details of the selected movie
const moviesDetails = (state = [], action) => {
    if(action.type === 'DISPLAY_MOVIE_DETAIL'){
        return action.payload;
    }
    return state;
}

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    } 
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        moviesDetails
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
