import React from 'react';
import { Modal } from 'antd';
import { ExtendControlType } from 'braft-editor';
// import { confirm } from '@/widget/CommonModal';

const PreviewModal = (editor, options): ExtendControlType => ({
    key: 'preview',
    type: 'button',
    text: '预览',
    onClick: () => {
        // 判断是否为空，editor.current.getValue().isEmpty()
        const html = editor.current.getValue().toHTML();
        // confirm({ html }, PreviewModal);
    },
});

export default PreviewModal;
