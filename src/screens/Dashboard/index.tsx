import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { isAfter } from "date-fns";
import React, { useCallback, useState } from "react";
import { Keyboard } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Input } from "../../components/Form/Input";
import { ServiceCard } from "../../components/ServiceCard";
import {
  Container,
  Header,
  Icon,
  InputWrapper,
  SearchButton,
  SearchWrapper,
  Services,
  ServicesList,
  Title,
} from "./styles";

interface Client {
  id: string;
  name: string;
  amount: string;
  date: Date;
  work: string;
  dateFormatted: string;
  expires: Date;
}

export function Dashboard() {
  const [searchClient, setSearchClient] = useState("");
  const [dataClients, setDataClients] = useState<Client[]>([]);
  const [clients, setClients] = useState<Client[]>([]);

  const storageKey = "@services:cobrador";

  async function loadData() {
    try {
      const data = await AsyncStorage.getItem(storageKey);
      const storageData: Client[] = data ? JSON.parse(data) : [];

      const storageClients = storageData.filter((item) => {
        const date = new Date(item.expires);

        if (!isAfter(new Date(), date)) {
          return item;
        }
      });

      setDataClients(storageClients);
      setClients(storageClients);
    } catch (error) {
      console.log(error);
    }
  }

  function handleSearchClient() {
    const filteredClients = dataClients.filter((data) => {
      if (data.name.includes(searchClient)) {
        return data;
      }
    });

    setClients(filteredClients);
  }

  async function handleUpdateDataStorage() {
    await loadData();
  }

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      style={{ height: "100%" }}
    >
      <Container>
        <Header>
          <SearchWrapper>
            <InputWrapper>
              <Input onChangeText={setSearchClient} />
            </InputWrapper>

            <SearchButton onPress={handleSearchClient}>
              <Icon name="search" color="black" />
            </SearchButton>
          </SearchWrapper>
        </Header>

        <Services>
          <Title>
            {clients.length > 0
              ? clients.length == 1
                ? `${clients.length}  Cliente`
                : `${clients.length}  Clientes`
              : "Nenhum cliente"}
          </Title>

          <ServicesList
            data={clients}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ServiceCard
                data={item}
                handleUpdateDataStorage={handleUpdateDataStorage}
              />
            )}
          />
        </Services>
      </Container>
    </TouchableWithoutFeedback>
  );
}
