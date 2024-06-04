import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { icons, images } from '../constants';

const SearchInput = ({ title, value, handleChangeText, placeholder, otherStyles }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
      <View className="border-2 border-blue-200 w-full h-10 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row
      space-x-4">
        <TextInput
          className="text-base mt-0.5 flex-1 text-white font-pregular"
          value={value}
          placeholder='Search for a video topic'
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
        />
        <TouchableOpacity>
            <Image
            source={icons.search}
            className="w-5 h-5"
            resizeMode='contain' 
            />    
        </TouchableOpacity> 
      </View>
    
  );
};

export default SearchInput
