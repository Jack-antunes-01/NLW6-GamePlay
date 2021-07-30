import React from "react";
import { useState } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { styles } from "./styles";

import { Guild, GuildProps } from "../../components/Guild";
import { ListDivider } from "../../components/ListDivider";
import { Loading } from "../../components/Loading";
import { api } from "../../services/api";
import { useEffect } from "react";

type Props = {
  handleGuildSelected: (guild: GuildProps) => void;
};

export function Guilds({ handleGuildSelected }: Props) {
  const [guilds, setGuilds] = useState<GuildProps[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchGuilds() {
    const response = await api.get("/users/@me/guilds");

    setGuilds(response.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchGuilds();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={guilds}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Guild data={item} onPress={() => handleGuildSelected(item)} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 68, paddingTop: 68 }}
          ItemSeparatorComponent={() => <ListDivider isCentered />}
          ListHeaderComponent={() => <ListDivider isCentered />}
          style={styles.guilds}
        />
      )}
    </View>
  );
}
