import DataTable, {COL_TYPES} from 'react-native-datatable-component';

const CustomDataTable = ({settings}) => {
  return (
    <DataTable
      data={settings.data}
      colNames={settings.colNames}
      noOfPages={settings.pages}
      colSettings={settings.colSettings}
      backgroundColor={'rgba(23,2,4,0.2)'}
      headerLabelStyle={{color: 'grey', fontSize: 12}}
    />
  );
};
export default CustomDataTable;
