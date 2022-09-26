// onChangeText={(text) => setValue({ ...value, username: text })}
import React, { Component } from "react";
import { StyleSheet, Text, View,TextInput,Button,Image,Alert,TouchableHighlight,
    StatusBar, SafeAreaView, TouchableOpacity,FlatList,TouchableWithoutFeedback,BackHandler, ScrollView,} from 'react-native';
import { Card, CardItem, Left, Right } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import QuatationViewModel from "../../ViewModels/QuotationViewModel";
import MultiSelect from 'react-native-multiple-select';
import Modal from "react-native-modal";
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';

var selectedQuotations = [];
const data = [{value:'hourly', id: 0},
      {value:'monthly',id: 1},  {value:'quarterly',id: 2},  {value:'yearly',id: 3}, 
       {value:'once as fixed price',id: 4},  {value:'per visit',id: 5}
      ,  {value:'per pc',id: 6},  {value:'per pkt',id: 7}];
const multiply = (num1, num2) => {
    return num1 * num2;
};
export default class BookAppointment extends Component
 {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

    componentDidMount() {
         BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentDidUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }
    onClickGenerateListener(){
      var selected_ids = selectedQuotations.services.map(item => item.service_id).join(', ');
      console.log('selectedIDS Array : ', selected_ids);
             const request_detailx = [];
      for(var i=0;i<selectedQuotations.services.length;i++)
      {
        // 1 unit = ((amount + tax) * hour)
        // 2 units = 2 * ((amount + tax) * hour)
        // Total = Unit * ((amount + tax) * hour)
        var  sum = this.state.amtTextInputs[i] + this.state.taxTextInputs[i]
        var multiple = multiply(sum, this.state.Dropdown[i]) 
        var totalDivide = multiply(sum, this.state.unitTextInputs[i]) 
        var total = totalDivide / 10
       request_detailx.push({ service_id:selectedQuotations.services[i].service_id,
          service_details: selectedQuotations.services[i].service_name,
          service_price: this.state.amtTextInputs[i], amount:  this.state.amtTextInputs[i],
          tax: this.state.taxTextInputs[i],
          qty_unit:  this.state.unitTextInputs[i],qty_unit_name:this.state.Dropdown[i], "total":total
        });
      }
      console.log('Request Array : ', request_detailx);
        QuatationViewModel.onGenerateQuotationAPI(selectedQuotations.client_id, "" ,
         selectedQuotations.vehicle_id, request_detailx,selected_ids).then(
            (response,error) => {
            //get callback here
            console.log('Output',response)
            if (response.RESPONSE_CODE == 200){
              this.props.navigation.navigate('Home')
              this.setState({amtTextInputs : ''});
              this.setState({taxTextInputs : ''});
              this.setState({Dropdown : ''});
              this.setState({unitTextInputs : ''});

            }else{
              alert('Something went wrong, please try again');
            }
         });
    }

    validateMake = (text) =>{
        console.log(text);
        let reg = /^[a-zA-Z ]{2,60}([a-zA-Z ]{2,60})+$/;
        if (reg.test(text) === false) {
          console.log('Vehicle make is not correct');
          this.setState({make: text});
          return false;
        } else {
          this.setState({make: text});
          console.log('Vehicle make is correct');
        }
      };
      validateModel = (text) =>{
        console.log(text);
        let reg = /^[a-zA-Z ]{2,60}([a-zA-Z ]{2,60})+$/;
        if (reg.test(text) === false) {
          console.log('Vehicle model is not correct');
          this.setState({model: text});
          return false;
        } else {
          this.setState({model: text});
          console.log('Vehicle model is correct');
        }
      };
      validateYear = (text) =>{
        console.log(text);
        let reg = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
        if (reg.test(text) === false) {
          console.log('Vehicle year is not correct');
          this.setState({year: text});
          return false;
        } else {
          this.setState({year: text});
          console.log('Vehicle year is correct');
        }
      };
      validateStatus = (text) =>{
        console.log(text);
        let reg = /^[a-zA-Z ]{2,60}([a-zA-Z ]{2,60})+$/;
        if (reg.test(text) === false) {
          console.log('Vehicle status is not correct');
          this.setState({status: text});
          return false;
        } else {
          this.setState({status: text});
          console.log('Vehicle status is correct');
        }
      };
      validateDate = (text) =>{
        console.log(text);
        let reg = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
        if (reg.test(text) === false) {
          console.log('Vehicle date is not correct');
          this.setState({date: text});
          return false;
        } else {
          this.setState({date: text});
          console.log('Vehicle date is correct');
        }
      };

      onClickRadiusListener = (id) => {
        const elementsIndex = data.findIndex(
          (element) => element.value == id,
        );
         const selectedAreaId = data[elementsIndex].value;
         this.setState({radius: selectedAreaId});
        console.log('Radius : ', selectedAreaId);
      };

      validateAmt = (text) =>{
        console.log(text);
        let reg = /^[a-zA-Z ]{2,60}([a-zA-Z ]{2,60})+$/;
        if (reg.test(text) === false) {
          console.log('Service Amount is not correct');
          this.setState({amt: text});
          return false;
        } else {
          this.setState({amt: text});
          console.log('Service Amount is correct');
        }
      };
      validateTax = (text) =>{
        console.log(text);
        let reg = /^[a-zA-Z ]{2,60}([a-zA-Z ]{2,60})+$/;
        if (reg.test(text) === false) {
          console.log('Service tax is not correct');
          this.setState({tax: text});
          return false;
        } else {
          this.setState({tax: text});
          console.log('Service tax is correct');
        }
      };
      validateUnit = (text) =>{
        console.log(text);
        let reg = /^[a-zA-Z ]{2,60}([a-zA-Z ]{2,60})+$/;
        if (reg.test(text) === false) {
          console.log('Service unit is not correct');
          this.setState({unit: text});
          return false;
        } else {
          this.setState({unit: text});
          console.log('Service unit is correct');
        }
      };
      

    state = {
      request_detailx:[],
     quotationDetails:[],
     make:'',
     model:'',
     year:'',
     date:'',
     status:'',
     requestList:[],
     amt:'',
     tax:'',
     unit:'',
     radius:'',
     amtTextInputs: [],
     taxTextInputs: [],
     radiusTextInputs: [],
     unitTextInputs: [],
     Dropdown:[],
    }

    render() {  
        const { navigate } = this.props.navigation;
        const { selectedItems } = this.state;
        const {passDetails} = this.props.route.params;
        selectedQuotations = passDetails
        

        console.log('Selected quotations : ', selectedQuotations);
        return (
          <>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView>
              <ScrollView>
          <TouchableOpacity style={styles.navBarBackButton} onPress={() => this.handleBackButtonClick()}>
            <Icon name="chevron-left" color='gray' size={30}/>
          </TouchableOpacity>
          <View style={styles.container}>
          <Text style={styles.titleText}>Generate Quotations</Text>
          <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
                  placeholderTextColor = '#A9A9A9'
                  keyboardType="default"
                  underlineColorAndroid='transparent'
                  placeholder='Vehicle Make'
                  value = {selectedQuotations.vehicle_make}
          />
          </View>
          <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
                placeholderTextColor = '#A9A9A9'
                keyboardType="default"
                underlineColorAndroid='transparent'
                placeholder='Vehicle Model'
                value = {selectedQuotations.vehicle_model}
          />
          </View>
          <View style={styles.inputContainer}>
             <TextInput style={styles.inputs}
                placeholder='Vehicle Year'
                placeholderTextColor = '#A9A9A9'
                keyboardType="default"
                underlineColorAndroid='transparent'
                value = {selectedQuotations.vehicle_year}
           />
           </View>
           <View style={styles.inputContainer}>
             <TextInput style={styles.inputs}
                placeholder='Vehicle Status'
                placeholderTextColor = '#A9A9A9'
                keyboardType="default"
                underlineColorAndroid='transparent'
                value = {selectedQuotations.vehicle_status}
           />
           </View>
           <View style={styles.inputContainer}>
             <TextInput style={styles.inputs}
                placeholder='Quotation Date'
                placeholderTextColor = '#A9A9A9'
                keyboardType="default"
                underlineColorAndroid='transparent'
                value = {selectedQuotations.created_on}
           />
           </View>
           <Text style={styles.titleText2}>File quotation for services</Text>
           <FlatList
              data={selectedQuotations.services}
              renderItem={({ item, index}) => 
                  {return(
                    // <TouchableWithoutFeedback onPress={ () => this.actionOnRow(item)}>
                    <SafeAreaView style={styles.listContainer}>
                    <View style={styles.listContainer}>
                    <Card style={{flex: 1, width: '100%'}}>
                    <View style={{flexDirection: 'column',marginBottom:10, marginTop:5,borderRadius:10,backgroundColor:'#D3D3D3'}}>
                        <View style={styles.textView}>
                        <Text style={styles.textContainer}> Service Name   :  </Text>
                        <Text style={styles.textContainer}> {item.service_name} </Text>
                       </View>
                       <View style={styles.inputContainer1}>
                        <TextInput style={styles.inputs}
                            placeholder='Service Amount'
                            placeholderTextColor = '#A9A9A9'
                            keyboardType="numbers-and-punctuation"
                            underlineColorAndroid='transparent'
                            onChangeText={text => {
                              let { amtTextInputs } = this.state;
                              amtTextInputs[index] = text;
                              this.setState({
                                amtTextInputs,
                              });
                              console.log('Amt value : ', this.state.amtTextInputs)
                              // this.setState(prevState => ({
                              //   requestList: [...prevState.requestList, {"Amount":this.state.amtTextInputs,"Tax": this.state.taxTextInputs,"Radius":this.state.Dropdown,"Unit":this.state.unitTextInputs}]
                              // }))
                            }}
                            value={this.state.amtTextInputs[index]}
                        />
                      </View>
                      <View style={styles.inputContainer1}>
                        <TextInput style={styles.inputs}
                            placeholder='Service Tax'
                            placeholderTextColor = '#A9A9A9'
                            keyboardType="numbers-and-punctuation"
                            underlineColorAndroid='transparent'
                            onChangeText={text => {
                              let { taxTextInputs } = this.state;
                              taxTextInputs[index] = text;
                              this.setState({
                                taxTextInputs,
                              });
                              console.log('Tax value : ', this.state.taxTextInputs)
                              // this.setState(prevState => ({
                              //   requestList: [...prevState.requestList, {"Amount":this.state.amtTextInputs,"Tax": this.state.taxTextInputs,"Radius":this.state.Dropdown,"Unit":this.state.unitTextInputs}]
                              // }))
                            }}
                            value={this.state.taxTextInputs[index]}
                        />
                      </View>
                      <Dropdown
                            style={styles.dropDownContainer}
                            placeholder='Select Hours'
                            underlineColor='transparent'
                            iconColor='#E1E1E1'
                            useNativeDriver={false}
                            animationDuration={0}
                            data={data}
                            // onChangeText={(id) => this.onClickRadiusListener(id)}
                            // value={this.state.radius}
                            onChangeText={(id) => {
                              let { Dropdown } = this.state;
                              Dropdown[index] = id;
                              this.setState({
                                Dropdown,
                              });
                              console.log('Radius value : ', this.state.Dropdown)
                              // this.setState(prevState => ({
                              //   requestList: [...prevState.requestList, {"Amount":this.state.amtTextInputs,"Tax": this.state.taxTextInputs,"Radius":this.state.Dropdown,"Unit":this.state.unitTextInputs}]
                              // }))
                            }}
                            value={this.state.Dropdown[index]}
                      /> 
                      <View style={styles.inputContainer1}>
                        <TextInput style={styles.inputs}
                            placeholder='Service Unit'
                            placeholderTextColor = '#A9A9A9'
                            keyboardType="numbers-and-punctuation"
                            underlineColorAndroid='transparent'
                            onChangeText={text => {
                              let { unitTextInputs } = this.state;
                              unitTextInputs[index] = text;
                              this.setState({
                                unitTextInputs,
                              });
                              console.log('Unit value : ', this.state.unitTextInputs)
                              // this.setState(prevState => ({
                              //   requestList: [...prevState.requestList, {"Amount":this.state.amtTextInputs,"Tax": this.state.taxTextInputs,"Radius":this.state.Dropdown,"Unit":this.state.unitTextInputs}]
                              // }))
                            }}
                            value={this.state.unitTextInputs[index]}
                        />
                        </View>

                       </View>
                    </Card>
                    </View>
                  </SafeAreaView>
                  // </TouchableWithoutFeedback>
                  )
                }}
                />
           </View>
           <TouchableOpacity style={[styles.buttonContainer, styles.connectButton]} 
                onPress={() => this.onClickGenerateListener()} >
            <Text style={styles.connectText}>Generate</Text>
            </TouchableOpacity> 
            </ScrollView>
           </SafeAreaView>
           </>
          );
        }
      }
 const styles = StyleSheet.create({
    container: {
      flexDirection:'column',
      alignItems: 'center',
      marginBottom:0,
      marginTop:0
    },
    titleText: {
        alignItems: 'center',
        alignSelf:'center',
        color: 'black',
        fontWeight:'bold',
        fontSize:25,
        marginBottom:20,
       },
       inputContainer: {
        borderColor:'#A9A9A9',
        borderWidth:1,
        backgroundColor: '#FFFFFF',
        borderRadius:8,
        marginLeft:25,
        marginRight:25,
        height:45,
        paddingLeft:10,
        marginTop:10,
        marginBottom:10,
        justifyContent:'flex-start',
        flexDirection: 'row',
        alignItems:'center'
      },
      buttonContainer: {
        height:60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'center',
        marginTop:15,
        marginBottom:20,
        width:250,
        borderRadius:8,
      },
      inputs:{
        height:45,
        marginLeft:12,
        fontSize:20,
        borderBottomColor: '#FFFFFF',
        flex:1,
      },
      connectButton: {
        backgroundColor:'#03254c',
      },
      connectText: {
        color: 'white',
        fontWeight:'bold',
        fontSize:25,
      },
     titleText2: {
        color: 'black',
        fontWeight:'400',
        fontSize:25,
        marginTop:15,
        marginBottom:10,
       },
       listContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        padding: 10,
        backgroundColor: '#ecf0f1',
      },
      textView:{
        flex:1,
        flexDirection:'row', 
        marginTop:10,
        marginBottom:10,
      },
      textContainer:{
        fontWeight:'500',
        fontSize:24,
        color:'black',
      },
      inputContainer1: {
        borderColor:'#A9A9A9',
        borderWidth:1,
        backgroundColor: '#FFFFFF',
        borderRadius:8,
        marginLeft:10,
        marginRight:10,
        height:45,
        paddingLeft:10,
        marginTop:10,
        marginBottom:10,
        justifyContent:'flex-start',
        flexDirection: 'row',
        alignItems:'center'
      },
      dropDownContainer:{
        borderColor:'#A9A9A9',
        borderWidth:1,
        backgroundColor : 'white',
        borderRadius:8,
        borderTopEndRadius:8,
        borderTopRightRadius:8,
        borderTopLeftRadius:8,
        marginLeft:10,
        marginRight:10,
        height:45,
        flexDirection: 'row',
        alignItems:'center'
      },
  });