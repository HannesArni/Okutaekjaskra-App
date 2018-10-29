import React from 'react';
import { FlatList, ActivityIndicator, Text, Image, View, TextInput, Button, Alert } from 'react-native';


export default class FetchExample extends React.Component {
  constructor(props){
    super(props);
    this.state ={ isLoading: true, text: 'kf502'}
    this.fetcher = this.fetcher.bind(this);
  }

  componentDidMount(){
      return fetch(`http://apis.is/car?number=${this.state.text}`)
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.results,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  fetcher(){
      return fetch(`http://apis.is/car?number=${this.state.text}`)
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,

          dataSource: responseJson.results,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }



  render(){
    return(
      <View style={{flex: 1, paddingTop:0}}>
        <View style={{backgroundColor: "#004000", width: "100%", height: 80}}>
          <Text style={{marginTop: 40, marginHorizontal: 15, color: "white", fontSize: 18, fontWeight:"bold"}}>Ökutækjaskrá</Text>
        </View>
        <TextInput
          style={{height: 50, marginVertical: 5, marginTop: 5, marginHorizontal: 10, fontSize: 20}}
          placeholder="Sláðu inn númer"
          onChangeText={(text) => this.setState({text})}
          onSubmitEditing={this.fetcher}
        />
        <View style={{width: 150, alignSelf: "center"}}>
          <Button
              onPress={this.fetcher}
              title="Leita"
              buttonStyle={{ height: 50, width: 230}}
              style={{width: 10}}
              color="green"
              accessibilityLabel="Tap to Decrypt Data"
          />
        </View>

        if(this.state.isLoading){
            <View style={{flex: 1, padding: 20}}>
              <Text>{global.link}</Text>
              <ActivityIndicator/>
            </View>
        }
        {/*
        <Image
          style = {{    width: '100%',
          height: '18%',
          resizeMode: Image.resizeMode.contain, marginTop: 50}}
          source={{uri: 'https://www.vindecoderz.com/media/models/dodge/CHARGER.jpg'}}
        /> 
        */}
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text selectable={true} style={{marginTop:20, fontSize:18, textAlign: 'center'}}>
            Tegund:  {item.type}{'\n'}
            Skráningarnúmer:  {item.registryNumber}{'\n'}
            Fastanúmer:  {item.number} {'\n'}
            Verksmiðjunr:  {item.factoryNumber}{'\n'}
            Litur:  {item.color}{'\n'}
            Fyrst skráð:  {item.registeredAt}{'\n'}
            CO2 losun:  {item.pollution}{'\n'}
            Eiginþyngd:  {item.weight}{'\n'}
            Staða:  {item.status}{'\n'}
            Næsta skoðun:  {item.nextCheck}{'\n'}
          </Text>}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}