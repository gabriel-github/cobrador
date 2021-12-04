import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import { useTheme } from "styled-components";
import { Input } from "../../components/Form/Input";
import { ServiceCard } from "../../components/ServiceCard";
import { isAfter } from "date-fns";
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
import { Register } from "../Register";

interface ServicesListProps {
  id: string;
  name: string;
  amount: string;
  dateFormatted: string;
}

interface Client {
  id: string;
  name: string;
  amount: string;
  date: Date;
  work: string;
  dateFormatted: string;
  expires: Date;
}

export function Debtors() {
  const [dataDebtors, setDataDebtors] = useState<Client[]>([]);
  const [debtors, setDebtors] = useState<Client[]>([]);
  const [searchDebtors, setSearchDebtors] = useState("");

  const storageKey = "@services:cobrador";

  async function checkDebtors() {
    try {
      const data = await AsyncStorage.getItem(storageKey);
      const storageData: Client[] = data ? JSON.parse(data) : [];

      const storageDebtors = storageData.filter((item) => {
        const date = new Date(item.expires);

        if (isAfter(new Date(), date)) {
          return item;
        }
      });

      setDataDebtors(storageDebtors);
      setDebtors(storageDebtors);
    } catch (error) {
      console.log(error);
    }
  }

  function handleSearchClient() {
    const filteredClients = dataDebtors.filter((data) => {
      if (data.name.includes(searchDebtors)) {
        return data;
      }
    });

    setDebtors(filteredClients);
  }

  async function handleUpdateDataStorage() {
    await checkDebtors();
  }

  useFocusEffect(
    useCallback(() => {
      checkDebtors();
    }, [])
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <SearchWrapper>
            <InputWrapper>
              <Input onChangeText={setSearchDebtors} />
            </InputWrapper>

            <SearchButton onPress={handleSearchClient}>
              <Icon name="search" color="black" />
            </SearchButton>
          </SearchWrapper>
        </Header>

        <Services>
          <Title>
            {debtors.length > 0
              ? `${debtors.length} Devedores`
              : "Nenhum devedor"}
          </Title>

          <ServicesList
            data={debtors}
            keyExtractor={(item: ServicesListProps) => item.id}
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
