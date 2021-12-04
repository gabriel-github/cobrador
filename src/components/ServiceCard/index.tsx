import AsyncStorage from "@react-native-async-storage/async-storage";

import React from "react";
import {
  Amount,
  Category,
  CategoryName,
  Container,
  Date,
  Footer,
  Icon,
  Title,
  Header,
  ServiceInfo,
  CrudIcons,
  IconsCrud,
  ButtonIcon,
} from "./styles";

export interface ServiceCardProps {
  id: string;
  name: string;
  amount: string;
  work: string;
  dateFormatted: string;
}

interface Props {
  data: ServiceCardProps;
  handleUpdateDataStorage: () => Promise<void>;
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

export function ServiceCard({ data, handleUpdateDataStorage }: Props) {
  const storageKey = "@services:cobrador";

  async function handleDelete(id: string) {
    try {
      const data = await AsyncStorage.getItem(storageKey);
      const storageData: Client[] = data ? JSON.parse(data) : [];

      const newStorageData = storageData.filter((item) => item.id !== id);

      await AsyncStorage.setItem(storageKey, JSON.stringify(newStorageData));
      await handleUpdateDataStorage();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <Header>
        <ServiceInfo>
          <Title>{data.name}</Title>
          <Amount>{data.amount}</Amount>
        </ServiceInfo>
        <CrudIcons>
          <ButtonIcon>
            <IconsCrud
              name="delete"
              color="red"
              size={24}
              onPress={() => handleDelete(data.id)}
            />
          </ButtonIcon>
        </CrudIcons>
      </Header>

      <Footer>
        <Category>
          <Icon name="build" size={24} />
          <CategoryName>{data.work}</CategoryName>
        </Category>

        <Date>{data.dateFormatted}</Date>
      </Footer>
    </Container>
  );
}
