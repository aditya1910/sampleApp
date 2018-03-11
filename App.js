import React from 'react';
import { Button, View, Text ,TextInput,Alert} from 'react-native';
import { StackNavigator } from 'react-navigation'; // Version can be specified in package.json
import DatePicker from 'react-native-datepicker';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import CheckBox from 'react-native-checkbox';
var request = new XMLHttpRequest();

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { firstName:'First name',
                   lastName :'Last name',
                   gender:'',
                   heightFt:'',
                   heightIn:'',
                   weight:''
                 };
  }

  render() {
    var radio_props = [
                        {label: 'male', value: 'M'},
                        {label: 'female', value: 'F' }
                      ];
    return (
      <View style={{ flex: 1}}>
        <Text style={{flex: 1 , textAlign:'center'}}>Home Screen</Text>
        <TextInput
          style={{flex: 1}}
          onChangeText={(firstName) => this.setState({firstName})}
          value={this.state.firstName}
        />
        <TextInput
        style={{flex: 1}}
        onChangeText={(lastName) => this.setState({lastName})}
        value={this.state.lastName}
        />
        <View style={{ flex: 1 ,flexDirection :'row',justifyContent: 'space-between'}}>
          <Text>Date Of Berth</Text>
          <DatePicker
          style={{borderColor: 'gray'}}
          date={this.state.date}
          mode="date"
          placeholder="select date"
          format="DD-MM-YYYY"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          onDateChange={(date) => {this.setState({date: date})}}
          />
        </View>
        <RadioForm
          radio_props={radio_props}
          initial={0}
          style={{flex: 1}}
          formHorizontal={true}
          onPress={(gender) => {this.setState({gender})}}
        />
        <View style={{ flex: 1 ,flexDirection :'row'}}>
         <Text style={{ flex: 1}}>Height in feet</Text>
         <TextInput
          style={{ flex: 5,borderColor: 'gray'}}
          onChangeText={(heightFt) => this.setState({heightFt})}
          value={this.state.heightFt}
          />
        </View>
        <View style={{ flex: 1 ,flexDirection :'row'}}>
         <Text style={{ flex: 1}}>Height in inch</Text>
          <TextInput
          style={{flex: 5}}
          onChangeText={(heightIn) => this.setState({heightIn})}
          value={this.state.heightIn}
          />
        </View>
        <View style={{ flex: 1 ,flexDirection :'row'}}>
         <Text style={{ flex: 1}}>Weight in kg</Text>
          <TextInput
          style={{flex: 5}}
          onChangeText={(weight) => this.setState({weight})}
          value={this.state.weight}
          />
        </View>

        <Button
          title="Education"
          style={{flex: 3}}
          onPress={() => {
            this.props.navigation.navigate('Education', {
              personalData: {...this.state},
            });
          }}
        />
      </View>
    );
  }
}

