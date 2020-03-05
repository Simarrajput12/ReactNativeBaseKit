import React from 'react';
import {View, StyleSheet,Text,} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import configureStore from './config/configure-store';
import Root from './Root';
import Constants from './constants';
import './utilities/string-en';
import {Loader} from './components';
import NetInfo from "@react-native-community/netinfo";
import NoInternet from '../src/components/common/no-internet'
import { SafeAreaView } from 'react-navigation';
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
      connection_Status : false
    }
  }

  componentDidMount() {
   this.checkInternetConnectivity()
  }

  // componentDidUpdate(){
  //   const {connection_Status} =this.state
  //   if(connection_Status !== true){
  //     console.log(connection_Status,"connection_Status")
  //  this.internertCheck =setInterval(() => {
  //   console.log(connection_Status,"connection_Status1")
  //       this.checkInternetConnectivity()
  //     }, 2000,()=>{
  //       clearInterval(this.internertCheck)
  //     });
  //   }
  // }
  
  checkInternetConnectivity(){
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this._handleConnectivityChange
  );
  NetInfo.isConnected.fetch().done((isConnected) => {

    if(isConnected == true)
    {
      this.setState({connection_Status : true})
      console.log('stats',this.state.connection_Status)
    }
    else
    {
      this.setState({connection_Status : false})
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


  _handleConnectivityChange = (isConnected) => {
 
    if(isConnected == true)
      {
        this.setState({connection_Status : true})
      }
      else
      {
        this.setState({connection_Status : false})
      }
  };

  render() {
    const { connection_Status} = this.state;
    
    return (
      <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        
        <Provider store={store}>
          <PersistGate loading={<Loader />} persistor={persistor}>
          {connection_Status ?
            <Root />: <NoInternet title={'Lost Internet Connection'} message={'Please connect your internet connection'}/> }
          </PersistGate>
        </Provider> 
      </View>
      </SafeAreaView>
    );
  }
}

export default src;
