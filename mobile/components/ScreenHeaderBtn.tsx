import React from "react";
import { TouchableOpacity, View } from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";

interface ScreenHeaderBtnProps {
  onPress: () => void;
  icon: string;
}

const ScreenHeaderBtn: React.FC<ScreenHeaderBtnProps> = ({ onPress, icon }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <AntIcon name={icon} color="#ffd93b" size={25} />
      </View>
    </TouchableOpacity>
  );
};

export default ScreenHeaderBtn;
