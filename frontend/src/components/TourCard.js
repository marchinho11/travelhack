
import React from 'react';
import {Button, Card} from "react-bootstrap";
import ReactStars from "react-stars/dist/react-stars";
import catboost from "../../public/static/icons/catboost.png"
import deepfm from "../../public/static/icons/deepfm.png"
import {countryToFlag} from "./FilterPanel";
import config from "../stores/config";
import Emoji from "a11y-react-emoji";
import { withStyles } from '@material-ui/core/styles';
import ShowMoreText from 'react-show-more-text';

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
                                <ShowMoreText
                                  /* Default options */
                                  lines={3}
                                  more='Читать далее'
                                  less='Свернуть'
                                  className='content-css'
                                  anchorClass='my-anchor-css-class'
                                  expanded={false}
                                >
                                    {this.props.description}
                                </ShowMoreText>
                                <div className={"d-flex flex-row align-content-center mt-4"}>
                                    {this.props.ranker_type === "catboost" && <img className={"align-self-start mr-2"} style={{ transform: "translate(0, 25%)"}} width={"24px"} height={"24px"}
                                          src={catboost}></img>}
                                    {this.props.ranker_type === "deepfm" &&<img className={"align-self-start mr-2"} style={{ transform: "translate(0, 25%)"}} width={"24px"} height={"24px"}
                                          src={deepfm}></img>}
                                    <div className={"d-flex flex-column"}>
                                        {this.props.annotations.map((el, index) => (
                                          <div className={"textMuted d-flex flex-row align-items-center"}>
                                              <div className={"mr-2"} style={{borderRadius:"100%", width: "4px", height: "4px", backgroundColor: "#9ca8b3"}}/>
                                              {el}
                                              {this.props.score && index === 1
                                              && <b className={"ml-2"} style={{fontWeight: "bold !important"}}> {Number(this.props.score).toFixed(3)}</b>}
                                          </div>
                                        ))}
                                    </div>
                                </div>
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

