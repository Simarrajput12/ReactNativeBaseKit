import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { string } from 'prop-types';
import Constants from '../../constants';
import Button from '../common/Button';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Constants.Colors.WHITE,
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: Constants.BaseStyle.MARGIN,
  },
  image: {
    height: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 60,
    width: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 60,
  },
  messageStyle: {
    ...Constants.Fonts.large,
    color: Constants.Colors.BLACK,
    marginTop: Constants.BaseStyle.MARGIN / 2,
  },
  titleStyle: {
    ...Constants.Fonts.headerBold,
    color: Constants.Colors.PRIMARY_COLOR,
    marginTop: Constants.BaseStyle.MARGIN / 2,
  },
  buttonStyle: {
    width:'50%',
    marginTop: Constants.BaseStyle.MARGIN / 4,
  }
});

const { network } = Constants.i18n;

const NoInternet = ({
  title, message,onPress,
}) => (
  <View style={styles.container}>
    <Image resizeMode="contain" style={styles.image} source={Constants.Images.internet} />
    <Text style={styles.titleStyle}>{title}</Text>
    <Text style={styles.messageStyle}>{message}</Text>
  </View>
);

NoInternet.defaultProps = {
  message: "No Internet",
  title: "Connect Inernet Connection",
};

NoInternet.propTypes = {
  message: string,
  title: string,
};

export default NoInternet;
