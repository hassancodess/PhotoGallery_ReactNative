import {Table, Row, Rows} from 'react-native-table-component';
import {ScrollView, View, StyleSheet} from 'react-native';
const CustomDataTable = ({tableData, tableHead, widthArr}) => {
  return (
    <ScrollView horizontal={true}>
      <View>
        <Table borderStyle={{borderWidth: 1, borderColor: 'white'}}>
          <Row
            data={tableHead}
            widthArr={widthArr}
            style={styles.header}
            textStyle={styles.text}
          />
        </Table>
        <ScrollView style={styles.dataWrapper}>
          <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
            {tableData.map((rowData, index) => (
              <Row
                key={index}
                data={rowData}
                widthArr={widthArr}
                textStyle={styles.rowText}
              />
            ))}
          </Table>
        </ScrollView>
      </View>
    </ScrollView>
  );
};
export default CustomDataTable;

const styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: '#A459D1',
  },
  text: {
    textAlign: 'center',
    fontWeight: '400',
    color: 'white',
  },
  dataWrapper: {
    marginTop: -1,
  },
  row: {
    height: 40,
    flexDirection: 'row',
    backgroundColor: '#E7E6E1',
  },
  rowText: {
    height: 30,
    backgroundColor: '',
    textAlign: 'center',
    fontWeight: '400',
    color: 'black',
  },
});
