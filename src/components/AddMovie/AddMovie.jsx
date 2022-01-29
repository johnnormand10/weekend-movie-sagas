import {useState} from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
//material ui
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

function AddMovie(){

    const history = useHistory();
    const dispatch = useDispatch();
    //state variable
    const [newMovie, setNewMovie] = useState({
        title: '',
        poster: '',
        description: '',
        genre_id: ''
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('submit button in addMovie clicked');
        console.log('newMovie submitted is:', newMovie);

        dispatch({
            type: 'ADD_MOVIE',
            payload: newMovie
        })

        history.push('/');
        setNewMovie('');
    }

    const cancelClick = () => {
        history.push('/');
    }
    
    return(
        <>
            <h3>Add A New Movie</h3>
            <form onSubmit={handleSubmit}>
                <TextField 
                    id="standard-basic" 
                    label="Movie Title" 
                    placeholder="Movie Title"
                    onChange={(event) => setNewMovie({...newMovie, title:event.target.value})}
                    required={true}
                />

                <TextField 
                    id="standard-basic" 
                    label="Movie Poster" 
                    placeholder="Movie Poster"
                    onChange={(event) => setNewMovie({...newMovie, poster:event.target.value})}
                    required={true}
                />
                <TextField 
                    id="standard-basic" 
                    label="Movie Description" 
                    placeholder="Movie Description"
                    onChange={(event) => setNewMovie({...newMovie, description:event.target.value})}
                    required={true}
                />

                <InputLabel id="demo-simple-select-label" required={true}>Genre</InputLabel>

                <Select
                    labelId="genre selection"
                    id="deme-simple-select"
                    onChange={(event) => setNewMovie({...newMovie, genre_id:event.target.value})}
                    required={true}
                >
                    <MenuItem value={1}>Adventure</MenuItem>
                    <MenuItem value={2}>Animated</MenuItem>
                    <MenuItem value={3}>Biographical</MenuItem>
                    <MenuItem value={4}>Comedy</MenuItem>
                    <MenuItem value={5}>Disaster</MenuItem>
                    <MenuItem value={6}>Drama</MenuItem>
                    <MenuItem value={7}>Epic</MenuItem>
                    <MenuItem value={8}>Fantasy</MenuItem>
                    <MenuItem value={9}>Musical</MenuItem>
                    <MenuItem value={10}>Romantic</MenuItem>
                    <MenuItem value={11}>Science Fiction</MenuItem>
                    <MenuItem value={12}>Space-Opera</MenuItem>
                    <MenuItem value={13}>Superhero</MenuItem>
                </Select>

                <Button type="submit">Save</Button>
            </form>
            <Button onClick={cancelClick}>Cancel</Button>
        </>
    )
}

export default AddMovie;