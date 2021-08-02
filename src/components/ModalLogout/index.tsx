import React from "react";
import {
  ModalProps,
  Text,
  Modal,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { styles } from "./styles";
import { theme } from "../../global/styles/theme";
import { useAuth } from "../../hooks/auth";

type Props = ModalProps & {
  closeModal: () => void;
};

export function ModalLogout({ closeModal, ...rest }: Props) {
  const { signOut } = useAuth();

  const { secondary60, secondary80 } = theme.colors;

  function handleLogout() {
    signOut();
  }

  return (
    <Modal transparent animationType="slide" statusBarTranslucent {...rest}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.container}>
          <LinearGradient
            colors={[secondary60, secondary80]}
            style={styles.gradient}
          >
            <TouchableWithoutFeedback>
              <View style={styles.content}>
                <Text style={styles.title}>Deseja realmente sair do app?</Text>

                <View style={styles.row}>
                  <TouchableOpacity onPress={closeModal} style={styles.button}>
                    <Text style={styles.text}>Não</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleLogout}
                    style={styles.button}
                  >
                    <Text style={styles.text}>Sim</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </LinearGradient>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
