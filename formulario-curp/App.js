import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';


const Formulario = () => {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [curp, setCurp] = useState('');
  const [mensajeError, setMensajeError] = useState('');

  const guardarDatos = () => {
    if (nombre && telefono && curp) {
      // Creamos un objeto con los datos del usuario
      const usuario = { nombre, telefono, curp };
      // Guardamos los datos en Firebase
      firebase.database().ref('usuarios/').push(usuario);
      // Reseteamos el formulario
      setNombre('');
      setTelefono('');
      setCurp('');
      setMensajeError('');
    } else {
      setMensajeError('Por favor ingrese su nombre, teléfono y CURP.');
    }
  };

  const validarCurp = (curp) => {
    if (curp.length !== 18) {
      setMensajeError('La CURP debe contener 18 caracteres.');
      return false;
    } else if (!/^[A-ZÑ&]{4}\d{6}[HM]{1}[A-Z]{5}[A-Z\d]{2}$/.test(curp)) {
      setMensajeError('La CURP debe contener letras mayúsculas y números en el formato correcto.');
      return false;
    } else {
      setMensajeError('');
      return true;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre:</Text>
      <TextInput style={styles.input} value={nombre} onChangeText={setNombre} />
      <Text style={styles.label}>Teléfono:</Text>
      <TextInput style={styles.input} value={telefono} onChangeText={setTelefono} />
      <Text style={styles.label}>CURP:</Text>
      <TextInput
        style={styles.input}
        value={curp}
        onChangeText={(text) => {
          setCurp(text.toUpperCase());
          validarCurp(text.toUpperCase());
        }}
      />
      {mensajeError ? <Text style={styles.error}>{mensajeError}</Text> : null}
      <Button title="Guardar" onPress={guardarDatos} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
});

export default Formulario;

