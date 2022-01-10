import React, {useCallback, useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {fetchDeliveries} from '../features/deliveries';

export const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const {deliveries, loading} = useSelector(
    (state: RootState) => state.deliveries,
  );

  const renderItem = useCallback(
    ({item}) => {
      return (
        <TouchableOpacity
          key={item.id}
          style={styles.itemContainer}
          onPress={() => navigation.navigate('Details', item)}>
          <View style={styles.idContainer}>
            <Text style={styles.id}>{item.id}</Text>
          </View>
          <View>
            <Text>{item.customer}</Text>
            <Text>{item.address}</Text>
          </View>
        </TouchableOpacity>
      );
    },
    [navigation],
  );

  useEffect(() => {
    dispatch(fetchDeliveries());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator />}
      <FlatList
        data={deliveries}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  idContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  id: {
    fontSize: 20,
    paddingRight: 6,
  },
});
