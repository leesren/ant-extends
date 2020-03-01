import * as React from 'react';
import './index.less';
type TableTdProps = {
    label: string,
    value: any,
    style?: React.CSSProperties,
    class?: string
}
export interface TableInfoProps {
    list: Array<TableTdProps | TableTdProps[]>,
    labelStyle?: React.CSSProperties,
    border?: boolean
}
export default class TableInfo extends React.Component<any, any> {
    static defaultProps = {
        labelStyle: {
            width: 100,
            textAlign: 'right'
        }
    }
    render() {
        const { list = [], labelStyle, border } = this.props;
        let tdLen = 2;
        list.map((el) => {
            let t = 2;
            if (el instanceof Array) {
                t = el.length * 2;
            }
            tdLen = t > tdLen ? t : tdLen;
        })

        const viewFn = (el, index, isArray?) => {
            const { label, value, ...restEl } = el;
            return <React.Fragment key={index}>
                <th style={labelStyle} {...restEl}>{el.label}</th>
                <td {...restEl} colSpan={isArray ? null : tdLen - 1}>{el.value}</td>
            </React.Fragment>
        }
        return (
            <div>
                <table className={"ant-table-info" + (border ? ' border' : '')}>
                    <tbody>
                        {
                            list.map((item, index) => {
                                let tds = null;
                                if (item instanceof Array) {
                                    tds = item.map((el, i) => {
                                        return viewFn(el, index + '.' + i, true)
                                    })
                                } else {
                                    tds = viewFn(item, index + '.', false)
                                }
                                return <tr key={index}>
                                    {tds}
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}


