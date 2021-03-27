
import React from 'react';
import {Button, Card} from "react-bootstrap";

export default class TourCard extends React.Component{
    render() {

        return(
        <Card className={"flex-row"}>
            <Card.Img variant="left" src="holder.js/100px180" width={"250px"} height={"250px"}/>
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
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