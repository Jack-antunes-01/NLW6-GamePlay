import React, { useState, useRef } from "react";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

import { Form } from "@unform/mobile";
import { SubmitHandler, FormHandles } from "@unform/core";
import { styles } from "./styles";

import { Background } from "../../components/Background";
import Header from "../../components/Header";
import { CategorySelect } from "../../components/CategorySelect";
import { theme } from "../../global/styles/theme";
import { GuildIcon } from "../../components/GuildIcon";
import { SmallInput } from "../../components/SmallInput";
import { TextArea } from "../../components/TextArea";
import { Button } from "../../components/Button";
import { ModalView } from "../../components/ModalView";
import { Guilds } from "../Guilds";
import { GuildProps } from "../../components/Guild";
import { COLLECTION_APPOINTMENTS } from "../../configs/database";

type FormProps = {
  day: string;
  month: string;
  hour: string;
  minute: string;
  description: string;
};

type Props = {
  data: FormProps;
};

export function AppointmentCreate() {
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);

  const [category, setCategory] = useState("");
  const [openGuildsModal, setOpenGuildsModal] = useState(false);
  const [guild, setGuild] = useState<GuildProps>({} as GuildProps);

  function handleOpenGuilds() {
    setOpenGuildsModal(true);
  }

  function handleCloseModal() {
    setOpenGuildsModal(false);
  }

  function handleGuildSelect(guildSelected: GuildProps) {
    setGuild(guildSelected);
    setOpenGuildsModal(false);
  }

  function handleSelectCategory(categoryId: string) {
    setCategory(categoryId);
  }

  const handleSubmitForm: SubmitHandler = async (data: FormProps) => {
    if (
      !category ||
      !guild ||
      !data.day ||
      !data.description ||
      !data.hour ||
      !data.minute ||
      !data.month
    ) {
      Alert.alert("Preencha todas as informações.");
      return;
    }

    const newAppointment = {
      id: uuid.v4(),
      guild,
      category,
      date: `${data.day}/${data.month} às ${data.hour}:${data.minute}h`,
      description: data.description,
    };

    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);

    const appointments = storage ? JSON.parse(storage) : [];

    await AsyncStorage.setItem(
      COLLECTION_APPOINTMENTS,
      JSON.stringify([...appointments, newAppointment])
    );

    navigation.navigate("Home");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Background>
        <ScrollView>
          <Header title="Agendar Partida" />

          <Text
            style={[
              styles.label,
              { marginLeft: 24, marginTop: 36, marginBottom: 18 },
            ]}
          >
            Categoria
          </Text>

          <CategorySelect
            hasCheckBox
            setCategory={handleSelectCategory}
            categorySelected={category}
          />

          <Form ref={formRef} onSubmit={handleSubmitForm} style={styles.form}>
            <RectButton onPress={handleOpenGuilds}>
              <View style={styles.select}>
                {guild.icon ? (
                  <GuildIcon guildId={guild.id} iconId={guild.icon} />
                ) : (
                  <View style={styles.image} />
                )}

                <View style={styles.selectBody}>
                  <Text style={styles.label}>
                    {guild.name ? guild.name : "Selecione um servidor"}
                  </Text>
                </View>

                <Feather
                  name="chevron-right"
                  color={theme.colors.heading}
                  size={18}
                />
              </View>
            </RectButton>

            <View style={styles.field}>
              <View>
                <Text style={[styles.label, { marginBottom: 12 }]}>
                  Dia e mês
                </Text>
                <View style={styles.column}>
                  <SmallInput name="day" maxLength={2} />
                  <Text style={styles.divider}>/</Text>
                  <SmallInput name="month" maxLength={2} />
                </View>
              </View>

              <View>
                <Text style={[styles.label, { marginBottom: 12 }]}>
                  Hora e minuto
                </Text>
                <View style={styles.column}>
                  <SmallInput name="hour" maxLength={2} />
                  <Text style={styles.divider}>:</Text>
                  <SmallInput name="minute" maxLength={2} />
                </View>
              </View>
            </View>

            <View style={[styles.field, { marginBottom: 12 }]}>
              <Text style={styles.label}>Descrição</Text>
              <Text style={styles.caracteresLimit}>Max 100 caracteres</Text>
            </View>

            <TextArea
              name="description"
              multiline
              maxLength={100}
              numberOfLines={5}
              autoCorrect={false}
            />

            <View style={styles.footer}>
              <Button
                title="Agendar"
                onPress={() => formRef.current && formRef.current.submitForm()}
              />
            </View>
          </Form>
        </ScrollView>

        <ModalView visible={openGuildsModal} closeModal={handleCloseModal}>
          <Guilds handleGuildSelected={handleGuildSelect} />
        </ModalView>
      </Background>
    </KeyboardAvoidingView>
  );
}
