import { Image } from "react-native";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { Permissions } from "expo";

import preloadFonts from "./preloadFonts";

// cache fonts
// /////////////////////////////////////////////////////////////////////////////
const cacheFonts = fonts => fonts.map(font => Font.loadAsync(font));

// cache images
// /////////////////////////////////////////////////////////////////////////////
const cacheImages = images => {
  const imagesArray = Object.values(images);

  return imagesArray.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    }

    return Asset.fromModule(image).downloadAsync();
  });
};

// preload async
// /////////////////////////////////////////////////////////////////////////////
const loadAssetsAsync = async () => {
  // preload assets
  const fontAssets = cacheFonts(preloadFonts);

  // promise load all
  return Promise.all([...fontAssets]);
};

// camera permissions
// /////////////////////////////////////////////////////////////////////////////
const cameraAccessAsync = async () => {
  // get exisiting camera permissions first
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.CAMERA
  );
  let finalStatus = existingStatus;

  // ask again to grant camera permissions (if not already allowed)
  if (existingStatus !== "granted") {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    finalStatus = status;
  }

  return finalStatus === "granted";
};

// format seconds
// /////////////////////////////////////////////////////////////////////////////
const formatTime = sec => {
  const padTime = (num, size) => `000${num}`.slice(size * -1);
  const time = parseFloat(sec).toFixed(3);
  const minutes = Math.floor(time / 60) % 60;
  const seconds = Math.floor(time - minutes * 60);

  return `${padTime(minutes, 1)}:${padTime(seconds, 2)}`;
};

const BACKGROUND_LOCATION_TASK_NAME = 'bg-location-name'

export default {
  cacheFonts,
  cacheImages,
  loadAssetsAsync,
  cameraAccessAsync,
  formatTime,
  BACKGROUND_LOCATION_TASK_NAME
};
