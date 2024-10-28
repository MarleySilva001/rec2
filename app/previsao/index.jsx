import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, SafeAreaView, StyleSheet } from 'react-native';
import { AppContext } from '../../scripts/appContext'


const telaPrevisao = () => {
    const {cidade, setCidade} = useContext(AppContext)
    const [tempo, setTempo] = useState();

    const obterPrevisaoDoTempo = async () => {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=bddbeed6a893cf7d820e74ae7f9cb95e`)
        .then((resposta) => resposta.json())
        .then((dados) => setTempo(dados))
            .catch(() => console.log('Aconteceu um erro ao buscar os dados.'));
    };

    useEffect(() => {
        obterPrevisaoDoTempo()
      }, []); 

    return (
            <View style={styles.container}>
                {tempo ? (
                    <View style={styles.tempoView}>
                       <Text style={styles.title}>{tempo.name}</Text>
                       <Text style={styles.p}>Temperatura: {(tempo.main.temp - 273.15).toFixed(2)}°C</Text>
                       <Text style={styles.p}>Velocidade dos ventos: {tempo.wind.speed}km/h</Text>
                       <Text style={styles.p}>umidade: {tempo.main.humidity}%</Text>
                       <Text style={styles.p}>Clima: {tempo.weather[0].main}</Text>
                    </View>
                ) : <></>}
            </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    tempoView:{
        padding: 16,
        width: 300,
        backgroundColor: '#f2f2f2',
        borderRadius: 20
    },
    title:{
        fontSize: 22,
        fontWeight: 'bold'
    },
    p: {
        fontSize: 16
    }
})

export default telaPrevisao;