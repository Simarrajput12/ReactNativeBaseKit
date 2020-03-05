import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Constants from '../../constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.Colors.DASHBOARD_BG_COLOR,
    flex: 1,
  },
  itemContainer: {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  textStyle: {
    ...Constants.Fonts.extraLargeBold,
    color: Constants.Colors.BLACK,
    marginTop: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 2,
  }
});

const Profile = () => 
<View style={styles.container}>
<View style={styles.itemContainer}>
<Text style={styles.textStyle}> Profile Screen </Text>
</View>
</View>;

export default Profile;
