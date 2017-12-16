import React from 'react';
import { Icon,Grid } from 'semantic-ui-react'


export default class Footer extends React.Component {

  render() {
    return (

          <Grid padded>
      <Grid.Row color='black' >
            </Grid.Row>
            <Grid.Row color='black'  >
              <Grid.Column textAlign='center'><h3>copyright<Icon inverted color='olive' name='copyright' />2017 - SWAAAP</h3></Grid.Column>
            </Grid.Row>
            <Grid.Row color='black' >
            </Grid.Row>
        </Grid>
    )
  }
}

