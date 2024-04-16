let row=11;
let col =18;
// Phần code lập ra ma trận và thuật toán trò chơi.
class PikachuGame {
    constructor() {
    }
    // randomNum:tạo ra những số ngẫu nhiên
    randomNum(num){
        return Math.round(Math.round()*(num-1));
    }
    //newArray: tạo mảng 1 chiều(hàng) để lưu lại có phần tử của 1 hàng trong ma trận.
    newArray(col){
        let a =new Array();
        for(let i=0;i<col;i++){
            a[i]= new Array();
        }
        return a;
    }
    //đối tượng point dùng để lưu lại tọa độ
    point(x,y){
        return {x,y};
    }
    // mainBoard: tạo ra 1 ma trận 11x18 nhưng phần main là ma trận 9x16 vì cái hàng cột ngoài cùng sẽ là các line màu đỏ sẽ xuất hiện khi t chọn đc 2 pokêmon giống nhau
    mainBoard(){
        let stop;
        let key;//vị trí hiện tại đang kiểm để xem có trống ko
        let eleNum=144;// 16x9=144
        let exist;// biến này đại diện số lần xuất hiện của 1 pokemon tối đa là 4 lần/1 pokemon
        let row =this.newArray(18);
        for(let i=1;i<=18;i++){
            for(let j=1;j<=11;j++){
                row[i][j]=0;
            }
        }
        for(let x=1;x<=36;x++){// 36 loại pokemon khác nhau.
            for(exist=1;exist<=4;exist++){// mỗi loại có 4 con
                key = this.randomNum(eleNum--)+1;//+1 để tránh key =0;
                stop=false;// nếu stop = false thì vòng lặp tiếp tục
                for(let i=1;i<=16;i++){
                    if(stop) break;
                    else for (let j=1;j<=9;j++){
                        if(row[i][j]==0){// nếu vị trí hiện tại trống.
                            key--;
                            if(key==0){
                                stop=true;// nếu stop bằng true có nghĩa là vòng lặp sẽ dừng ngay lập tức và không kiểm tra các ô trống còn lại
                                row[i][j]=k;
                                break;
                            }
                        }
                    }
                }
            }
        }
        return row;
    }
    checkPath(a, i1, j1, i2, j2) {
        let UU = new Array(0, 0, 1, -1);
        let VV = new Array(1, -1, 0, 0);
        if (i1 == i2 && j1 == j2) return null;// nếu click vào 1 thẻ 2 lần liên tiếp
        if (a[i1][j1] == 0 || a[i2][j2] == 0) return null;// Nếu click vaào thẻ trống
        if (a[i1][j1] != a[i2][j2]) return null;// Nếu 2 thẻ ko giống nhau

        let fist, last, i, j, t;
        let queue = new Array();
        let box = this.newArray(18);
        let count = this.newArray(18);

        for (i = 0; i < 198; i++) queue[i] = this.point(0, 0);
        fist = 0;
        last = 0;
        queue[0].x = i1;
        queue[0].y = j1;
        for (i = 0; i < 18; i++)
            for (j = 0; j < 11; j++) box[i][j] = this.point(-1, -1);
        box[i1][j1].x = -2;
        count[i1][j1] = 0;

        let canGo = new Array();
        let p = new Array();
        let q = new Array();

        while (fist <= last) {
            i = queue[fist].x;
            j = queue[fist].y;
            fist++;
            for (t = 0; t < 4; t++) {
                canGo[t] = true;
                p[t] = i;
                q[t] = j;
            }
            do {
                for (t = 0; t < 4; t++)
                    if (canGo[t]) {
                        p[t] += UU[t];
                        q[t] += VV[t];
                        if (!this.myInside(p[t], q[t])) {
                            canGo[t] = false;
                            continue;
                        }
                        if (p[t] == i2 && q[t] == j2) {
                            box[p[t]][q[t]].x = i;
                            box[p[t]][q[t]].y = j;
                            return this.createArrayList(box, i2, j2);
                        }
                        if (a[p[t]][q[t]] > 0) {
                            canGo[t] = false;
                            continue;
                        }
                        if (box[p[t]][q[t]].x != -1) continue;
                        if (count[i][j] == 2) continue;
                        last++;
                        queue[last].x = p[t];
                        queue[last].y = q[t];
                        box[p[t]][q[t]].x = i;
                        box[p[t]][q[t]].y = j;
                        count[p[t]][q[t]] = count[i][j] + 1;
                    }
            } while (canGo[0] || canGo[1] || canGo[2] || canGo[3]);
        }
        return null;
    }
    myInside(i, j) {
        return i >= 0 && i < 18 && j >= 0 && j < 11;
    }
    createArrayList(box, i, j) {
        let arrayList = new Array();
        let p, q;
        do {
            arrayList.push(this.point(i, j));
            p = box[i][j].x;
            q = box[i][j].y;
            i = p;
            j = q;
        } while (i != -2);
        return arrayList;
    }
    getCol(arr, n) {
        return arr.map((x) => x[n]);
    }
    getNewArrZero() {
        const newArray = this.newArray(18);
        for (let i = 0; i < 18; i++) {
            for (let j = 0; j < 11; j++) {
                newArray[i][j] = 0;
            }
        }
        return newArray;
    }
    getLevelMatrix(arrayList, level) {
        switch (level) {
            case 1: {
                return arrayList;
            }
            case 2: {
                const newArray = this.getNewArrZero();
                for (let i = 1; i < arrayList.length - 1; i++) {
                    const arrHandle = arrayList[i];
                    let arrZero = [];
                    for (let j = 1; j < arrHandle.length - 1; j++) {
                        if (arrHandle[j] === 0) {
                            arrZero.push(j);
                        }
                    }
                    for (let i = 0; i < arrZero.length; i++) {
                        arrHandle.splice(arrZero[i], 1);
                        arrHandle.unshift(0);
                    }
                    for (let m = 0; m < arrHandle.length; m++) {
                        newArray[i][m] = arrHandle[m];
                    }
                }
                return newArray;
            }
            case 3: {
                const newArray = this.getNewArrZero();
                for (let i = 1; i < arrayList.length - 1; i++) {
                    const arrHandle = arrayList[i];
                    let arrZero = [];
                    for (let j = 1; j < arrHandle.length - 1; j++) {
                        if (arrHandle[j] === 0) {
                            arrZero.push(j);
                        }
                    }

                    for (let i = 0; i < arrZero.length; i++) {
                        if (i === 0) {
                            arrHandle.splice(arrZero[i], 1);
                            arrHandle.push(0);
                        } else {
                            arrHandle.splice(arrZero[i] - 1, 1);
                            arrHandle.push(0);
                        }
                    }
                    for (let m = 0; m < arrHandle.length; m++) {
                        newArray[i][m] = arrHandle[m];
                    }
                }
                return newArray;
            }
            case 4: {
                const newArray = this.getNewArrZero();
                for (let i = 1; i < arrayList[0].length - 1; i++) {
                    const arrHandle = this.getCol(arrayList, i);
                    let arrZero = [];
                    for (let j = 1; j < arrHandle.length - 1; j++) {
                        if (arrHandle[j] === 0) {
                            arrZero.push(j);
                        }
                    }

                    for (let i = 0; i < arrZero.length; i++) {
                        if (i === 0) {
                            arrHandle.splice(arrZero[i], 1);
                            arrHandle.push(0);
                        } else {
                            arrHandle.splice(arrZero[i] - 1, 1);
                            arrHandle.push(0);
                        }
                    }
                    for (let m = 0; m < arrHandle.length; m++) {
                        newArray[m][i] = arrHandle[m];
                    }
                }
                return newArray;
            }
            case 5: {
                const newArray = this.getNewArrZero();
                for (let i = 1; i < arrayList[0].length - 1; i++) {
                    const arrHandle = this.getCol(arrayList, i);
                    let arrZero = [];
                    for (let j = 1; j < arrHandle.length - 1; j++) {
                        if (arrHandle[j] === 0) {
                            arrZero.push(j);
                        }
                    }

                    for (let i = 0; i < arrZero.length; i++) {
                        arrHandle.splice(arrZero[i], 1);
                        arrHandle.unshift(0);
                    }
                    for (let m = 0; m < arrHandle.length; m++) {
                        newArray[m][i] = arrHandle[m];
                    }
                }
                return newArray;
            }
            case 6: {
                const newArray = this.getNewArrZero();
                for (let i = 1; i < arrayList.length - 1; i++) {
                    const arrHandle = arrayList[i];
                    const center = arrHandle.length / 2;
                    let arrZeroSmall = [];
                    let arrZeroBig = [];
                    for (let j = 1; j < arrHandle.length - 1; j++) {
                        if (arrHandle[j] === 0) {
                            if (j < center) {
                                arrZeroSmall.push(j);
                            } else {
                                arrZeroBig.push(j);
                            }
                        }
                    }
                    for (let i = 0; i < arrZeroSmall.length; i++) {
                        arrHandle.splice(arrZeroSmall[i], 1);
                        arrHandle.unshift(0);
                    }
                    for (let i = 0; i < arrZeroBig.length; i++) {
                        if (i === 0) {
                            arrHandle.splice(arrZeroBig[i], 1);
                            arrHandle.push(0);
                        } else {
                            arrHandle.splice(arrZeroBig[i] - 1, 1);
                            arrHandle.push(0);
                        }
                    }
                    for (let m = 0; m < arrHandle.length; m++) {
                        newArray[i][m] = arrHandle[m];
                    }
                }
                for (let i = 1; i < newArray[0].length - 1; i++) {
                    const arrHandle = this.getCol(newArray, i);
                    const center = arrHandle.length / 2;
                    let arrZeroSmall = [];
                    let arrZeroBig = [];
                    for (let j = 1; j < arrHandle.length - 1; j++) {
                        if (arrHandle[j] === 0) {
                            if (j < center) {
                                arrZeroSmall.push(j);
                            } else {
                                arrZeroBig.push(j);
                            }
                        }
                    }
                    for (let i = 0; i < arrZeroSmall.length; i++) {
                        arrHandle.splice(arrZeroSmall[i], 1);
                        arrHandle.unshift(0);
                    }
                    for (let i = 0; i < arrZeroBig.length; i++) {
                        if (i === 0) {
                            arrHandle.splice(arrZeroBig[i], 1);
                            arrHandle.push(0);
                        } else {
                            arrHandle.splice(arrZeroBig[i] - 1, 1);
                            arrHandle.push(0);
                        }
                    }
                    for (let m = 0; m < arrHandle.length; m++) {
                        newArray[m][i] = arrHandle[m];
                    }
                }
                return newArray;
            }
            default:
                return newArray;
        }
    }
    checkHavePath(arr) {
        let finalPath = null;
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                for (let m = 0; m < arr.length; m++) {
                    for (let n = 0; n < arr[m].length; n++) {
                        finalPath = this.checkPath(arr, i, j, m, n);
                        if (finalPath) return finalPath;
                    }
                }
            }
        }
        return null;
    }
    fixMatrix(a) {
        let b = new Array();
        let i,
            j,
            k = 0;
        for (let i = 1; i <= 16; i++)
            for (let j = 1; j <= 9; j++) if (a[i][j] > 0) b[k++] = a[i][j];
        this.mixArr(b, k);
        k = 0;
        for (let i = 1; i <= 16; i++)
            for (let j = 1; j <= 9; j++) if (a[i][j] > 0) a[i][j] = b[k++];

        let tmp = this.newArray(18);
        for (let i = 0; i < 18; i++)
            for (let j = 0; j < 11; j++) tmp[i][j] = a[i][j] > 0 ? 1 : 0;
        const checkPath = this.checkHavePath(a);
        if (!checkPath) {
            return this.fixMatrix(a);
        } else {
            return a;
        }
    }
    checkFinishRound(arr) {
        let count = 0;
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[0].length; j++) {
                count += arr[i][j];
            }
        }
        return count === 0;
    }
    mixArr(a, n) {
        let b = this.generate(n);
        let c = new Array();
        for (let i = 0; i < n; i++) c[i] = a[b[i]];
        for (let i = 0; i < n; i++) a[i] = c[i];
    }
    generate(n) {
        let a = new Array();
        let i, j, k, t;
        for (i = 0; i < n; i++) a[i] = n;
        j = n;
        for (i = 0; i < n; i++) {
            k = this.getRandom(j--) + 1;
            t = 0;
            while (k > 0) {
                if (a[t++] == n) k--;
            }
            a[t - 1] = i;
        }
        return a;
    }
}

