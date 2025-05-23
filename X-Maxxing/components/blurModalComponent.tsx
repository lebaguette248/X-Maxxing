import { Modal, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

export function BlurredModal({
  visible,
  onRequestClose,
  children,
}: {
  visible: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
}) 
{
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onRequestClose}
    >
      <BlurView intensity={50} tint="dark" style={styles.blurContainer}>
        {children}
      </BlurView>
    </Modal>
  );
}

export const styles = StyleSheet.create({
  blurContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
