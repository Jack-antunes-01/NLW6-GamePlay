import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  ImageBackground,
  Text,
  View,
  Share,
  Platform,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { BorderlessButton } from "react-native-gesture-handler";
import { Fontisto } from "@expo/vector-icons";
import * as Linking from "expo-linking";

import { styles } from "./styles";

import { Background } from "../../components/Background";
import Header from "../../components/Header";
import { theme } from "../../global/styles/theme";
import BannerImg from "../../assets/banner.png";
import { ListHeader } from "../../components/ListHeader";
import { Member, MemberProps } from "../../components/Member";
import { ListDivider } from "../../components/ListDivider";
import { ButtonIcon } from "../../components/ButtonIcon";
import { AppointmentProps } from "../../components/Appointment";
import { api } from "../../services/api";
import { Loading } from "../../components/Loading";
// import { Container } from './styles';

const { CDN_IMAGE } = process.env;

type Params = {
  guildSelected: AppointmentProps;
};

type GuildWidget = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];
};

export function AppointmentDetails() {
  const route = useRoute();

  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
  const [loading, setLoading] = useState(true);

  const { guildSelected } = route.params as Params;

  const uri = `${CDN_IMAGE}/icons/${guildSelected.guild.id}/${guildSelected.guild.icon}.png`;

  async function fetchGuildInfo() {
    setLoading(true);
    try {
      const response = await api.get(
        `/guilds/${guildSelected.guild.id}/widget.json`
      );

      setWidget(response.data);
    } catch (error) {
      Alert.alert(
        "Verifique as configurações do servidor. O widget pode estar desativado."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleShareInvitation() {
    const message =
      Platform.OS === "ios"
        ? `Junte-se a ${guildSelected.guild.name}`
        : widget.instant_invite;

    Share.share({
      message,
      url: widget.instant_invite,
    });
  }

  function handleOpenGuild() {
    Linking.openURL(widget.instant_invite);
  }

  useEffect(() => {
    fetchGuildInfo();
  }, []);

  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          guildSelected.guild.owner && (
            <BorderlessButton onPress={handleShareInvitation}>
              <Fontisto name="share" size={24} color={theme.colors.primary} />
            </BorderlessButton>
          )
        }
      />

      <ImageBackground
        source={guildSelected.guild.icon ? { uri } : BannerImg}
        style={styles.banner}
      >
        <View style={styles.bannerContent}>
          <Text style={styles.title}>{guildSelected.guild.name}</Text>

          <Text style={styles.subtitle}>{guildSelected.description}</Text>
        </View>
      </ImageBackground>

      <ListHeader
        title="Jogadores"
        subtitle={`Total ${widget.members?.length || 0}`}
      />

      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={widget.members}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Member data={item} />}
          ItemSeparatorComponent={() => <ListDivider isCentered />}
          style={styles.members}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
      {guildSelected.guild.owner && (
        <View style={styles.footer}>
          <ButtonIcon title="Entrar na partida" onPress={handleOpenGuild} />
        </View>
      )}
    </Background>
  );
}
