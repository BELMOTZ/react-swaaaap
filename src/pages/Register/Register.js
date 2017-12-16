import React from 'react';
import { register } from '../../api'
import Header from '../Header/Header';
import { Input, Grid, Button, Form, Segment, Label,TextArea } from 'semantic-ui-react'

class Register extends React.Component {
  state = { // set state can use in class component only
    img: '',
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    address:'',
    email: '',
    phone: ''
  }


  onTextChange = event => {
    const name = event.target.name
    const value = event.target.value;
    this.setState({
      [name]: value
    })
  }

  onSubmit = event => {
    event.preventDefault()
    register(this.state.img, this.state.username, this.state.password,this.state.firstname, this.state.lastname, this.state.email, this.state.phone,this.state.address)
      .then(data => {
        console.log(data);
        if (data.status === 200) {
          this.props.history.replace('/login')
        }
      })
  }



  render() {
    return (
      <div>
        <Header />
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column width={3}>
            </Grid.Column>
            <Grid.Column width={10}>

              <Segment inverted color='black'>
                <h1 align='center'> REGISTER </h1>
                <Form onSubmit={this.onSubmit} >
                  <Segment.Group horizontal inverted>
                    <Segment>
                      <Label attached='top' color='red'>PHOTO</Label>
                      <Form.Input type="text" name="img" placeholder="img" value={this.state.img} onChange={this.onTextChange} required/>
                    </Segment>
                  </Segment.Group>
                  <Segment.Group horizontal inverted>
                    <Segment >
                      <Label attached='top' color='red'>USERNAME</Label>
                      <Form.Input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.onTextChange} required/>
                    </Segment>
                    <Segment >
                      <Label attached='top' color='red'>PASSWORD</Label>
                      <Form.Input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.onTextChange} required/>
                    </Segment>
                  </Segment.Group>
                  <Segment.Group horizontal inverted>
                    <Segment >
                      <Label attached='top' color='red'>FIRSTNAME</Label>
                      <Form.Input type="text" name="firstname" placeholder="firstname" value={this.state.firstname} onChange={this.onTextChange} required/>
                    </Segment>
                    <Segment >
                      <Label attached='top' color='red'>LASTNAME</Label>
                      <Form.Input type="text" name="lastname" placeholder="lastname" value={this.state.lastname} onChange={this.onTextChange} required/>
                    </Segment>
                  </Segment.Group>
                  <Segment.Group horizontal inverted>
                    <Segment >
                      <Label attached='top' color='red'>E-MAIL</Label>
                      <Input type="email" name="email" placeholder="email" value={this.state.email} onChange={this.onTextChange} required/>
                    </Segment>
                    <Segment >
                      <Label attached='top' color='red'>PHONE</Label>
                      <Input type="number" name="phone" placeholder="phone" value={this.state.phone} onChange={this.onTextChange} min='0' required/>
                    </Segment>
                  </Segment.Group>
                  <Segment.Group horizontal inverted>
                    <Segment >
                      <Label attached='top' color='red'>ADDRESS</Label>
                      <TextArea autoHeight placeholder='address' name="address" value={this.state.address} onChange={this.onTextChange} required/>
                    </Segment>
                  </Segment.Group>
                  <Button inverted color='red' fluid type='submit'>SUBMIT</Button>
                </Form>
              </Segment>
            </Grid.Column >
            <Grid.Column width={3}>
            </Grid.Column>
          </Grid.Row>
        </Grid>

      </div>
    );
  }
}

export default Register;
