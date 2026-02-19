import { useState } from 'react'
import '../styles/Orders.css'

function Orders({ orders, products, onUpdateStatus, onDeleteOrder, onUpdateOrder, onBack }) {
    const [editingOrder, setEditingOrder] = useState(null)
    const [editFormData, setEditFormData] = useState(null)

    const getStatusColor = (status) => {
        switch (status) {
            case 'Đang xử lý': return 'status-processing'
            case 'Hoàn thành': return 'status-completed'
            case 'Đã hủy': return 'status-cancelled'
            default: return ''
        }
    }

    const handleEditClick = (order) => {
        setEditingOrder(order)
        setEditFormData({
            customerName: order.customerName,
            customerPhone: order.customerPhone,
            items: [...order.items]
        })
    }

    const handleEditSubmit = (e) => {
        e.preventDefault()
        const total = editFormData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        onUpdateOrder(editingOrder.id, { ...editFormData, total })
        setEditingOrder(null)
        setEditFormData(null)
    }

    const updateItemQuantity = (productId, newQty) => {
        if (newQty < 1) return
        setEditFormData({
            ...editFormData,
            items: editFormData.items.map(item =>
                item.id === productId ? { ...item, quantity: newQty } : item
            )
        })
    }

    return (
        <div className="orders-page">
            <div className="container">
                <div className="page-header">
                    <button className="btn-back" onClick={onBack}>← Quay lại</button>
                    <h2>Quản Lý Đơn Hàng</h2>
                </div>

                {editingOrder && (
                    <div className="modal-overlay" onClick={() => setEditingOrder(null)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <h3>Chỉnh Sửa Đơn Hàng #{editingOrder.id}</h3>
                            <form onSubmit={handleEditSubmit}>
                                <div className="form-group">
                                    <label>Tên khách hàng</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={editFormData.customerName}
                                        onChange={(e) => setEditFormData({ ...editFormData, customerName: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Số điện thoại</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={editFormData.customerPhone}
                                        onChange={(e) => setEditFormData({ ...editFormData, customerPhone: e.target.value })}
                                    />
                                </div>
                                <div className="items-edit-list">
                                    <h4>Sản phẩm trong đơn</h4>
                                    {editFormData.items.map(item => (
                                        <div key={item.id} className="edit-item-row">
                                            <span>{item.name}</span>
                                            <div className="qty-controls">
                                                <button type="button" onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>-</button>
                                                <span>{item.quantity}</span>
                                                <button type="button" onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>
                                            </div>
                                            <span>{(item.price * item.quantity).toLocaleString('vi-VN')}đ</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="form-actions">
                                    <button type="button" className="btn btn-secondary" onClick={() => setEditingOrder(null)}>Hủy</button>
                                    <button type="submit" className="btn btn-primary">Lưu Thay Đổi</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

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
                                                <button className="btn btn-edit" onClick={() => handleEditClick(order)}>✏️ Sửa</button>
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
                                        <button className="btn btn-delete" onClick={() => onDeleteOrder(order.id)}>🗑️ Xóa</button>
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
