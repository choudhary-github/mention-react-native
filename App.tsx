import React, {useRef, useState} from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';
import {RichEditor, RichToolbar, actions} from 'react-native-pell-rich-editor';

const App = () => {
  const richText = useRef(null);
  const [taggedWords, setTaggedWords] = useState('');
  const [selectedItem, setSelectedItem] = useState('');

  let data = [
    {id: 1, first_name: 'Heywood', last_name: 'Buzza', gender: 'Male'},
    {id: 2, first_name: 'Selene', last_name: 'Emery', gender: 'Female'},
    {id: 3, first_name: 'Wilmer', last_name: 'Troop', gender: 'Male'},
    {id: 4, first_name: 'Mitchell', last_name: 'Comoletti', gender: 'Male'},
    {id: 5, first_name: 'Kizzie', last_name: 'Nickels', gender: 'Female'},
    {id: 6, first_name: 'Wyndham', last_name: 'Macbane', gender: 'Male'},
    {id: 7, first_name: 'Marje', last_name: 'Frowde', gender: 'Female'},
    {id: 8, first_name: 'Enrico', last_name: 'Acland', gender: 'Male'},
    {id: 9, first_name: 'Randal', last_name: 'Giddy', gender: 'Male'},
    {id: 10, first_name: 'Janie', last_name: 'Coules', gender: 'Female'},
  ];

  const onChange = (newHtml: any) => {
    const withoutHTML = newHtml.replace(/<[^>]*>/g, '');
    const lastWord = withoutHTML.slice(-1);

    console.log(lastWord);

    // const tagged = words.filter(
    //   word =>
    //     word.startsWith('@') || word.startsWith('#') || word.startsWith('$'),
    // );
    // console.log(tagged);
    setTaggedWords(lastWord);
  };

  const renderList = () => {
    if (taggedWords === '@') {
      return (
        <FlatList
          data={data.map(item => item.first_name)}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => insertText(item)}>
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      );
    } else if (taggedWords === '#') {
      return (
        <FlatList
          data={data.map(item => item.last_name)}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => insertText(item)}>
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      );
    } else if (taggedWords === '$') {
      return (
        <FlatList
          data={data.map(item => item.gender)}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => insertText(item)}>
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      );
    }
    return null;
  };

  const insertText = (text: any) => {
    richText.current?.insertText(text + ' ');
  };

  return (
    <View style={{flex: 1}}>
      <RichEditor
        ref={richText}
        onChange={onChange}
        placeholder={'Start typing here...'}
      />

      <RichToolbar
        editor={richText}
        iconTint={'orange'}
        selectedIconTint={'grey'}
        actions={[
          actions.setBold,
          actions.setItalic,
          actions.setUnderline,
          actions.setStrikethrough,
          actions.alignLeft,
          actions.alignCenter,
          actions.alignFull,
          actions.undo,
          actions.redo,
        ]}
      />

      <View style={{flex: 1}}>{renderList()}</View>
      <FlatList
        data={taggedWords}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => setSelectedItem(item)}>
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
