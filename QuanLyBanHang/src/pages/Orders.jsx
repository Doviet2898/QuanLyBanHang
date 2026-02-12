import '../styles/Orders.css'

function Orders({ orders, onUpdateStatus, onBack }) {
    const getStatusColor = (status) => {
        switch (status) {
            case 'Đang xử lý': return 'status-processing'
            case 'Hoàn thành': return 'status-completed'
            case 'Đã hủy': return 'status-cancelled'
            default: return ''
        }
    }

    return (
        <div className="orders-page">
            <div className="container">
                <div className="page-header">
                    <button className="btn-back" onClick={onBack}>← Quay lại</button>
                    <h2>Quản Lý Đơn Hàng</h2>
                </div>

                {orders.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">📦</div>
                        <h3>Chưa có đơn hàng nào</h3>
                        <p>Tạo đơn hàng đầu tiên của bạn!</p>
                    </div>
                ) : (
                    <div className="orders-list">
                        {orders.map(order => (
                            <div key={order.id} className="order-card">
                                <div className="order-header">
                                    <div className="order-info">
                                        <h3>Đơn hàng #{order.id}</h3>
                                        <p className="order-date">📅 {order.date}</p>
                                    </div>
                                    <div className={`order-status ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </div>
                                </div>

                                <div className="order-customer">
                                    <p><strong>Khách hàng:</strong> {order.customerName}</p>
                                    {order.customerPhone && (
                                        <p><strong>SĐT:</strong> {order.customerPhone}</p>
                                    )}
                                </div>

                                <div className="order-items">
                                    <h4>Sản phẩm:</h4>
                                    <ul>
                                        {order.items.map((item, index) => (
                                            <li key={index}>
                                                {item.name} x {item.quantity} - {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="order-footer">
                                    <div className="order-total">
                                        <strong>Tổng tiền:</strong>
                                        <span className="total-amount">{order.total.toLocaleString('vi-VN')}đ</span>
                                    </div>
                                    <div className="order-actions">
                                        {order.status === 'Đang xử lý' && (
                                            <>
                                                <button
                                                    className="btn btn-success"
                                                    onClick={() => onUpdateStatus(order.id, 'Hoàn thành')}
                                                >
                                                    ✓ Hoàn thành
                                                </button>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => onUpdateStatus(order.id, 'Đã hủy')}
                                                >
                                                    ✗ Hủy đơn
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Orders
