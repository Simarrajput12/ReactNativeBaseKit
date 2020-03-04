import React from 'react';
import {View, StyleSheet,Text} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import configureStore from './config/configure-store';
import Root from './Root';
import Constants from './constants';
import './utilities/string-en';
import {Loader} from './components';
import NetInfo from "@react-native-community/netinfo";
const {store, persistor} = configureStore();

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.Colors.White,
    flex: 1,
  },
});

class src extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connection_Status : ""
    }
  }

  


  componentDidMount() {
 this.checkInternetConnectivity()
  }

  componentDidUpdate(){
    const {connection_Status} =this.state
    if(connection_Status !== "Online"){
      console.log(connection_Status,"connection_Status")
   this.internertCheck =setInterval(() => {
    console.log(connection_Status,"connection_Status1")
        this.checkInternetConnectivity()
      }, 2000,()=>{
        clearInterval(this.internertCheck)
      });
    }
  }
  checkInternetConnectivity(){

    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this._handleConnectivityChange
  );
  NetInfo.isConnected.fetch().done((isConnected) => {

    if(isConnected == true)
    {
      this.setState({connection_Status : "Online"})
    }
    else
    {
      this.setState({connection_Status : "Offline"})
    }

  });
  }
  

  componentWillUnmount() {
 
    NetInfo.isConnected.removeEventListener(
        'connectionChange',
        this._handleConnectivityChange
    );
    clearInterval(this.internertCheck)
 
  }

  // handleNetwork = () => {
  //   function handleFirstConnectivityChange() {
  //     NetInfo.isConnected.removeEventListener(
  //       'connectionChange',
  //       handleFirstConnectivityChange,
  //     );
  //   }
  //   NetInfo.isConnected.addEventListener(
  //     'connectionChange',
  //     handleFirstConnectivityChange,
  //   );
  //   NetInfo.isConnected.fetch().then((isConnected) => {
  //     if (!this.state.isOnceConnected && isConnected) {
  //       this.setState({ isOnceConnected: true });
  //     }
  //   });
  // };

  _handleConnectivityChange = (isConnected) => {
 
    if(isConnected == true)
      {
        this.setState({connection_Status : "Online"})
      }
      else
      {
        this.setState({connection_Status : "Offline"})
      }
  };

  render() {
    const { connection_Status} = this.state;
    
    return (
      <View style={styles.container}>
        
        <Provider store={store}>
          <PersistGate loading={<Loader />} persistor={persistor}>
          {connection_Status == "Online" ?
            <Root />: <Text> No Internet Connection </Text> }
          </PersistGate>
        </Provider> 
      </View>
    );
  }
}

export default src;
