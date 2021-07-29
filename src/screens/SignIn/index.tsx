import React from "react";
import { Alert, Image, Text, View } from "react-native";

import { useAuth } from "../../hooks/auth";

import { styles } from "./styles";
import IllustrationImg from "../../assets/illustration.png";

import { ButtonIcon } from "../../components/ButtonIcon";
import { Background } from "../../components/Background";

export function SignIn() {
  async function handleSignIn() {
    try {
      await signIn();
    } catch (error) {
      Alert.alert(error);
    }
  }

  const { user, signIn, loading } = useAuth();

  return (
    <Background>
      <View style={styles.container}>
        <Image
          source={IllustrationImg}
          style={styles.image}
          resizeMode="stretch"
        />

        <View style={styles.content}>
          <Text style={styles.title}>
            Conecte-se {"\n"}e organize suas {"\n"}
            jogatinas
          </Text>

          <Text style={styles.subtitle}>
            Crie grupos para jogar seus games {"\n"}
            favoritos com seus amigos
          </Text>

          <ButtonIcon
            title="Entrar com Discord"
            loading={loading}
            onPress={handleSignIn}
          />
        </View>
      </View>
    </Background>
  );
}
