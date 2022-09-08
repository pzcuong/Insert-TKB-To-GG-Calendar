const modelsGoogle = require('../calendar/models');
const modelsUIT = require('../uit/models');

async function TinhThoiGianHoc(Tiet, Loai) {
    let Time = new Date();
    Time.setSeconds(0);
    if (Loai == 'BatDau') 
        switch(Tiet) {
            case "1":
                Time.setHours(7);
                Time.setMinutes(30);
                break;
            case "2":
                Time.setHours(8);
                Time.setMinutes(15);
                break;
            case "3":
                Time.setHours(9);
                Time.setMinutes(0);
                break;
            case "4":
                Time.setHours(10);
                Time.setMinutes(0);
                break;
            case "5":
                Time.setHours(10);
                Time.setMinutes(45);
                break;
            case "6":
                Time.setHours(13);
                Time.setMinutes(0);
                break;
            case "7":
                Time.setHours(13);
                Time.setMinutes(45);
                break;
            case "8":
                Time.setHours(14);
                Time.setMinutes(30);
                break;
            case "9":
                Time.setHours(15);
                Time.setMinutes(30);
                break;
            case "0":
                Time.setHours(16);
                Time.setMinutes(15);
                break;
        }
    else
        switch(Tiet) {
            case "1":
                Time.setHours(8);
                Time.setMinutes(15);
                break;
            case "2":
                Time.setHours(9);
                Time.setMinutes(0);
                break;
            case "3":
                Time.setHours(9);
                Time.setMinutes(45);
                break;
            case "4":
                Time.setHours(10);
                Time.setMinutes(45);
                break;
            case "5":
                Time.setHours(11);
                Time.setMinutes(30);
                break;
            case "6":
                Time.setHours(13);
                Time.setMinutes(45);
                break;
            case "7":
                Time.setHours(14);
                Time.setMinutes(30);
                break;
            case "8":
                Time.setHours(15);
                Time.setMinutes(15);
                break;
            case "9":
                Time.setHours(16);
                Time.setMinutes(15);
                break;
            case "0":
                Time.setHours(17);
                Time.setMinutes(0);
                break;
        }
    return Time;
}

async function XuLyTKB() {
    let DataReturn = {};

    let result = await modelsUIT.LayTKB();
    for(let index=0; index<result.courses.length; index++) {
        for(let index2=0; index2<result.courses[index].course.length; index2++) {
            let ThuTheoUIT = result.courses[index].name; //ThuTheoUIT la ten cua thu trong UIT
            let data = result.courses[index].course[index2];
            if(index2+1 < result.courses[index].course.length && data.malop == result.courses[index].course[index2+1].malop) 
                continue;

            let ThuHomNay = new Date();
            DataReturn["ThoiGianHeThong"] = ThuHomNay;
            ThuHomNay = ThuHomNay.getDay() + 1;
            if(ThuHomNay == 0) 
                ThuHomNay = ThuHomNay;
            else
                ThuHomNay = ThuHomNay + 1;
            DataReturn["ThuHomNay"] = ThuHomNay;

            let TietDau = data.tiet[0];
            let TietCuoi = data.tiet[data.tiet.length - 1];

            var KQThemMH = [];

            if (ThuTheoUIT != ThuHomNay && ThuHomNay-1 != ThuTheoUIT) {
                // var message = {
                //     statusCode: 400,
                //     message: 'Môn học đã tồn tại'
                // };

                // KQThemMH.push(message);
                // DataReturn[data.malop] = KQThemMH;

                continue;
            }

            console.log(data)

            let TgianBD = await TinhThoiGianHoc(TietDau, 'BatDau');
            TgianBD = TgianBD.setDate(TgianBD.getDate() + 1);
            TgianBD = new Date(TgianBD);
            let TgianKT = await TinhThoiGianHoc(TietCuoi, 'KetThuc');
            TgianKT = TgianKT.setDate(TgianKT.getDate() + 1);
            TgianKT = new Date(TgianKT);

            if(ThuHomNay-1 == ThuTheoUIT) {
                TgianBD = TgianBD.setHours(TgianBD.getHours() - 7);
                TgianBD = new Date(TgianBD);
                TgianBD = TgianBD.setDate(TgianBD.getDate() + 1);
                TgianBD = new Date(TgianBD);
                TgianKT = TgianKT.setHours(TgianKT.getHours() - 7);
                TgianKT = new Date(TgianKT);
                TgianKT = TgianKT.setDate(TgianKT.getDate() + 1);
                TgianKT = new Date(TgianKT);
            } else {
                TgianBD = TgianBD.setHours(TgianBD.getHours() - 7);
                TgianBD = new Date(TgianBD);
                TgianKT = TgianKT.setHours(TgianKT.getHours() - 7);
                TgianKT = new Date(TgianKT);
            }


            let TimMonHoc = await modelsGoogle.searchEvents(data.malop, TgianBD);
            console.log(TimMonHoc);
            
            if(TimMonHoc.statusCode == 404 ) {
                modelsGoogle.insertEvent(`Môn: ${data.malop} - phòng: ${data.phonghoc}`, `GV: ${data.magv[0].hoten} - ${data.hinhthucgd}`, TgianBD, TgianKT);
                var message = {
                    statusCode: 200,
                    message: 'Thêm môn học thành công'
                };
                KQThemMH.push(message);
                DataReturn[data.malop] = KQThemMH;
            }
            else {
                var message = {
                    statusCode: 400,
                    message: 'Môn học đã tồn tại'
                };
                KQThemMH.push(message);
                DataReturn[data.malop] = KQThemMH;
            }
        }
    }
    return DataReturn;
}

exports.XuLyTKB = XuLyTKB;