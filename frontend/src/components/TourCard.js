
import React from 'react';
import {Button, Card} from "react-bootstrap";
import ReactStars from "react-stars/dist/react-stars";
import FastfoodIcon from '@material-ui/icons/Fastfood';

export default class TourCard extends React.Component{
    

    render() {
        console.log(this.props.food_type)
        return(
        <Card className={"flex-row mb-4"}>
            <Card.Img  variant="left" src="holder.js/100px180" width={"200px"} height={"200px"}/>
            <Card.Body className={"p-4"}>
                <section>
                    <header>
                        <div className={"d-flex flex-row"}>
                            <Card.Title className={"cardLabel"}>{this.props.name}</Card.Title>
                            <ReactStars
                              edit={false}
                              count={5}
                              value={this.props.stars}
                              size={24}
                              color2={'#ffd700'}
                            />
                        </div>
                    </header>
                    <main className={"d-flex flex-row justify-content-between"}>
                        <div className="descriptionCard d-flex flex-column">
                            <><FastfoodIcon style={{color: "#333"}}/>{this.props.food_type}</>
                            <><FastfoodIcon style={{color: "#333"}}/>{this.props.food_type}</>
                            <><FastfoodIcon style={{color: "#333"}}/>{this.props.food_type}</>
                            <><FastfoodIcon style={{color: "#333"}}/>{this.props.food_type}</>
                            <><FastfoodIcon style={{color: "#333"}}/>{this.props.food_type}</>
                        </div>
                        <div className="activeCard d-flex flex-column justify-content-end">
                            <Button variant="success">Заказать тур</Button>
                        </div>
                    </main>
                </section>
            </Card.Body>
        </Card>
        )
    }


}