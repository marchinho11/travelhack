
import React from 'react';
import {Button, Card} from "react-bootstrap";
import ReactStars from "react-stars/dist/react-stars";
import catboost from "../../public/static/icons/catboost.png"
import {countryToFlag} from "./FilterPanel";
import config from "../stores/config";
import Emoji from "a11y-react-emoji";
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
    root: {
        background: "rgb(255, 215, 0)",
        borderRadius: "0px",
        maxWidth: "130px",
    },
});

class TourCard extends React.Component{
    

    render() {
        const classes = this.props.classes;
        
        
        return(
        <Card className={"flex-row mb-4"}>
            {/*<Card.Img className={"p-4"} variant="left" src="https://lh3.googleusercontent.com/proxy/IuiOcqpm_6jgFp-beOcmqfwaLrbsT4D7n3RvN6J2aWcLkD6vqQgMd964mQQCewRgi1bn0TNGALTDBLF_exhmqS6LeSijKSxR6mmIJDwXG9u9og"/>*/}
            <Card.Body className={"pl-4"}>
                <section className={"d-flex flex-row justify-content-between"}>
                    <div className={"d-flex flex-column"}>
                        <div className={"d-flex flex-row flex-wrap align-items-center"}>
                            <Card.Title className={"cardLabel mb-0 mr-2"}>{countryToFlag(config.countries.find(el => el.value === this.props.country)?.code)} {this.props.name}</Card.Title>
                            <ReactStars
                              className={"mr-2"}
                              edit={false}
                              count={5}
                              value={this.props.stars}
                              size={24}
                              color2={classes.root.background}
                            />
                        </div>

                        <div className={"d-flex flex-row justify-content-between"}>
                            <div className="descriptionCard d-flex flex-column">
                                {/*<span>еда: {this.props.food_type}</span>*/}
                                {/*<span>еда: {this.props.food_type}</span>*/}
                                {/*<span>еда: {this.props.food_type}</span>*/}
                                {this.props.annotations.map(el => (
                                  <span className={"textMuted"}>{el}</span>
                                ))}
                                <img className={"align-self-start mt-4"} width={"24px"} height={"24px"} src={catboost}></img>
                            </div>
                        </div>
                    </div>
                    <div className="activeCard d-flex flex-column justify-content-between">
                        <span className={"tourPrice mb-4 text-center"}>
                            {this.props.price} $
                            {this.props.stars > 4.5 ?
                              <Emoji symbol={"👍"}/>
                              : null}
                        </span>
                        <Button variant="success">Заказать</Button>
                    </div>

                </section>
            </Card.Body>
        </Card>
        )
    }
}

export default withStyles(styles)(TourCard)

