import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { landingStyles } from '../../../theme/landingTheme';
import { Searchbar } from 'react-native-paper';
import { AddButton } from '../../components/AddButton';
import { StackScreenProps } from '@react-navigation/stack';
import { posts } from '../data/posts';
import { PostCard } from '../components/PostCard';
import Pagination from '@cherry-soft/react-native-basic-pagination';
import { useDataFilter } from '../hooks/useDataFilter';

interface Props extends StackScreenProps<any, any> { }

export const StorePostsScreen = ({ navigation, route }: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { paginatedData, page, setPage } = useDataFilter({ data: posts });
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleCardPress = (id: number) => {
    setSelectedIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((prevId) => prevId !== id)
        : [...prevIds, id]
    );
  };

  return (
    <View style={landingStyles.mainContainer}>
      {/* Búsqueda */}
      <View style={styles.containerParentFilter}>
        <View style={styles.containerFilter}>
          <Searchbar
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
            loading={false}
            icon={() => <Icon name="search-outline" size={20} />}
            clearIcon={() => (searchQuery ? <Icon name="close-outline" size={20} /> : null)}
          />
        </View>

        <View style={styles.containerButton}>
          <AddButton navigation={navigation} route={route} label="+" navigateTo="PostDescriptionScreen" />
        </View>
      </View>

      {
        posts.length > 0 ? (
          <>
            {/* Productos */}
            <View style={styles.containerParentProducts}>
              <FlatList
                data={paginatedData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <PostCard
                    post={item}
                    isSelected={selectedIds.includes(item.id)}
                    onPress={() => handleCardPress(item.id)}
                  />
                )}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                contentContainerStyle={{ flexGrow: 1 }}
              />
            </View>

            {/* Paginación */}
            <Pagination
              totalItems={posts.length}
              pageSize={5}
              currentPage={page}
              onPageChange={setPage}
              containerStyle={styles.paginationContainer}
              btnStyle={styles.paginationButton}
            />
          </>
        )
          : (
            <>
              <View style={landingStyles.emptyContainer}>
                <Image
                  source={require('../../../assets/add-posts.png')}
                  style={landingStyles.image}
                />
                <Text style={landingStyles.text}>Agrega una publicación</Text>
              </View>
            </>
          )
      }
    </View >
  );
};

const styles = StyleSheet.create({
  containerParentFilter: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between', // Añadido para espaciar los elementos horizontalmente
    paddingHorizontal: 10, // Añadido para dar espacio a los lados
    alignItems: 'center', // Alinea los elementos verticalmente al centro
  },
  containerFilter: {
    width: '80%',
  },
  containerButton: {
    width: '15%',
    marginBottom: 10,
  },
  containerParentProducts: {
    flex: 1,
    padding: 10,
  },
  paginationContainer: {
    height: '8%',
  },
  paginationButton: {
    marginTop: 10,
    borderColor: '#DEA76B',
    backgroundColor: '#DEA76B',
  },
});
