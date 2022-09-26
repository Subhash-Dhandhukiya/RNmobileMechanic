import React from 'react';
import { StyleSheet, View, Modal, ActivityIndicator, Alert} from 'react-native';
  
const Loader = props => {
  const {
    loading,
    ...attributes
  } = props;

  componentDidMount = () => this.closeActivityIndicator()

  closeActivityIndicator = () => setTimeout(() => this.setState({
    loading: false }), 50000)
 

  return (
    <Modal
      transparent={true}
      animationType={'fade'}
      visible={loading}
      onRequestClose={() => { console.log('close modal') }}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            animating={loading} size="large" color="#2F4F4F" />
        </View>
      </View>
    </Modal>
  )
}
// #00ff00
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
    // backgroundColor:'transparent'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});

export default Loader;
