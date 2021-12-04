import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useForm } from "react-hook-form";
import { Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
import uuid from "react-native-uuid";
import * as yup from "yup";
import { Button } from "../../components/Form/Button";
import { InputForm } from "../../components/Form/InputForm";
import { Container, Fields, Form, Header, Title } from "./styles";

interface FormData {
  name: string;
  amount: string;
  work: string;
}

const schema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  amount: yup
    .number()
    .typeError("informe um valor numérico")
    .positive("O valor não pode ser negativo")
    .required("O valor é obrigatório"),
  work: yup.string().required("Serviço é obrigatório"),
});

type NavigationProps = {
  navigate: (screen: string) => void;
};

interface Client {
  id: string;
  name: string;
  amount: string;
  date: Date;
  work: string;
  dateFormatted: string;
  expires: Date;
}

export function Register() {
  const navigation = useNavigation<NavigationProps>();
  const storageKey = "@services:cobrador";

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function handleRegister(form: FormData) {
    try {
      const data = await AsyncStorage.getItem(storageKey);
      const storageData = data ? JSON.parse(data) : [];

      const dateInitial = new Date();
      const expires = new Date();

      const newClient = {
        id: String(uuid.v4()),
        name: form.name,
        amount: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(Number(form.amount)),
        work: form.work,
        date: dateInitial,
        expires: expires.setDate(expires.getDate() + 62),
        expiresDateFormatted: new Intl.DateTimeFormat("pt-BR").format(
          new Date(expires.setDate(expires.getDate() + 62))
        ),
        dateFormatted: new Intl.DateTimeFormat("pt-BR").format(dateInitial),
      };

      const updatedClients = [...storageData, newClient];

      await AsyncStorage.setItem(storageKey, JSON.stringify(updatedClients));

      navigation.navigate("Clientes");
      reset();
    } catch (err) {
      console.log(err);
      Alert.alert("Não foi possível salvar a transação");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />

            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />

            <InputForm
              name="work"
              control={control}
              placeholder="Serviço"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.work && errors.work.message}
            />
          </Fields>

          <Button onPress={handleSubmit(handleRegister)} title="Enviar" />
        </Form>
      </Container>
    </TouchableWithoutFeedback>
  );
}
