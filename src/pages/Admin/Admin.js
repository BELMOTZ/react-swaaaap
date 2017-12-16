import React from 'react';
import Header from '../Header/Header';
import { getCategory ,postCategory,getUser,editstatus,deleteCategory} from '../../api'
import { Segment, Button, Input, Grid } from 'semantic-ui-react'

class Admin extends React.Component {

  state = { // set state can use in class component only
      category:'',
      value:'',
allCategory:[],
allUsers:[],
userid:'',
userstatus:''
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
    postCategory(this.state.category, this.state.value)
      .then(data => {
        if (data.status === 200) {
          window.location.reload();
        } else {
          console.log('ey')
        }
      })
  }
  handleChange = (id, status) => {
    editstatus(id, status)
      .then(data => {
        if (data.status === 200) {
          window.location.reload();
        } else {
          console.log('ey')
        }
      })
  }

  handleChangedel = (id) => {
    deleteCategory(id)
    .then(data => {
      if (data.status === 200) {
        window.location.reload();
      } else {
        console.log('ey')
      }
    })
}

  getCategories = () => {
    getCategory()
      .then(data => this.setState({ allCategory: data }))
      .catch(err => console.error('Something went wrong.'))
  }

  getUsers = () => {
    getUser()
      .then(data => this.setState({ allUsers: data }))
      .catch(err => console.error('Something went wrong.'))
  }
  componentDidMount() { // when render finish call is func
    this.getCategories()
  this.getUsers()
  }


  render() {
    const posts = this.state.allCategory
    const users = this.state.allUsers
    return (
      <div >
        < Header />
        <Grid>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Segment inverted>
                <h1 align='center'>USER</h1>
                  {users.length >= 0 ? //in { } is logic
                    users.map(post =>


                      <Segment clearing size='medium'>{post.username}
                        {post.status == 'superadmin' ?(
                          <Button floated='right' name='userstatus'  inverted color='green' >SUPERADMIN</Button>
                        ):null}
                        {post.status == 'user' ?(
                          <Button floated='right' name='userstatus'  inverted color='red'onClick={(e) => this.handleChange(post._id,"admin")} >ADMIN</Button>
                        ):null}
                        {post.status == 'admin' ?(
                          <Button floated='right' name='userstatus'  inverted color='red' onClick={(e) => this.handleChange(post._id,"user")}>USER</Button>
                        ):null}
                      </Segment>
                    )
                    : null
                  }
                </Segment>

              </Grid.Column>
              <Grid.Column>
    <Segment inverted >
  <h1 align='center'>CATEGORY</h1>
                <Segment >





                  {
                    posts.length >= 0
                      ? //in { } is logic
                      posts.map(post =>
                        post.categoryname ?
                          (<div><Input type='text' value={post.categoryname} onChange={this.onTextChange} /> <Input type='text' value={post.value} onChange={this.onTextChange} /> </div>

                          )
                          :
                          null
                      )
                      :
                      null
                  }
                  <form onSubmit={this.onSubmit}>
                    <Input type='text' name='category' value={this.state.category} onChange={this.onTextChange} />
                    <Input type='text' name='value' value={this.state.value} onChange={this.onTextChange} /> <Button type='submit'>Add</Button>
                  </form>
                </Segment>
    </Segment>
              </Grid.Column>

            </Grid.Row>
          </Grid >
        </Grid >

      </div>


    );
  }
}

export default Admin;
