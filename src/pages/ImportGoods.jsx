import { useState } from 'react'

function ImportGoods({ products, suppliers, onImport, onBack }) {
    const [selectedSupplier, setSelectedSupplier] = useState(suppliers[0]?.name || '')
    const [cart, setCart] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    const addToCart = (product) => {
        const exists = cart.find(i => i.id === product.id)
        if (exists) {
            setCart(cart.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i))
        } else {
            setCart([...cart, { ...product, quantity: 1 }])
        }
    }

    const handleImportSubmit = () => {
        if (cart.length === 0) return alert('Vui lòng chọn sản phẩm!')
        onImport({
            supplierName: selectedSupplier,
            items: cart,
            total: cart.reduce((sum, i) => sum + ((i.importPrice ?? (i.price * 0.7)) * i.quantity), 0)
        })
        alert('Nhập hàng thành công!')
        onBack()
    }

    return (
        <div className="container">
            <div className="page-header">
                <button className="btn-back" onClick={onBack}>← Quay lại</button>
                <h2>Nhập Hàng</h2>
            </div>

            <div className="order-content">
                <div className="products-section">
                    <input
                        type="text"
                        placeholder="Tìm sản phẩm..."
                        className="form-input mb-1"
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <div className="products-grid">
                        {products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map(product => (
                            <div key={product.id} className="product-card" onClick={() => addToCart(product)}>
                                <div className="product-icon">📦</div>
                                <div className="product-info">
                                    <h4>{product.name}</h4>
                                    <p>Tồn: {product.stock}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="order-summary">
                    <h3>Hóa Đơn Nhập</h3>
                    <div className="form-group">
                        <label>Nhà cung cấp</label>
                        <select className="form-input" value={selectedSupplier} onChange={e => setSelectedSupplier(e.target.value)}>
                            {suppliers.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                        </select>
                    </div>

                    <div className="items-list mb-2">
                        {cart.map(item => (
                            <div key={item.id} className="cart-item">
                                <span>{item.name} x {item.quantity}</span>
                                <button className="qty-btn" onClick={() => setCart(cart.filter(i => i.id !== item.id))}>×</button>
                            </div>
                        ))}
                    </div>

                    <div className="order-total mb-2" style={{ padding: '15px' }}>
                        <span>Tổng tiền nhập:</span>
                        <span className="total-amount" style={{ fontSize: '20px' }}>
                            {cart.reduce((sum, i) => sum + ((i.importPrice ?? (i.price * 0.7)) * i.quantity), 0).toLocaleString('vi-VN')}đ
                        </span>
                    </div>
                    <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleImportSubmit}>
                        Xác Nhận Nhập Kho
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ImportGoods
