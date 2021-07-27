import React, { ReactNode } from "react";
import { Text, View } from "react-native";
import { Avatar } from "../Avatar";
import { styles } from "./styles";

type Props = {
  children: ReactNode;
};

export function Profile() {
  return (
    <View style={styles.container}>
      <Avatar urlImage="https://github.com/Jack-antunes-01.png" />

      <View>
        <View style={styles.user}>
          <Text style={styles.greeting}>Olá,</Text>
          <Text style={styles.username}>Jackson</Text>
        </View>

        <Text style={styles.message}>Hoje é dia de vitória</Text>
      </View>
    </View>
  );
}
