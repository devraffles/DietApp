import { 
  View,  
  ScrollView,
  Pressable,
  Text, 
  StyleSheet 
} from "react-native";
import { router } from "expo-router";

import { Header } from "@/components/header";
import { Input } from "@/components/input";

import { colors } from "@/constants/colors";

import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useDataStore } from "@/store/data";

const schema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório" }),
  weight: z.string().min(1, { message: "O peso é obrigatório" }),
  age: z.string().min(1, { message: "A idade é obrigatório" }),
  height: z.string().min(1, { message: "A altura é obrigatório" }),
})

type FormData = z.infer<typeof schema>

export default function Step() {

  const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const setPageOne = useDataStore(state => state.setPageOne)

  function handleCreate(data: FormData){
    setPageOne({
      name: data.name,
      age: data.age,
      weight: data.weight,
      height: data.height
    });

    router.push("/create")
  }

  return (
    <View style={styles.container}>
      <Header 
        step="Passo 1"
        title="Vamos Começar"
      />

      <ScrollView style={styles.content}>
        <Input
          title="Nome:" 
          name="name"
          control={control}
          placeholder="Digite o seu nome..."
          error={errors.name?.message }
          keyboardType="default"
        />
        <Input
          title="Idade:" 
          name="age"
          control={control}
          placeholder="Ex: 18"
          error={errors.age?.message }
          keyboardType="numeric"
        />
        <Input
          title="Seu peso atual:" 
          name="weight"
          control={control}
          placeholder="Ex: 75"
          error={errors.weight?.message }
          keyboardType="numeric"
        />
        <Input
          title="Altura:" 
          name="height"
          control={control}
          placeholder="Ex: 1.75"
          error={errors.height?.message }
          keyboardType="numeric"
        />


        <Pressable style={styles.button} onPress={handleSubmit(handleCreate)}>
          <Text style={styles.buttonText}>
            Avançar
          </Text>
        </Pressable>
      

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: colors.background
  },
  content:{
    paddingLeft: 16,
    paddingRight: 16
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