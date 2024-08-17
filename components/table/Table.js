import { useState, useContext } from 'react';
import {
  Column, Table, AutoSizer, SortDirection,
} from 'react-virtualized';
import { ThemeContext } from '../../context/theme.context';
import 'react-virtualized/styles.css';
import { colors } from '../../utils/themes/vars';
import Alert from '../alert/Alert';
import { t } from '../../utils';

export default function CustomTable(props = {
  height: 320,
  width: 320,
  columns: [],
  rows: [],
}) {
  const { theme } = useContext(ThemeContext);
  const [rowData, setRowData] = useState(props.rows);
  const [currentSortDirection, setCurrentSortDirection] = useState(SortDirection.ASC); // ASC | DESC
  const [currentSortBy, setCurrentSortBy] = useState(props.columns?.[0]?.key);
  let tableRef = null;

  // TODO: Implement auto cell sizing (height)
  // TODO: Custom Scrollbar
  // TODO: Implement components in cells
  // TODO: Sorting Icons
  // TODO: Responsive

  return <>
    <Alert mobileOnly type="warning">{t('common.warning.notReponsive')}</Alert>
    <div style={{
      border: `1px solid ${theme.borderColor}`,
      borderRadius: `${theme.baseBorderRadius}px`,
      overflow: 'hidden',
    }}>
      <AutoSizer {...{
        ...(props.height ? { disableHeight: true } : {}),
        ...(props.width ? { disableWidth: true } : {}),
      }}>
        {({ height, width }) => (
          <Table
            ref={(ref) => { tableRef = ref; }}
            width={props.width || width}
            height={props.height || height}
            headerHeight={26 + theme.baseSpacingSize * 2 + 1}
            overscanRowCount={20}
            rowHeight={26 + theme.baseSpacingSize * 2 + 1}
            rowCount={rowData.length}
            rowGetter={({ index }) => rowData[index]}
            rowStyle={{ alignItems: 'stretch' }}
            sortDirection={currentSortDirection}
            sortBy={currentSortBy}
            sort={({ sortBy, sortDirection }) => {
              setCurrentSortDirection(sortDirection);
              setCurrentSortBy(sortBy);

              const sortedRows = rowData.sort((a, b) => {
                if (a[sortBy] < b[sortBy]) {
                  return -1;
                }
                if (a[sortBy] > b[sortBy]) {
                  return 1;
                }
                return 0;
              });
              if (sortDirection === SortDirection.DESC) {
                sortedRows.reverse();
              }
              setRowData(sortedRows);
              tableRef.forceUpdateGrid();
            }}
          >
            {props.columns.map((column) => (
              <Column
                key={column.key}
                label={column.label}
                dataKey={column.key}
                flexGrow={1}
                width={10}
                headerStyle={{
                  background: colors['gray-50'],
                  borderBottom: `1px solid ${theme.borderColor}`,
                  borderRight: `1px solid ${theme.borderColor}`,
                  margin: '0',
                  padding: `${theme.baseSpacingSize}px ${theme.baseSpacingSize * 2}px`,
                }}
                style={{
                  borderBottom: `1px solid ${theme.borderColor}`,
                  borderRight: `1px solid ${theme.borderColor}`,
                  margin: '0',
                  padding: `${theme.baseSpacingSize}px ${theme.baseSpacingSize * 2}px`,
                }}
                {...column} />
            ))}
          </Table>
        )}
      </AutoSizer>
    </div>
  </>;
}
