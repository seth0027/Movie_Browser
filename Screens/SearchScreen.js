import React from 'react'
import {View,TextInput,StyleSheet,ScrollView,Text,FlatList,TouchableOpacity,ActivityIndicator,Image} from 'react-native'

const styles=StyleSheet.create({
input :{
  borderColor: 'black',
  borderWidth: 1,
  padding: 5,
  
  },
 
  container: {
   
    flex: 1,
    
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  list:{
    paddingVertical: 4,
    margin: 5,
    backgroundColor: "#fff"
   }




})

const isCloseToBottom=({layoutMeasurement, contentOffset, contentSize})=>{
   return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
}
export default class Search extends React.Component{

  state={
    results:0,
    search : '',
    loading: false,
    dataSource: [],
    page: 1,
    
  }

  handleSearch=(string)=>{

    this.setState({search : string })

  }
  componentDidUpdate(prevProps,prevState){
    if(prevState.search!==this.state.search){

      this.getResults()
    }
  }

  loadNext=()=>{
    this.setState(prevState=>({page: prevState.page+1,}),()=>{

this.loadNext2()

    })
  }

    loadNext2=async()=>{
      if(this.state.page<=3)
try{
  
  
let result= await fetch('http://omdbapi.com/?apikey=3057be71&s='+this.state.search+"&page="+this.state.page)
let response= await result.json()
if(response.Response){

  
this.setState(prevState=>({dataSource : [...prevState.dataSource,...response.Search],}),()=>{
 
})

}
  }
  catch(err){
    alert("Some error occured! Try again")
    
  }  

  }

  getResults=async()=>{

    this.setState({loading : true})
try{
let result= await fetch('http://omdbapi.com/?apikey=3057be71&s='+this.state.search)
let response= await result.json()
if(response.Response){

  
this.setState({dataSource: response.Search,loading: false,results: response.totalResults,page: 1})

}
  }
  catch(err){
    alert("Some error occured! Try again")
  }  
  }

  FlatListItemSeparator = () => {
return (
  <View style={{
     height: .5,
     width:"100%",
     backgroundColor:"rgba(0,0,0,0.5)",
}}
/>
);
}



renderItem=(data)=>
<TouchableOpacity style={styles.list} onPress={()=>{
  let id=data.item.imdbID.toString()
   let title=data.item.Title

  this.props.navigation.navigate("Movie",{imdbID: id, title: title})
 
}}>
<Text style={{fontWeight: "bold"}} >{data.item.Title}</Text>
<Text >{data.item.Year}</Text>
<Text >{data.item.Type}</Text>
 <Image   source={{uri : data.item.Poster}} PlaceholderContent={<ActivityIndicator />}

 style={{width: 100,
 height: 100,}}

      /></TouchableOpacity>






render(){

if(this.state.loading){

  return(<View style={styles.container}>
    <TextInput style={styles.input} placeholder={'Search...'} value={this.state.search} onChangeText={this.handleSearch}/>
    <ActivityIndicator size="large"/></View>
    )
}
else{

  return(
    <View style={styles.container}>
    <TextInput style={styles.input} placeholder={'Search...'} value={this.state.search} onChangeText={this.handleSearch}/>

    <FlatList onScroll={({nativeEvent})=>{

if(isCloseToBottom(nativeEvent)){
   this.loadNext()
}
}}
    data= {this.state.dataSource}
    ItemSeparatorComponent = {this.FlatListItemSeparator}
    renderItem= {item=> this.renderItem(item)}
     keyExtractor= {item=>item.imdbID.toString()}
    
    ListEmptyComponent=<Text>No results</Text>

    
 />


    



    </View>
  )
}
}
  
}




