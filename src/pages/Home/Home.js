import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import {getAllItem} from '../../api'
import {Segment,Card,Image} from 'semantic-ui-react'
import imgswap from './swap.jpg'

class Home extends React.Component {
  state={
    allPosts: [],    cate: "all"
  }
  getItems = () => {
    getAllItem()
      .then(data => this.setState({ allPosts: data }))
      .catch(err => console.error('Something went wrong.'))
  }
  componentDidMount() { // when render finish call is func
    this.getItems()
  }
  render() {
  const posts = this.state.allPosts
    return (
      <div>
        <Header />
      <Image src={imgswap} width="100%"/>
        <Segment inverted >

<Card.Group  itemsPerRow={4}>
            {
            posts.length >= 0
            ? //in { } is logic
              posts.map(post =>
                post.category==this.state.cate || this.state.cate == "all"
                ?
                (<a href={'item/'+post._id}><Card color='red' image={post.itemimage}/></a>
                )
                :
                null
              )
            :
            null
          }
            </Card.Group></Segment>
        <Footer/>
      </div>


    );
  }
}

export default Home;
