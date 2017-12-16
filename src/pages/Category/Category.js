import React from 'react';
import Header from '../Header/Header';
import {getAllItem,getCategory} from '../../api'
import { Grid,Menu,Segment,Image } from 'semantic-ui-react'

class Category extends React.Component {
  state = {
    activeItem: 'all',
    allCategory: [],
    allPosts: [],
    cate: "all"
   }


handleItemClick = (e, { value }) => this.setState({ activeItem: value ,cate : value })
    handleChange = (value) => {
      this.setState({ activeItem: value})
    }


    getItems = () => {
      getAllItem()
        .then(data => this.setState({ allPosts: data }))
        .catch(err => console.error('Something went wrong.'))
    }
    getCategories = () => {
      getCategory()
        .then(data => this.setState({ allCategory: data }))
        .catch(err => console.error('Something went wrong.'))
    }

    componentDidMount() { // when render finish call is func
      this.getItems()
      this.getCategories()
    }

  render() {
    const { activeItem } = this.state
    const posts = this.state.allPosts
    const cates = this.state.allCategory
    return (
      <div>
        < Header />
        <Grid inverted color='red'>
        <Grid.Column width={2}>
          <Menu fluid vertical tabular color='red' inverted >
          {
            cates.length >= 0
            ? //in { } is logic
              cates.map(cate =>
                cate.categoryname ?
                (
          <Menu.Item active={activeItem === cate.value} name={cate.categoryname} class="cate" value={cate.value} onClick={this.handleItemClick} />
               )
                :
                null
              )
            :
            null
          }

          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Segment color='black' inverted>
      <Grid>
          {
          posts.length >= 0
          ? //in { } is logic
            posts.map(post =>
              post.category==this.state.cate || this.state.cate == "all"
              ?
              (<Grid.Column color='black' width={4}><a href={'item/'+post._id}><Image
                      fluid
                      label={{ as: 'a', color: 'red', content: post.itemname, icon: 'globe', ribbon: true }}
                      src={post.itemimage} size='medium'
                    /></a></Grid.Column>
              )
              :
              null
            )
          :
          null
        }
          </Grid></Segment>
        </Grid.Column>
      </Grid>


      </div>


    );
  }
}

export default Category;
