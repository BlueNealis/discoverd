import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native'

//Libraries
import { Button } from 'react-native-paper'
import PickImage from "../components/PickImage/PickImage"
import TakePicture from "../components/TakePicture/TakePicture"
import * as Haptics from 'expo-haptics';

export default function Dashboard({ navigation, handleChange, allImages, images, dimensions, deleteImage, apiKey }) {
  
  const [hasImages, setHasImages] = useState("")

  useEffect(() => {
    if (!allImages[0]){
      setHasImages(false)
      return
    } else if (allImages){
      setHasImages(true)
      return
    }
  },[])

  const displayText = () => {
    return (
      <View style={{width: dimensions.width,
        height: 400, maxHeight: 400, backgroundColor:"white", borderTopWidth:10, borderBottomWidth:10, borderColor:"green", justifyContent:"center", alignItems:"center", color:"grey"}}>
        <Text style={styles.displayText}>
          Upload an image to get started
        </Text>
      </View>
    )
  }

  const displayImages = () => {
    return (
      <ScrollView horizontal={true} contentContainerStyle={{justifyContent:"center", alignItems:"center"}} style={{width: dimensions.width,
        height: 400, maxHeight:400, enum:"black", backgroundColor:"white", borderTopWidth:10, borderBottomWidth:10, borderColor:"green"}}>
            {allImages}
      </ScrollView>
    )
  }

  return (
    <View testID='Dashboard' accessibilityLabel='Dashboard' style={{
      width: dimensions.width,
      maxHeight: dimensions.height,
      }}>
        {!hasImages ? displayText() : displayImages()}
      <View testID='Button-Container' accessibilityLabel='Button Container' style={styles.buttonContainer}>
        <View style={{flexDirection:"row"}}>
          <PickImage handleChange={handleChange}/>
          <TakePicture handleChange={handleChange}/>
        </View>
      <View>
          <Button
            testID='Response-Button'
            accessibilityLabel='Check Possible Plant'
            style={styles.submitButton}
            labelStyle={{fontSize:20, margin:0, alignItems:"center"}}
            contentStyle={{flexDirection:"row-reverse", padding:20}}
            title="Go to Response"
            icon="magnify"
            color="white"
            onPress={() => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
            .catch(error => {
              return
            })
            navigation.navigate("Results", {apiKey: apiKey,
            uris:images,
            })
          }}> discover
          </Button>
        </View>
      </View>
  </View>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    transform: [{scaleX: -1}],
  },
  submitButton: {
    elevation: 5,
    borderRadius: 5,
    marginTop: 50,
    backgroundColor:"green",
    justifyContent:"center",
  },
  buttonContainer: {
    flexDirection: "column",
    alignItems: "center",
    height: "40%",
    padding:5,
  },
  displayText: {
    fontFamily: "Poppins"
  }
})
