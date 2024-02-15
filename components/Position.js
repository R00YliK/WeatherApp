import * as Location from 'expo-location';
import Weather from './Weather';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function Position() {
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [message, setMessage] = useState('Retrieving location...')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync()
            console.log(status)
            try {
                if (status !== 'granted') {
                    setMessage("Location not permitted.")
                }
                else {
                    const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High })
                    setLatitude(position.coords.latitude)
                    setLongitude(position.coords.longitude)
                    setMessage('Location retrieved')

                }
            }
            catch (error) {
                setMessage("Error retrieving location.")
                console.log(error)
            }
            setIsLoading(false)
        })()
    }, [])

    return(
        <View>
            <Text style={styles.coords}>{latitude.toFixed(3)}, {longitude.toFixed(3)}</Text>
            <Text style={styles.message}>{message}</Text>
            {isLoading === false &&
            <Weather latitude ={latitude} longitude={longitude}/>
            }
        </View>
    )
}


const styles = StyleSheet.create({
    coords: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10, // Adjust as needed
      textAlign: 'center', // Center the text horizontally
    },
    message: {
      fontSize: 16,
      textAlign: 'center', // Center the text horizontally
    },
  });