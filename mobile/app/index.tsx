import { View, Text, Image, Pressable, StyleSheet } from "react-native";

import { colors } from "@/constants/colors";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/images/dieta.png')}
      />

      <Text style={styles.title}>
        NutriApp<Text style={{color: colors.white}}>.IA</Text> 
      </Text>

      <Text style={styles.text}>
        Sua dieta personalizada com inteligencia artificial
      </Text>

      <Link href="/step" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>
            Gerar Dieta
          </Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16
  },
  image:{
    width: 220,
    height: 220,
    marginBottom: 14
  },
  title:{
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.green
  },
  text:{
    fontSize: 16,
    color: colors.white,
    width: 240,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 8
  },
  button:{
    backgroundColor: colors.blue,
    width: '100%',
    height: 40,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 34,
  },
  buttonText:{
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold'
  },
})