import axios from 'axios';
import React from 'react';
import {
  Alert,
  Text,
  FlatList,
  View,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { Post } from '../components/Post';

export const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [items, setItems] = React.useState();

  const fetchPosts = () => {
    setIsLoading(true);
    axios
      .get('https://64aff6efc60b8f941af4f724.mockapi.io/articles')
      .then(({ data }) => {
        setItems(data);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert('Bad deals', 'Article was not found');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  React.useEffect(fetchPosts, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 15 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchPosts} />}
        data={items}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('FullPost', { id: item.id, title: item.title })}>
            <Post title={item.title} imageUrl={item.imageUrl} createdAt={item.createdAt} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
