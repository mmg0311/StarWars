import React from 'react'
import queryString from 'query-string';
import Axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import { red } from '@material-ui/core/colors';
const styles = theme => ({
    card: {
        width: "40%",
        height: "60%",
        margin: "10%",
        minWidth: 275,
    },

    title: {
        fontSize: 20,
        align: "center"
    },
    pos: {
        marginBottom: 12,
    },
    avatar: {
        backgroundColor: red[500],
    },
});


class Character extends React.Component {
    constructor(props) {
        super(props);
        this.params = queryString.parse(this.props.location.search).ind;
        this.state = {}
        this.getData();
        this.expanded = false;
    }
    getData() {
        Axios.get(`https://swapi.co/api/people/${this.params}/`)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    ...response.data
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }
     handleExpandClick = () => {
        this.expanded = !this.expanded;
        this.setState({...this.state});
      };
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                {this.state.name === undefined ? <div></div> :
                    <Card className={classes.card} variant="outlined">
                        <CardContent>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="recipe" className={classes.avatar}>
                                        {this.state.name.substr(0, 1)}
                                    </Avatar>
                                }
                                title={this.state.name}
                                subheader={this.state.birth_year}
                            />
                            <Typography color="textSecondary">
                                Height : {this.state.height}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                Mass : {this.state.mass}
                            </Typography>
                            <Typography color="textSecondary">
                                Hair Color : {this.state.hair_color}
                            </Typography>
                            <Typography color="textSecondary">
                                Eye Color : {this.state.eye_color}
                            </Typography>
                            <Typography color="textSecondary">
                                Skin Color : {this.state.skin_color}
                            </Typography>
                        </CardContent>
                    </Card>}
            </React.Fragment>
        );
    }
}
export default withStyles(styles)(Character);