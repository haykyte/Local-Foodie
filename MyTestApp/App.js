import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import axios from 'axios';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Geolocation from '@react-native-community/geolocation';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      localBusiness: ['Hayden', 'Wyatt'],
    };
  }

  onFetch = () => {
    /* The location of the iPhone simulator can be set in XCode. You must include permissions as well. */
    Geolocation.getCurrentPosition(info => {
      let long = info.coords.latitude;
      let lat = info.coords.longitude;
      let sortMetric = 'distance';
      let businessSearch = 'delis';

      axios
        .get(
          'https://api.yelp.com/v3/businesses/search?term=' +
            businessSearch +
            '&latitude=' +
            long +
            '&longitude=' +
            lat +
            '&sort_by=' +
            sortMetric,
          {
            headers: {
              Authorization:
                'Bearer ' +
                'boNq8NhXzbH6G8mWrp8rcwtphWBqGb3E-WmH5mb34MeNF6eFv3N_gIUKZRGF4laGjRNRIBlmce5iiQ0qbvd6YYUlQuuIWd14KKx-zre6WV_iA2mnHl14qMDx5DrDXnYx',
            },
          },
        )
        .then(res => {
          this.setState({localBusiness: [res.data.businesses]});
          console.log(this.state.localBusiness);
        });
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this.onFetch}>
          <Text>Click me!</Text>
        </TouchableOpacity>
        <Text> {this.state.localBusiness}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10,
  },
});

export default App;
