
import React from 'react';
import {Button, Card} from "react-bootstrap";
import ReactStars from "react-stars/dist/react-stars";

export default class TourCard extends React.Component{

    ratingChanged(e,v){
        console.log(e);
        console.log(v);
    }

    render() {

        return(
        <Card className={"flex-row"}>
            <Card.Img variant="left" src="holder.js/100px180" width={"250px"} height={"250px"}/>
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <ReactStars
                    edit={false}
                    count={5}
                    value={3.5}
                    size={24}
                    color2={'#ffd700'}
                />
                <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
        )
    }


}