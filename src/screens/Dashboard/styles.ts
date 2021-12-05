import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";

import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";

import { FlatList } from "react-native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(18)}px;

  background-color: ${({ theme }) => theme.colors.primary};

  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
`;

export const InputWrapper = styled.View`
  width: ${RFPercentage(35)}px;
`;

export const SearchWrapper = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 0 24px;
  margin-top: ${getStatusBarHeight() + RFValue(28)}px;
`;

export const SearchButton = styled(RectButton)`
  padding: 16px 18px;
  background-color: ${({ theme }) => theme.colors.secondary};

  border-radius: 5px;

  margin-bottom: 8px;
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.shape};

  font-size: ${RFValue(24)}px;
`;

export const Services = styled.View`
  flex: 1;
  padding: 0 24px;

  margin-top: ${RFPercentage(4)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.shape};

  margin-bottom: 16px;
`;

export const ServicesList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace(),
  },
})`` as unknown as typeof FlatList;

export const LoadContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