const pikachuGame=new PikachuGame();
//======================Vẽ đường đi giữa 2 thẻ=============================
class draw {
    constructor() {}
    //đưa vào 2 điểm
    getRectDraw(p1, p2) {
        var x1, y1, x2, y2;
        //so sánh tọa độ và gán cho các biến
        //tìm tọa độ có vị trí xa nhất so với gốc
        if (p1.x < p2.x) {
            x1 = p1.x;
            x2 = p2.x;
        } else {
            x2 = p1.x;
            x1 = p2.x;
        }
        if (p1.y < p2.y) {
            y1 = p1.y;
            y2 = p2.y;
        } else {
            y2 = p1.y;
            y1 = p2.y;
        }
        // trả về khoảng cách giữa 2 điểm
        return {
            x: x1 - 3,
            y: y1 - 3,
            //vd: a cách gốc 50px, b cách gốc 70px => 70-50 là khoảng cách từ a đến b
            width: x2 - x1 + 6,
            height: y2 - y1 + 6,
        };
    }
    //tìm tọa độ trung tâm của thẻ
    //i,j là index của thẻ trong matrix
    //minh họa: mỗi thẻ chiếm diện tích x = 42, y = 52 thì điểm trung tâm thẻ thứ 3 dòng 1
    //sẽ ở vị trí cách left 84px(tương đương với chiều ngang 2 thẻ) + 42px/2(1 nửa chiều ngang của thẻ), cách top 0px + 52/2px(1 nữa chiều dọc của thẻ)
    findCentre(i, j) {
        return {
            x: i * 42 + 42 / 2,
            y: j * 52 + 52 / 2,
        };
    }
}
const drawClass = new draw();
//=============================================================
