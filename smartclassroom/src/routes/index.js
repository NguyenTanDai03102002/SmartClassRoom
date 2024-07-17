import Khoi from '../Admin/pages/Khoi/Index';
import Lop from '../Admin/pages/Lop/Index';
import Headeronly from '../Admin/component/layout/headeronly/Headeronly';
import Hocsinh from '../Admin/pages/thongtinhocsinh/Hocsinh';
import DefaultLayout from '../Admin/component/layout/defaultlayout/DefaultLayout';
import Diem from '../Admin/pages/Diem/Diem';
import Home from '../Admin/pages/TrangChu/Index';
import Xepchunhiem from '../Admin/pages/XepChuNhiem/Index';
import XepGiangDay from '../Admin/pages/XepGiangDay/Index';
import XepGiangDayClass from '../Admin/pages/XepGiangDay/Class/Index';
import XemGiangDay from '../Admin/pages/XemLichGiangDay/Index';
import GiaoVien from '../Admin/pages/GiaoVien/Index';

// user
import HearderAndFooter from '../User/Layout/HeaderAndFooter/Index';
import HomeUser from '../User/Pages/TrangChu/Home';
import Introduce from '../User/Pages/Introduce/Index';
import TuyenDung from '../User/Pages/TuyenDung/Index';
import Tintuc from '../User/Pages/NewsAndEvents/News/Index';
import Sukien from '../User/Pages/NewsAndEvents/Events/Index';
import Lienhe from '../User/Pages/Contact/Index';
import GioiThieuTS from '../User/Pages/GioiThieuTuyenSinh/Index';
import TuVanTuyenSinh from '../User/Pages/TuVanTuyenSinh/Index';
import Login from '../Component/Login/Index';
import Diemdanh from '../User/Pages/diemdanh/diemdanh';
import thongtinlophoc from '../User/Pages/Thongtinlophoc/thongtinlophoc';
import thongtinLop from '../User/Pages/Thongtinlophoc/Lop/Index';

// import Chitiet from '../Admin/pages/thongtinhocsinh/details/Index';

const pageRoutes = [
    { path: '/login', Component: Login, layout: null },
    { path: '/', Component: HomeUser, layout: HearderAndFooter },
    { path: '/gioithieu', Component: Introduce, layout: HearderAndFooter },
    { path: '/tuyendung', Component: TuyenDung, layout: HearderAndFooter },
    { path: '/tintuc', Component: Tintuc, layout: HearderAndFooter },
    { path: '/sukien', Component: Sukien, layout: HearderAndFooter },
    { path: '/lienhe', Component: Lienhe, layout: HearderAndFooter },
    { path: '/tuyensinh/gioithieutuyensinh', Component: GioiThieuTS, layout: HearderAndFooter },
    { path: '/tuvan/nghenghiep', Component: TuVanTuyenSinh, layout: HearderAndFooter },
    { path: '/diemdanh', Component: Diemdanh, layout: HearderAndFooter },
    { path: '/thongtinlophoc', Component: thongtinlophoc, layout: HearderAndFooter },
    { path: '/thongtinlophoc/:name', Component: thongtinLop, layout: HearderAndFooter },

    // admin/*
    { path: '/admin', Component: Home, layout: Headeronly, requireAuth: true },
    { path: '/admin/khoi', Component: Khoi, layout: Headeronly, requireAuth: true },
    { path: '/admin/khoi/:idkhoi/lop', Component: Lop, layout: Headeronly, requireAuth: true },
    { path: '/admin/khoi/:idkhoi/lop/:idlop/hocsinh', Component: Hocsinh, layout: DefaultLayout, requireAuth: true },
    { path: '/admin/khoi/:idkhoi/lop/:idlop/diem', Component: Diem, layout: DefaultLayout, requireAuth: true },
    { path: '/admin/quan-ly-giao-vien', Component: GiaoVien, layout: Headeronly, requireAuth: true },
    { path: '/admin/xep-lich-chu-nhiem', Component: Xepchunhiem, layout: Headeronly, requireAuth: true },
    { path: '/admin/xep-lich-Giang-Day', Component: XepGiangDay, layout: Headeronly, requireAuth: true },
    { path: '/admin/xep-lich-Giang-Day/:classid', Component: XepGiangDayClass, layout: Headeronly, requireAuth: true },
    { path: '/admin/xem-lich-Giang-Day', Component: XemGiangDay, layout: Headeronly, requireAuth: true },

    // { path: '/admin/hocsinh/:id', Component: Chitiet, layout: DefaultLayout },
];

export { pageRoutes };
