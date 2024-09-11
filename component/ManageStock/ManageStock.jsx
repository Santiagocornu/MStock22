import React from "react";
import { View, Text, StyleSheet , TouchableOpacity  } from "react-native";
import ItemDisplay from "../ItemDisplay/ItemDisplay";
import { useNavigation } from '@react-navigation/native';

const ManageStock=()=>{
    const navigation = useNavigation(); // Get navigation from context

    const HandleItemAddPress = () => {
        navigation.navigate('ItemAdd');
    };

return(
    <View style={styles.ManageStock}>
        <TouchableOpacity style={styles.ButtonAñadirProducto} onPress={HandleItemAddPress}><Text>Añadir Producto +</Text></TouchableOpacity>
        <ItemDisplay></ItemDisplay>
    </View>
)
}
const styles = StyleSheet.create({
    ManageStock: {
        flex: 1,
        justifyContent: 'center', // Centra verticalmente
        backgroundColor: '#fff', // O el color que prefieras
    },

    ButtonAñadirProducto:{
        backgroundColor:'green',
        padding:16,
        margin:0
    }
});
export default ManageStock;