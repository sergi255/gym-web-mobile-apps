import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffd93b',
    width: '100%',
    height: '100%',
  },
  label: {
    color: '#ffd93b',
    fontSize: 24,
    marginBottom: 8,
  },
  header: {
    color: '#6422b8',
    fontSize: 48,
    marginBottom: 8,
    marginTop: 16,
    fontWeight: 'bold',
  },
  minorHeader: {
    color: '#6422b8',
    fontSize: 32,
    marginBottom: 8,
    marginTop: 8,
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
  button: {
    width: '80%',
    height: 40,
    backgroundColor: '#6422b8',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    color: '#ffd93b',
  },
});