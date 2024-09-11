import React from "react";
import { View, Text , StyleSheet} from "react-native";


const ManageEnvoice=()=>{
return(
    <View style={styles.ManageEnvoice}>
        <Text>este es el controlador de pedidos</Text>
    </View>
)
}
const styles = StyleSheet.create({
    ManageEnvoice: {
        flex: 1,
        justifyContent: 'center', // Centra verticalmente
        alignItems: 'center', // Centra horizontalmente
        backgroundColor: '#fff', // O el color que prefieras
    },
});
export default ManageEnvoice;