import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
const SignupScreen = ({navigation}) => {
  // Define the validation schema using Yup
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });
  // Handle form submission
  const userId = uuid.v4();
  const handleSubmit = values => {
    // Generate random id because i want same document id in firestore in users collection

    try {
      //Add new user to firestore
      firestore().collection('users').doc(userId).set({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
        userId: userId,
      });
      alert('User added!');
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.log(error);
      alert('Something went wrong');
    }
    // Simulate API call or perform form submission logic

    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
    }, 400);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup Page</Text>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              onChangeText={handleChange('firstName')}
              onBlur={handleBlur('firstName')}
              value={values.firstName}
            />
            {errors.firstName && (
              <Text style={styles.error}>{errors.firstName}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Last Name"
              onChangeText={handleChange('lastName')}
              onBlur={handleBlur('lastName')}
              value={values.lastName}
            />
            {errors.lastName && (
              <Text style={styles.error}>{errors.lastName}</Text>
            )}

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

            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
            />
            {errors.confirmPassword && (
              <Text style={styles.error}>{errors.confirmPassword}</Text>
            )}

            <Button onPress={handleSubmit} title="Submit" />
            <TouchableOpacity
              onPress={() => navigation.navigate('LoginScreen')}>
              <Text>Already have an account? Login</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
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

export default SignupScreen;
