import React from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
const LoginScreen = ({navigation}) => {
  // Define the validation schema using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  });

  // Handle form submission
  const handleSubmit = values => {
    console.log('values');
    //find user in firestore for login

    firestore()
      .collection('users')
      .where('email', '==', values.email)
      .get()
      .then(async res => {
        console.log(res.docs[0].data());
        if (
          res.docs[0].data().password === values.password &&
          res.docs[0].data().email === values.email
        ) {
          alert('Login success');
          await AsyncStorage.setItem(
            'email',
            JSON.stringify(res.docs[0].data().email),
          );
          await AsyncStorage.setItem(
            'password ',
            JSON.stringify(res.docs[0].data().password),
          );
          navigation.navigate('MainScreen');
        }
      })
      .catch(err => {
        console.log(err);
        alert('Something went wrong');
      });

    // Simulate API call or perform form submission logic
    // setTimeout(() => {
    //   alert(JSON.stringify(values, null, 2));
    // }, 400);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Page</Text>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            <Button onPress={handleSubmit} title="Submit" />
          </View>
        )}
      </Formik>
      <Text onPress={() => navigation.navigate('SignUpScreen')}>
        SignUpScreen
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen;
