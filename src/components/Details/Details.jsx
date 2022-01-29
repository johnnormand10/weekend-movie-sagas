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
    //checking what details is
    console.log('details variables in Details.jsx is:', details);

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
                        <Typography gutterBottom variant="h4" component="h2">{details.title}</Typography>
                        <Typography gutterBottom variant="h5" component="h3">{details.genres}</Typography>
                        <Typography gutterBottom variant="body2" color="textSecondary" component="p">{details.description}</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Button size="large" onClick={handleClick}>Return to List</Button>
        </div>
    )
}

export default Details;