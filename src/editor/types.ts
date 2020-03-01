import { GetFieldDecoratorOptions } from "antd/lib/form/Form";
import { ButtonProps } from "antd/lib/button";
import { TableProps, PaginationConfig } from "antd/lib/table";
import { ColProps } from "antd/lib/col";

declare const ValidateStatuses: ["success", "warning", "error", "validating", ""]
export interface FormItemProps {
    prefixCls?: string;
    className?: string;
    id?: string;
    htmlFor?: string;
    label?: React.ReactNode;
    labelAlign?: "left" | "right";
    labelCol?: ColProps;
    wrapperCol?: ColProps;
    help?: React.ReactNode;
    extra?: React.ReactNode;
    validateStatus?: typeof ValidateStatuses[number];
    hasFeedback?: boolean;
    required?: boolean;
    style?: React.CSSProperties;
    colon?: boolean;
}


export interface FormControl {
    // 通用配置
    name: string; // 控件name
    label: string; // 控件名称
    type?: string; // 控件类型
    style?: React.CSSProperties;
    width?: number;
    initialValue?: any; // 初始值
    format?: any; // 格式化

    // 表单布局配置
    col?: any;
    layout?: any;

    // 远程请求配置
    fetchConfig?: {
        apiUrl: string;
        method?: any;
        params?: any;
        searchKey?: string;
        dataPath?: string;
        initDictFn?: (record: any) => any[];
    };

    // item配置
    itemProps?: FormItemProps;

    // 表单配置
    formFieldProps?: GetFieldDecoratorOptions;

    // 控件属性配置
    controlProps?: IControlProps;
    dictConfig?: { textKey: string; valueKey: string };

    // 表格属性配置
    tableProps?: EditTableProps;

    // 动态表单配置
    arrayProps?: ArrayProps;

    // 控件状态配置
    hide?: boolean | boolFunc;
    disabled?: boolean | boolFunc;
    condition?: [
        {
            // 匹配规则 正则或者字符串
            // eg:表单中的字段 id:'01' && name:'aaa' 时将禁用输入框
            regex: object;
            action: 'disabled' | 'show' | 'hide';
        }
    ];
}
type boolFunc = (config) => boolean;



export type IButtonProps = ButtonProps & {
    dataCode?: string;
    text: string;
    visible?: any;
    element?: any;
}

// 表格
export interface ICommonTable<T> extends TableProps<T> {
    wrapClassStr?: string;
    urls?: {
        listUrl?: string;
        deleteUrl?: string;
        deleteBatchUrl?: string;
    };
    recordKey?: string;
    extraParams?: object; // 查询固定参数
    alternateColor?: boolean; // 是否奇偶行不同颜色

    defaultPageSize?: number;
    dataHandler?: (data: any) => any;
    draggable?: boolean;
    resizable?: boolean;

    button?: IButtonProps[]; // 列表buttonItem
    itemButton?: IButtonProps[]; // 列表项item
    buttonLen?: number;
    footer?: any; // 列表页脚
    showIndex?: boolean; // columns展示索引

    dataSource?: any[];
    pagination?: PaginationConfig;
    rowSelection?: any;
    selectedRowKeys?: any[]; // 指定选中项的key数组
    selectType?: 'checkbox' | 'radio' | false; // 多选/单选
    onSelect?: (selectedRowKeys: string[] | number[], selectedRows: any[]) => any;
    [propName: string]: any;
}

interface EditTableProps extends Omit<ICommonTable<any>, 'rowKey'> {
    rowKey: string;
    columns: FormControl[];
    operateList?: any;
}
interface ArrayProps {
    rowKey: string;
    columns: FormControl[];
}
// 表单控件属性
export interface IControlProps {
    fetchConfig?: {
        apiUrl: string;
        method?: any;
        params?: any;
        searchKey?: string;
        dataPath?: string;
        initDictFn?: (record: any) => any[];
    };
    itemProps?: FormItemProps;
    tableProps?: EditTableProps;
    arrayProps?: ArrayProps;
    Component?: any;
    dict?: Array<{ text: string; value: string; children?: Array<{ text: string; value: string }> }>;
    rules?: any[]; // 校验规则
    placeholder?: string;
    onChange?: (...args: any[]) => any;

    [propName: string]: any;
}
