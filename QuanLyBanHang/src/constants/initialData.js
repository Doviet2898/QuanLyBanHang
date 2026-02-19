export const INITIAL_PRODUCTS = [
    { id: 1, name: 'Cà phê đen', price: 25000, stock: 100, category: 'Đồ uống' },
    { id: 2, name: 'Cà phê sữa', price: 30000, stock: 100, category: 'Đồ uống' },
    { id: 3, name: 'Bánh mì', price: 20000, stock: 50, category: 'Đồ ăn' },
    { id: 4, name: 'Trà đào', price: 35000, stock: 80, category: 'Đồ uống' },
]

export const INITIAL_CATEGORIES = ['Đồ uống', 'Đồ ăn', 'Khác']

export const INITIAL_SUPPLIERS = [
    { id: 1, name: 'Công ty Cà Phê Việt', phone: '0912345678', address: 'Bảo Lộc, Lâm Đồng' }
]

export const INITIAL_EXPENSES = [
    { id: 1, date: new Date().toLocaleDateString('vi-VN'), title: 'Tiền điện tháng 1', amount: 1500000, type: 'Chi', category: 'Tiền ích' },
    { id: 2, date: new Date().toLocaleDateString('vi-VN'), title: 'Thu tiền thanh lý chai nhựa', amount: 200000, type: 'Thu', category: 'Khác' },
]

export const INITIAL_STAFF = [
    { id: 1, name: 'Nguyễn Văn A', position: 'Quản lý', phone: '0901234567', salary: 15000000 },
    { id: 2, name: 'Trần Thị B', position: 'Nhân viên', phone: '0907654321', salary: 8000000 },
]

export const INITIAL_STOCK_HISTORY = [
    { id: 1, date: new Date().toLocaleString('vi-VN'), productName: 'Cà phê đen', type: 'Nhập kho', quantity: 100, note: 'Tồn kho ban đầu' },
]
