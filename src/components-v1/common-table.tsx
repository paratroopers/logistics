import * as React from "react";
import {Component} from "react";
import {Table, Row, Col} from "antd";
import {PaginationProps} from "antd/lib/pagination";
import {Util} from "../util/util";
import {Constants} from '../util/common';
export declare type RowSelectionType = 'checkbox' | 'radio';
export declare type SelectionSelectFn<T> = (record: T, selected: boolean, selectedRows: Object[]) => any;
export interface SelectionItem {
    key: string;
    text: React.ReactNode;
    onSelect: SelectionItemSelectFn;
}
export declare type SelectionItemSelectFn = (key: string[]) => any;
export interface TableRowSelection<T> {
    type?: RowSelectionType;
    selectedRowKeys?: string[] | number[];
    onChange?: (selectedRowKeys: string[] | number[], selectedRows: Object[]) => any;
    getCheckboxProps?: (record: T) => Object;
    onSelect?: SelectionSelectFn<T>;
    onSelectAll?: (selected: boolean, selectedRows: Object[], changeRows: Object[]) => any;
    onSelectInvert?: (selectedRows: Object[]) => any;
    selections?: SelectionItem[] | boolean;
    hideDefaultSelections?: boolean;
    fixed?: boolean;
}
export enum ColumnLayout {
    /**
     * 左侧图片
     */
    Img = 1,
        /**
         * 左顶部
         */
    LeftTop = 2,
        /**
         * 右顶部
         */
    RightTop = 3,
        /**
         * 左底部
         */
    LeftBottom = 4,
        /**
         * 右底部
         */
    RightBottom = 5,
        /**
         * 操作列
         */
    Option = 6,
        /**
         * 底部
         */
    AllBottom = 7
}
export declare type ColumnFilterItem = {
    text: string;
    value: string;
    children?: ColumnFilterItem[];
};
export interface CommonColumnProps<T> {
    title?: React.ReactNode;
    key?: string;
    dataIndex?: string;
    render?: (text: any, record: T, index: number) => React.ReactNode;
    filters?: ColumnFilterItem[];
    onFilter?: (value: any, record: T) => boolean;
    filterMultiple?: boolean;
    filterDropdown?: React.ReactNode;
    filterDropdownVisible?: boolean;
    onFilterDropdownVisibleChange?: (visible) => void;
    sorter?: boolean | ((a: any, b: any) => number);
    defaultSortOrder?: 'ascend' | 'descend';
    colSpan?: number;
    width?: string | number;
    className?: string;
    fixed?: boolean | ('left' | 'right');
    filterIcon?: React.ReactNode;
    filteredValue?: any[];
    sortOrder?: boolean | ('ascend' | 'descend');
    children?: CommonColumnProps<T>[];
    onCellClick?: (record: T, event: any) => void;
    onCell?: (record: T) => any;
    /**
     * 小屏换行显示，默认从20开始
     * 小于20，将在其它列之前
     * 大于20+N列，在其它列之后
     */
    layout?: number | ColumnLayout;
    hidden?: boolean;
}
export interface TableComponents {
    table?: any;
    header?: {
        wrapper?: any;
        row?: any;
        cell?: any;
    };
    body?: {
        wrapper?: any;
        row?: any;
        cell?: any;
    };
}
export interface SpinProps {
    prefixCls?: string;
    className?: string;
    spinning?: boolean;
    style?: React.CSSProperties;
    size?: 'small' | 'default' | 'large';
    tip?: string;
    delay?: number;
    wrapperClassName?: string;
    indicator?: React.ReactNode;
}
export interface CommonTableProps<T> {
    prefixCls?: string;
    dropdownPrefixCls?: string;
    rowSelection?: TableRowSelection<T>;
    pagination?: PaginationProps | boolean;
    size?: 'default' | 'middle' | 'small';
    dataSource?: T[];
    components?: TableComponents;
    columns?: CommonColumnProps<T>[];
    rowKey?: string | ((record: T, index: number) => string);
    rowClassName?: (record: T, index: number) => string;
    expandedRowRender?: any;
    defaultExpandAllRows?: boolean;
    defaultExpandedRowKeys?: string[] | number[];
    expandedRowKeys?: string[] | number[];
    expandIconAsCell?: boolean;
    expandIconColumnIndex?: number;
    expandRowByClick?: boolean;
    onExpandedRowsChange?: (expandedRowKeys: string[] | number[]) => void;
    onExpand?: (expanded: boolean, record: T) => void;
    onChange?: (pagination: PaginationProps | boolean, filters: string[], sorter: Object) => any;
    loading?: boolean | SpinProps;
    locale?: Object;
    indentSize?: number;
    onRowClick?: (record: T, index: number, event: Event) => any;
    onRow?: (record: T, index: number) => any;
    useFixedHeader?: boolean;
    bordered?: boolean;
    showHeader?: boolean;
    footer?: (currentPageData: Object[]) => React.ReactNode;
    title?: (currentPageData: Object[]) => React.ReactNode;
    scroll?: {
        x?: boolean | number | string;
        y?: boolean | number | string;
    };
    childrenColumnName?: string;
    bodyStyle?: React.CSSProperties;
    className?: string;
    style?: React.CSSProperties;
    autoWrapColumn?: boolean; //是否在手机模式下自动隐藏表头和合并列显示
    children?: React.ReactNode;
}
export interface TableStates {
}


