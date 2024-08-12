import ImageColors from 'react-native-image-colors';

export const getImageColors = async (uri: string) => {
  let primary;
  let secondary;
  const colors = await ImageColors.getColors(uri, {
    fallback: '#fff',
    cache: true,
    key: `${uri}`,
  });

  switch (colors.platform) {
    case 'android':
      primary = colors.dominant;
      secondary = colors.average;
      break;

    case 'ios':
      primary = colors.primary;
      secondary = colors.secondary;
      break;
    default:
      throw new Error('Unexpected platform key');
  }

  return {
    primary,
    secondary,
  };

};
