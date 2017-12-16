import React from 'react';
import './Index.css';
import { Button,Container,Icon } from 'semantic-ui-react'
import BackgroundSlideshow from 'react-background-slideshow'

var image1 = 'https://i.imgur.com/LdVOoYp.jpg'
var image2 = 'https://i.imgur.com/ES1cujx.jpg'
var image3 = 'https://i.imgur.com/vCKXMYG.jpg'

export default class Index extends React.Component {
    render() {
        return (
            <div>
                <div class="img" ><BackgroundSlideshow images={[image1, image2, image3]} /></div>
                <Container textAlign='center' fluid>

                <a href="/home" >
                <Button  color='red' animated='fade' size='massive'>
                <Button.Content visible>
                    YOU WANT SOMETHING!?!
                </Button.Content>
                <Button.Content color='red' size='massive' hidden>
                    LET'S SWAAAAP !!!
                </Button.Content>
                </Button>
                </a>
                <br/><br/><br/>
                <Icon name='exchange' size='huge' color='red' />
                </Container>


            </div>

        )
    }
}
