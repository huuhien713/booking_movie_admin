import { fetcher } from "./fetcher";

export const movieApi = {
    getFilm : () => {
        return fetcher.get('/QuanLyPhim/LayDanhSachPhim', {
            params : {
                maNhom : 'GP01'
            }
        })
    },
    getFilmPage : (soTrang) => {
        return fetcher.get('/QuanLyPhim/LayDanhSachPhimPhanTrang', {
            params : {
                maNhom : 'GP01',
                soTrang : soTrang,
                soPhanTuTrenTrang : 4
            }
        })
    }, 
    addFilm : (film) => {
        return fetcher.post('/QuanLyPhim/ThemPhimUploadHinh', film)
    },
    xoaFilm : (maPhim) => {
        return fetcher.delete('/QuanLyPhim/XoaPhim', {
            params : {
                MaPhim: maPhim
            }
        })
    },
    layFilmEdit : (idFilm) => {
        return fetcher.get('/QuanLyPhim/LayThongTinPhim', {
            params : {
                MaPhim : idFilm
            }
        })
    },
    capNhatFilm: (film) => {
        return fetcher.post('/QuanLyPhim/CapNhatPhimUpload', film);
    },
    TimKiemFilm: (search) => {
        return fetcher.get('/QuanLyPhim/LayDanhSachPhim', {
            params: {
                maNhom: 'GP01',
                tenPhim: search
            }
        })
    },
    layLichChieuFilm: (maPhim) => {
        return fetcher.get('/QuanLyRap/LayThongTinLichChieuPhim', {
            params : {
                MaPhim : maPhim
            }
        });
    }, 
    getHeThongRap : () => {
        return fetcher.get('/QuanLyRap/LayThongTinHeThongRap')
    }, 
    getCumRap : (maHeThongRap) => {
        return fetcher.get('/QuanLyRap/LayThongTinCumRapTheoHeThong', {
            params: {
                maHeThongRap: maHeThongRap
            }
        })
    },
    taoLichChieu : (lich) => {
        return fetcher.post('/QuanLyDatVe/TaoLichChieu', lich)
    }

}