class Education extends React.Component {
  constructor(props){
    super(props);
    this.state={schoolName:'school Name',
                schoolGrade:'school Grade',
                collegeName:'college Name',
                collegeGrad:'college Grade'
                }
  }
  render() {
    const { params } = this.props.navigation.state;
    const itemId = params ? params.personalData.lastName : null;

    return (
      <View style={{ flex: 1}}>
        <Text style={{flex: 1 , textAlign:'center'}}>Education details</Text>
        <TextInput
        style={{flex: 1}}
        onChangeText={(schoolName) => this.setState({schoolName})}
        value={this.state.schoolName}
        />
        <TextInput
        style={{flex: 1}}
        onChangeText={(schoolGrade) => this.setState({schoolGrade})}
        value={this.state.schoolGrade}
        />
        <TextInput
        style={{flex: 1}}
        onChangeText={(collegeName) => this.setState({collegeName})}
        value={this.state.collegeName}
        />
        <TextInput
        style={{flex: 1}}
        onChangeText={(collegeGrad) => this.setState({collegeGrad})}
        value={this.state.collegeGrad}
        />
        <Button
          title="Work experience"
          onPress={() => {this.props.navigation.navigate('WorkExperience',
          {personalData:params.personalData,
          educationData:{...this.state}
          })
          }}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

class WorkExperience extends React.Component {
  constructor(props){
    super(props);
    this.state={companyName:'',
                designation:'',
                startMonth:'',
                startYear:'',
                endMonth:'',
                endYear:'',
                workDescription:'',
                isCurrentlyWorking:false
                }
  }
  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={{ flex: 1}}>
        <Text style={{flex: 1 , textAlign:'center'}}>Work experience</Text>
        <View style={{ flex: 1}}>
          <Text style={{flex: 1 }}>Company name</Text>
          <TextInput
          style={{flex: 1}}
          onChangeText={(companyName) => this.setState({companyName})}
          value={this.state.companyName}
          />
        </View>
        <View style={{ flex: 1}}>
          <Text style={{flex: 1 }}>Designation</Text>  
          <TextInput
          style={{flex: 1}}
          onChangeText={(designation) => this.setState({designation})}
          value={this.state.designation}
          />
        </View>
        <View style={{ flex: 1}}>
          <Text style={{flex: 1 }}>Start month</Text>
          <TextInput
          style={{flex: 1}}
          onChangeText={(startMonth) => this.setState({startMonth})}
          value={this.state.startMonth}
          />
        </View>
        <View style={{ flex: 1}}>
          <Text style={{flex: 1 }}>Start year</Text>  
          <TextInput
          style={{flex: 1}}
          onChangeText={(startYear) => this.setState({startYear})}
          value={this.state.startYear}
          />
        </View>  
        <CheckBox
          label='Currently Working'
          checked={this.state.isCurrentlyWorking}
          onChange={(isCurrentlyWorking) => this.setState({isCurrentlyWorking:(!isCurrentlyWorking)})}
        />
        {!this.state.isCurrentlyWorking &&
          <View style={{ flex: 1}}>
            <Text style={{flex: 1 }}>End month</Text>
            <TextInput
            style={{flex: 1}}
            onChangeText={(endMonth) => this.setState({endMonth})}
            value={this.state.endMonth}
            />
          </View>  
        }
        {!this.state.isCurrentlyWorking &&
          <View style={{ flex: 1}}>
            <Text style={{flex: 1 }}>End year</Text>
            <TextInput
            style={{flex: 1}}
            onChangeText={(endYear) => this.setState({endYear})}
            value={this.state.endYear}
            />
          </View>  
        }
        <Button
          title="Social info"
          onPress={() => {this.props.navigation.navigate('SocialInfo',{
            workData:{...this.state},
            personalData:params.personalData,
            educationData:params.educationData
          })}}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

class SocialInfo extends React.Component {
  constructor(props){
    super(props);
    this.state={faceBookLink:'',
                twitterLink:'',
                linkedinLink:'',
                }
  }

  _submitData() {
    
    let data={}
    let {params} = this.props.navigation.state;
    data.personalData = params.personalData;
    data.workData     = params.workData;
    data.educationData= params.educationData;
    data.socialData   = {...this.state};
    console.log(data);

    fetch('http://192.168.1.6:3000/userProfile', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({data:data}),
      }).then((response)=>{
        Alert.alert('Your data is saved successfully');
        this.props.navigation.navigate('Home')
      }).catch((error)=>{
        console.log("some error occured",error);
      });
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={{ flex: 1}}>
        <Text style={{flex: 1 , textAlign:'center'}}>Social info</Text>
        <View style={{ flex: 1}}>
          <Text style={{flex: 1 }}>faceBook link</Text>
          <TextInput
          style={{flex: 1}}
          onChangeText={(faceBookLink) => this.setState({faceBookLink})}
          value={this.state.faceBookLink}
          />
        </View>
        <View style={{ flex: 1}}>
          <Text style={{flex: 1 }}>Twitter link</Text>
          <TextInput
          style={{flex: 1}}
          onChangeText={(twitterLink) => this.setState({twitterLink})}
          value={this.state.twitterLink}
          />
        </View>
        <View style={{ flex: 1}}>
          <Text style={{flex: 1 }}>Linkedin link</Text>  
          <TextInput
          style={{flex: 1}}
          onChangeText={(linkedinLink) => this.setState({linkedinLink})}
          value={this.state.linkedinLink}
          />
        </View>  
        <Button
          title="Submit"
          onPress={() => this._submitData()}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}


const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Education: {
      screen: Education,
    },
    WorkExperience: {
      screen: WorkExperience,
    },
    SocialInfo: {
      screen: SocialInfo,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
