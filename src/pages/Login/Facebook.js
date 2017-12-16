import React, { Component } from 'react';
import { register} from '../../api'
import FacebookLogin from 'react-facebook-login';
import { log } from 'util';


class Facebook extends Component {

    responseFacebook(response) {
        //const data = response
        console.log(response);
        console.log(response.name);
        console.log(response.email);
        register(response.name,response.email).then(data => {
            console.log(data);
            if (data.status === 200) {

                    window.location.assign('/profile')

            } else {
                window.location.assign('/home')
            }
        })

    }

  render() {
    return (

      <div className="Facebook">
        <FacebookLogin
                            appId="378030279305267"
                            autoLoad={true}
                            fields="name,email,picture"
                            scope="public_profile,user_friends,user_actions.books"
                            //onClick={this.componentClicked}
                            callback={this.responseFacebook}
                            />
      </div>
    );
  }
}

export default Facebook;
