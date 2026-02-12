import '../styles/Reports.css'

function Reports({ orders, products, onBack }) {
    const completedOrders = orders.filter(order => order.status === 'Hoàn thành')
    const processingOrders = orders.filter(order => order.status === 'Đang xử lý')
    const cancelledOrders = orders.filter(order => order.status === 'Đã hủy')

    const totalRevenue = completedOrders.reduce((sum, order) => sum + order.total, 0)
    const averageOrderValue = completedOrders.length > 0
        ? totalRevenue / completedOrders.length
        : 0

    // Tính sản phẩm bán chạy
    const productSales = {}
    completedOrders.forEach(order => {
        order.items.forEach(item => {
            if (productSales[item.name]) {
                productSales[item.name] += item.quantity
            } else {
                productSales[item.name] = item.quantity
            }
        })
    })

    const topProducts = Object.entries(productSales)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)

    const totalStock = products.reduce((sum, product) => sum + product.stock, 0)
    const totalStockValue = products.reduce((sum, product) => sum + (product.stock * product.price), 0)

    const exportToExcel = () => {
        let csvContent = "data:text/csv;charset=utf-8,"
        csvContent += "BÁO CÁO BÁN HÀNG\n\n"

        csvContent += "TỔNG QUAN\n"
        csvContent += `Tổng đơn hàng,${orders.length}\n`
        csvContent += `Đơn hoàn thành,${completedOrders.length}\n`
        csvContent += `Đơn đang xử lý,${processingOrders.length}\n`
        csvContent += `Đơn đã hủy,${cancelledOrders.length}\n`
        csvContent += `Tổng doanh thu,${totalRevenue}\n`
        csvContent += `Giá trị đơn trung bình,${averageOrderValue.toFixed(0)}\n\n`

        csvContent += "SẢN PHẨM BÁN CHẠY\n"
        csvContent += "Sản phẩm,Số lượng bán\n"
        topProducts.forEach(([name, qty]) => {
            csvContent += `${name},${qty}\n`
        })

        csvContent += "\nTỒN KHO\n"
        csvContent += "Sản phẩm,Giá,Tồn kho,Giá trị\n"
        products.forEach(product => {
            csvContent += `${product.name},${product.price},${product.stock},${product.price * product.stock}\n`
        })

        const encodedUri = encodeURI(csvContent)
        const link = document.createElement("a")
        link.setAttribute("href", encodedUri)
        link.setAttribute("download", `bao_cao_${new Date().toLocaleDateString('vi-VN')}.csv`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className="reports-page">
            <div className="container">
                <div className="page-header">
                    <button className="btn-back" onClick={onBack}>← Quay lại</button>
                    <h2>Báo Cáo & Thống Kê</h2>
                    <button className="btn btn-primary" onClick={exportToExcel}>
                        📊 Xuất Excel
                    </button>
                </div>

                <div className="reports-grid">
                    <div className="report-section">
                        <h3>📈 Tổng Quan Đơn Hàng</h3>
                        <div className="report-stats">
                            <div className="report-stat">
                                <div className="stat-label">Tổng đơn hàng</div>
                                <div className="stat-value">{orders.length}</div>
                            </div>
                            <div className="report-stat success">
                                <div className="stat-label">Hoàn thành</div>
                                <div className="stat-value">{completedOrders.length}</div>
                            </div>
                            <div className="report-stat warning">
                                <div className="stat-label">Đang xử lý</div>
                                <div className="stat-value">{processingOrders.length}</div>
                            </div>
                            <div className="report-stat danger">
                                <div className="stat-label">Đã hủy</div>
                                <div className="stat-value">{cancelledOrders.length}</div>
                            </div>
                        </div>
                    </div>

                    <div className="report-section">
                        <h3>💰 Doanh Thu</h3>
                        <div className="revenue-stats">
                            <div className="revenue-item">
                                <span className="revenue-label">Tổng doanh thu:</span>
                                <span className="revenue-value">{totalRevenue.toLocaleString('vi-VN')}đ</span>
                            </div>
                            <div className="revenue-item">
                                <span className="revenue-label">Giá trị đơn trung bình:</span>
                                <span className="revenue-value">{averageOrderValue.toFixed(0).toLocaleString('vi-VN')}đ</span>
                            </div>
                            <div className="revenue-item">
                                <span className="revenue-label">Đơn hàng thành công:</span>
                                <span className="revenue-value">{completedOrders.length} đơn</span>
                            </div>
                        </div>
                    </div>

                    <div className="report-section">
                        <h3>🏆 Sản Phẩm Bán Chạy</h3>
                        {topProducts.length > 0 ? (
                            <div className="top-products">
                                {topProducts.map(([name, qty], index) => (
                                    <div key={name} className="top-product-item">
                                        <span className="product-rank">#{index + 1}</span>
                                        <span className="product-name">{name}</span>
                                        <span className="product-qty">{qty} sản phẩm</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="empty-message">Chưa có dữ liệu bán hàng</p>
                        )}
                    </div>

                    <div className="report-section">
                        <h3>📦 Tồn Kho</h3>
                        <div className="inventory-stats">
                            <div className="inventory-item">
                                <span className="inventory-label">Tổng sản phẩm:</span>
                                <span className="inventory-value">{products.length} loại</span>
                            </div>
                            <div className="inventory-item">
                                <span className="inventory-label">Tổng số lượng:</span>
                                <span className="inventory-value">{totalStock} sản phẩm</span>
                            </div>
                            <div className="inventory-item">
                                <span className="inventory-label">Giá trị tồn kho:</span>
                                <span className="inventory-value">{totalStockValue.toLocaleString('vi-VN')}đ</span>
                            </div>
                        </div>
                    </div>

                    <div className="report-section full-width">
                        <h3>📋 Chi Tiết Đơn Hàng Gần Đây</h3>
                        {orders.length > 0 ? (
                            <div className="orders-table">
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
                        ) : (
                            <p className="empty-message">Chưa có đơn hàng nào</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reports
