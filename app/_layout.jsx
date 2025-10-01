import { Slot } from "expo-router";
import { StyleSheet, View } from 'react-native';
import { PaperProvider } from "react-native-paper";
import TopMenu from './topMenu.jsx';


export default function Layout() {
  return (
    <PaperProvider>
      <TopMenu></TopMenu>
      <View style={styles.container}>
        <Slot />
      </View>
    </PaperProvider>  
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})
