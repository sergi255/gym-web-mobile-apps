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
  pickerInput: {
    width: '100%',
  },
  pickerItem: {
    backgroundColor: '#6422b8',
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
  actionButton: {
    width: '200%',
    height: 30,
    paddingTop: 3,
    marginRight: 3,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  actionButtonView: {
    marginRight: 30,
  },
  buttonText: {
    fontSize: 18,
    color: '#ffd93b',
  },
  box: {
    backgroundColor: '#6422b8',
    width: '80%',
    height: '50%',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 7,
  },
  boxHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
    borderRadius: 8,
    height: '12%',
    backgroundColor: '#ffd93b',
    marginTop: '4%',
  },
  headerText: {
    fontSize: 24,
    color: '#6422b8',
    fontWeight: 'bold',
  },
  tableContainer: {
    marginTop: '4%',
    backgroundColor: '#6422b8',
    padding: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tableCellHeader: {
    color: '#ffd93b',
    fontWeight: 'bold',
  },
  tableCellData: {
    marginLeft: 7,
    color: '#ffd93b',
  },
  exerciseItem: {
    backgroundColor: '#6422b8',
    padding: 12,
    marginTop: 12,
    borderRadius: 8,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly'
  },
  column: {
    flex: 1,
    alignItems: 'center'
  },  
});