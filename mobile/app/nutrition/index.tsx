import { 
    View,
    Text,
    StyleSheet,
    Pressable,
    ScrollView,
    Platform, 
    StatusBar,
    Share
} from 'react-native';
import { Link, router } from 'expo-router';

import { colors } from "@/constants/colors";
import { Ionicons, Feather } from '@expo/vector-icons';

import { useDataStore } from '@/store/data';
import { Data } from '@/types/data';

interface ResponseData{
    data: Data;
}

import { api } from '@/services/api';
import { useQuery } from '@tanstack/react-query';

export default function Nutrition() {

    const user = useDataStore(state => state.user)

    const { data, isFetching, error } = useQuery({
        queryKey: ["nutrition"],
        queryFn: async () => {
            try{
                if(!user){
                    throw new Error("Filed load nutrition")
                }

                const response = await api.post<ResponseData>("/create", {
                    name: user.name,
                    age: user.age,
                    gender: user.gender,
                    height: user.height,
                    weight: user.weight,
                    objective: user.objective,
                    level: user.level
                })

                return response.data.data
            }catch (error){
                console.log(error)
            }
        }
    });

    async function handleShare(){
        try {
            if(data && Object.keys(data).length == 0) return;

            const supllements = `${data?.suplementos.map( item => ` ${item}` )}`;

            const foods = `${data?.refeicoes.map( item => 
                `
                    \n- Período: ${item.nome};
                    \n- Horário: ${item.horario};
                    \n- Alimentos: ${item.alimentos.map(alimento => ` ${alimento}`)}.
                `)}`

            const message = `Dieta: ${data?.nome} - Objetivo: ${data?.objetivo}\n\n${foods}\n\n- Dica Suplemento: ${supllements}`;

            await Share.share({
                message: message
            })
        }catch(error) {
            return(
                <View style={styles.loading}>
                    <Text style={styles.loadingTextError}>
                        Falha ao compatilhar dieta!
                    </Text>
                    <Link href="/">
                        <Text style={styles.loadingText}>
                            Tente novamente :(
                        </Text>
                    </Link>
                </View>
            )
        }
    }

    if(isFetching){
        return(
            <View style={styles.loading}>
                <Text style={styles.loadingText}>
                    Estamos gerando sua dieta!
                </Text>
                <Text style={styles.loadingText}>
                    Consultando IA...
                </Text>
            </View>
        )
    }

    if(error){
        return(
            <View style={styles.loading}>
                <Text style={styles.loadingTextError}>
                    Falha ao carregar dieta!
                </Text>
                <Link href="/">
                    <Text style={styles.loadingText}>
                        Tente novamente :(
                    </Text>
                </Link>
            </View>
        )
    }

    return (
    <View style={styles.container}>
        <View style={styles.containerHeader}>
            <View style={styles.contentHeader}>
                <Text style={styles.title}>
                    Minha dieta
                </Text>

                <Pressable style={styles.buttonShare} onPress={handleShare}>
                    <Text style={styles.buttonShareText}>
                        Compatilhar
                    </Text>
                </Pressable>
            </View>
        </View>

        <View style={styles.content}>
            {data && Object.keys(data).length > 0 && (
                <>
                    <Text style={styles.name}>
                        Nome: {data.nome}
                    </Text>
                    <Text style={styles.objective}>
                        Foco: {data.objetivo}
                    </Text>

                    <Text style={styles.label}>
                        Refeições:
                    </Text>

                    <ScrollView>
                        <View style={styles.foods}>
                            {data.refeicoes.map( (refeicao) => (
                                <View key={refeicao.nome} style={styles.food}>
                                    <View style={styles.foodHeader}>
                                        <Text style={styles.foodName}>
                                            {refeicao.nome}
                                        </Text>
                                        <Ionicons name='restaurant' size={16} color={colors.black}/>
                                    </View>
                                    <View style={styles.foodContent}>
                                        <Feather name='clock' size={14} color={colors.black}/>
                                        <Text>{refeicao.horario}</Text>
                                    </View>

                                    <Text style={styles.foodText}>Alimentos: </Text>
                                    {refeicao.alimentos.map(alimento => (
                                        <Text key={alimento}>{alimento}</Text>
                                    ))}
                                </View>
                            ))}
                        </View>

                        <View style={styles.supplements}>
                            <Text style={styles.foodName}>Dicas suplementos:</Text>
                            {data.suplementos.map( item => (
                                <Text key={item}>{item}</Text>
                            ))}
                        </View>

                        <Pressable style={styles.button} onPress={() => router.replace("/")}>
                            <Text style={styles.buttonText}>
                                Gerar nova dieta
                            </Text>
                        </Pressable>
                    </ScrollView>
                </>
            )}
        </View>
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
        paddingRight: 16,
        flex: 1
    },
    loading:{
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingText:{
        fontSize: 18,
        color: colors.white,
        marginBottom: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingTextError:{
        fontSize: 18,
        backgroundColor: colors.white,
        color: 'red',
        borderRadius: 8,
        padding: 14,
        marginBottom: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerHeader:{
        backgroundColor: colors.white,
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight! + 34 : 34,
        paddingBottom: 20,
        marginBottom: 16
    },
    contentHeader:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 16,
    },
    title:{
        fontSize: 28,
        color: colors.background,
        fontWeight: 'bold'
    },
    buttonShare:{
        backgroundColor: colors.blue,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        borderRadius: 4
    },
    buttonShareText:{
        color: colors.white,
        fontWeight: '500'
    },
    name:{
        fontSize: 20,
        color: colors.white,
        fontWeight: 'bold',
    },
    objective:{
        fontSize: 16,
        color: colors.white,
        marginBottom: 24
    },
    label:{
        fontSize: 16,
        color: colors.white,
        fontWeight: 'bold'
    },
    foods:{
        backgroundColor: colors.white,
        padding: 14,
        borderRadius: 8,
        marginTop: 8,
        gap: 8
    },
    food:{
        backgroundColor: 'rgba(208, 208, 208, 0.40)',
        padding: 8,
        borderRadius: 4,
    },
    foodHeader:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4
    },
    foodName:{
        fontSize: 16,
        fontWeight: 'bold',
    },
    foodContent:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4
    },
    foodText:{
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 14,
        marginBottom: 4
    },
    supplements:{
        backgroundColor: colors.white,
        marginTop: 14,
        marginBottom: 14,
        padding: 14,
        borderRadius: 8
    },
    button:{
        backgroundColor: colors.blue,
        width: '100%',
        height: 40,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    buttonText:{
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold'
    },
})