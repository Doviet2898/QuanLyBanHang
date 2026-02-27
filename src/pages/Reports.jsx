import { Bar, Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js'
import '../styles/pages/Reports.css'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
)

function Reports({ orders, products, onBack }) {
    const completedOrders = orders.filter(order => order.status === 'Hoàn thành')
    const processingOrders = orders.filter(order => order.status === 'Đang xử lý')
    const cancelledOrders = orders.filter(order => order.status === 'Đã hủy')

    const totalRevenue = completedOrders.reduce((sum, order) => sum + order.total, 0)

    // Data for Top Products Chart
    const productSales = {}
    completedOrders.forEach(order => {
        order.items.forEach(item => {
            productSales[item.name] = (productSales[item.name] || 0) + item.quantity
        })
    })

    const topProductsData = Object.entries(productSales)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)

    const barChartData = {
        labels: topProductsData.map(p => p[0]),
        datasets: [
            {
                label: 'Số lượng bán',
                data: topProductsData.map(p => p[1]),
                backgroundColor: 'rgba(255, 107, 53, 0.6)',
                borderColor: 'rgba(255, 107, 53, 1)',
                borderWidth: 1,
            },
        ],
    }

    // Data for Revenue Trend (Simplified for demo)
    const revenueByDay = {}
    completedOrders.forEach(order => {
        const day = order.date.split(',')[0]
        revenueByDay[day] = (revenueByDay[day] || 0) + order.total
    })

    // Sort dates for the line chart
    const sortedDates = Object.keys(revenueByDay).sort()

    const lineChartData = {
        labels: sortedDates,
        datasets: [
            {
                label: 'Doanh thu (VNĐ)',
                data: sortedDates.map(date => revenueByDay[date]),
                fill: true,
                backgroundColor: 'rgba(255, 107, 53, 0.2)',
                borderColor: 'rgba(255, 107, 53, 1)',
                tension: 0.4,
            },
        ],
    }

    const exportToExcel = () => {
        let csvContent = "data:text/csv;charset=utf-8,"
        csvContent += "BÁO CÁO BÁN HÀNG\n\n"
        csvContent += "TỔNG QUAN\n"
        csvContent += `Tổng doanh thu,${totalRevenue}\n\n`
        csvContent += "TỒN KHO\nSản phẩm,Giá,Tồn kho\n"
        products.forEach(p => csvContent += `${p.name},${p.price},${p.stock}\n`)
        const link = document.createElement("a")
        link.href = encodeURI(csvContent)
        link.download = `reports_${new Date().toLocaleDateString()}.csv`
        link.click()
    }

    return (
        <div className="reports-page">
            <div className="container">
                <div className="page-header">
                    <button className="btn-back" onClick={onBack}>← Quay lại</button>
                    <h2>Báo Cáo Hoạt Động</h2>
                    <button className="btn btn-primary" onClick={exportToExcel}>📊 Xuất Báo Cáo CSV</button>
                </div>

                <div className="reports-grid">
                    <div className="report-section full-width chart-container">
                        <h3>📈 Xu Hướng Doanh Thu</h3>
                        <div className="chart-wrapper">
                            <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                        </div>
                    </div>

                    <div className="report-section chart-container">
                        <h3>🏆 Top 5 Sản Phẩm</h3>
                        <div className="chart-wrapper">
                            <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                        </div>
                    </div>

                    <div className="report-section">
                        <h3>💰 Thống Kê Tài Chính</h3>
                        <div className="revenue-stats">
                            <div className="revenue-item">
                                <span>Tổng Doanh Thu</span>
                                <span className="revenue-value">{totalRevenue.toLocaleString('vi-VN')}đ</span>
                            </div>
                            <div className="revenue-item">
                                <span>Đơn hàng Hoàn thành</span>
                                <span className="revenue-value">{completedOrders.length}</span>
                            </div>
                            <div className="revenue-item">
                                <span>Đơn hàng Đang chờ</span>
                                <span className="revenue-value">{processingOrders.length}</span>
                            </div>
                            <div className="revenue-item">
                                <span>Đơn hàng Đã hủy</span>
                                <span className="revenue-value">{cancelledOrders.length}</span>
                            </div>
                        </div>
                    </div>

                    <div className="report-section full-width">
                        <h3>📋 Chi Tiết Đơn Hàng Gần Đây</h3>
                        <div className="orders-table table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Mã đơn</th>
                                        <th>Khách hàng</th>
                                        <th>Ngày</th>
                                        <th>Tổng tiền</th>
                                        <th>Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.slice(0, 10).map(order => (
                                        <tr key={order.id}>
                                            <td>#{order.id}</td>
                                            <td>{order.customerName}</td>
                                            <td>{order.date}</td>
                                            <td>{order.total.toLocaleString('vi-VN')}đ</td>
                                            <td>
                                                <span className={`badge ${order.status === 'Hoàn thành' ? 'badge-success' :
                                                    order.status === 'Đang xử lý' ? 'badge-warning' :
                                                        'badge-danger'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reports
