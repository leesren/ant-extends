import * as React from 'react'
import BraftEditor, { ExtendControlType } from 'braft-editor';
// @ts-ignore
import Table from 'braft-extensions/dist/table';
// @ts-ignore
import MaxLength from 'braft-extensions/dist/max-length';
import { ContentUtils } from 'braft-utils';
// @ts-ignore
import ColorPicker from 'braft-extensions/dist/color-picker';
import 'braft-editor/dist/index.css';
import 'braft-extensions/dist/table.css';
import 'braft-extensions/dist/color-picker.css';
import 'braft-extensions/dist/code-highlighter.css';

import CustomControls from './controls';
import { IControlProps } from './types';


function braftEditorConfig(props: IBraftEditorProps) {

    // 表格扩展
    BraftEditor.use(Table());

    // 输入字数限制扩展
    BraftEditor.use(
        MaxLength({
            defaultValue: props.maxLength,
        })
    );

    // 高级拾色器扩展
    BraftEditor.use(
        ColorPicker(props.colorPickerConfig)
    );
}
export type ControlKey = {
    key: string,
    type: string,
    text?: string,
    [key: string]: any
}
interface IBraftEditorProps extends IControlProps {
    extendControls?: ExtendControlType[],
    valueType?: 'raw' | 'html';
    onChange?: (content: any) => void;
    colorPickerConfig?: {
        theme: 'light'
    },
    maxLength?: number,
    controlBarStyle?: React.CSSProperties,
    contentStyle?: React.CSSProperties,
    value?: string,
    placeholder?: string
}

/**
 * 编辑器控件
 * 文档地址: https://www.yuque.com/braft-editor/be/lzwpnr
 * 编辑器首页: https://braft.margox.cn/
 */

interface State {
    editorState: any;
}
class Editor extends React.Component<IBraftEditorProps, State> {
    state: State;
    editorRef: any;
    static defaultProps = {
        valueType: 'html',
        maxLength: 10000,
        placeholder: '请输入...',
        extendControlKey: [],
        colorPickerConfig: {
            theme: 'light'
        },
        controls: [
            'font-size',
            'text-color',
            'bold',
            'italic',
            'underline',
            'strike-through',
            'text-align',
            'emoji',
            'text-indent',
            'link',
            'hr',
            'separator',
            'media',
        ]
    };
    constructor(props: IBraftEditorProps) {
        super(props);
        braftEditorConfig(props);
        this.state = {
            editorState: BraftEditor.createEditorState(props.value),
        }
    }
    componentWillReceiveProps(nextProps: IBraftEditorProps) {
        if (nextProps.value !== this.props.value) {
            this.setState({
                editorState: BraftEditor.createEditorState(nextProps.value),
            })
        }
    }
    // 编辑器内容改变事件
    handleChange = async state => {
        const { valueType, onChange } = this.props;
        const content = valueType === 'raw' ? state.toRAW() : state.toHTML();
        if (typeof onChange === "function") {
            onChange(content);
        }
        this.setState({
            editorState: state
        })
    };
    render() {
        const { value, extendControls, form, valueType, contentStyle = {}, controls = [], controlBarStyle, extendControlKey, onChange, ...restProps } = this.props;

        // 处理文本黏贴
        const handlePastedText = (text, HTML, editorState, editor) => {
            // 在此处来自行处理HTML内容之类的
            const stripedHTMLStringFunc = HTML => {
                if (HTML) {
                    HTML = HTML.replace(/font-size:(.+?)(pt)/g, ($0, $1, $2) => {
                        $1 = parseInt($1, 10);
                        $2 = $2.replace('pt', 'px');
                        return `font-size: ${$1}${$2}`;
                    });

                    HTML = HTML.replace(/ptpx/g, 'px');
                    return HTML;
                }

                return undefined;
            };

            // 调用insertHTML来将内容插入到编辑器
            editor.setValue(ContentUtils.insertHTML(editorState, stripedHTMLStringFunc(HTML), 'paste'));
            return 'handled'; // 一定要return handled来告诉编辑器你自己已经处理了粘贴内容，不需要编辑器来处理
        };

        // 自定义控件


        return <BraftEditor
            ref={ref => this.editorRef = ref}
            onChange={this.handleChange}
            contentStyle={{ height: 300, ...contentStyle }}
            controlBarStyle={{ ...controlBarStyle }}
            handlePastedText={handlePastedText}
            controls={controls}
            media={{
                externals: {
                    image: true,
                    video: false,
                    audio: false,
                    embed: false,
                },
            }}
            value={this.state.editorState}
            extendControls={extendControls}
            {...restProps}
        />
    }
}
export default Editor;

// export default MyBraftEditor;
