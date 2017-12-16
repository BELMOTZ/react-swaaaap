import React from 'react';
import { Menu } from 'semantic-ui-react';
export default class Header extends React.Component {




  signout = event => {
    localStorage.clear();
    console.log(this.props);
   window.location.reload()
  }

  render() {


    return (
      <Menu inverted color='red'>
          <Menu.Item  href ="/home" name='home'   />
          <Menu.Item name='category' href ="/category"  />

          {!localStorage.getItem('username') ? (<Menu.Menu position='right'>
            <Menu.Item  href='/register' name='sign up'   />
            <Menu.Item  href='/login' name='login'   /></Menu.Menu>
          ):null
          }
          {localStorage.getItem('username') ? (<Menu.Menu position='right'>
            <Menu.Item  href='/profile' name={localStorage.getItem('username')}   />
            {localStorage.getItem('status')=='superadmin' || localStorage.getItem('status')=='admin' ? (
            <Menu.Item href='/admin' name='Management'   />
            ):null}
            <Menu.Item href='/upload' name='upload'  />
            <Menu.Item name='logout'  onClick={this.signout} />
          </Menu.Menu>
        ):null
        }

       </Menu>
    )
  }
}
