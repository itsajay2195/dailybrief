import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchDogImages = async () => {
  try {
    const response = await fetch('https://dog.ceo/api/breeds/image/random/20');
    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error(error);
  }
};


export const setFavorites = async userFav => {
  try {
    await AsyncStorage.setItem('favorites', JSON.stringify(userFav));
  } catch (error) {
    console.error(error);
  }
};


export const getFavorites = async () =>{
    try {
        await AsyncStorage.getItem('favorites').then(data => {
            if (data) {
              return JSON.parse(data)
            }
          });
    } catch (error) {
        
    }
}
