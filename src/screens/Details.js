import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {activeDelivery, finishDelivery} from '../features/deliveries';
import Geolocation from '@react-native-community/geolocation';

export const DetailsScreen = ({route}) => {
  const dispatch = useDispatch();
  const [coords, setCoords] = useState({});

  const {id, address, city, customer, zipCode, latitude, longitude} =
    route.params;

  const {hasActive} = useSelector((state: RootState) => state.deliveries);

  const handleActive = useCallback(() => {
    dispatch(activeDelivery(id));
  }, [dispatch, id]);

  const handleDelivered = useCallback(
    status => {
      const lat = coords.latitude;
      const lng = coords.longitude;

      dispatch(finishDelivery({id, status, lat, lng}));
    },
    [coords.latitude, coords.longitude, dispatch, id],
  );

  useEffect(() => {
    Geolocation.getCurrentPosition(info =>
      setCoords({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
      }),
    );
  }, []);

  const isActive = hasActive === id;
  const disabled = hasActive.length !== 0 && hasActive !== id;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        <Text style={styles.title}>ID:</Text> {id}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.title}>Customer:</Text> {customer}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.title}>Full Address:</Text> {address}, {city},{' '}
        {zipCode}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.title}>Coordinates:</Text> {latitude} ; {longitude}
      </Text>
      {!isActive && (
        <Button
          testID="button"
          title="Make Active"
          disabled={disabled}
          onPress={() => handleActive(id)}
        />
      )}
      {isActive && (
        <View style={styles.buttonsContainer}>
          <Button
            onPress={() => handleDelivered('delivered')}
            title="Mark as Delivered"
          />
          <Button
            onPress={() => handleDelivered('undelivered')}
            color="red"
            title="Not Delivered"
          />
        </View>
      )}
      {disabled && (
        <View style={styles.disabledTextContainer}>
          <Text style={styles.disabledText}>
            Finish order number {hasActive} first!
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  buttonsContainer: {
    marginTop: 14,
  },
  disabledTextContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  text: {
    fontSize: 18,
  },
  disabledText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: 'red',
  },
});