export class CommonTable<T> extends Component<CommonTableProps<T>,
    TableStates> {
    static defaultProps = {
        autoWrapColumn: true
    }

    constructor(props, context) {
        super(props, context);
    }

    render() {
        let {showHeader, columns, ...otherProps} = this.props;
        columns = columns.filter(t => !t.hidden);
        //手机模式下执行特殊渲染
        if (Constants.minSM && this.props.autoWrapColumn) {
            showHeader = false;
            if (columns.length > 2) {
                // columns = this.renderColumns(columns);
                columns = this.renderColumnByMobile(columns);
            }
        }

        return React.createElement(Table as any, Object.assign({}, otherProps, {
            columns: columns,
            showHeader: showHeader
        }));
    }

    renderColumns(columns: CommonColumnProps<T>[]) {
        let normalCount = 0; //普通字段

        //根据字段的layout属性分组；没有dataindex一组；没有layout的数据两两一组（+20用来和之前的分组分开）
        let dic = Util.groupBy(columns, (a, index) => {
            if (a.layout || a.dataIndex == null) {
                return a.layout || a.dataIndex == null;
            } else {
                return (Math.floor((normalCount++) / 2)) + 20;
            }
        });
        let keyArray = Object.keys(dic);
        keyArray.sort();
        let maxWidth = window.innerWidth * 0.7;
        let tempColumns: CommonColumnProps<T>[] = [];

        Util.each(keyArray, (key, index) => {
            let style: React.CSSProperties = {};
            let n = dic[key];
            if (index === keyArray.length - 1) {
                style = {textAlign: "right"}
            } else {
                style = {maxWidth: maxWidth}
            }
            tempColumns.push({
                dataIndex: n[0].dataIndex,
                className: n[0].className,
                render: (text, record, index) => {
                    return <Row key={Util.guid()} style={style}>
                        {n.map(d => {
                            return <Col key={Util.guid()}>
                                {d.render ? d.render(record[d.dataIndex], record, index) : record[d.dataIndex]}
                            </Col>;
                        })}
                    </Row>;
                }
            });
        });

        return tempColumns;
    }

    renderColumnByMobile(columns: CommonColumnProps<T>[]) {
        let tempColumns: CommonColumnProps<T>[] = [];

        //超过6个column采用默认方式render
        if (columns.length > 6) {
            return this.renderColumns(columns);
        }

        let leftTopColumn, imgColumn, optionColumn, leftBottomColumn, rightTopColumn, rightBottomColumn,
            allBottomColumn;

        Util.each(columns, a => {
            switch (a.layout) {
                case ColumnLayout.LeftTop:
                    leftTopColumn = a;
                    break;
                case ColumnLayout.Img:
                    imgColumn = a;
                    break;
                case ColumnLayout.Option:
                    optionColumn = a;
                    break;
                case ColumnLayout.LeftBottom:
                    leftBottomColumn = a;
                    break;
                case ColumnLayout.RightTop:
                    rightTopColumn = a;
                    break;
                case ColumnLayout.RightBottom:
                    rightBottomColumn = a;
                    break;
                case ColumnLayout.AllBottom:
                    allBottomColumn = a;
                    break;
            }

            if (!a.dataIndex) {
                optionColumn = a;
            }
        });

        //如果没有设置定制的layout，则直接走默认的column渲染
        if (!leftTopColumn) {
            return this.renderColumns(columns);
        }

        if (imgColumn) {
            tempColumns.push({...imgColumn, width: 30});
        }
        tempColumns.push({
            dataIndex: this.props.rowKey as string,
            render: (text, record, index) => {

                let bottom = allBottomColumn ? (allBottomColumn.render ? allBottomColumn.render(record[allBottomColumn.dataIndex], record, index) :
                    <Row>{record[allBottomColumn.dataIndex]}</Row>) : "";
                let maxWidth = imgColumn ? window.innerWidth * 0.5 : window.innerWidth * 0.63;

                return <Row className="common-table">
                    <Row type="flex" justify="space-between" align="middle">
                        <Col className="table-title" style={{maxWidth: maxWidth}}>
                            {leftTopColumn ? (leftTopColumn.render ? leftTopColumn.render(record[leftTopColumn.dataIndex], record, index) : record[leftTopColumn.dataIndex]) : ""}
                        </Col>
                        <Col className="table-title2" style={{maxWidth: maxWidth}}>
                            {rightTopColumn ? (rightTopColumn.render ? rightTopColumn.render(record[rightTopColumn.dataIndex], record, index) : record[rightTopColumn.dataIndex]) : ""}
                        </Col>
                    </Row>
                    <Row type="flex" justify="space-between" align="middle">
                        <Col className="table-title2" style={{maxWidth: maxWidth}}>
                            {leftBottomColumn ? (leftBottomColumn.render ? leftBottomColumn.render(record[leftBottomColumn.dataIndex], record, index) : record[leftBottomColumn.dataIndex]) : ""}
                        </Col>
                        <Col className="table-title2" style={{maxWidth: maxWidth}}>
                            {rightBottomColumn ? (rightBottomColumn.render ? rightBottomColumn.render(record[rightBottomColumn.dataIndex], record, index) : record[rightBottomColumn.dataIndex]) : ""}
                        </Col>
                    </Row>
                    {bottom}
                </Row>
            }
        });
        if (optionColumn) {
            tempColumns.push({...optionColumn, className: "table-col-option", width: 30})
        }
        return tempColumns;
    }
}
class AkTableStyle {
}
