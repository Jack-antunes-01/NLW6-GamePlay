import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useState, useCallback } from "react";
import { View, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { styles } from "./styles";

import { Appointment, AppointmentProps } from "../../components/Appointment";
import { Background } from "../../components/Background";
import { ButtonAdd } from "../../components/ButtonAdd";
import { CategorySelect } from "../../components/CategorySelect";
import { ListDivider } from "../../components/ListDivider";
import { ListHeader } from "../../components/ListHeader";
import { Profile } from "../../components/Profile";
import { COLLECTION_APPOINTMENTS } from "../../configs/database";
import { Loading } from "../../components/Loading";

export function Home() {
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);

  const navigation = useNavigation();

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory("") : setCategory(categoryId);
  }

  function handleAppointmentDetails(guildSelected: AppointmentProps) {
    navigation.navigate("AppointmentDetails", { guildSelected });
  }

  function handleAppointmentCreate() {
    navigation.navigate("AppointmentCreate");
  }

  async function loadAppointments() {
    setLoading(true);

    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);

    const storageData: AppointmentProps[] = storage ? JSON.parse(storage) : [];

    if (category) {
      setAppointments(storageData.filter((item) => item.category === category));
    } else {
      setAppointments(storageData);
    }

    setLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadAppointments();
    }, [category])
  );

  return (
    <Background>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd onPress={handleAppointmentCreate} />
      </View>

      <CategorySelect
        categorySelected={category}
        setCategory={handleCategorySelect}
      />

      <ListHeader
        title="Partidas agendadas"
        subtitle={`Total ${appointments.length}`}
      />

      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Appointment
              data={item}
              onPress={() => handleAppointmentDetails(item)}
            />
          )}
          style={styles.matches}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 69 }}
          ItemSeparatorComponent={() => <ListDivider />}
        />
      )}
    </Background>
  );
}
