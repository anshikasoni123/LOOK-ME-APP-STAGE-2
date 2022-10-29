import React from "react";
import {StyleSheet,View,Platform,StatusBar,SafeAreaView} from "react-native";
import {Camera} from "expo-camera";
import * as Permissions from "expo-permissions";
import * as FaceDetector from "expo-face-detector";
import Filter1 from "./Filter1"

export default class Main extends React.Component{
    constructor(props){
          super(props);
          this.state = {
            hasCameraPermission:null,
            faces:[]
          }
          this.onCameraPermissions = this.onCameraPermissions.bind(this);
          this.onFacesDetected = this.onFacesDetected.bind(this),
          this.onFacesDetectionError = this.onFacesDetectionError.bind(this)
    }

    componentDidMount(){
        Permissions
        .askAsync(Permissions.CAMERA)
        .then(this.onCameraPermissions())
    }

    onCameraPermissions = (status) => {
        this.setState({hasCameraPermission: status === "granted"})
    }

    onFacesDetected = (faces) => {
        this.setState({faces : faces})
    }

    onFacesDetectionError = (error) => {
        console.log(error.message)
    }

    render(){
        const {hasCameraPermission} = this.state;

        if(hasCameraPermission === null){
            return <View/>
        }

        if(hasCameraPermission === "false"){
            return(
                <View style = {styles.container}>
                    <Text> Camera Permission Not Granted</Text>
                </View>
            )
        }

        return(
            <View style = {styles.container}>
                <SafeAreaView style = {styles.droidSafeAreaView}/>

                <View style = {styles.headingContainer}>
                    <Text style = {styles.titleText}> LOOK ME APP</Text>
                </View>

                <View style = {styles.camera}>
                    <Camera
                         style={{flex:1}}
                         type={Camera.Constants.Type.front}
                         faceDetectorSettings={{
                            mode:FaceDetector.Constants.Mode.fast,
                            detectLandmarks:FaceDetector.Constants.Landmarks.all,
                            runClassifications:FaceDetector.Constants.classifications.all
                         }}
                         onFacesDetected={this.onFacesDetected}
                         onFacesDetectionError={this.onFacesDetectionError}
                    />
                    {
                        this.state.faces.map(face => {
                            return <Filter1 key = {face.faceID} face = {face}/>
                        })
                    }
                </View>

                <View style = {styles.filterContainer}>

                </View>

                <View style = {styles.actionContainer}>
                    
                </View>

            </View>
        )

    }

}

const styles = StyleSheet.create({
    container : {
        fles : 1
    },
    headingContainer:{
        flex:0.1,
        alignItems:"center",
        justifyContent:"center"
    },
    camera:{
        flex:0.65
    },
    titleText:{
        textSize:30
    },
    droidSafeAreaView:{
        marginTop:Platform.OS === "android" ? StatusBar.currentHeight:0
    },
    filterContainer:{},
    actionContainer:{}
})