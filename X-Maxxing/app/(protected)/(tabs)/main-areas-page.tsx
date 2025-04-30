import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    FlatList,
    Alert,
    TouchableOpacity,
    Platform
} from 'react-native';

const MainAreasPage = () => {
    const [areas, setAreas] = useState([]);
    const [newArea, setNewArea] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');

    const addArea = () => {
        if (newArea.trim() === '') return;
        setAreas([...areas, { id: Date.now().toString(), name: newArea }]);
        setNewArea('');
    };

    const startEditing = (id, currentName) => {
        setEditingId(id);
        setEditText(currentName);
    };

    const saveEdit = () => {
        if (editText.trim() !== '') {
            setAreas(areas.map(area =>
                area.id === editingId ? { ...area, name: editText } : area
            ));
        }
        setEditingId(null);
        setEditText('');
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditText('');
    };

    const deleteArea = (id) => {
        if (Platform.OS === 'web') {
            if (window.confirm('Möchtest du diesen Bereich wirklich löschen?')) {
                setAreas(prevAreas => prevAreas.filter(area => area.id !== id));
            }
        } else {
            Alert.alert('Bereich löschen', 'Möchtest du diesen Bereich wirklich löschen?', [
                { text: 'Abbrechen', style: 'cancel' },
                {
                    text: 'Löschen', style: 'destructive', onPress: () => {
                        setAreas(prevAreas => prevAreas.filter(area => area.id !== id));
                    }
                }
            ]);
        }
    };

    return (
        <View style={{ padding: 20, backgroundColor: '#121212', flex: 1 }}>
            <TextInput
                placeholder="Neuen Bereich eingeben"
                placeholderTextColor="#BBBBBB"
                value={newArea}
                onChangeText={setNewArea}
                style={{
                    borderBottomWidth: 1,
                    borderBottomColor: '#BBBBBB',
                    marginBottom: 10,
                    padding: 5,
                    color: 'white'
                }}
            />
            <Button title="Bereich hinzufügen" onPress={addArea} color="#6200EE" />

            <FlatList
                data={areas}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: '#BBBBBB'
                        }}
                    >
                        {editingId === item.id ? (
                            <View style={{ flex: 1, marginRight: 10 }}>
                                <TextInput
                                    value={editText}
                                    onChangeText={setEditText}
                                    style={{
                                        color: 'white',
                                        borderBottomColor: '#BBBBBB',
                                        borderBottomWidth: 1
                                    }}
                                />
                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <Button title="Speichern" onPress={saveEdit} color="#03DAC5" />
                                    <View style={{ width: 10 }} />
                                    <Button title="Abbrechen" onPress={cancelEdit} color="#CF6679" />
                                </View>
                            </View>
                        ) : (
                            <>
                                <Text style={{ color: 'white', flex: 1 }}>{item.name}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={() => startEditing(item.id, item.name)}>
                                        <Text style={{ marginRight: 10, color: '#03DAC5' }}>Umbenennen</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => deleteArea(item.id)}>
                                        <Text style={{ color: '#CF6679' }}>Löschen</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                    </View>
                )}
            />
        </View>
    );
};

export default MainAreasPage;
