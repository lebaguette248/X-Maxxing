// database/db.ts
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('tasks.db');

export const createTables = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT);'
    );
  });
};

export const addTask = (title: string, description: string) => {
  db.transaction(tx => {
    tx.executeSql('INSERT INTO tasks (title, description) VALUES (?, ?)', [title, description]);
  });
};

export const getTasks = (callback: (tasks: any[]) => void) => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM tasks', [], (_, { rows }) => {
      callback(rows._array);
    });
  });
};