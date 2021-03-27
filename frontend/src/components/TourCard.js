
import React from 'react';
import {Button, Card} from "react-bootstrap";
import ReactStars from "react-stars/dist/react-stars";
import FastfoodIcon from '@material-ui/icons/Fastfood';
import {countryToFlag} from "./FilterPanel";
import config from "../stores/config";

export default class TourCard extends React.Component{
    

    render() {
        return(
        <Card className={"flex-row mb-4"}>
            {/*<Card.Img className={"p-4"} variant="left" src="https://lh3.googleusercontent.com/proxy/IuiOcqpm_6jgFp-beOcmqfwaLrbsT4D7n3RvN6J2aWcLkD6vqQgMd964mQQCewRgi1bn0TNGALTDBLF_exhmqS6LeSijKSxR6mmIJDwXG9u9og"/>*/}
            <Card.Body className={"pl-4"}>
                <section className={"d-flex flex-row justify-content-between"}>
                    <div className={"d-flex flex-column"}>
                        <div className={"d-flex flex-row flex-wrap align-items-center"}>
                            <Card.Title className={"cardLabel mb-0 mr-2"}>{countryToFlag(config.countries.find(el => el.value === this.props.country).code)} {this.props.name}</Card.Title>
                            <ReactStars
                              className={"mr-2"}
                              edit={false}
                              count={5}
                              value={this.props.stars}
                              size={24}
                              color2={'#ffd700'}
                            />
                        </div>
                        <div className={"d-flex flex-row justify-content-between"}>
                            <div className="descriptionCard d-flex flex-column">
                                <span>еда: {this.props.food_type}</span>
                                <span>еда: {this.props.food_type}</span>
                                <span>еда: {this.props.food_type}</span>
                                {this.props.annotations.map(el => (
                                  <span className={"textMuted"}>{el}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="activeCard d-flex flex-column">
                        <span className={"tourPrice mb-4 text-center"}>{this.props.price} $</span>
                        <Button variant="success">Заказать</Button>
                    </div>

                </section>
            </Card.Body>
        </Card>
        )
    }
}

