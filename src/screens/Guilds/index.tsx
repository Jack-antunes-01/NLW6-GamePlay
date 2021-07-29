import React, { ReactNode } from "react";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Guild, GuildProps } from "../../components/Guild";
import { ListDivider } from "../../components/ListDivider";
import { Avatar } from "../Avatar";
import { styles } from "./styles";

type Props = {
  handleGuildSelected: (guild: GuildProps) => void;
};

export function Guilds({ handleGuildSelected }: Props) {
  const Guilds = [
    {
      id: "1",
      name: "Lendários",
      icon: "image.png",
      owner: true,
    },
    {
      id: "2",
      name: "Insanos",
      icon: "image.png",
      owner: true,
    },
    {
      id: "3",
      name: "Insanos",
      icon: "image.png",
      owner: true,
    },
    {
      id: "4",
      name: "Insanos",
      icon: "image.png",
      owner: true,
    },
    {
      id: "5",
      name: "Insanos",
      icon: "image.png",
      owner: true,
    },
    {
      id: "6",
      name: "Insanos",
      icon: "image.png",
      owner: true,
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={Guilds}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Guild data={item} onPress={() => handleGuildSelected(item)} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 68, paddingTop: 103 }}
        ItemSeparatorComponent={() => <ListDivider />}
        ListHeaderComponent={() => <ListDivider />}
        style={styles.guilds}
      />
    </View>
  );
}