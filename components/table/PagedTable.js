import { useState, useContext, useEffect } from 'react';
import Children from 'react-children-utilities';
import styled from 'styled-components';
import { ThemeContext } from '../../context/theme.context';
import {
  breakpointWidth,
  colors, fontSize, fontWeight, getFontSize,
} from '../../utils/themes/vars';
import { Column, Grid } from '../grid/Grid';
import TextStyle from '../_base/TextStyles';
import Button from '../button/Button';
import { t } from '../../utils';
import Icon from '../_base/Icon';
import Select from '../form/Select';
import Input from '../form/Input';
import BaseComponent from '../BaseComponent';

const StyledTableWrapper = styled.div`
  margin: ${(props) => props.theme.baseSpacingSize * 4}px 0 ${(props) => props.theme.baseSpacingSize * 2}px;
`;

const StyledTable = styled.table`
  border: none;
  width: 100%;
  border-collapse: separate !important;

  thead tr {
    padding-top: 0 !important;
  }
`;

const StyledTR = styled.tr`
  &:hover td {
    background-color: ${colors['gray-lightest']};
  }

  @media (max-width: ${breakpointWidth}px) {
    border-bottom: 1px solid ${(props) => props.theme.borderColor} !important;
  }
`;

const StyledTH = styled.th`
  background-color: ${colors['gray-lightest']};
  border: 1px solid ${(props) => props.theme.borderColor};

  @media (min-width: ${breakpointWidth}px) {
    border-left: none;
    border-right: none;

    &:first-child {
      border-left: 1px solid ${(props) => props.theme.borderColor};
      border-top-left-radius: ${(props) => props.theme.baseBorderRadiusSmall}px;
      border-bottom-left-radius: ${(props) => props.theme.baseBorderRadiusSmall}px;
    }
  
    &:last-child {
      border-right: 1px solid ${(props) => props.theme.borderColor};
      border-top-right-radius: ${(props) => props.theme.baseBorderRadiusSmall}px;
      border-bottom-right-radius: ${(props) => props.theme.baseBorderRadiusSmall}px;
    }
  }
  
  @media (max-width: ${breakpointWidth}px) {
    border-top: none;
    border-bottom: none;

    &:first-child {
      border-top: 1px solid ${(props) => props.theme.borderColor} !important;
      border-top-left-radius: ${(props) => props.theme.baseBorderRadiusSmall}px;
      border-top-right-radius: ${(props) => props.theme.baseBorderRadiusSmall}px;
    }
  
    &:last-child {
      border-bottom: 1px solid ${(props) => props.theme.borderColor} !important;
      border-bottom-left-radius: ${(props) => props.theme.baseBorderRadiusSmall}px;
      border-bottom-right-radius: ${(props) => props.theme.baseBorderRadiusSmall}px;
    }
  }
  
  cursor: pointer;
  margin: 0;
  padding: ${(props) => props.theme.baseSpacingSize * 1.25}px ${(props) => props.theme.baseSpacingSize * 2}px;

  font-size: ${(props) => getFontSize(props.theme, fontSize.small)}px;
  font-weight: ${fontWeight.medium};
  color: ${colors['gray-500']};
`;

const StyledTD = styled.td`
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  margin: 0;
  padding: ${(props) => props.theme.baseSpacingSize}px ${(props) => props.theme.baseSpacingSize * 2}px;

  @media (max-width: ${breakpointWidth}px) {
    border-bottom: none;

    &:last-child {
      border-bottom: none;
    }
  }
`;

const StyledTableFooter = styled.div`
`;

