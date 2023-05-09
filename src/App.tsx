import React, {useRef, useState } from 'react'; 

import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'; 
 
const api = 'https://api.tvmaze.com/search/shows?q='; 
 
const Movietime = () => { 
  const [value, setValue] = useState(''); 
  const [movies, setMovies] = useState([]); 
  const scrollRef = useRef<ScrollView>(null)
 
 
 
  const onGetData = async () => { 
 
    const response = await fetch(api + value, { 
      method: 'GET', 
 
    }); 
    const result = await response.json(); 
    console.log(result); 
    setMovies(result); 
 
  }; 
  const ClearArea = () => { 
    setMovies([]); 
    setValue("") 
  }; 
  const onChangeText = (text: string) => { 
    setValue(text) 
  }; 
  const scrollToTop = () => { 
    scrollRef?.current?.scrollTo({ y: 0 }); 
  }; 
  const scrollToEnd = () => { 
    scrollRef?.current?.scrollToEnd({}); 
  }; 
  return ( 
    <View style={styles.container}> 
      <Text style={styles.text}>{value}</Text> 
      <TextInput 
        style={styles.inputStyle} 
        value={value} 
        placeholder='Search....' 
        placeholderTextColor='black' 
        onChangeText={onChangeText} /> 
      <View style={styles.button}> 
        {value ? ( 
          <> 
            <TouchableOpacity style={styles.buttonstyle} onPress={onGetData}> 
              <Text style={styles.title}>Search</Text> 
            </TouchableOpacity> 
            <TouchableOpacity style={styles.buttonstyle} onPress={ClearArea} > 
              <Text style={styles.title}>Clear</Text> 
            </TouchableOpacity> 
          </> 
        ) : null} 
      </View> 
      <View style={{ alignItems: 'center' }}> 
 
        <TouchableOpacity style={styles.updown} onPress={scrollToTop}> 
          <Text style={styles.title}>Up</Text> 
        </TouchableOpacity> 
        <TouchableOpacity style={styles.updown} onPress={scrollToEnd}> 
        <Text style={styles.title}>Down</Text> 
      </TouchableOpacity> 
 
      </View> 
 
      <ScrollView ref={scrollRef}> 
        {movies?.map((item, index) => ( 
          <View style={styles.view} key={index} > 
            <Image style={styles.image} 
              source={{ uri: item?.show?.image?.medium || '' }} 
            /> 
            <Text style={styles.title}> {item?.show?.name}</Text> 
          </View> 
        ))} 
      </ScrollView> 
      
    </View> 
 
  ); 
}; 
export default Movietime; 
const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
  }, 
  text:{ 
    color: 'green',  
  fontSize: 37,
   fontWeight:'bold',  
  textAlign: 'center'  
}, 
  inputStyle: { 
    width: '100%', 
    height: 50, 
    borderColor: 'green', 
    borderWidth: 1, 
    borderRadius: 12,  
  }, 
  buttonstyle: { 
    width: 100, 
    height: 30, 
    borderRadius: 10, 
    alignItems: 'center', 
    justifyContent: "center", 
    gap: 50, 
    backgroundColor: 'green', 
 
  }, 
  button:{ alignItems: 'center', 
   justifyContent: 'center',  
   flexDirection: 'row', 
    gap:50,
    
   }, 
  view: { 
    height: 100, 
    flexDirection: 'row', 
   
  }, 
 
  title: { 
 fontSize: 20,  
   }, 
  updown: { 
    alignItems: 'center', 
    justifyContent:'center',
    backgroundColor:'green', 
    width:100, 
    borderRadius:7,
    gap:7,

     
 }, 
  image: { 
    width: 100, 
    height: 100, 
    borderRadius: 12
  } 
});