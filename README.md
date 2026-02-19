# ☕ Ứng Dụng Quản Lý Bán Hàng - Cafe Đỗ Việt

Ứng dụng quản lý bán hàng toàn diện được thiết kế hiện đại, mượt mà và dễ sử dụng, dành riêng cho các cửa hàng dịch vụ F&B (Cà phê, Đồ ăn nhanh) hoặc các cửa hàng bán lẻ quy mô vừa và nhỏ.

## ✨ Các Tính Năng Nổi Bật

- **🛒 Quản Lý Bán Hàng (POS):** Tạo đơn hàng nhanh chóng, hỗ trợ tìm kiếm sản phẩm, quản lý giỏ hàng và thanh toán.
- **📦 Quản Lý Kho & Kiểm Kê:** Nhập/Xuất kho tự động khi bán hàng. Tính năng **Cân đối kho** giúp điều chỉnh lượng tồn thực tế sau kiểm kê.
- **💸 Quản Lý Thu Chi:** Ghi chép các khoản thu ngoài doanh thu và các chi phí vận hành (điện, nước, lương...) để tính toán lợi nhuận thực tế.
- **📊 Báo Cáo Chuyên Nghiệp:** Biểu đồ trực quan về xu hướng doanh thu và Top 5 sản phẩm bán chạy nhất bằng Chart.js.
- **👥 Quản Lý Nhân Sự:** Lưu trữ hồ sơ nhân viên và theo dõi quỹ lương hàng tháng.
- **📓 Sổ Nợ Khách Hàng:** Ghi nợ tự động từ đơn hàng và theo dõi tình trạng thanh toán nợ.
- **🎁 Khuyến Mại & Danh Mục:** Thiết lập các mã giảm giá và phân loại sản phẩm linh hoạt.
- **🎨 Tùy Chỉnh Giao Diện:** Cho phép thay đổi tên cửa hàng và **màu sắc chủ đạo** của toàn bộ ứng dụng theo nhận diện thương hiệu.

## 🛠️ Công Nghệ Sử Dụng

- **Frontend:** React.js, Vite
- **Thiết Kế:** Vanilla CSS (Custom Design System)
- **Biểu Đồ:** Chart.js, React-Chartjs-2
- **Lưu Trữ:** Local State (Có thể nâng cấp lên Firebase/JSON Server)

## 🚀 Hướng Dẫn Cài Đặt

1. **Yêu cầu:** Máy tính đã cài đặt [Node.js](https://nodejs.org/) (Phiên bản 16 trở lên).

2. **Clone project hoặc tải về:**
   ```bash
   git clone https://github.com/Doviet2898/QuanLyBanHang.git
   cd QuanLyBanHang
   ```

3. **Cài đặt dependencies:**
   ```bash
   npm install
   ```

4. **Chạy ứng dụng trong môi trường phát triển (Development):**
   ```bash
   npm run dev
   ```
   Ứng dụng sẽ chạy tại địa chỉ: `http://localhost:5173/` (hoặc cổng được hiển thị trong terminal).

## 📖 Hướng Dẫn Sử Dụng

### 1. Thiết lập ban đầu
- Vào mục **Cửa hàng** (Settings) để đổi tên quán và chọn màu sắc giao diện theo sở thích.
- Vào mục **Sản phẩm** để thêm danh sách các món/hàng hóa bạn đang kinh doanh.

### 2. Bán hàng
- Tại **Trình tạo đơn**, chọn sản phẩm khách mua. Cập nhật số lượng và thông khách hàng.
- Nhấn **Xác nhận**, hệ thống sẽ tự trừ tồn kho và ghi nhận doanh thu.

### 3. Kiểm soát kho & tài chính
- Sau mỗi ngày, bạn có thể vào **Báo cáo** để xem hiệu quả kinh doanh.
- Sử dụng mục **Thu chi** để ghi lại các chi phí phát sinh trong ngày.

---
*Phát triển bởi ❤️ dành cho Cafe Đỗ Việt.*
