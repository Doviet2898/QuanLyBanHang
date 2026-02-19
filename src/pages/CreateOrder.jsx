import { useState } from 'react'
import '../styles/CreateOrder.css'

function CreateOrder({ products, onAddOrder, onBack }) {
    const [customerName, setCustomerName] = useState('')
    const [customerPhone, setCustomerPhone] = useState('')
    const [selectedItems, setSelectedItems] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    const addItem = (product) => {
        const existingItem = selectedItems.find(item => item.id === product.id)
        if (existingItem) {
            setSelectedItems(selectedItems.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ))
        } else {
            setSelectedItems([...selectedItems, { ...product, quantity: 1 }])
        }
    }

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            removeItem(productId)
        } else {
            setSelectedItems(selectedItems.map(item =>
                item.id === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            ))
        }
    }

    const removeItem = (productId) => {
        setSelectedItems(selectedItems.filter(item => item.id !== productId))
    }

    const calculateTotal = () => {
        return selectedItems.reduce((total, item) => total + (item.price * item.quantity), 0)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (selectedItems.length === 0) {
            alert('Vui lòng chọn ít nhất một sản phẩm!')
            return
        }

        const order = {
            customerName: customerName || 'Khách lẻ',
            customerPhone,
            items: selectedItems,
            total: calculateTotal()
        }

        onAddOrder(order)

        // Reset form
        setCustomerName('')
        setCustomerPhone('')
        setSelectedItems([])

        alert('Đơn hàng đã được tạo thành công!')
        onBack()
    }

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="create-order-page">
            <div className="container">
                <div className="page-header">
                    <button className="btn-back" onClick={onBack}>← Quay lại</button>
                    <h2>Tạo Đơn Hàng Mới</h2>
                </div>

                <div className="order-content">
                    <div className="products-section">
                        <div className="search-box">
                            <input
                                type="text"
                                placeholder="🔍 Tìm kiếm sản phẩm..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>

                        <div className="products-grid">
                            {filteredProducts.map(product => (
                                <div key={product.id} className="product-card" onClick={() => addItem(product)}>
                                    <div className="product-icon">🛍️</div>
                                    <div className="product-info">
                                        <h4>{product.name}</h4>
                                        <p className="product-price">{product.price.toLocaleString('vi-VN')}đ</p>
                                        <p className="product-stock">Kho: {product.stock}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="order-summary">
                        <h3>Thông Tin Đơn Hàng</h3>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Tên khách hàng</label>
                                <input
                                    type="text"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    placeholder="Nhập tên khách hàng (tùy chọn)"
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label>Số điện thoại</label>
                                <input
                                    type="tel"
                                    value={customerPhone}
                                    onChange={(e) => setCustomerPhone(e.target.value)}
                                    placeholder="Nhập số điện thoại (tùy chọn)"
                                    className="form-input"
                                />
                            </div>

                            <div className="selected-items">
                                <h4>Sản phẩm đã chọn</h4>
                                {selectedItems.length === 0 ? (
                                    <p className="empty-cart">Chưa có sản phẩm nào</p>
                                ) : (
                                    <div className="items-list">
                                        {selectedItems.map(item => (
                                            <div key={item.id} className="cart-item">
                                                <div className="item-info">
                                                    <span className="item-name">{item.name}</span>
                                                    <span className="item-price">{item.price.toLocaleString('vi-VN')}đ</span>
                                                </div>
                                                <div className="item-controls">
                                                    <button
                                                        type="button"
                                                        className="qty-btn"
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    >
                                                        -
                                                    </button>
                                                    <span className="qty-display">{item.quantity}</span>
                                                    <button
                                                        type="button"
                                                        className="qty-btn"
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    >
                                                        +
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="remove-btn"
                                                        onClick={() => removeItem(item.id)}
                                                    >
                                                        🗑️
                                                    </button>
                                                </div>
                                                <div className="item-subtotal">
                                                    {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="order-total">
                                <span>Tổng cộng:</span>
                                <span className="total-amount">{calculateTotal().toLocaleString('vi-VN')}đ</span>
                            </div>

                            <button type="submit" className="btn btn-primary btn-submit">
                                Tạo Đơn Hàng
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateOrder
