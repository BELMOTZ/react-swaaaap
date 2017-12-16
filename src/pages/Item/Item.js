import React from 'react';
import './Item.css';
import { getAllItem, reply ,edititemstatus} from '../../api'
import Header from '../Header/Header';
import { Button, Image, Grid, Segment, Form, Label,  Comment,Rail } from 'semantic-ui-react'



class Item extends React.Component {
  state = {
    item: [],
    id: this.props.match.params.id,
    itemname: '',
    description: '',
    img: '',
    reply: localStorage.getItem('username')

  }
  getItem = () => {
    getAllItem()
      .then(data => this.setState({ item: data }))
      .catch(err => console.error('Something went wrong.'))
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
    reply(this.state.id, this.state.reply, this.state.img, this.state.itemname, this.state.description)
      .then(data => {
        if (data.status === 200) {
          window.location.reload();
        } else {
          console.log('fail')
        }
      })
  }

  handleChange = (id,username,itemname) => {
    edititemstatus(id,username,itemname)
      .then(data => {
        if (data.status === 200) {
          window.location.reload();
        } else {
          console.log('fail')
        }
      })
  }


  componentDidMount() { // when render finish call is func
    this.getItem()
  }
  render() {
    const item = this.state.item
    const i = 0
    return (
      <div>
        < Header />
        {
          item.length >= 0
            ? //in { } is logic
            item.map(posted =>
              posted._id == this.state.id  ?
                (
                  <Grid>
                    <Grid.Row columns={2}>
                      <Grid.Column>
                        <Segment inverted>
                          <Image size='large' centered src={posted.itemimage} /><br />
                          <Label as='a' color='red' tag size='huge'>{posted.owner}</Label>
                          <Segment color='red'>Name : {posted.itemname}</Segment>
                          <Segment color='red'>Description : {posted.description}</Segment>
                          <Segment color='red'>Look For : {posted.lookfor} </Segment>
                          <Segment color='red'>Trans : {posted.transfer}</Segment>

                          <Button class="ui red button" tabindex="0"><i aria-hidden="true" class="heart icon"></i> Like</Button>
                          <Button class="ui blue basic button " tabindex="0" ><i aria-hidden="true" class="unhide icon"></i>View</Button>

                        </Segment>
                      </Grid.Column>
                      <Grid.Column>
                        <Segment inverted>
                          <Form inverted onSubmit={this.onSubmit}>

                            {posted.status=='wait' ?
                            (<div><h1 align='center'> COMMENT </h1>
                            <Form.Group widths='equal'>
                              <Form.Input label='Attach your photo' type="text" name="img" placeholder="img" value={this.state.img} onChange={this.onTextChange} />
                            </Form.Group>
                            <Form.Group widths='equal'>
                              <Form.Input label='Item name' type="text" name="itemname" placeholder="name" value={this.state.itemname} onChange={this.onTextChange} />
                            </Form.Group>
                            <Form.TextArea label='Description' type="text" name="description" placeholder="description" value={this.state.description} onChange={this.onTextChange} />
                            <Button inverted color='red' type='submit'>SUBMIT</Button>
                            </div>):(<div><Segment textAlign='center'>
    <Rail internal position='right'>
      <Segment  size='massive' inverted color='red'>SWAPPED</Segment>
    </Rail>
  </Segment></div>)}

                          </Form>

                        </Segment>
                        <Segment>

                          <Grid>
                            <Grid.Row columns={1}>

                              <Grid.Column>
                                <Comment.Group size='large'>
                                  <h3 >Comments</h3>
                                 {
// console.log(posted.offer)
                posted.offer.length >= 0 ?
                      posted.offer.map(comment =>
                        <Segment>
                          <Image src={comment.offerimg} size='tiny' />
                            <Segment>Offer by : {comment.offerusername}  </Segment>
                          <Segment>Description : {comment.offerdescription}  </Segment>
              {posted.owner==localStorage.getItem('username') && posted.status=='wait' ?
              (<Button onClick={(e) => this.handleChange(posted._id,comment.offerusername,comment.offeritemname)}>
                      check
                    </Button>
                    ) :null}

                                      </Segment>


              )
: null
          }
  </Comment.Group>
                </Grid.Column>

                </Grid.Row>
              </Grid>

            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>

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

export default Item;
