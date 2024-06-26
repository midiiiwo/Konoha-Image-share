import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { icons } from '../constants';
import { router, usePathname } from 'expo-router';

const SearchInput = () => {
  const pathname = usePathname();
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (!query) {
      Alert.alert('eno dey massa', 'Search am well massa');
      return;
    }

    if (pathname.startsWith('/search')) {
      router.setParams({ query });
    } else {
      router.push(`/search/${query}`);
    }
  };

  return (
    <View className="border-2 border-blue-200 w-full h-10 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        className="text-base mt-0.5 flex-1 text-white font-pregular"
        value={query}
        placeholder="Search for a video topic"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />
      <TouchableOpacity onPress={handleSearch}>
        <Image
          source={icons.search}
          className="w-5 h-5"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
