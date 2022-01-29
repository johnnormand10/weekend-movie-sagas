import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
//material ui
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

function Details(){

    const details = useSelector(store => store.moviesDetails);
    const history = useHistory();
    const genres = details.genres;
    //checking what details is
    console.log('details variable in Details.jsx is:', details);
    //checking what genres is
    console.log('genres variable in Details.jsx is:', genres);
    const handleClick = () => {
        console.log('handleClick back to list page');
        history.push('/');
    }

    return (
        <div>
            <Card>
                <CardActionArea>
                    <img src={details.poster} alt={details.title} />
                    <CardContent>
                        <Typography variant="h4" component="h2">{details.title}</Typography>
                        <Typography variant="body1" color="textSecondary" component="p">{details.description}</Typography>
                        <Typography variant="h3" component="h2">Genres:</Typography>
                        {genres?.map((name) => {
                            return(
                                <Typography variant="h5" component="h3" key={name}>{name}</Typography>
                            )
                        })}
                    </CardContent>
                </CardActionArea>
            </Card>
            <Button size="large" onClick={handleClick}>Return to List</Button>
        </div>
    )
}

export default Details;