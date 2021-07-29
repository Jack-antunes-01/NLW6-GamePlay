import React from "react";
import { Text, Image, View, ActivityIndicator } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import DiscordImg from "../../assets/discord.png";
import { styles } from "./styles";

type Props = RectButtonProps & {
  title: string;
  loading?: boolean;
};

export function ButtonIcon({ title, loading = false, ...rest }: Props) {
  return (
    <RectButton style={styles.container} {...rest}>
      {loading ? (
        <ActivityIndicator style={{ flex: 1 }} size="large" color="white" />
      ) : (
        <>
          <View style={styles.iconWrapper}>
            <Image source={DiscordImg} style={styles.icon} />
          </View>

          <Text style={styles.title}>{title}</Text>
        </>
      )}
    </RectButton>
  );
}
