import React from 'react';
import {getUser} from '../../api'
import Header from '../Header/Header';
import { Button, Image, Grid, Segment, Icon, Label } from 'semantic-ui-react'

class Profile extends React.Component {
  state = {
        allUsers: []
      }

        getUsers = () => {
          getUser()
          .then(data => this.setState({ allUsers: data }))
          .catch(err => console.error('Something went wrong.'))
      }
      componentDidMount() { // when render finish call is func
        this.getUsers()
      }


      render() {
       const posts = this.state.allUsers
    return (
      <div>
        < Header />
        {
        posts.length >= 0
        ? //in { } is logic
          posts.map(post =>
            post.username == localStorage.getItem('username') ?
            (
              localStorage.setItem('status', post.status),
              <div role="list" class="ui divided relaxed list">
                <Segment horizontal='true' inverted>
                  <Grid>
                    <Grid.Column width={4}>
                      <Segment inverted>
                        <Image src={post.profileimage} size='huge' /><br />
                        <a href={"/setting/" + post._id}>< Button fluid inverted color='red' ><Icon inverted color='white' name='settings' />SETTING</Button></a></Segment>
                    </Grid.Column>
                    <Grid.Column width={12}>
                      <Segment.Group>
                        <Label color='red' size='massive' ribbon>PROFILE</Label>
                        <Segment.Group inverted>
                          <Segment color='red'>USERNAME : {post.username}</Segment>
                          <Segment color='red'>FIRST NAME : {post.firstname}</Segment>
                          <Segment color='red'>LAST NAME : {post.lastname}</Segment>
                          <Segment color='red'>ADDRESS : {post.address}</Segment>
                          <Segment color='red'>E-MAIL : {post.email}</Segment>
                          <Segment color='red'>PHONE : {post.phone}</Segment>
                        </Segment.Group>
                      </Segment.Group>
                    </Grid.Column>
                  </Grid>
                </Segment>

</div>
        )
                    :
                    null
                  )
                :
                null
              }





      </div>


    );
  }
}

export default Profile;
