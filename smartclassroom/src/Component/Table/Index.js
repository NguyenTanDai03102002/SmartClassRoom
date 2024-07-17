import React from 'react';
import classNames from 'classnames/bind';
import styles from './Table.module.scss';
import Menu from '../popper/Menu/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faDeleteLeft,
    faDownload,
    faEdit,
    faEllipsisVertical,
    faUpload,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import Paginate from '../paginate/paginate';
import Button from '../button/Button';
import Seach from '../seach/Seach';
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';
import { useDispatch } from 'react-redux';
import excelSlice from '../../ReducerSlice/excelSilce';
import FormModal from '../Modal/Index';
import Form from './Form/Index';

const cx = classNames.bind(styles);

function Index(props) {
    const {
        Label,
        LabelModal,
        titlesearch,
        data,
        inputs,
        handleDelete,
        handleEdit,
        handleDetail,
        totalPages,
        currentPage,
        setCurrentPage,
        showModal,
        setShowModel,
        editting,
        setEditting,
        keyword,
        setKeyword,
        handleChange,
        handleAdd,
        handleSubmitEdit,
        refeshdata,
    } = props;

    const dispatch = useDispatch();

    const getMenuItems = (id) => [
        {
            icon: <FontAwesomeIcon icon={faDeleteLeft} />,
            title: 'Delete',
            onclick: () => handleDelete(id),
        },
        {
            icon: <FontAwesomeIcon icon={faEdit} />,
            title: 'Edit',
            onclick: () => handleEdit(id),
        },
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'Detail',
            onclick: () => handleDetail(id),
        },
    ];

    const handleFileChange = (e) => {
        const fileTypes = [
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'text/csv',
        ];
        let fileSelected = e.target.files[0];
        if (fileSelected) {
            if (fileTypes.includes(fileSelected.type)) {
                const reader = new FileReader();
                reader.readAsArrayBuffer(fileSelected);
                reader.onload = (e) => {
                    const workbook = XLSX.read(e.target.result, { type: 'buffer' });
                    const workSheetName = workbook.SheetNames[0];
                    const workSheet = workbook.Sheets[workSheetName];
                    const data = XLSX.utils.sheet_to_json(workSheet, { raw: false });
                    if (data != null) {
                        dispatch(excelSlice.actions.PUT_DATA_SUCCESS(data));
                    } else {
                        dispatch(excelSlice.actions.PUT_DATA_FAILURE('không có dữ liệu'));
                    }
                };
            } else {
                toast.warning('vui lòng chọn file excel');
            }
        } else {
            toast.warning('vui lòng chọn file');
        }
    };

    const tableheader = (
        <tr>
            {data &&
                data.header &&
                data.header.map((item) => (
                    <th key={item} className={cx('thstyles')}>
                        {item}
                    </th>
                ))}
        </tr>
    );

    const tablecontent =
        data &&
        data.content &&
        data.content.map((item, index) => {
            const MenuItems = getMenuItems(item.id);
            const valuesWithoutFirst = Object.values(item).slice(1);
            return (
                <tr className={cx('table-row')} key={index}>
                    {valuesWithoutFirst.map((value, index) => (
                        <td key={index} className={cx('tdstyles')}>
                            {value}
                        </td>
                    ))}
                    <td className={cx('tdstyles')}>
                        <Menu items={MenuItems} crud>
                            <div className={cx('menu-name')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </div>
                        </Menu>
                    </td>
                </tr>
            );
        });
    return (
        <div className={cx('wrapper')}>
            {showModal && (
                <FormModal form1000>
                    <Form
                        LabelModal={LabelModal}
                        inputs={inputs}
                        handleChange={handleChange}
                        showModal={showModal}
                        setShowModel={setShowModel}
                        handleAdd={handleAdd}
                    />
                    <div className={cx('button')}>
                        <Button
                            btn
                            onClick={() => {
                                setShowModel && setShowModel(false);
                                setEditting && setEditting(false);
                                refeshdata && refeshdata();
                            }}
                        >
                            Đóng
                        </Button>
                        {!editting ? (
                            <Button btn onClick={() => handleAdd()}>
                                Thêm
                            </Button>
                        ) : (
                            <Button btn onClick={() => handleSubmitEdit()}>
                                Lưu
                            </Button>
                        )}
                    </div>
                </FormModal>
            )}
            <div className={cx('content')}>
                {Label && <h1>{Label}</h1>}
                <div className={cx('top')}>
                    <div className={cx('add-seach')}>
                        <Button control onClick={() => setShowModel && setShowModel(true)}>
                            Add
                        </Button>
                        <Seach placeholder={titlesearch} keyword={keyword} setKeyword={setKeyword} />
                    </div>

                    <div className={cx('excel')}>
                        <label htmlFor="id-upload" className={cx('excel-btn')}>
                            <FontAwesomeIcon icon={faUpload} />
                            <span>Import</span>
                            <input
                                id="id-upload"
                                className={cx('upload')}
                                type="file"
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                        </label>

                        <Button className={cx('excel-btn')}>
                            <FontAwesomeIcon icon={faDownload} />
                            <span>Export</span>
                        </Button>
                    </div>
                </div>

                <table className={cx('list-table')}>
                    <thead className={cx('table-header')}>{tableheader}</thead>
                    <tbody className={cx('table-content')}>{tablecontent}</tbody>
                </table>
            </div>

            {data && data.content && data.content.length > 0 ? (
                <div className={cx('pages')}>
                    <Paginate totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </div>
            ) : (
                <div className={cx('nodata')}>KHÔNG CÓ DỮ LIỆU</div>
            )}
        </div>
    );
}

export default Index;
