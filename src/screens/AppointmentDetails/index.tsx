import React from "react";
import { BorderlessButton } from "react-native-gesture-handler";
import { Background } from "../../components/Background";
import Header from "../../components/Header";
import { Fontisto } from "@expo/vector-icons";
import { theme } from "../../global/styles/theme";
import { FlatList, ImageBackground, Text, View } from "react-native";
import BannerImg from "../../assets/banner.png";
import { styles } from "./styles";
import { ListHeader } from "../../components/ListHeader";
import { Member } from "../../components/Member";
import { ListDivider } from "../../components/ListDivider";
import { ButtonIcon } from "../../components/ButtonIcon";
// import { Container } from './styles';

export function AppointmentDetails() {
  const members = [
    {
      id: "1",
      username: "Jackson",
      avatar_url: "https://github.com/jack-antunes-01.png",
      status: "online",
    },
    {
      id: "2",
      username: "Jackson",
      avatar_url: "https://github.com/jack-antunes-01.png",
      status: "Offline",
    },
    {
      id: "3",
      username: "Jackson",
      avatar_url: "https://github.com/jack-antunes-01.png",
      status: "Offline",
    },
  ];

  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          <BorderlessButton>
            <Fontisto name="share" size={24} color={theme.colors.primary} />
          </BorderlessButton>
        }
      />

      <ImageBackground source={BannerImg} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.title}>Lendários</Text>

          <Text style={styles.subtitle}>
            É hoje que vamos chegar ao challenger sem perder uma partida da md10
          </Text>
        </View>
      </ImageBackground>

      <ListHeader title="Jogadores" subtitle="Total 3" />

      <FlatList
        data={members}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Member data={item} />}
        ItemSeparatorComponent={() => <ListDivider />}
        style={styles.members}
      />

      <View style={styles.footer}>
        <ButtonIcon title="Entrar na partida" />
      </View>
    </Background>
  );
}
