import React from 'react';

const footer = () => {
//footer with all of social media
  return (
    <footer>
                <Container fluid id='footer'>

                    <Button color='facebook' floated='right' size='mini'>
                        <Icon name='facebook' /> Facebook
                    </Button>
                    <br/>
                    
                    <Button color='twitter' floated='right' size='mini'>
                        <Icon name='twitter' /> Twitter
                    </Button>
                    <br/>
                    <Button color='instagram' floated='right' size='mini'>
                        <Icon name='instagram' /> Instagram
                    </Button>
                </Container>
    </footer>
  );
};

export default Footer;