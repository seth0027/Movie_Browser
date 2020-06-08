import React from 'react'
import {View,TextInput,StyleSheet,ScrollView,Text,FlatList,TouchableOpacity,ActivityIndicator,Image} from 'react-native'

export default class Movie extends React.Component{


state={
  id : this.props.route.params.imdbID,
  loading : true,
  info : null,
}

componentDidMount(){

 this.loadInfo()
}  

loadInfo=async()=>{
  try{let result= await fetch("http://www.omdbapi.com/?apikey=3057be71&i="+this.state.id)
  let response= await result.json()

if(response.Response){

  this.setState({info: response,loading:false})


}


}catch(err){
  alert("something went wrong")
  this.props.navigation.goBack()
}

}


  render(){

    if(this.state.loading){

  return(
    <ActivityIndicator size="large"/>
    )
}
else{

return( 
  <View>
  <ScrollView>
   <View style={{marginVertical:2,marginHorizontal: 2,}}>

<Image style={{width:380, height:300,alignContent: "center",}} source={{uri: this.state.info.Poster}}/>
  <Text style={{paddingTop: 3,fontWeight: "bold",fontSize: 17}}>{this.state.info.Title} <Text style={{paddingTop: 3,fontWeight: "normal",fontSize: 15}}> ({this.state.info.Year})   Release Date: {this.state.info.Released}</Text></Text>
  <Text style={{paddingTop: 6,}}>{this.state.info.Runtime},{this.state.info.Rated} ({this.state.info.Type})</Text>
   <Text style={{paddingTop: 6,}}>{this.state.info.Plot}</Text>
   <Text>
   Actors: {this.state.info.Actors} Director: {this.state.info.Director} Writer: {this.state.info.Writer} Genre: {this.state.info.Genre}
   </Text>
   <Text>Language: {this.state.info.Language}, Country: {this.state.info.Country}</Text>
   <View>
   <Text style={{fontWeight: "bold",paddingTop: 10}}>Awards</Text><Text>
   {this.state.info.Awards}
   </Text></View>
   <View>
   <Text style={{fontWeight: "bold",paddingTop: 10}}>Ratings</Text>
   {this.state.info.Ratings.map((rating)=>(<Text style={{fontSize: 15,marginVertical:2}}>{rating.Source} {rating.Value}</Text>))}
  

   </View>
    </View>  
    </ScrollView>
    </View>
    )

}
  }
  
}