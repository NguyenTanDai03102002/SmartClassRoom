//ADMIN
import Headeronly from '../Admin/component/layout/headeronly/Headeronly';
import DefaultLayout from '../Admin/component/layout/defaultlayout/DefaultLayout';

import Home from '../Admin/pages/TrangChu/Index';
import QuanLyKhoi from '../Admin/pages/QuanLyKhoi/Index';
import DanhSachLopHocTheoKhoi from '../Admin/pages/QuanLyLopHoc/DanhSachLopTheoKhoi/Index';
import DanhSachLopHocTheoNam from '../Admin/pages/QuanLyLopHoc/DanhSachLopHocMoiNam/Index';
import QuanLyHocSinh from '../Admin/pages/QuanLyHocSinh/Hocsinh';
import QuanLyDiem from '../Admin/pages/QuanLyDiem/Diem';
import XepChuNhiem from '../Admin/pages/XepChuNhiem/Index';
import XepGiangDay from '../Admin/pages/XepGiangDay/Index';
import XepGiangDayClass from '../Admin/pages/XepGiangDay/Class/Index';
import XemGiangDay from '../Admin/pages/XemLichGiangDay/Index';
import QuanLyGiaoVien from '../Admin/pages/QuanLyGiaoVien/Index';

//USER
import HearderAndFooter from '../User/Layout/HeaderAndFooter/Index';

import Login from '../Component/Login/Index';
import HomeUser from '../User/Pages/TrangChu/Home';
import Introduce from '../User/Pages/Introduce/Index';
import TuyenDung from '../User/Pages/TuyenDung/Index';
import Tintuc from '../User/Pages/NewsAndEvents/News/Index';
import Sukien from '../User/Pages/NewsAndEvents/Events/Index';
import Lienhe from '../User/Pages/Contact/Index';
import GioiThieuTS from '../User/Pages/GioiThieuTuyenSinh/Index';
import TuVanTuyenSinh from '../User/Pages/TuVanTuyenSinh/Index';
import Diemdanh from '../User/Pages/diemdanh/diemdanh';
import thongtinlophoc from '../User/Pages/Thongtinlophoc/thongtinlophoc';
import thongtinLop from '../User/Pages/Thongtinlophoc/Lop/Index';

const pageRoutes = [
    //USER
    { path: '/login', Component: Login, layout: null },
    { path: '/', Component: HomeUser, layout: HearderAndFooter },
    { path: '/gioithieu', Component: Introduce, layout: HearderAndFooter },
    { path: '/tuyendung', Component: TuyenDung, layout: HearderAndFooter },
    { path: '/tintuc', Component: Tintuc, layout: HearderAndFooter },
    { path: '/sukien', Component: Sukien, layout: HearderAndFooter },
    { path: '/lienhe', Component: Lienhe, layout: HearderAndFooter, requireAuth: true },
    { path: '/tuyensinh/gioithieutuyensinh', Component: GioiThieuTS, layout: HearderAndFooter },
    { path: '/tuvan/nghenghiep', Component: TuVanTuyenSinh, layout: HearderAndFooter },
    { path: '/diemdanh', Component: Diemdanh, layout: HearderAndFooter },
    { path: '/thongtinlophoc', Component: thongtinlophoc, layout: HearderAndFooter },
    { path: '/thongtinlophoc/:name', Component: thongtinLop, layout: HearderAndFooter },

    //ADMIN
    { path: '/admin', Component: Home, layout: Headeronly, requireAuth: true },
    { path: '/admin/khoi', Component: QuanLyKhoi, layout: Headeronly, requireAuth: true },
    { path: '/admin/khoi/:idkhoi/lop', Component: DanhSachLopHocTheoKhoi, layout: Headeronly, requireAuth: true },
    {
        path: '/admin/khoi/:idkhoi/lop/:idlop/hocsinh',
        Component: QuanLyHocSinh,
        layout: DefaultLayout,
        requireAuth: true,
    },
    { path: '/admin/khoi/:idkhoi/lop/:idlop/diem', Component: QuanLyDiem, layout: DefaultLayout, requireAuth: true },
    {
        path: '/admin/Danh-Sach-Lop-Hoc-Theo-Nam',
        Component: DanhSachLopHocTheoNam,
        layout: Headeronly,
        requireAuth: true,
    },
    { path: '/admin/quan-ly-giao-vien', Component: QuanLyGiaoVien, layout: Headeronly, requireAuth: true },
    { path: '/admin/xep-lich-chu-nhiem', Component: XepChuNhiem, layout: Headeronly, requireAuth: true },
    { path: '/admin/xep-lich-Giang-Day', Component: XepGiangDay, layout: Headeronly, requireAuth: true },
    { path: '/admin/xep-lich-Giang-Day/:classid', Component: XepGiangDayClass, layout: Headeronly, requireAuth: true },
    { path: '/admin/xem-lich-Giang-Day', Component: XemGiangDay, layout: Headeronly, requireAuth: true },
];

export { pageRoutes };