export default function PagedTable(props = {
  columns: [],
  rows: [],
}) {
  const rowsLimits = [10, 25, 50, 100];
  const [state, setState] = useState({
    currentPage: 1,
    rows: props.rows,
    rowsPerPage: rowsLimits[0],
    sorting: {
      key: null,
      direction: null,
    },
    search: null,
  });

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      rows: props.rows,
    }));
  }, [props.rows]);

  const { theme } = useContext(ThemeContext);

  return <>
    <StyledTableWrapper theme={theme}>
      {props.rows.length > rowsLimits[0] && <BaseComponent marginBottom={1}>
        <Input
          noMargin
          placeholder={t('common.typeToSearch')}
          icon={'search'}
          shortcut={'k'}
          onChange={(e) => {
            if (!e.target.value) {
              setState((prevState) => ({
                ...prevState,
                rows: props.rows,
                currentPage: 1,
                search: null,
              }));
              return;
            }

            setState((prevState) => ({
              ...prevState,
              rows: props.rows.filter((row) => {
                const search = e.target.value.toLowerCase();
                return Object.values(row)
                  .map(Children.onlyText)
                  .join(' ')
                  .toLowerCase()
                  .includes(search);
              }),
              currentPage: 1,
              search: e.target.value || null,
            }));
          }

          }
        />
      </BaseComponent>}
      <StyledTable theme={theme}>
        <thead>
          <tr>
            {props.columns.map((column, index) => (
              <StyledTH theme={theme} key={index} onClick={() => {
                setState((prevState) => ({
                  ...prevState,
                  currentPage: 1,
                  sorting: {
                    ...prevState.sorting,
                    ...((state.sorting.key === column.key) ? {
                      direction: prevState.sorting.direction === 'asc' ? 'desc' : 'asc',
                    } : {
                      key: column.key,
                      direction: 'asc',
                    }),
                  },
                }));
              }}>
                {column.label}

                {state.sorting.key === column.key && <>
                  &nbsp;
                  <Icon
                    iconFamily="duotone"
                    iconName={state.sorting.direction === 'asc' ? 'sort-up' : 'sort-down'} />
                </>}
              </StyledTH>
            ))}
          </tr>
        </thead>
        <tbody>
          {state.rows.length === 0 && <tr>
            <td colSpan={props.columns.length}>
              <TextStyle muted center>
                {t('common.noEntries')}
              </TextStyle>
            </td>
          </tr>}
          {state.rows
            .sort((a, b) => {
              if (state.sorting.key === null) return 0;
              const aKey = typeof a[state.sorting.key] === 'object' && !(a[state.sorting.key] instanceof Date)
                ? Children.onlyText(a[state.sorting.key])
                : a[state.sorting.key];
              const bKey = typeof b[state.sorting.key] === 'object' && !(b[state.sorting.key] instanceof Date)
                ? Children.onlyText(b[state.sorting.key])
                : b[state.sorting.key];
              if (aKey < bKey) { return state.sorting.direction === 'asc' ? -1 : 1; }
              if (aKey > bKey) { return state.sorting.direction === 'asc' ? 1 : -1; }
              return 0;
            })
            .slice(
              (state.currentPage - 1) * state.rowsPerPage,
              state.currentPage * state.rowsPerPage,
            ).map((row, index) => (<StyledTR theme={theme} key={index}>
              {props.columns.map((column, index2) => (<StyledTD theme={theme} key={index2}>
                {row[column.key] instanceof Date
                  ? row[column.key].toLocaleDateString(t('currentLocale'), {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  }) : row[column.key]}
              </StyledTD>))}
            </StyledTR>))}
        </tbody>
      </StyledTable>
    </StyledTableWrapper>

    <StyledTableFooter theme={theme}>
      <Grid spaced>
        <Column size={6}>
          <BaseComponent style={{ float: 'left' }}>
            <TextStyle small marginTop={-1}>
              <Select items={rowsLimits
                .filter((limit, i) => i === 0 || rowsLimits[i - 1] <= props.rows.length)
                .map((limit) => ({
                  key: limit,
                  label: limit,
                  selected: limit === state.rowsPerPage,
                }))}
                disabled={rowsLimits
                  .filter((limit, i) => i === 0 || rowsLimits[i - 1] <= state.rows.length)
                  .length === 1}
                onChange={(event) => setState({
                  ...state,
                  currentPage: 1,
                  rowsPerPage: parseInt(event.target.value, 10),
                })}
              />
            </TextStyle>
          </BaseComponent>
          <TextStyle small marginLeft={1} marginTop={1.25}>
            {t('common.perPage')}
          </TextStyle>
        </Column>
        <Column size={6}>
          <TextStyle center rightOnDesktop>
            <Button
              style={{
                paddingLeft: theme.baseSpacingSize * 2,
                paddingRight: theme.baseSpacingSize * 2,
              }}
              disabled={state.currentPage === 1}
              onClick={() => setState({ ...state, currentPage: 1 })}
              noMargin
              buttonStyle={'flat'}>
              <Icon style={{ right: 0 }} iconName="angles-left" />
            </Button>
            <Button
              style={{
                paddingLeft: theme.baseSpacingSize * 2,
                paddingRight: theme.baseSpacingSize * 2,
              }}
              disabled={state.currentPage === 1}
              onClick={() => setState({ ...state, currentPage: state.currentPage - 1 })}
              noMargin
              buttonStyle={'flat'}>
              <Icon style={{ right: 0 }} iconName="angle-left" />
            </Button>
            <TextStyle paddingX={2} small muted="medium">
              {t('common.XofY', {
                x: state.rows.length === 0 ? 0 : state.currentPage,
                y: Math.ceil(state.rows.length / state.rowsPerPage),
              })}
            </TextStyle>
            <Button
              style={{
                paddingLeft: theme.baseSpacingSize * 2,
                paddingRight: theme.baseSpacingSize * 2,
              }}
              disabled={state.rows.length === 0
                || state.currentPage === Math.ceil(state.rows.length / state.rowsPerPage)}
              onClick={() => setState({ ...state, currentPage: state.currentPage + 1 })}
              noMargin
              buttonStyle={'flat'}>
              <Icon style={{ right: 0 }} iconName="angle-right" />
            </Button>
            <Button
              style={{
                paddingLeft: theme.baseSpacingSize * 2,
                paddingRight: theme.baseSpacingSize * 2,
              }}
              disabled={state.rows.length === 0
                || state.currentPage === Math.ceil(state.rows.length / state.rowsPerPage)}
              onClick={() => setState({
                ...state,
                currentPage: Math.ceil(state.rows.length / state.rowsPerPage),
              })}
              noMargin
              buttonStyle={'flat'}>
              <Icon style={{ right: 0 }} iconName="angles-right" />
            </Button>
          </TextStyle>
        </Column>
      </Grid>
    </StyledTableFooter>
  </>;
}
