import React from 'react';
import './Editprofile.css';
import Header from '../Header/Header';
import { editprofile, getUser, getAllItem } from '../../api'
import { Segment, Input, Button, Label, Form,TextArea, Image,Card} from 'semantic-ui-react'

class EditProfile extends React.Component {

  state = { // set state can use in class component only
    username: localStorage.getItem('username'),
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    phone: '',
    allUsers: [],
    allPosts: [],
    id: this.props.match.params.id,
    defaultDepartment: 0
  }

  onTextChange = event => { // can use for all that have name and value
    const name = event.target.name
    const value = event.target.value;
    this.setState({
      [name]: value
    })
  }

  onSubmit = event => {
    event.preventDefault() // no refresh
    editprofile(this.state.id,this.state.address,this.state.email, this.state.phone)
      .then(data => {
        if (data.status === 200) {
          window.location.reload();
        } else {
          console.log('fail')
        }
      })
  }
  getItems = () => {
    getAllItem()
      .then(data => this.setState({ allPosts: data }))
      .catch(err => console.error('Something went wrong.'))
  }
  getUsers = () => {
    getUser()
      .then(data => this.setState({ allUsers: data }))
      .catch(err => console.error('Something went wrong.'))
  }


  componentDidMount() { // when render finish call is func
    this.getUsers()
    this.getItems()
  }


  render() {
    const posts = this.state.allUsers
    const items = this.state.allPosts
    return (
      <div >
        < Header />
        <Segment.Group inverted horizontal>
        {
        posts.length >= 0
        ? //in { } is logic
          posts.map(post =>
            post.username == localStorage.getItem('username') ?
            (

              <Segment inverted color='black' >
                <h1>EDIT YOUR PROFILE</h1>
                <Form class="ui form" onSubmit={this.onSubmit}>
                  <Segment inverted >
                    <Label color='red' ribbon>ADDRESS</Label>
                    <TextArea autoHeight type="text" name="address" placeholder={post.address} value={this.state.address} onChange={this.onTextChange} required />
                  </Segment >
                  <Segment inverted>
                    <Label color='red' ribbon>E-MAIL</Label>
                    <Input type="text" name="email" placeholder={post.email} value={this.state.email} onChange={this.onTextChange} required />
                  </Segment >
                  <Segment inverted>
                    <Label color='red' ribbon>PHONE</Label>
                    <Input type="text" name="phone" placeholder={post.phone} value={this.state.phone} onChange={this.onTextChange} required />
                  </Segment >
                  <br />

                  <Button inverted color='red' type='submit'>SUBMIT</Button>
                </Form>
                <br />
              </Segment>


)
            :
            null
          )
        :
        null
      }
      <Segment inverted color='black'>
        <h1>HISTORY</h1><Card.Group>
        {
        items.length >= 0
        ? //in { } is logic
          items.map(post =>
            post.owner==localStorage.getItem('username')
            ?
            (
<a href={"/item/"+post._id}>
     <Card>
                       <Card.Content extra>
                         <Image floated='right' size='mini' src={post.itemimage} />
                         <Card.Header>
                           {post.itemname}
                         </Card.Header>
                         <Card.Meta>
                          status:  {post.status}<br/>
                          swapper:  {post.swapper}
                         </Card.Meta>
                         <Card.Description>
                           {post.description}
                         </Card.Description>
                       </Card.Content>

                     </Card></a>
            )
            :
            null
          )
        :
        null
        }
</Card.Group>
      </Segment>

      </Segment.Group>
      </div>


    );
  }
}

export default EditProfile;
