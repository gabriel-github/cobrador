import { useFocusEffect } from "@react-navigation/native";
import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";

interface ServiceContextData {
  clients: Client[];
  debtors: Client[];
  addClient: (newClient: Client) => void;
  checkDebtors: () => void;
}

interface ServiceProviderProps {
  children: React.ReactNode;
}

interface Client {
  id: string;
  name: string;
  amount: string;
  date: Date;
  dateFormatted: string;
  expires: Date;
}

const ServiceContext = createContext({} as ServiceContextData);

export function ServiceProvider({ children }: ServiceProviderProps) {
  const [clients, setClients] = useState<Client[]>([]);
  const [debtors, setDebtors] = useState<Client[]>([]);

  function addClient(newClient: Client) {
    setClients((oldClients) => [...oldClients, newClient]);
  }

  function checkDebtors() {
    clients.map((client) => {
      if (client.expires.getTime() - client.date.getTime() < 1) {
        setDebtors((oldDebtors) => [...oldDebtors, client]);
      }
    });
  }

  return (
    <ServiceContext.Provider
      value={{
        addClient,
        clients,
        debtors,
        checkDebtors,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
}

export const useService = () => useContext(ServiceContext);
