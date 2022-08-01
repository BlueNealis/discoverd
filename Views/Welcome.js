import * as React from "react"
import { StyleSheet, View, Dimensions, Alert, KeyboardAvoidingView} from "react-native"
import { Text, Button, TextInput } from "react-native-paper"
import { useFonts } from "expo-font"
import * as Haptics from 'expo-haptics';
import { useState, useEffect } from "react"
import { NavigationContainer} from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function Welcome({ navigation, dimensions, setApiKey, apiKey }) {

  const [key, setKey] = useState('')
  const [loaded] = useFonts({
      Poppins: require('../assets/poppinsLight.ttf'),
    })
    if (!loaded) {
      return <Text>loading</Text>
    }


  return (
    <KeyboardAvoidingView behavior="height" style={{flex:1}}>
      <View testID='Welcome-Page' accessibilityLabel='Welcome Page' style={{
        flex:1,
        backgroundColor: 'white',
        justifyContent: 'center',
        height: dimensions.height,
        width: dimensions.width,
      }}>
        <View style={styles.welcomeText}>
          <Text testID='Greeting' accessibilityLabel='Welcome with leaf' style={styles.headerText}>
              Welcome! 🌿
          </Text>
          <Text testID='Greeting-Info' accessibilityLabel='Info about app' style={styles.text}>
            discoverd is a tool to help you identify the plant life around you.
          </Text>
        </View>
        <View>
          <View style={{width:dimensions.width, margin:5}}>
            <TextInput
              label="* Required"
              placeholder="Please input API key from Plant.ID"
              value={key}
              onChangeText= {setKey}
              style={{fontSize: 15, width:dimensions.width*.98}}
              underlineColor="gray"
              activeUnderlineColor="green"
            />
          </View>
        </View>
        <View style={{width: dimensions.width, alignItems:"center", marginTop:"4%"}}>
          <Button
              testID='Nav-Button-Dashboard'
              accessibilityLabel='Button To Dashboard'
              style={styles.button}
              mode="contained"
              color="green"
              onPress={() => {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
                .catch(error => {
                  return
                })
                if(!key || key.length < 50){
                  setApiKey(key)
                  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
                    .catch(error => {
                       return
                     })
                   return alert("Please fill out all required fields")
                  }
                navigation.navigate("home")
              }}
            >Get started!
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  welcomeText: {
    margin: 25,
  },
  headerText: {
    fontFamily: "Poppins",
    fontSize: 35,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "gray",
    fontSize: 20,
  },
  text: {
    fontFamily: "Poppins",
    fontSize: 20,
    marginBottom:"20%"
  },
  button: {
    width: "50%",
    justifyContent:"center"
  },
  // buttonContainer: {
  //   width: dimensions.width,
  //   justifyContent:"center"
  // }
})
