import { 
    View,  
    ScrollView, 
    StyleSheet,
    Pressable,
    Text 
} from "react-native";
import { router } from "expo-router";

import { Header } from "@/components/header";
import { Select } from "@/components/input/select";
import { colors } from "@/constants/colors";

import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useDataStore } from "@/store/data";

const schema = z.object({
    gender: z.string().min(1, { message: "O sexo é obrigatório" }),
    level: z.string().min(1, { message: "Selecione o seu level de atividade física" }),
    objective: z.string().min(1, { message: "A objetivo é obrigatório" }),
})

type FormData = z.infer<typeof schema>

export default function Create() {

    const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const setPageTwo = useDataStore(state => state.setPageTwo)

    const genderOptions = [
        { label: "Masculino", value: "masculino" },
        { label: "Feminino", value: "feminino" },
    ]
    const levelOptions = [
        { label: 'Sedentário (pouco ou nenhuma atividade física)', value: 'Sedentário' },
        { label: 'Levemente ativo (exercícios 1 a 3 vezes na semana)', value: 'Levemente ativo (exercícios 1 a 3 vezes na semana)' },
        { label: 'Moderadamente ativo (exercícios 3 a 5 vezes na semana)', value: 'Moderadamente ativo (exercícios 3 a 5 vezes na semana)' },
        { label: 'Altamente ativo (exercícios 5 a 7 dia por semana)', value: 'Altamente ativo (exercícios 5 a 7 dia por semana)' },
    ]
    const objectiveOptions = [
        { label: 'Emagrecer', value: 'emagrecer' },
        { label: 'Hipertrofia', value: 'Hipertrofia' },
        { label: 'Hipertrofia + Definição', value: 'Hipertrofia e Definição' },
        { label: 'Definição', value: 'Definição' },
    ]

    function handleCreate(data: FormData){
        setPageTwo({
            gender: data.gender,
            level: data.level,
            objective: data.objective
        });

        router.push("/nutrition")
    }

    return (
        <View style={styles.container}>
            <Header 
                step="Passo 2"
                title="Finalizando Dieta"
            />

            <ScrollView style={styles.content}>
                <Select
                    title="Sexo:"
                    placeholder="Selecione o seu sexo..."
                    name="gender"
                    control={control}
                    error={errors.gender?.message}
                    options={genderOptions}
                />
                <Select
                    title="Selecione nível de atividade física:"
                    placeholder="Selecione o seu nível de atividade física..."
                    name="level"
                    control={control}
                    error={errors.level?.message}
                    options={levelOptions}
                />
                <Select
                    title="Selecione seu objetivo:"
                    placeholder="Selecione o seu objetivo..."
                    name="objective"
                    control={control}
                    error={errors.objective?.message}
                    options={objectiveOptions}
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