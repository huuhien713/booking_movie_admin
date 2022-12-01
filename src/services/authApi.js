import { fetcher } from './fetcher'

export const authApi = {
    signIn: (user) => {
        return fetcher.post('/QuanLyNguoiDung/DangNhap', user);
    },
    getUserList: () => {
        return fetcher.get('/QuanLyNguoiDung/LayDanhSachNguoiDung', {
            params: {
                MaNhom: 'GP01',
            }
        })
    },
    getUserPage: (soTrang, soPhanTuTrenTrang) => {
        return fetcher.get('/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang', {
            params: {
                MaNhom: 'GP01',
                soTrang: soTrang,
                soPhanTuTrenTrang: 9
            }
        })
    },
    addUser: (user) => {
        return fetcher.post('/QuanLyNguoiDung/ThemNguoiDung', { ...user, maNhom: 'GP01', maLoaiNguoiDung: 'QuanTri' })
    },
    deleteUser: (taikhoan) => {
        return fetcher.delete('/QuanLyNguoiDung/XoaNguoiDung', {
            params: {
                TaiKhoan: taikhoan
            }
        })
    },
    editUser: (user) => {
        return fetcher.post('/QuanLyNguoiDung/CapNhatThongTinNguoiDung', { ...user, maNhom: 'GP01' });
    },
    updateUser: (user) => {
        return fetcher.put('/QuanLyNguoiDung/CapNhatThongTinNguoiDung', user);
    },

    searchUser: (search) => {
        return fetcher.get('/QuanLyNguoiDung/TimKiemNguoiDung', {
            params: {
                maNhom: 'GP01',
                tuKhoa: search
            }
        })

    }
}