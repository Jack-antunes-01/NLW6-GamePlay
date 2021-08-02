import React, { ReactNode } from "react";
import { useState } from "react";
import { Alert, Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useAuth } from "../../hooks/auth";
import { Avatar } from "../Avatar";
import { ModalLogout } from "../ModalLogout";
import { styles } from "./styles";

export function Profile() {
  const { user } = useAuth();

  const [isOpenModal, setIsOpenModal] = useState(false);

  function handleSignOut() {
    setIsOpenModal(true);
  }

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  return (
    <View style={styles.container}>
      <RectButton onPress={handleSignOut}>
        <Avatar urlImage={user.avatar} />
      </RectButton>
      <View>
        <View style={styles.user}>
          <Text style={styles.greeting}>Olá,</Text>
          <Text style={styles.username}>{user.firstName}</Text>
        </View>

        <Text style={styles.message}>Hoje é dia de vitória</Text>
      </View>

      <ModalLogout visible={isOpenModal} closeModal={handleCloseModal} />
    </View>
  );
}
