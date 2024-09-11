import React from "react";
import { View, Text , StyleSheet} from "react-native";


const ItemDisplay=()=>{
return(
    <View style={styles.ItemDisplay}>
        <Text>este es item display</Text>
    </View>
)
}
const styles = StyleSheet.create({
    ItemDisplay: {
        flex: 1,
        justifyContent: 'center', // Centra verticalmente
        alignItems: 'center', // Centra horizontalmente
        backgroundColor: '#fff', // O el color que prefieras
    },
});
export default ItemDisplay;