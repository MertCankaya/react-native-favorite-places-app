import { Alert, Button, Image, Text, View } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { useState } from "react";
import OutlinedButton from "../UI/OutlinedButton";

function ImagePicker() {
  const [cameraPermissionInformation, requestPermisson] =
    useCameraPermissions();
  const [pickedImage, setPickedImage] = useState();

  async function verifyPermission() {
    const permissionResponse = await requestPermisson();
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      permissionResponse.canAskAgain;

      return permissionResponse.granted;
    }
    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setPickedImage(image.uri);
  }
  return (
    <View>
      <View>
        {pickedImage ? (
          <Image
            style={{ height: 400, width: "100%", marginBottom: 9 }}
            source={{ uri: pickedImage }}
          />
        ) : (
          <Text style={{ color: "white", marginBottom: 9 }}>
            No image taken yet.
          </Text>
        )}
      </View>
      <OutlinedButton icon="camera" onPress={takeImageHandler}>Take Image</OutlinedButton>
    </View>
  );
}

export default ImagePicker;
