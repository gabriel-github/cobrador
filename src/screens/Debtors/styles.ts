import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";
import { BorderlessButton } from "react-native-gesture-handler";

import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";

import { FlatList } from "react-native";

interface ServicesListProps {
  id: string;
  name: string;
  amount: string;
  date: string;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.attention};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(18)}px;

  background-color: ${({ theme }) => theme.colors.attention};

  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
`;

export const InputWrapper = styled.View`
  width: 80%;
`;

export const SearchWrapper = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 0 24px;
  margin-top: ${getStatusBarHeight() + RFValue(28)}px;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Photo = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;

  border-radius: 10px;
`;

export const User = styled.View`
  margin-left: 17px;
`;

export const UserGreeting = styled.Text`
  color: ${({ theme }) => theme.colors.shape};

  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const UserName = styled.Text`
  color: ${({ theme }) => theme.colors.shape};

  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const SearchButton = styled(BorderlessButton)`
  padding: 16px 18px;
  background-color: ${({ theme }) => theme.colors.secondary};

  border-radius: 5px;

  margin-bottom: 8px;
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.shape};

  font-size: ${RFValue(24)}px;
`;

export const HighlightCards = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingHorizontal: 24,
  },
})`
  width: 100%;
  position: absolute;
  margin-top: ${RFPercentage(20)}px;
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
