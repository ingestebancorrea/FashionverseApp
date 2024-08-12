import { useState } from 'react';
import { Asset, launchCamera, launchImageLibrary } from 'react-native-image-picker';

export const useTakePhoto = () => {
    const [tempUri, setTempUri] = useState<string>('');
    const [file, setFile] = useState<Asset | null>(null);

    const takePhotoFromGallery = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                quality: 0.5,
            },
            resp => {
                if (resp.didCancel) {return;}
                if (!resp.assets?.[0].uri) {return;}
                setTempUri(resp.assets?.[0].uri);
                setFile(resp.assets[0]);
            },
        );
    };

    const takePhotoFromCamera = () => {
        launchCamera({
          mediaType: 'photo',
          quality: 0.5,
        }, (resp) => {
          if (resp.didCancel) {return;}
          if (!resp.assets?.[0].uri) {return;}
          setTempUri(resp.assets?.[0].uri);
          setFile(resp.assets[0]);
        });
    };

    return {
        tempUri,
        file,
        takePhotoFromGallery,
        takePhotoFromCamera,
    };
};
